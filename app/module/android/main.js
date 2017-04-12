const React = require("react");
const electron = require('electron');
const remote = electron.remote;
const style = require("../../style");

class Android extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputDir: "",
            outputDir: ""
        };
        this.onInputFindClick = this.onInputFindClick.bind(this);
        this.onOutputFindClick = this.onOutputFindClick.bind(this);
    }
    onInputFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select templete file",
            defaultPath: this.state.inputDir,
            properties: ['openDirectory'] });
        if (paths != null && paths.length > 0) {
            this.setState({ inputDir: paths[0] });
        }
    }
    onOutputFindClick() {
        let paths = remote.dialog.showOpenDialog({
            title: "select templete file",
            defaultPath: this.state.outputDir,
            properties: ['openDirectory'] });
        if (paths != null && paths.length > 0) {
            this.setState({ outputDir: paths[0] });
        }
    }
    onExecClick() {}
    render() {
        return React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "div",
                { className: "col-md-12" },
                React.createElement(
                    "div",
                    { className: "input-group form-group" },
                    React.createElement(
                        "span",
                        { className: "input-group-addon" },
                        "input"
                    ),
                    React.createElement("input", { className: "form-control", type: "text", value: this.state.inputDir }),
                    React.createElement(
                        "span",
                        { className: "input-group-btn" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: this.onInputFindClick },
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
                ),
                React.createElement(
                    "table",
                    { className: "table table-striped", style: style.marginTop },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "1"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "1"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "1"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                null,
                                "222"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "222"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "222"
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                null,
                                "222"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "222"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "222"
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                null,
                                "222"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "222"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "222"
                            )
                        )
                    )
                ),
                React.createElement(
                    "button",
                    { className: "btn btn-primary center-block", onClick: this.onExecClick, style: style.marginTop },
                    "exec"
                )
            )
        );
    }
}

module.exports = Android;