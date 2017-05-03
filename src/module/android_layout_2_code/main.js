
const React = require("react");
const {remote, shell} = require('electron');
const fs = require("fs");
const xml2js = require("xml2js");
const sax = require("sax");
const {Field, Annotation, AnnotationParameter, JavaSourceGen} = require("../../java_source_gen");
const {NameConverter} = require("../../utils");
const BaseReactComponent = require("../../base_react_component");
const style = require("../../style")

class AndroidLayout2Code extends BaseReactComponent {
    
    static get name() {
        return "AndroidLayout2Code";
    }

    constructor(props) {
        super(props);

        this.setDefaultState({
            packageName: "",
            inputDir: "",
            outputDir: ""
        });

        this.onBtnExecClick = this.onBtnExecClick.bind(this);
        this.onInputFindClick = this.onInputFindClick.bind(this);
        this.onInputOpenClick = this.onInputOpenClick.bind(this);
        this.onOutputFindClick = this.onOutputFindClick.bind(this);
        this.onOutputOpenClick = this.onOutputOpenClick.bind(this);
        this.onEditTextChange = this.onEditTextChange.bind(this);
    }

    render() {
        return <div className="row">
            <div className="col-md-12">
                <div className="input-group form-group">
                    <span className="input-group-addon">packageName</span>
                    <input name="packageName" className="form-control" type="text" value={this.state.packageName} onChange={this.onEditTextChange} />
                </div>
                <div className="input-group form-group">
                    <span className="input-group-addon">input</span>
                    <input name="inputDir" className="form-control" type="text" value={this.state.inputDir} onChange={this.onEditTextChange} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.onInputOpenClick}>open</button>
                        <button className="btn btn-primary" onClick={this.onInputFindClick}>find</button>
                    </span>
                </div>
                <div className="input-group form-group">
                    <span className="input-group-addon">output</span>
                    <input name="outputDir" className="form-control" type="text" value={this.state.outputDir} onChange={this.onEditTextChange} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.onOutputOpenClick}>open</button>
                        <button className="btn btn-primary" onClick={this.onOutputFindClick}>find</button>
                    </span>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary form-control" onClick={this.onBtnExecClick}>exec</button>
                </div>
            </div>
        </div>;
    }

    onBtnExecClick() {
        let files = fs.readdirSync(this.state.inputDir);
        let parser = new DOMParser();
        
        files.forEach(file => {
            if (file.endsWith(".xml")) {
                let xmlString = fs.readFileSync(this.state.inputDir + "/" + file, "utf-8");
                let root = parser.parseFromString(xmlString, "application/xml");
                this.fields = [];// member
                this.findElementWithId(root.children);
                let clazz = JavaSourceGen.genAndroidActivity(this.state.packageName, file, this.fields);
                fs.writeFileSync(this.state.outputDir + "/" + clazz.name + ".java", clazz.toString());
            }
        });
    }

    findElementWithId(elements) {
        for (let i = 0; i < elements.length; i++) {
            let idAttr = elements[i].attributes.getNamedItem("android:id");
            if (idAttr != null) {
                let annValue = idAttr.value.substr(idAttr.value.indexOf("/") + 1);
                let annValuecamel = NameConverter.name2camel(annValue);
                let field = new Field(annValuecamel, idAttr.ownerElement.nodeName, "");
                let ann = new Annotation("BindView");
                ann.addParameter(new AnnotationParameter("value", "R.id." + annValue, false));
                field.addAnnotation(ann);
                this.fields.push(field);
            }
            this.findElementWithId(elements[i].children);
        }
    }

    onInputFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select input dir", 
            defaultPath: this.state.inputDir,
            properties: ['openDirectory']});
        if (paths != null && paths.length > 0) {
            this.setState({inputDir: paths[0]});
        }
    }

    onInputOpenClick() {
        if (this.state.inputDir != "") {
            shell.openItem(this.state.inputDir);
        }
    }

    onOutputFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select output dir", 
            defaultPath: this.state.outputDir,
            properties: ['openDirectory']});
        if (paths != null && paths.length > 0) {
            this.setState({outputDir: paths[0]});
        }
    }

    onOutputOpenClick() {
        if (this.state.outputDir != "") {
            shell.openItem(this.state.outputDir);
        }
    }

    onEditTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
}

module.exports = AndroidLayout2Code;
