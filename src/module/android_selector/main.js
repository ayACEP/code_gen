
const React = require("react");
const {remote, shell} = require('electron');
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
                <div className="input-group">
                    <span className="input-group-addon">output</span>
                    <input name="outputDir" className="form-control" type="text" value={this.state.outputDir} onChange={this.onEditTextChange} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.onOutputOpenClick}>open</button>
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

    onInputFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select templete file", 
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
            title: "select templete file", 
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

    onExecClick() {
        
    }
}

module.exports = AndroidSelector;
