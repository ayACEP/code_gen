
const React = require("react");
const style = require("./style");

class Content extends React.Component {
    constructor(props) {
        super(props);
        let modules = props.moduleNames.map( (module) => {
            return {
                name: module,
                clazz: require("../app/module/" + module + "/main")
            }
        });
        this.state = {
            modules: modules
        };
    }
    render() {
        return <div className="tab-content">
            {this.state.modules.map( (module, i) => 
                <ContentItem key={i} index={i} name={module.name} moduleClass={module.clazz} />
            )}
        </div>;
    }
}

class ContentItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div role="tabpanel" className={"tab-pane container-fluid " + (this.props.index == 0 ? "active" : "")} id={this.props.name} style={style.marginTop}>
            <this.props.moduleClass />
        </div>;
    }
}

module.exports = Content;
