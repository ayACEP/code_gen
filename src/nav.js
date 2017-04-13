
const React = require("react");
const BaseReactComponent = require("./base_react_component");
const style = require("./style");

class Nav extends BaseReactComponent {
    static get STORAGE_ACTIVE_MODULE_NAME() {
        return "Nav.state.activeModuleName";
    }
    constructor(props) {
        super(props);
        let modules = props.moduleNames.map( (moduleName) => {
            return {
                name: moduleName, 
                clazz: require("../app/module/" + moduleName + "/main")
            }
        });
        this.state = {
            modules: modules
        };
    }
    render() {
        return <nav style={style.marginTop}>
            <ul className="nav nav-tabs nav-justified">
                {this.state.modules.map( (module, i) => 
                    <NavItem key={i} index={i} name={module.name} />)
                }
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
            <a href={"#" + this.props.name} aria-controls={this.props.name} role="tab" data-toggle="tab">{this.props.name}</a>
        </li>;
    }
}

module.exports = Nav;
