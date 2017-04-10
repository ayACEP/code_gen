const React = require("react");
const DBConnection = require("./db_connection");
const JpaEntityGen = require("./jpa_entity_gen");
const SQLEditor = require("./sql_editor");

class SQL extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "div",
                { className: "col-md-4" },
                React.createElement(
                    "div",
                    { className: "col-md-12" },
                    React.createElement(DBConnection, null)
                ),
                React.createElement(
                    "div",
                    { className: "col-md-12" },
                    React.createElement(JpaEntityGen, null)
                )
            ),
            React.createElement(
                "div",
                { className: "col-md-8" },
                React.createElement(SQLEditor, null)
            )
        );
    }
}

module.exports = SQL;