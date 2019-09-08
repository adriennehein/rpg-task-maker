import React, { Component } from 'react';
import styled, { css } from 'styled-components';


const Div = styled.div`
    ${props => props.main && css `
      background: #333d46
      padding: 100px 0;
    `}
    ${props => props.container && css `
      height: 90vh;
        width: 1170px;
        margin: 0 auto;

    `}
    ${props => props.formRow && css `
        display: block;
        width: 100%;
        margin: 0 auto;
        text-align: center;
    `}
`

const H2 = styled.h2`
    color: #adadad;
    text-align: center;
`

const Form = styled.form`
    max-width: 700px;
    margin: 0 auto;
    padding: 50px 0 100px;
    background: rgba(0, 0, 0, .4);
    border-radius: 20px;
`

const Input = styled.input`
    min-width: 300px;
    margin: 0 auto 20px;
    font-size: 18px;
    border: 0;
    border-bottom: 2px solid teal;
    padding: 10px 30px;
    background: transparent;
    ${props => props.button && css`
        background: #295b75;
        color: white;
        border: 2px solid #295b75;
    `}
`
const Label = styled.label`
    width: 200px;
    display: inline-block;
    text-align: right;
    font-size: 16px;
    color: #adadad;
    padding-right: 10px;
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
          <Div main>
            <Div container>
              <Form onSubmit={this.handleSubmit}>
                <H2>Log in</H2>
                <Div formRow>
                  <Label htmlFor='email'>Email: </Label>
                  <Input type='email' name='email' onChange={this.handleChange} value={email} ></Input>
                </Div>
                <Div formRow>
                  <Label htmlFor='password'>Password: </Label>
                  <Input type='password' name='password' onChange={this.handleChange} value={password} ></Input>
                </Div>
                <Div formRow>
                  <Input button type='submit' value='Sign In'></Input>
                </Div>
              </Form>
            </Div>
          </Div>
        )
    }
}
