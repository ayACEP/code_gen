const React = require("react");

class JPAEntityGen extends React.Component {
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
                "JPAEntityGen"
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
                        "templete"
                    ),
                    React.createElement("input", { className: "form-control", type: "text" }),
                    React.createElement(
                        "span",
                        { className: "input-group-btn" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary" },
                            "find"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement(
                        "span",
                        { className: "input-group-addon" },
                        "output"
                    ),
                    React.createElement("input", { className: "form-control", type: "text" }),
                    React.createElement(
                        "span",
                        { className: "input-group-btn" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary" },
                            "find"
                        )
                    )
                )
            )
        );
    }
}

module.exports = JPAEntityGen;