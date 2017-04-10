const React = require("react");

class DBConnection extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(
            "p",
            null,
            "sql"
        );
    }
}

module.exports = DBConnection;