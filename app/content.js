
const React = require("react");
const BaseReactComponent = require("./base_react_component");
const style = require("./style");

class Content extends BaseReactComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "div",
            { className: "tab-content" },
            this.props.modules.map((module, i) => React.createElement(ContentItem, { key: i, index: i, name: module.name, moduleClass: module.class }))
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
            React.createElement(this.props.moduleClass, null)
        );
    }
}

module.exports = Content;