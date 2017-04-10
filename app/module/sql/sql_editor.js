const React = require("react");

class SQLEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const divStyle = {
            height: "400px"
        };
        return React.createElement(
            "div",
            null,
            React.createElement("textarea", { className: "form-control", style: divStyle }),
            React.createElement(
                "button",
                { className: "btn btn-primary center-block" },
                "exec"
            )
        );
    }
}

module.exports = SQLEditor;