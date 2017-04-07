const React = require("react");
const ReactDOM = require("react-dom");
const fs = require("fs");
const Nav = require("./nav");
const Content = require("./content");

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modules: []};
    }
    componentDidMount() {
        let modules = fs.readdirSync("./app/module");
        this.setState({modules: modules});
    }
    render() {
        return <div className="container-fluid">
            <Nav modules={this.state.modules} />
            <Content modules={this.state.modules} />
        </div>;
    }
};

ReactDOM.render(
    <Main />,
    document.getElementById('main')
)
