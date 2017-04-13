
const React = require("react");
const style = require("./style");

class Content extends React.Component {
    constructor(props) {
        super(props);
        let modules = props.moduleNames.map(module => {
            return {
                name: module,
                clazz: require("../app/module/" + module + "/main")
            };
        });
        this.state = {
            modules: modules
        };
    }
    render() {
        return React.createElement(
            "div",
            { className: "tab-content" },
            this.state.modules.map((module, i) => React.createElement(ContentItem, { key: i, index: i, name: module.name, moduleClass: module.clazz }))
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