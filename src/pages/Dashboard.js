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

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      task: {
        taskTitle: '',
        taskDescription: '',
        completed: false,
      },
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    const task = { [name]: value };
    this.setState({
      task: task,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newTask = this.state.task;
    console.log(newTask);
  }
    render() {
        return(
          <Div main>
            <Div container>
              <h1>Dashboard</h1>
              <section>
                <h3>Active Tasks</h3>
                <Div taskCard>
                  <h4>Water the Dog</h4>
                  <p>The dog needs water to grow.</p>
                </Div>
                <Div taskCard>
                  <h4>Feed the dog to the plant</h4>
                  <p>The plant is hungry.</p>
                </Div>
                <Div taskCard>
                  <form onSubmit={this.handleSubmit}>
                    <label htmlFor="taskTitle">Task Title</label>
                    <input name="taskTitle" id="taskTitle" onChange={this.handleChange}/>
                    <label htmlFor="taskDescription">Description of task</label>
                    <input name="taskDescription" id="taskDescription" onChange={this.handleChange}/>
                    <input type="submit" value="Add Task" />
                  </form>
                </Div>
              </section>
              <section>
                <h3>Completed Tasks</h3>
                <Div taskCard>
                  <h4>Write the Bible of Cat</h4>
                  <p>I want to spread the word. Cat is not a forgiving god.</p>
                </Div>
              </section>
            </Div>
          </Div>
        )
    }
}
