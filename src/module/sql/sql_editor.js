const React = require("react");

class SQLEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const divStyle = {
            height: "400px"
        };
        return <div>
            <textarea className="form-control" style={divStyle}></textarea>
            <button className="btn btn-primary center-block">exec</button>
        </div>;
    }
}

module.exports = SQLEditor;
