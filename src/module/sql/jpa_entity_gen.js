
const React = require("react");
const electron = require('electron');
const remote = electron.remote;
const shell = electron.shell;
const BaseReactComponent = require("../../base_react_component");
const storage = require("../../storage");
const style = require("../../style");

const pg = require('pg');
const pgClient = new pg.Client("postgres://developer:bekind5432@localhost:5432/bekind_dev");

class JPAEntityGen extends BaseReactComponent {

    constructor(props) {
        super(props);

        this.setDefaultState({
            templetePath: "",
            outputDir: "",
            isGenJPAEntity: true
        });

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onTempleteFindClick = this.onTempleteFindClick.bind(this);
        this.onTempleteEditClick = this.onTempleteEditClick.bind(this);
        this.onOutputFindClick = this.onOutputFindClick.bind(this);
    }

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked
        });
    }

    onTempleteFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select templete file", 
            defaultPath: this.state.templetePath,
            properties: ['openFile']});
        if (paths != null && paths.length > 0) {
            this.setState({
                templetePath: paths[0]
            });
        }
    }

    onTempleteEditClick() {
        if (this.state.templetePath != "") {
            shell.openItem(this.state.templetePath);
        }
    }

    onOutputFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select output directory", 
            defaultPath: this.state.outputDir,
            properties: ['openDirectory']});
        if (paths != null && paths.length > 0) {
            this.setState({
                outputDir: paths[0]
            });
        }
    }

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    render() {
        return <div className="panel panel-default">
            <div className="panel-heading">
                <label style={style.panelHeadLabel}>
                    <input type="checkbox" name="isGenJPAEntity" type="checkbox" onChange={this.onCheckboxChange} checked={this.state.isGenJPAEntity} />
                    <span>&nbsp;JPAEntityGen</span>
                </label>
            </div>
            <div className="panel-body">
                <div className="input-group form-group">
                    <span className="input-group-addon">templete</span>
                    <input className="form-control" name="templetePath" type="text" value={this.state.templetePath} onChange={this.onTextChange} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.onTempleteEditClick}>edit</button>
                        <button className="btn btn-primary" onClick={this.onTempleteFindClick}>find</button>
                    </span>
                </div>
                <div className="input-group">
                    <span className="input-group-addon">output</span>
                    <input className="form-control" name="outputDir" type="text" value={this.state.outputDir} onChange={this.onTextChange} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.onOutputFindClick}>find</button>
                    </span>
                </div>
            </div>
        </div>;
    }
}

module.exports = JPAEntityGen;
