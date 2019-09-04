import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
    background: transparent;
    color: #707070;
    padding: 10px 30px;
    border: 2px solid #707070;
    border-radius: 3px;
    display: block;
    width: 800px;
    font-size: 18px;
    margin: 10px auto;
    text-transform: uppercase;
    font-weight: bold;
    &:hover {
      background: teal;
      color: white;
      border: 2px solid teal;
      transition: background 500ms ease;
    }
    ${props => props.primary && css`
        background: orange;
        color: white;
        border: 2px dotted orange;
    `}
`

const Div = styled.div`
  ${props => props.formRow && css `
      display: block;
      width: 100%;
      margin: 0 auto;
    `}
`

const Input = styled.input`
    min-width: 300px;
    margin: 0 auto 5px;
    font-size: 18px;
    border: 0;
    border-bottom: 2px solid teal;
    padding: 10px 30px;
    background: transparent;
`
const Label = styled.label`
    width: 200px;
    display: inline-block;
    text-align: right;
    font-size: 16px;
    color: #707070;
`

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
            alert('Error logging in. Please try again');
        })
    }

    render() {
        const { email, password } = this.state
        console.log(email, password)
        return(
            <form onSubmit={this.handleSubmit}>
              <Div formRow>
                <Label htmlFor='email'>Email: </Label>
                <Input type='email' name='email' onChange={this.handleChange} value={email} ></Input>
              </Div>
              <Div formRow>
                <Label htmlFor='password'>Password: </Label>
                <Input type='password' name='password' onChange={this.handleChange} value={password} ></Input>
              </Div>
                <input type='submit' value='Sign In'></input>
                <Button>Useless Stylish Button</Button>
                <Button primary>Also Stylish Button</Button>
            </form>
        )
    }
}
