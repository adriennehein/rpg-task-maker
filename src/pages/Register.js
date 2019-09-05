import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Div = styled.div`
background: #3b3746;
    ${props => props.container && css `
      height: 90vh;
        width: 1170px;
        margin: 0 auto;

    `}
    ${props => props.formRow && css `
        display: block;
        width: 100%;
        margin: 0 auto;
    `}
`;

const Input = styled.input`
    min-width: 300px;
    margin: 0 auto 5px;
    font-size: 18px;
    border: 0;
    border-bottom: 2px solid #8d8d8d;
    padding: 10px 30px;
    background: transparent;
`;

const Label = styled.label`
    width: 200px;
    display: inline-block;
    text-align: right;
    font-size: 16px;
    color: #8d8d8d;
`;

export default class Register extends Component {
    constructor(props) {
      super(props)
      this.state = {
        email: '',
        password: '',
      }
    }

    handleChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value,
      })
    }

    handleSubmit = (event) => {
      event.preventDefault();
      fetch('/register', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
        },
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
        alert('Error registering. Please try again.');
      })
    }

    render() {
        const { email, password } = this.state;
        return(
            <Div>
              <Div container>
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit}>
                  <Div formRow>
                    <Label htmlFor='email'>Email: </Label>
                    <Input type='email' name='email' onChange={this.handleChange} value={email}></Input>
                  </Div>
                  <Div formRow>
                    <Label htmlFor='password'>Password: </Label>
                    <Input type='password' name='password' onChange={this.handleChange} value={password}></Input>
                  </Div>

                  <Div formRow>
                    <Input type='submit' value='Sign Up'></Input>
                  </Div>
                </form>
              </Div>
            </Div>
        )
    }
}
