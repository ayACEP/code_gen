const React = require("react");
const style = require("../../style");

class DBConnection extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="panel panel-default">
            <div className="panel-heading">
                <label style={style.panelHeadLabel}>
                    <input type="checkbox"/>
                    &nbsp;DBConnection
                </label>
            </div>
            <div className="panel-body">
                <div className="input-group form-group">
                    <span className="input-group-addon">url</span>
                    <input className="form-control" type="text"></input>
                </div>
                <div className="input-group form-group">
                    <span className="input-group-addon">username</span>
                    <input className="form-control" type="text"></input>
                </div>
                <div className="input-group">
                    <span className="input-group-addon">password</span>
                    <input className="form-control" type="text"></input>
                </div>
            </div>
        </div>;
    }
}

module.exports = DBConnection;
