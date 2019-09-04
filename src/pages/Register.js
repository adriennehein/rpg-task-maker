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
    render() {
        return(
            <Div>
              <Div container>
                <h2>Sign Up</h2>
                <Div formRow>
                  <Label htmlFor='email'>Email: </Label>
                  <Input type='email' name='email'></Input>
                </Div>
                <Div formRow>
                  <Label htmlFor='password'>Password: </Label>
                  <Input type='password' name='password'></Input>
                </Div>
                <Div formRow>
                  <Label htmlFor='password-confirm'>Password: </Label>
                  <Input type='password' name='password-confirm'></Input>
                </Div>
              </Div>
            </Div>
        )
    }
}
