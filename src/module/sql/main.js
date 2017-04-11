const React = require("react");
const DBConnection = require("./db_connection");
const JpaEntityGen = require("./jpa_entity_gen");
const SQLEditor = require("./sql_editor");

class SQL extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="row">
            <div className="col-md-5">
                <div className="row">
                    <div className="col-md-12">
                        <DBConnection />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <JpaEntityGen />
                    </div>
                </div>
            </div>
            <div className="col-md-7">
                <SQLEditor />
            </div>
        </div>;
    }
}

module.exports = SQL;
