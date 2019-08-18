import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: "Loading message from the server..."
        }
    }

    componentDidMount() {
        fetch('/swish')
            .then(res => res.json())
            .then(parsedRes => this.setState({message: parsedRes}))
    }

    render(){
        return (
            <div>
                <h1>Home</h1>
                <p>Server says: {this.state.message}</p>
            </div>
        )
    }
}