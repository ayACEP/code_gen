
const React = require("react");
const {remote, shell} = require('electron');
const pg = require('pg');
const BaseReactComponent = require("../../base_react_component");
const storage = require("../../storage");
const style = require("../../style");
const {JavaSourceGen} = require("../../java_source_gen");

class JPAEntityGen extends BaseReactComponent {

    constructor(props) {
        super(props);

        this.setDefaultState({
            templetePath: "",
            outputDir: "",
            packageName: "",
            isGenJPAEntity: true,
            dbConnection: null,
            selectedId: null
        });

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onTempleteFindClick = this.onTempleteFindClick.bind(this);
        this.onTempleteEditClick = this.onTempleteEditClick.bind(this);
        this.onOutputFindClick = this.onOutputFindClick.bind(this);
        this.onGenClick = this.onGenClick.bind(this);
        this.onDBSelect = this.onDBSelect.bind(this);
    }

    onSaveState() {
        delete this.state.dbConnection;
        super.onSaveState();
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

    onDBSelect(e) {
        this.setState({
            selectedId: e.target[e.target.selectedIndex].value
        });
    }

    onGenClick(e) {
        let db = this.state.dbConnection.dbRefs.find( (e) => {
            if (e.state.id == this.state.selectedId) {
                return e;
            }
            return null;
        });
        let pgClient = new pg.Client("postgres://" + db.state.username + ":" + db.state.password + "@" + db.state.url);
        
        function pgError(e, pgClient) {
            if (e) {
                alert(e.message);
                pgClient.end();
                return true;
            }
            return false;
        }

        pgClient.connect( (e) => {
            if (pgError(e, pgClient)) {
                return;
            }
            pgClient.query("select table_name from information_schema.tables where table_schema = 'public'", (e, result) => {
                if (pgError(e, pgClient)) {
                    return;
                }
                for (let i in result.rows) {
                    let tableName = result.rows[i].table_name;
                    pgClient.query("select column_name as name, data_type as dataType from information_schema.columns where table_schema = 'public' and table_name = $1", [tableName], (e, result) => {
                        if (pgError(e, pgClient)) {
                            return;
                        }
                        let clazz = JavaSourceGen.genJPAEntity(this.state.packageName, tableName, result.rows);
                        let code = clazz.toString();
                        code.toString();
                    });
                }
            });
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
                    <span className="input-group-addon">targetDB</span>
                    <select id="dbSelect" className="form-control" onChange={this.onDBSelect} value={this.state.selectedId}>
                        {this.state.dbConnection != null ? this.state.dbConnection.dbRefs.map( (e, i) => 
                            <option key={e.state.id} value={e.state.id}>{e.state.name}</option> ) : []}
                    </select>
                </div>
                <div className="input-group form-group">
                    <span className="input-group-addon">packageName</span>
                    <input className="form-control" name="packageName" type="text" value={this.state.packageName} onChange={this.onTextChange} />
                </div>
                <div className="input-group form-group">
                    <span className="input-group-addon">output</span>
                    <input className="form-control" name="outputDir" type="text" value={this.state.outputDir} onChange={this.onTextChange} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.onOutputFindClick}>find</button>
                    </span>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={this.onGenClick}>gen</button>
                </div>
            </div>
        </div>
    }
}

module.exports = JPAEntityGen;
