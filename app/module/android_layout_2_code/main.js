const React = require("react");
const electron = require('electron');
const remote = electron.remote;
const style = require("../../style");

class AndroidLayout2Code extends React.Component {
    constructor(props) {
        super(props);
    }
    static getName() {
        return "AndroidLayout2Code";
    }
    render() {
        return React.createElement("div", { className: "row" });
    }
}

module.exports = AndroidLayout2Code;