const React = require("react");
const ReactDOM = require("react-dom");
const Nav = require("./nav");

class Main extends React.Component {
    render() {
return <div className="container-fluid">
    <Nav />
    <div id="module"></div>
</div>;
    }
};

ReactDOM.render(
    <Main />,
    document.getElementById('main')
)
