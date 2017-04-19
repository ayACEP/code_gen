
const BaseReactComponent = require("../../base_react_component");

class Log extends BaseReactComponent {
    
    constructor(props) {
        // TODO
    }

    render() {
        return <div> 
            <div className="form-group">
                <p>Log</p>
                <textarea className="form-control" style={{height: "400px"}} />
            </div>
        </div>
    }
}

module.exports = Log;