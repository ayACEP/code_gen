
const React = require("react");
const ReactDOM = require("react-dom");
const fs = require("fs");
const BaseReactComponent = require("./base_react_component");
const Nav = require("./nav");
const Content = require("./content");
const storage = require("./storage");
const utils = require("./utils");

class Main extends BaseReactComponent {

    constructor(props) {
        super(props);

        this.setDefaultState({
            activeModuleName: ""
        });
        let moduleNames = fs.readdirSync("./app/module");
        let modules = moduleNames.map(moduleName => {
            return {
                name: moduleName,
                class: require("./module/" + moduleName + "/main")
            };
        });
        this.state.modules = modules;

        this.onTabChange = this.onTabChange.bind(this);
    }

    componentDidMount() {
        let selector = $('a[aria-controls="' + this.state.activeModuleName + '"]').tab('show');
        if (selector.length == 0) {
            let tabs = $('a[data-toggle="tab"]');
            if (tabs.length != 0) {
                $(tabs[0]).tab('show');
            }
        }
        $('a[data-toggle="tab"]').on('shown.bs.tab', this.onTabChange);
    }

    onSaveState() {
        delete this.state.modules;
        super.onSaveState();
    }

    onTabChange(e) {
        this.setState({
            activeModuleName: $(e.target).attr("aria-controls")
        });
    }

    render() {
        return React.createElement(
            "div",
            { className: "container-fluid" },
            React.createElement(Nav, { modules: this.state.modules, activeModuleName: this.state.activeModuleName }),
            React.createElement(Content, { modules: this.state.modules, activeModuleName: this.state.activeModuleName })
        );
    }
};

ReactDOM.render(React.createElement(Main, null), document.getElementById('main'));