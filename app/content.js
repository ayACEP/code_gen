const React = require("react");

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = { modules: [] };
    }
    componentDidMount() {}
    render() {
        return React.createElement(
            "div",
            { className: "tab-content" },
            this.props.modules.map((module, i) => React.createElement(ContentItem, { key: i, index: i, name: module, module: require("../app/module/" + module + "/main") }))
        );
    }
}

class ContentItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.module);
        return React.createElement(
            "div",
            { role: "tabpanel", className: this.props.index == 0 ? "tab-pane active" : "tab-pane", id: this.props.name },
            React.createElement(this.props.module, null)
        );
    }
}

module.exports = Content;