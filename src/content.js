const React = require("react");

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modules: []}
    }
    componentDidMount() {
    }
    render() {
        return <div className="tab-content">
            {this.props.modules.map( (module, i) => <ContentItem key={i} index={i} name={module} module={require("../app/module/" + module + "/main")} />)}
        </div>;
    }
}

class ContentItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.module);
        return <div role="tabpanel" className={this.props.index == 0 ? "tab-pane active" : "tab-pane"} id={this.props.name}>
            <this.props.module />
        </div>;
    }
}

module.exports = Content;
