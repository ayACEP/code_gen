
const React = require("react");
const electron = require('electron');
const remote = electron.remote;
const shell = electron.shell;
const BaseReactComponent = require("../../base_react_component");
const storage = require("../../storage");
const style = require("../../style");
const {Class, Field, Method, Annotation, MethodParameter, AnnotationParameter, NameConverter} = require("../../java_source_gen");
const pg = require('pg');

class JPAEntityGen extends BaseReactComponent {

    constructor(props) {
        super(props);

        this.setDefaultState({
            templetePath: "",
            outputDir: "",
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
        pgClient.connect( (e) => {
            if (e) {
                alert(e.message);
                pgClient.end();
                return;
            }
            pgClient.query("select table_name from information_schema.tables where table_schema = 'public'", (e, result) => {
                if (e) {
                    alert(e.message);
                    pgClient.end();
                    return;
                }
                for (let i in result.rows) {
                    let tableName = result.rows[i].table_name;
                    pgClient.query("select column_name, data_type from information_schema.columns where table_schema = 'public' and table_name = $1", [tableName], (e, result) => {
                        if (e) {
                            alert(e.message);
                            pgClient.end();
                            return;
                        }
                        this.genEntity(tableName, result.rows);
                    });
                }
            });
        });
    }

    genEntity(tableName, rows) {
        for (let i in rows) {
            let row = rows[i];
            let clazz = new Class();
            clazz.name = NameConverter.tableName2Camel(tableName);
        }
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
                <div className="form-group">
                    <select id="dbSelect" className="form-control" onChange={this.onDBSelect} value={this.state.selectedId}>
                        {this.state.dbConnection != null ? this.state.dbConnection.dbRefs.map( (e, i) => 
                            <option key={e.state.id} value={e.state.id}>{e.state.name}</option> ) : []}
                    </select>
                </div>
                <div className="input-group form-group">
                    <span className="input-group-addon">templete</span>
                    <input className="form-control" name="templetePath" type="text" value={this.state.templetePath} onChange={this.onTextChange} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" onClick={this.onTempleteEditClick}>edit</button>
                        <button className="btn btn-primary" onClick={this.onTempleteFindClick}>find</button>
                    </span>
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
