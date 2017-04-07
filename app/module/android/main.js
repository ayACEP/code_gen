const React = require("react");

class Android extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(
            "p",
            null,
            "android"
        );
    }
}

module.exports = Android;