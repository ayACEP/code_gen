
const React = require("react");
const BaseReactComponent = require("../../base_react_component");
const style = require("../../style");

class SQLEditor extends BaseReactComponent {
    static get STORAGE_SQL_CONTENT() {
        return "SQLEditor.state.sqlContent";
    }
    constructor(props) {
        super(props);
        let sqlContent = localStorage.getItem(SQLEditor.STORAGE_SQL_CONTENT);
        this.state = {
            sqlContent: sqlContent != null ? sqlContent : ""
        }
        this.onExecClick = this.onExecClick.bind(this);
        this.onSQLContentChange = this.onSQLContentChange.bind(this);
    }
    onSaveState() {
        localStorage.setItem(SQLEditor.STORAGE_SQL_CONTENT, this.state.sqlContent);
    }
    onExecClick(e) {

    }
    onSQLContentChange(e) {
        this.setState({
            sqlContent: e.target.value
        });
    }
    render() {
        return <div>
            <textarea className="form-control" style={{height: "400px"}} value={this.state.sqlContent} onChange={this.onSQLContentChange} />
            <button className="btn btn-primary center-block" onClick={this.onExecClick} style={style.marginTop}>exec</button>
        </div>;
    }
}

module.exports = SQLEditor;
