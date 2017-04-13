
const React = require("react");
const ge = require("./global_event");

class BaseReactComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onSaveState = this.onSaveState.bind(this);
        ge.onWindowUnload(this.onSaveState, this);
    }
    onSaveState() {
    }
}

module.exports = BaseReactComponent;