const React = require("react");
const style = require("../../style");
const electron = require('electron');
const remote = electron.remote;
const shell = electron.shell;

class JPAEntityGen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templetePath: "",
            outputDir: ""
        };
        this.onTempleteFindClick = this.onTempleteFindClick.bind(this);
        this.onTempleteEditClick = this.onTempleteEditClick.bind(this);
        this.onOutputFindClick = this.onOutputFindClick.bind(this);
    }
    onTempleteFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select templete file",
            defaultPath: this.state.templetePath,
            properties: ['openFile'] });
        if (paths != null && paths.length > 0) {
            this.setState({ templetePath: paths[0] });
        }
    }
    onTempleteEditClick() {
        shell.openItem(this.state.templetePath);
    }
    onOutputFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select output directory",
            defaultPath: this.state.outputDir,
            properties: ['openDirectory'] });
        if (paths != null && paths.length > 0) {
            this.setState({ outputDir: paths[0] });
        }
    }
    render() {
        return React.createElement(
            "div",
            { className: "panel panel-default" },
            React.createElement(
                "div",
                { className: "panel-heading" },
                React.createElement(
                    "label",
                    { style: style.panelHeadLabel },
                    React.createElement("input", { type: "checkbox" }),
                    "\xA0JPAEntityGen"
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
                        "templete"
                    ),
                    React.createElement("input", { className: "form-control", type: "text", value: this.state.templetePath }),
                    React.createElement(
                        "span",
                        { className: "input-group-btn" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: this.onTempleteEditClick },
                            "edit"
                        ),
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: this.onTempleteFindClick },
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
                    React.createElement("input", { className: "form-control", type: "text", value: this.state.outputDir }),
                    React.createElement(
                        "span",
                        { className: "input-group-btn" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: this.onOutputFindClick },
                            "find"
                        )
                    )
                )
            )
        );
    }
}

module.exports = JPAEntityGen;