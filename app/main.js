
const React = require("react");
const ReactDOM = require("react-dom");
const BaseReactComponent = require("./base_react_component");
const fs = require("fs");
const Nav = require("./nav");
const Content = require("./content");

class Main extends BaseReactComponent {
    constructor(props) {
        super(props);
        let moduleNames = fs.readdirSync("./app/module");
        let activeModuleName = localStorage.getItem(Nav.STORAGE_ACTIVE_MODULE_NAME);
        this.state = {
            moduleNames: moduleNames,
            activeModuleName: activeModuleName
        };
        this.onTabChange = this.onTabChange.bind(this);
    }
    componentDidMount() {
        $('a[aria-controls="' + this.state.activeModuleName + '"]').tab('show');
        $('a[data-toggle="tab"]').on('shown.bs.tab', this.onTabChange);
    }
    onSaveState() {
        localStorage.setItem(Nav.STORAGE_ACTIVE_MODULE_NAME, this.state.activeModuleName);
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
            React.createElement(Nav, { moduleNames: this.state.moduleNames, activeModuleName: this.state.activeModuleName }),
            React.createElement(Content, { moduleNames: this.state.moduleNames, activeModuleName: this.state.activeModuleName })
        );
    }
};

ReactDOM.render(React.createElement(Main, null), document.getElementById('main'));