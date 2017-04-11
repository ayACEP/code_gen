const React = require("react");
const style = require("../../style");

class SQLEditor extends React.Component {
    constructor(props) {
        super(props);
        this.onExecClick = this.onExecClick.bind(this);
    }
    onExecClick(e) {
        
    }
    render() {
        return <div>
            <textarea className="form-control" style={{height: "400px"}}></textarea>
            <button className="btn btn-primary center-block" onClick={this.onExecClick} style={style.marginTop}>exec</button>
        </div>;
    }
}

module.exports = SQLEditor;
