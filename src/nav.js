
const React = require("react");
const BaseReactComponent = require("./base_react_component");
const Style = require("./style");

class Nav extends BaseReactComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return <nav style={Style.marginTop}>
            <ul className="nav nav-tabs nav-justified">
                {this.props.modules.map( (module, i) => 
                    <NavItem key={i} index={i} name={module.name} viewClass={module.class} />
                )}
            </ul>
        </nav>;
    }
};

class NavItem extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return <li role="presentation">
            <a href={"#" + this.props.name} aria-controls={this.props.name} role="tab" data-toggle="tab">{this.props.viewClass.name}</a>
        </li>;
    }
}

module.exports = Nav;
