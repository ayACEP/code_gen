
const React = require("react");
const BaseReactComponent = require("../../base_react_component");
const utils = require("../../utils");
const storage = require("../../storage");
const style = require("../../style");

class SQLEditor extends BaseReactComponent {

    onExecClickListeners;

    constructor(props) {
        super(props);
        
        this.onExecClickListeners = [];
        
        this.setDefaultState({
            sqlContent: ""
        });
        
        this.onExecClick = this.onExecClick.bind(this);
        this.onSQLContentChange = this.onSQLContentChange.bind(this);
    }
    
    render() {
        return <div>
            <textarea className="form-control" style={{height: "400px"}} value={this.state.sqlContent} onChange={this.onSQLContentChange} />
            <button className="btn btn-primary center-block" onClick={this.onExecClick} style={style.marginTop}>exec</button>
        </div>;
    }

    onExecClick(e) {
        for (var i in this.onExecClickListeners) {
            this.onExecClickListeners[i](this.state.sqlContent);
        }
    }

    addOnExecClickListener(l) {
        this.onExecClickListeners.push(l);
    }

    onSQLContentChange(e) {
        this.setState({
            sqlContent: e.target.value
        });
    }
}

module.exports = SQLEditor;
