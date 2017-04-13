const React = require("react");
const ReactDOM = require("react-dom");
const style = require("../../style");

const marginLeft = { marginLeft: "12px" };

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
        newTargetDBViews.push(React.createElement(DB, { key: key, id: key, parent: this, onChildRemoveClick: this.onChildRemoveClick }));
        this.setState({
            targetDBViews: newTargetDBViews,
            autoIncrease: this.state.autoIncrease + 1
        });
    }
    onChildRemoveClick(e, child) {
        let newTargetDBViews = this.state.targetDBViews;
        let r = newTargetDBViews.find(value => {
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
        return React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement(
                    "span",
                    null,
                    "DBConnection"
                ),
                React.createElement(
                    "button",
                    { className: "btn btn-primary", style: marginLeft, onClick: this.onAddClick },
                    "add"
                )
            ),
            React.createElement(
                "div",
                { className: "panel-body" },
                this.state.targetDBViews
            )
        );
    }
}

class DB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGen: true,
            name: ""
        };
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
        return React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement(
                        "label",
                        { className: "input-group-addon" },
                        React.createElement("input", { name: "isGen", type: "checkbox", onChange: this.onCheckboxChange, checked: this.state.isGen }),
                        React.createElement(
                            "span",
                            null,
                            "\xA0name"
                        )
                    ),
                    React.createElement("input", { className: "form-control", type: "text", value: this.state.name, onChange: this.onNameChange })
                )
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
            ),
            React.createElement(
                "div",
                { className: "panel-footer" },
                React.createElement(
                    "button",
                    { className: "btn btn-primary", onClick: this.onRemoveClick },
                    "remove"
                )
            )
        );
    }
}

module.exports = DBConnection;