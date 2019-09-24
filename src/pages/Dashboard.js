import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import TaskList from './TaskList';
import Task from './Task';

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
      isLoading: true,
      error: '',
    }
  }

  getTasks = () => {
    fetch('/tasks')
    .then(response => {
      console.log('raw response ', response);
      return response.json();
    })
    .then(parseRes => {
      this.setState({
        tasks: parseRes,
        isLoading: false,
      })
    })
    .catch(err => {
      this.setState({
        error: err,
      })
      console.log(err);
    })
  }


  handleSubmit = (taskData) => {
    fetch('/task', {
      method: 'POST',
      body: JSON.stringify(taskData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch(err => {
      console.log(err);
      alert('Error submitting task. Please try again.');
    })
  }

  componentDidMount(){
    this.getTasks();
  }

  render() {
      const { isLoading, tasks, error} = this.state;
      return(
        <Div main>
          <Div container>
            <h1>Dashboard</h1>
            { error ? <p>{error.message}</p> : null }

            <Task
            taskSubmit={this.handleSubmit} />

            { !isLoading ? (
              <TaskList tasks={tasks}/>
            ) : (
              <h3>Tasks are Loading...</h3>
            )}

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
