import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import TaskList from './TaskList';

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
      currentTask: '',
      tasks: [],
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
    this.setState({
      currentTask: '',
      tasks: [...this.state.tasks, this.state.currentTask]
    })
    console.log(this.state);
  }
    render() {
      const { currentTask } = this.state;
        return(
          <Div main>
            <Div container>
              <h1>Dashboard</h1>
                <Div taskCard>
                  <form onSubmit={this.handleSubmit}>
                    <label htmlFor="currentTask">Description of task</label>
                    <input name="currentTask" id="currentTask" onChange={this.handleChange} value={currentTask}/>
                    <input type="submit" value="Add Task" />
                  </form>
                </Div>
                <TaskList tasks={this.state.tasks}/>
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
