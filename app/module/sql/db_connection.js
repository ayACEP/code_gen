const React = require("react");

class DBConnection extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                "DBConnection"
            ),
            React.createElement(
                "div",
                { className: "panel-body" },
                React.createElement(
                    "div",
                    { className: "input-group form-group" },
                    React.createElement(
                        "span",
                        { className: "input-group-addon" },
                        "url"
                    ),
                    React.createElement("input", { className: "form-control", type: "text" })
                ),
                React.createElement(
                    "div",
                    { className: "input-group form-group" },
                    React.createElement(
                        "span",
                        { className: "input-group-addon" },
                        "username"
                    ),
                    React.createElement("input", { className: "form-control", type: "text" })
                ),
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement(
                        "span",
                        { className: "input-group-addon" },
                        "password"
                    ),
                    React.createElement("input", { className: "form-control", type: "text" })
                )
            )
        );
    }
}

module.exports = DBConnection;