const React = require("react");
const electron = require('electron');
const remote = electron.remote;
const style = require("../../style")

class Android extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputDir: "",
            outputDir: ""
        }
        this.onInputFindClick = this.onInputFindClick.bind(this);
        this.onOutputFindClick = this.onOutputFindClick.bind(this);
    }
    onInputFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select templete file", 
            defaultPath: this.state.inputDir,
            properties: ['openDirectory']});
        if (paths != null && paths.length > 0) {
            this.setState({inputDir: paths[0]});
        }
    }
    onOutputFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select templete file", 
            defaultPath: this.state.outputDir,
            properties: ['openDirectory']});
        if (paths != null && paths.length > 0) {
            this.setState({outputDir: paths[0]});
        }
    }
    onExecClick() {
        
    }
    render() {
        return <div className="row">
            <div className="col-md-12">
                <div className="input-group form-group">
                    <span className="input-group-addon">input</span>
                    <input className="form-control" type="text" value={this.state.inputDir} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.onInputFindClick}>find</button>
                    </span>
                </div>
                <div className="input-group">
                    <span className="input-group-addon">output</span>
                    <input className="form-control" type="text" value={this.state.outputDir} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.onOutputFindClick}>find</button>
                    </span>
                </div>
                <table className="table table-striped" style={style.marginTop}>
                    <thead>
                        <tr>
                            <th>1</th>
                            <th>1</th>
                            <th>1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>222</td>
                            <td>222</td>
                            <td>222</td>
                        </tr>
                        <tr>
                            <td>222</td>
                            <td>222</td>
                            <td>222</td>
                        </tr>
                        <tr>
                            <td>222</td>
                            <td>222</td>
                            <td>222</td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-primary center-block" onClick={this.onExecClick} style={style.marginTop}>exec</button>
            </div>
        </div>;
    }
}

module.exports = Android;
