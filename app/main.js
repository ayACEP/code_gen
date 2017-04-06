const React = require("react");
const ReactDOM = require("react-dom");
const Nav = require("./nav");

class Main extends React.Component {
    render() {
        return React.createElement(
            "div",
            { className: "container-fluid" },
            React.createElement(Nav, null),
            React.createElement("div", { id: "module" })
        );
    }
};

ReactDOM.render(React.createElement(Main, null), document.getElementById('main'));