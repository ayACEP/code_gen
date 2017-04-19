
class Class {
    constructor() {
        this.name = "clazz";
        this.fields = [];
        this.methods = [];
    }
    addField(filed) {
        fileds.find(e => {
            if (e.filedName == fieldName) {
                return e;
            }
            return null;
        });
        fileds.push();
    }
}

class Field {
    constructor() {
        this.access = "private";
        this.type = "String";
        this.name = "field";
        this.annotations = [];
    }
}

class Method {
    constructor() {
        this.access = "public";
        this.retrunType = "void";
        this.name = "method";
        this.parameter = [];
        this.content = "";
    }
}

class Annotation {
    constructor() {
        this.name = "annotation";
        this.parameter = [];
    }
}

class MethodParameter {
    constructor() {
        this.name = "arg";
        this.type = "String";
    }
}

class AnnotationParameter {
    constructor() {
        this.name = "value";
        this.value = "";
    }
}

class NameConverter {
    constructor() {
    }
    static tableName2Camel(tableName) {
        let words = tableName.split("_");
        words = words.slice(1, words.length);
        return NameConverter.words2Camel(words);
    }
    static words2Camel(words) {
        let result = "";
        for (let i in words) {
            if (words[i].length == 0) {
                continue;
            }
            let head = words[i].charAt(0).toUpperCase();
            result += head + words[i].substr(1);
        }
        return result;
    }
    static words2camel(words) {
        for (let i in words) {
            if (words[i].length == 0) {
                continue;
            }
            if (i == 0) {
                let head = words[i].charAt(0).toLowerCase();
                words[i] = head + words[i].substr(1);
            } else {
                let head = words[i].charAt(0).toUpperCase();
                words[i] = head + words[i].substr(1);
            }
        }
    }
}

module.exports = {Class, Field, Method, Annotation, MethodParameter, AnnotationParameter, NameConverter}
