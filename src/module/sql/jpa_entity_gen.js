const React = require("react");

class JPAEntityGen extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="panel panel-default">
            <div className="panel-heading">JPAEntityGen</div>
            <div className="panel-body">
                <div className="input-group form-group">
                    <span className="input-group-addon">templete</span>
                    <input className="form-control" type="text"></input>
                    <span className="input-group-btn">
                        <button className="btn btn-primary">find</button>
                    </span>
                </div>
                <div className="input-group">
                    <span className="input-group-addon">output</span>
                    <input className="form-control" type="text"></input>
                    <span className="input-group-btn">
                        <button className="btn btn-primary">find</button>
                    </span>
                </div>
            </div>
        </div>;
    }
}

module.exports = JPAEntityGen;
