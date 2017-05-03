
const React = require("react");
const {remote, shell} = require('electron');
const fs = require("fs");
const xmlbuilder = require('xmlbuilder');
const BaseReactComponent = require("../../base_react_component");
const style = require("../../style")

class AndroidSelector extends BaseReactComponent {

    static get name() {
        return "AndroidSelector";
    }

    constructor(props) {
        super(props);

        this.setDefaultState({
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
        let map = new Map();
        for (let i in files) {
            let file = files[i];
            let index = file.lastIndexOf("normal", file.lastIndexOf(".") - 6);
            if (index != -1) {
                map.set(file.substr(0, index - 1), new Array());
            }
        }
        for (let i in files) {
            let file = files[i];
            map.forEach( (value, key) => {
                if (file.indexOf(key) != -1) {
                    map.get(key).push(file);
                }
            });
        }

        map.forEach( (value, key) => {
            let selector = xmlbuilder.create('selector');
            selector.att("xmlns:android", "http://schemas.android.com/apk/res/android");
            value.forEach(e => {
                let index = e.lastIndexOf(".");
                if (e.lastIndexOf("normal", index - 6) != -1) {
                    let item = selector.ele("item");
                    item.att("android:drawable", "@drawable/" + key + "_normal");
                }
                if (e.lastIndexOf("pressed", index - 7) != -1) {
                    let item = selector.ele("item");
                    item.att("android:state_pressed", "true");
                    item.att("android:drawable", "@drawable/" + key + "_pressed");
                }
                if (e.lastIndexOf("checked", index - 7) != -1) {
                    let item = selector.ele("item");
                    item.att("android:state_checked", "true");
                    item.att("android:drawable", "@drawable/" + key + "_checked");
                }
                if (e.lastIndexOf("disabled", index - 8) != -1) {
                    let item = selector.ele("item");
                    item.att("android:state_checked", "true");
                    item.att("android:drawable", "@drawable/" + key + "_disabled");
                }
            });
            selector.end({pretty: true})
            fs.writeFile(this.state.outputDir + "/" + key + ".xml", '<?xml version="1.0" encoding="utf-8"?>\n' + selector.toString());
        });
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

module.exports = AndroidSelector;
