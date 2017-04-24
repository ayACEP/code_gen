
const React = require("react");
const ReactDOM = require("react-dom");
const BaseReactComponent = require("../../base_react_component");
const style = require("../../style");
const pg = require('pg');

class DBConnection extends BaseReactComponent {

    constructor(props) {
        super(props);

        this.dbRefs = [];
        
        this.setDefaultState({
            DBs: [],
            autoIncrease: 0
        });
        
        this.onAddClick = this.onAddClick.bind(this);
        this.onChildRemoveClick = this.onChildRemoveClick.bind(this);
    }

    render() {
        this.dbRefs = new Array(this.state.DBs.length);
        return <div className="panel panel-default">
            <div className="panel-heading">
                <span>DBConnection</span>
                <button className="btn btn-primary" style={{marginLeft: "15px"}} onClick={this.onAddClick}>add</button>
            </div>
            <div className="panel-body">
                {this.state.DBs.map( (db, i) => <DB key={db.id} id={db.id} ref={ (ref) => this.dbRefs[i] = ref } onChildRemoveClick={this.onChildRemoveClick} sqlMain={this.props.sqlMain} /> )}
            </div>
        </div>;
    }

    onAddClick(e) {
        let newDBs = this.state.DBs;
        let id = this.state.autoIncrease + 1;
        let DB = {
            id: id
        };
        newDBs.push(DB);
        this.setState({
            DBs: newDBs,
            autoIncrease: id
        });
    }

    onChildRemoveClick(e, id) {
        let newDBs = this.state.DBs;
        let r = newDBs.find( db => {
            if (db.id == id) {
                return true;
            }
            return false;
        });
        newDBs.splice(newDBs.indexOf(r), 1);
        this.setState({
            DBs: newDBs
        });
    }
}

class DB extends BaseReactComponent {

    constructor(props) {
        super(props);

        // set this id for save state
        this.id = props.id;

        this.setDefaultState({
            id: props.id,
            isGen: true,
            name: "",
            url: "",
            username: "",
            password: "",
            errorText: "",
            infoText: ""
        });

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.onInputTextChange = this.onInputTextChange.bind(this);
        this.onTestConnectionClick = this.onTestConnectionClick.bind(this);
        this.onExecClick = this.onExecClick.bind(this);
    }
    
    render() {
        return <div className="panel panel-default">
            <div className="panel-heading">
                <div className="input-group">
                    <label className="input-group-addon">
                        <input name="isGen" type="checkbox" checked={this.state.isGen} onChange={this.onCheckboxChange} />
                        <span>&nbsp;name</span>
                    </label>
                    <input name="name" className="form-control" type="text" value={this.state.name} onChange={this.onInputTextChange} />
                </div>
            </div>
            <div className="panel-body">
                <div className="input-group form-group">
                    <span className="input-group-addon">url</span>
                    <input name="url" className="form-control" type="text" value={this.state.url} onChange={this.onInputTextChange} />
                </div>
                <div className="input-group form-group">
                    <span className="input-group-addon">username</span>
                    <input name="username" className="form-control" type="text" value={this.state.username} onChange={this.onInputTextChange} />
                </div>
                <div className="input-group">
                    <span className="input-group-addon">password</span>
                    <input name="password" className="form-control" type="password" value={this.state.password} onChange={this.onInputTextChange} />
                </div>
            </div>
            <div className="panel-footer">
                <button className="btn btn-primary" onClick={this.onTestConnectionClick}>testConnection</button>
                <button className="btn btn-primary" onClick={this.onRemoveClick} style={{marginLeft: "15px", float: "right"}}>remove</button>
                <span className="text-danger" style={{marginLeft: "15px"}}>{this.state.errorText}</span>
                <span className="text-success">{this.state.infoText}</span>
            </div>
        </div>;
    }
    
    onSaveState(copyedState) {
        delete copyedState.errorText;
        delete copyedState.infoText;
        super.onSaveState(copyedState);
    }

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked
        });
    }

    onInputTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onRemoveClick(e) {
        this.props.onChildRemoveClick(e, this.props.id);
    }

    onTestConnectionClick(e) {
        let pgClient = new pg.Client("postgres://" + this.state.username + ":" + this.state.password + "@" + this.state.url);
        pgClient.connect( (e) => {
            if (!e) {
                this.setInfoText("test success");
            } else {
                this.setErrorText(e.message);
            }
            pgClient.end();
        });
    }

    onExecClick(sqlContent) {
        if (!this.state.isGen) {
            return;
        }
        let pgClient = new pg.Client("postgres://" + this.state.username + ":" + this.state.password + "@" + this.state.url);
        pgClient.connect( (e) => {
            if (e) {
                this.setErrorText(e.message);
                pgClient.end();
                return;
            }
            pgClient.query(sqlContent, (e, result) => {
                if (e) {
                    this.setErrorText(e.message);
                } else {
                    this.setInfoText(result.rowCount + " rows changed");
                }
                pgClient.end();
            })
        });
    }

    setInfoText(text) {
        this.setState({
            infoText: text,
            errorText: ""
        });
    }

    setErrorText(text) {
        this.setState({
            infoText: "",
            errorText: text
        });
    }
}

module.exports = DBConnection;
