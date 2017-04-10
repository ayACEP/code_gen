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
        return <div role="tabpanel" className={"tab-pane container-fluid " + (this.props.index == 0 ? "active" : "")} id={this.props.name}>
            <this.props.module />
        </div>;
    }
}

module.exports = Content;
