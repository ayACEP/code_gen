const React = require("react");

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "123" };
        this.onLiClick = this.onLiClick.bind(this);
    }
    render() {
        return React.createElement(
            "nav",
            { id: "nav" },
            React.createElement(
                "ul",
                { className: "nav nav-tabs nav-justified" },
                React.createElement(
                    "li",
                    { className: this.state.name, onClick: this.onLiClick },
                    React.createElement(
                        "a",
                        { href: "#" },
                        "1"
                    )
                ),
                React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "a",
                        { href: "#", onClick: this.onLiClick },
                        "2"
                    )
                )
            )
        );
    }
    onLiClick(e) {
        console.log(e);
        // e.setAttribute("class", "active");
        // this.setState({name: "active"});
    }
};

module.exports = Nav;