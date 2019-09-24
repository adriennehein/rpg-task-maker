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


export default class TaskList extends Component {
  render() {
    return(
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
        {
          this.props.tasks.map((task, index) => 
              <Div taskCard key={index}><h4>{task.taskTitle}</h4><p>{task.taskDescription}</p></Div>
              )
        }
      </section>
    )
  }
}
