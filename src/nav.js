const React = require("react");

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <nav>
            <ul className="nav nav-tabs nav-justified">
                {this.props.modules.map((module, i) => <NavItem key={i} index={i} name={module} />)}
            </ul>
        </nav>;
    }
};

class NavItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <li className={this.props.index == 0 ? "active" : ""} role="presentation">
            <a href={"#" + this.props.name} aria-controls={this.props.name} role="tab" data-toggle="tab">{this.props.name}</a>
        </li>;
    }
}

module.exports = Nav;