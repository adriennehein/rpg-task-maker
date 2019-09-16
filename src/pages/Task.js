import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Div = styled.div`
  ${props => props.main && css `
    background: #333d46;
    padding: 100px 0;
  `}
  ${props => props.container && css `
    height: 90vh;
    width: 1170px;
    margin: 0 auto;
    color: #fff;
  `}
  ${props => props.taskCard && css `
    background: rgba(255, 255, 255, .8);
    width: 25%;
    padding: 15px 10px;
    margin: 15px 5px;
    display: inline-block;
    color: #000;
  `}
`;

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskTitle: '',
      taskDescription: '',
      completed: false,
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    })
  }

  sendData = (event) => {
    event.preventDefault();
    this.props.parentSubmit(this.state);
  }

  render() {
    return(
      <Div taskCard>
        <form onSubmit={this.sendData}>
          <label htmlFor="taskTitle">Task Title</label>
          <input name="taskTitle" id="taskTitle" onChange={this.handleChange}/>
          <label htmlFor="taskDescription">Description of task</label>
          <input name="taskDescription" id="taskDescription" onChange={this.handleChange}/>
          <input type="submit" value="Add Task" />
        </form>
      </Div>
    )
  }
}
