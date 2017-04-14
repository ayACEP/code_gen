const React = require("react");
const ReactDOM = require("react-dom");
const BaseReactComponent = require("../../base_react_component");
const style = require("../../style");

const marginLeft = {marginLeft: "12px"}

class DBConnection extends BaseReactComponent {

    constructor(props) {
        super(props);
        
        this.setDefaultState({
            DBs: [],
            autoIncrease: 0
        });
        
        this.onAddClick = this.onAddClick.bind(this);
        this.onChildRemoveClick = this.onChildRemoveClick.bind(this);
    }

    render() {
        return <div className="panel panel-default">
            <div className="panel-heading">
                <span>DBConnection</span>
                <button className="btn btn-primary" style={marginLeft} onClick={this.onAddClick}>add</button>
            </div>
            <div className="panel-body">
                {this.state.DBs.map( (db) => <DB key={db.id} id={db.id} parent={this} onChildRemoveClick={this.onChildRemoveClick} /> )}
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

    onChildRemoveClick(e, parent, child) {
        let newDBs = parent.state.DBs;
        let r = newDBs.find( db => {
            if (db.id == child.props.id) {
                return true;
            }
            return false;
        });
        newDBs.splice(newDBs.indexOf(r), 1);
        parent.setState({
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
            password: ""
        });

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.onInputTextChange = this.onInputTextChange.bind(this);
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
                    <input name="password" className="form-control" type="text" value={this.state.password} onChange={this.onInputTextChange} />
                </div>
            </div>
            <div className="panel-footer">
                <button className="btn btn-primary" onClick={this.onRemoveClick}>remove</button>
            </div>
        </div>;
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
        this.props.onChildRemoveClick(e, this.props.parent, this);
    }
}

module.exports = DBConnection;
