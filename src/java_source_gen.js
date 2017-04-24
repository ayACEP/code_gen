
const {NameConverter, TypeConverter} = require("./utils");

class Class {
    constructor(name = "clazz", packagee = "a.b.c", extendz = null, access = "public") {
        this.name = name;
        this.package = packagee;
        this.extends = extendz;
        this.access = access;
        this.annotations = [];
        this.implements = [];
        this.fields = [];
        this.methods = [];
    }
    addField(field) {
        this.fields.push(field);
        return this;
    }
    addMethod(method) {
        this.methods.push(method);
        return this;
    }
    addImplement(implementz) {
        this.implements.push(implementz);
        return this;
    }
    addAnnotation(annotation) {
        this.annotations.push(annotation);
        return this;
    }
    toString() {
        let code = "package " + this.package + ";\n\n";
        for (let i in this.annotations) {
            code += this.annotations[i].toString() + "\n";
        }
        code += this.extends != null ? "extends " + this.extends : "";
        code += this.access + " class " + this.name + " implements ";
        for (let i in this.implements) {
            code += this.implements[i];
            code += i != this.implements.length - 1 ? ", " : "";
        }
        code += " {\n\n";
        for (let i in this.fields) {
            code += this.fields[i].toString() + "\n";
        }
        for (let i in this.methods) {
            code += this.methods[i].toString() + "\n";
        }
        return code;
    }
}

class Field {
    constructor(name = "field", type = "String", access = "private") {
        this.name = name;
        this.access = access;
        this.type = type;
        this.annotations = [];
    }
    addAnnotation(annotation) {
        this.annotations.push(annotation);
        return this;
    }
    toString() {
        let code = "";
        for (let i in this.annotations) {
            code += "    " + this.annotations[i].toString() + "\n";
        }
        code += "    " + this.access + " " + this.type + " " + this.name + ";\n";
        return code;
    }
}

class Method {
    constructor(name = "method", returnType = "void", content = "", access = "public") {
        this.name = name;
        this.returnType = returnType;
        this.content = content;
        this.access = access;
        this.parameters = [];
    }
    addParameter(parameter) {
        this.parameters.push(parameter);
        return this;
    }
    toString() {
        let code = "    " + this.access + " " + this.returnType + " " + this.name + "(";
        for (let i in this.parameters) {
            code += this.parameters[i].toString();
            code += i != this.parameters.length - 1 ? ", " : "";
        }
        code += ") {\n";
        code += "        " + this.content + "\n";
        code += "    }\n";
        return code;
    }
}

class Annotation {
    constructor(name = "annotation") {
        this.name = name;
        this.parameters = [];
    }
    addParameter(parameter) {
        this.parameters.push(parameter);
        return this;
    }
    toString() {
        let code = "@" + this.name;
        code += this.parameters.length != 0 ? "(" : "";
        for (let i in this.parameters) {
            code += this.parameters[i].toString();
            code += i != this.parameters.length - 1 ? ", " : "";
        }
        code += this.parameters.length != 0 ? ")" : "";
        return code;
    }
}

class MethodParameter {
    constructor(name = "args", type = "String") {
        this.name = name;
        this.type = type;
    }
    toString() {
        return this.type + " " + this.name;
    }
}

class AnnotationParameter {
    constructor(name = "value", value = "", isString = true) {
        this.name = name;
        this.value = value;
        this.isString = isString;
        if (isString == null) {
            if (value instanceof Number) {
                isString = false;
            } else {
                isString = true;
            }
        }
    }
    toString() {
        return this.name + " = " + (this.isString ? "\"" + this.value + "\"" : this.value);
    }
}

class JavaSourceGen {
    
    static genJPAEntity(packageName, tableName, columns) {

        let entityAnn = new Annotation("Entity");
        let tableAnn = new Annotation("Table")
            .addParameter(new AnnotationParameter("name", tableName));
        
        let clazz = new Class(NameConverter.name2Camel(tableName), packageName)
            .addImplement("IEntity")
            .addAnnotation(tableAnn)
            .addAnnotation(entityAnn);
        
        JavaSourceGen.genFields(clazz, tableName, columns);
        JavaSourceGen.genMethods(clazz, tableName, columns);

        return clazz;
    }
    
    static genFields(clazz, tableName, columns) {
        for (let i in columns) {
            let column = columns[i];
            let field = new Field(NameConverter.name2camel(column.name), TypeConverter.pg2Java(column.datatype));
            if (column.name == "id") {
                let idAnn = new Annotation("Id");
                let sequenceGeneratorAnn = new Annotation("SequenceGenerator")
                    .addParameter(new AnnotationParameter("name", tableName.toUpperCase() + "_ID_GENERATOR"))
                    .addParameter(new AnnotationParameter("sequenceName", "SEQ_" + tableName.toUpperCase() + "_ID"))
                    .addParameter(new AnnotationParameter("allocationSize", 1));
                let generatedValueAnn = new Annotation("GeneratedValue")
                    .addParameter(new AnnotationParameter("strategy", "GenerationType.SEQUENCE", false))
                    .addParameter(new AnnotationParameter("generator", tableName.toUpperCase() + "_ID_GENERATOR"));
                field.addAnnotation(idAnn);
                field.addAnnotation(sequenceGeneratorAnn);
                field.addAnnotation(generatedValueAnn);
            } else if (column.name != "creator_id" && column.name != "modifier_id" && column.name.endsWith("id")) {
                let joinColumnAnn = new Annotation("JoinColumn")
                    .addParameter(new AnnotationParameter("name", column.name));
                let manyToOneAnn = new Annotation("ManyToOne")
                    .addParameter(new AnnotationParameter("fetch", "FetchType.LAZY", false));
                field.addAnnotation(joinColumnAnn);
                field.addAnnotation(manyToOneAnn);
            } else if (column.name.indexOf("_") != -1) {
                let columnAnn = new Annotation("Column")
                    .addParameter(new AnnotationParameter("name", column.name));
                field.addAnnotation(columnAnn);
            }
            if (column.datatype.indexOf("timestamp") != -1) {
                let temporalAnn = new Annotation("Temporal")
                    .addParameter(new AnnotationParameter("value", "TemporalType.TIMESTAMP", false));
                field.addAnnotation(temporalAnn);
            }
            clazz.addField(field);
        }
    }

    static genMethods(clazz, tableName, columns) {
        for (let i in columns) {
            let column = columns[i];
            let getMethod = new Method("get" + NameConverter.name2Camel(column.name), TypeConverter.pg2Java(column.datatype), "return this." + NameConverter.name2camel(column.name) + ";");
            let setMethod = new Method("set" + NameConverter.name2Camel(column.name), "void", "this." + NameConverter.name2camel(column.name) + " = " + NameConverter.name2camel(column.name) + ";")
                .addParameter(new MethodParameter(NameConverter.name2camel(column.name), TypeConverter.pg2Java(column.datatype)));
            clazz.addMethod(getMethod);
            clazz.addMethod(setMethod);
        }
    }
}

module.exports = {Class, Field, Method, Annotation, MethodParameter, AnnotationParameter, JavaSourceGen}
