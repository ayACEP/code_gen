
const React = require("react");
const DBConnection = require("./db_connection");
const JpaEntityGen = require("./jpa_entity_gen");
const SQLEditor = require("./sql_editor");
const BaseReactComponent = require("../../base_react_component");

class SQL extends BaseReactComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="row">
            <div className="col-md-5">
                <div className="row">
                    <div className="col-md-12">
                        <DBConnection ref="dbConnection" sqlMain={this} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <JpaEntityGen ref="jpaEntityGen" sqlMain={this} />
                    </div>
                </div>
            </div>
            <div className="col-md-7">
                <SQLEditor ref="sqlEditor" sqlMain={this} />
            </div>
        </div>;
    }

    componentDidMount() {
        this.refs.sqlEditor.addOnExecClickListener(sqlContent => {
            this.refs.dbConnection.dbRefs.forEach( (dbRef, i) => {
                if (i != 0) {
                    return;
                }
                this.refs.sqlEditor.addOnExecClickListener(dbRef.onExecClick);
            });
        });
    }

    static get name() {
        return "SQL";
    }
}

module.exports = SQL;
