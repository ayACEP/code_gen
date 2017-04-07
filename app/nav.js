const React = require("react");

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(
            "nav",
            null,
            React.createElement(
                "ul",
                { className: "nav nav-tabs nav-justified" },
                this.props.modules.map((module, i) => React.createElement(NavItem, { key: i, index: i, name: module }))
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
            { className: this.props.index == 0 ? "active" : "", role: "presentation" },
            React.createElement(
                "a",
                { href: "#" + this.props.name, "aria-controls": this.props.name, role: "tab", "data-toggle": "tab" },
                this.props.name
            )
        );
    }
}

module.exports = Nav;