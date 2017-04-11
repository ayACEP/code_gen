const React = require("react");
const style = require("../../style");
const electron = require('electron');
const remote = electron.remote;
const shell = electron.shell;

class JPAEntityGen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templetePath: "",
            outputDir: ""
        };
        this.onTempleteFindClick = this.onTempleteFindClick.bind(this);
        this.onTempleteEditClick = this.onTempleteEditClick.bind(this);
        this.onOutputFindClick = this.onOutputFindClick.bind(this);
    }
    onTempleteFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select templete file", 
            defaultPath: this.state.templetePath,
            properties: ['openFile']});
        if (paths != null && paths.length > 0) {
            this.setState({templetePath: paths[0]});
        }
    }
    onTempleteEditClick() {
        shell.openItem(this.state.templetePath);
    }
    onOutputFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select output directory", 
            defaultPath: this.state.outputDir,
            properties: ['openDirectory']});
        if (paths != null && paths.length > 0) {
            this.setState({outputDir: paths[0]});
        }
    }
    render() {
        return <div className="panel panel-default">
            <div className="panel-heading">
                <label style={style.panelHeadLabel}>
                    <input type="checkbox"/>
                    &nbsp;JPAEntityGen
                </label>
            </div>
            <div className="panel-body">
                <div className="input-group form-group">
                    <span className="input-group-addon">templete</span>
                    <input className="form-control" type="text" value={this.state.templetePath} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.onTempleteEditClick}>edit</button>
                        <button className="btn btn-primary" onClick={this.onTempleteFindClick}>find</button>
                    </span>
                </div>
                <div className="input-group">
                    <span className="input-group-addon">output</span>
                    <input className="form-control" type="text" value={this.state.outputDir} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.onOutputFindClick}>find</button>
                    </span>
                </div>
            </div>
        </div>;
    }
}

module.exports = JPAEntityGen;
