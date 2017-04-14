
const React = require("react");
const electron = require('electron');
const remote = electron.remote;
const BaseReactComponent = require("../../base_react_component");
const style = require("../../style");

class AndroidLayout2Code extends BaseReactComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return React.createElement("div", { className: "row" });
    }

    static get name() {
        return "AndroidLayout2Code";
    }
}

module.exports = AndroidLayout2Code;