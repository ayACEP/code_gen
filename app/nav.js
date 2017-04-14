
const React = require("react");
const BaseReactComponent = require("./base_react_component");
const Style = require("./style");

class Nav extends BaseReactComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "nav",
            { style: Style.marginTop },
            React.createElement(
                "ul",
                { className: "nav nav-tabs nav-justified" },
                this.props.modules.map((module, i) => React.createElement(NavItem, { key: i, index: i, name: module.name, viewClass: module.class }))
            )
        );
    }
};

class NavItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement(
            "li",
            { role: "presentation" },
            React.createElement(
                "a",
                { href: "#" + this.props.name, "aria-controls": this.props.name, role: "tab", "data-toggle": "tab" },
                this.props.viewClass.name
            )
        );
    }
}

module.exports = Nav;