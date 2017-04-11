const React = require("react");
const style = require("./style");

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modules: null };
    }
    componentWillReceiveProps(props) {
        if (this.state.modules == null) {
            let modules = props.modules.map(module => require("../app/module/" + module + "/main"));
            this.setState({ modules: modules });
        }
    }
    render() {
        return React.createElement(
            "div",
            { className: "tab-content" },
            this.props.modules.map((module, i) => React.createElement(ContentItem, { key: i, index: i, name: module, module: this.state.modules[i] }))
        );
    }
}

class ContentItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(
            "div",
            { role: "tabpanel", className: "tab-pane container-fluid " + (this.props.index == 0 ? "active" : ""), id: this.props.name, style: style.marginTop },
            React.createElement(this.props.module, null)
        );
    }
}

module.exports = Content;