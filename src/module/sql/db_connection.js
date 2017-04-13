const React = require("react");
const ReactDOM = require("react-dom");
const style = require("../../style");

const marginLeft = {marginLeft: "12px"}

class DBConnection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            targetDBViews: [],
            autoIncrease: 0
        };
        this.onAddClick = this.onAddClick.bind(this);
        this.onChildRemoveClick = this.onChildRemoveClick.bind(this);
    }
    onAddClick(e) {
        let newTargetDBViews = this.state.targetDBViews;
        let key = this.state.autoIncrease + 1;
        newTargetDBViews.push(<DB key={key} id={key} parent={this} onChildRemoveClick={this.onChildRemoveClick} />);
        this.setState({
            targetDBViews: newTargetDBViews,
            autoIncrease: this.state.autoIncrease + 1
        });
    }
    onChildRemoveClick(e, child) {
        let newTargetDBViews = this.state.targetDBViews;
        let r = newTargetDBViews.find( value => {
            if (value.props.id == child.props.id) {
                return true;
            }
            return false;
        });
        newTargetDBViews.splice(newTargetDBViews.indexOf(r), 1);
        this.setState({
            targetDBViews: newTargetDBViews
        });
    }
    render() {
        return <div className="panel panel-default">
            <div className="panel-heading">
                <span>DBConnection</span>
                <button className="btn btn-primary" style={marginLeft} onClick={this.onAddClick}>add</button>
            </div>
            <div className="panel-body">
                {this.state.targetDBViews}
            </div>
        </div>;
    }
}

class DB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGen: true, 
            name: ""
        }
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
    }
    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked
        });
    }
    onRemoveClick(e) {
        this.props.onChildRemoveClick(e, this);
    }
    onNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    render() {
        return <div className="panel panel-default">
            <div className="panel-heading">
                <div className="input-group">
                    <label className="input-group-addon">
                        <input name="isGen" type="checkbox" onChange={this.onCheckboxChange} checked={this.state.isGen} />
                        <span>&nbsp;name</span>
                    </label>
                    <input className="form-control" type="text" value={this.state.name} onChange={this.onNameChange} />
                </div>
            </div>
            <div className="panel-body">
                <div className="input-group form-group">
                    <span className="input-group-addon">url</span>
                    <input className="form-control" type="text"></input>
                </div>
                <div className="input-group form-group">
                    <span className="input-group-addon">username</span>
                    <input className="form-control" type="text"></input>
                </div>
                <div className="input-group">
                    <span className="input-group-addon">password</span>
                    <input className="form-control" type="text"></input>
                </div>
            </div>
            <div className="panel-footer">
                <button className="btn btn-primary" onClick={this.onRemoveClick}>remove</button>
            </div>
        </div>;
    }
}

module.exports = DBConnection;
