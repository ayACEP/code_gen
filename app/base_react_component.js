
const React = require("react");
const ge = require("./global_event");
const storage = require("./storage");
const utils = require("./utils");

class BaseReactComponent extends React.Component {

    constructor(props) {
        super(props);

        this.id = "";

        this.onSaveState = this.onSaveState.bind(this);
        ge.onWindowUnload(this.onSaveState);
    }

    componentWillUnmount() {
        ge.removeOnWindowUnload(this.onSaveState);
        storage.removeItem(this.saveStateName);
    }

    setDefaultState(defaultState) {
        this.state = {};
        let savedState = this.getSavedState();
        for (var key in defaultState) {
            if (savedState[key] != null) {
                this.state[key] = savedState[key];
            } else {
                this.state[key] = defaultState[key];
            }
        }
    }

    getSavedState() {
        if (this.savedState == null) {
            this.savedState = utils.null2NewObject(JSON.parse(storage.getItem(this.saveStateName)));
        }
        return this.savedState;
    }

    onSaveState() {
        try {
            storage.setItem(this.saveStateName, JSON.stringify(this.state));
        } catch (e) {
            console.error(e);
        }
    }

    get saveStateName() {
        return this.constructor.name + "_" + this.id + ".state";
    }
}

module.exports = BaseReactComponent;