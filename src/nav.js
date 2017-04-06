const React = require("react");

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: "123"};
        this.onLiClick = this.onLiClick.bind(this);
    }
    render() {
        return <nav id="nav">
            <ul className="nav nav-tabs nav-justified">
                <li className={this.state.name} onClick={this.onLiClick}><a href="#">1</a></li>
                <li><a href="#" onClick={this.onLiClick}>2</a></li>
            </ul>
        </nav>;
    }
    onLiClick(e) {
        console.log(e);
        // e.setAttribute("class", "active");
        // this.setState({name: "active"});
    }
};

module.exports = Nav;