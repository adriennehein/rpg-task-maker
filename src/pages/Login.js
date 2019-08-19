import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = { 
            email: '',
            password: ''
        }
    }

    handleChange = (event) => {
        // console.log(event.target.value);
        
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('/authenticate', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200) {
                this.props.history.push('/');
            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.log(err);
            alert('Error logging in. Please try again')
        })
    }

    render() {
        const { email, password } = this.state
        console.log(email, password)
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='email'>Email: </label>
                <input type='email' name='email' onChange={this.handleChange} value={email} ></input>
                <label htmlFor='password'>Password: </label>
                <input type='password' name='password' onChange={this.handleChange} value={password} ></input>
                <input type='submit' value='Sign In'></input>
            </form>
        )
    }
}