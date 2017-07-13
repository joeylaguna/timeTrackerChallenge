import React, { Component } from 'react';
import { Table, Form, FormGroup, Button, FormControl, ControlLabel, Modal } from 'react-bootstrap';
  
class TimeTrackerTable extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        {
          'task_name': 'test task',
          'timeSpent': '2 hours',
          'date':  "2017-07-12"
        }
      ],
      taskName: '',
      timeSpent: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTaskName = this.updateTaskName.bind(this);
    this.updateTimeSpent = this.updateTimeSpent.bind(this);
    this.compareDate = this.compareDate.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let newTask = {};
    let date = new Date();
    date = date.toISOString().substring(0, 10);
    newTask.task_name = this.state.taskName;
    newTask.timeSpent = this.state.timeSpent;
    newTask.date = date;
    let tasks = this.state.tasks;
    tasks.push(newTask);
    this.setState({
      tasks: tasks
    });
  }

  updateTaskName(e) {
    this.setState({
      taskName: e.target.value
    });
  }

  updateTimeSpent(e) {
    this.setState({
      timeSpent: e.target.value
    });
  }

  compareDate(index) {
    let currentDate = new Date();
    console.log(index);
    currentDate = currentDate.toISOString().substring(0, 10);
    if (currentDate === this.state.tasks[index].date) {
      return true;
    }
    return false;
  }

  showModal(index) {
    console.log(index);
  }

  render() {
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup  controlId="formInlineName">
            <ControlLabel>Task</ControlLabel>
            {' '}
            <FormControl onChange={this.updateTaskName} type="text" placeholder="Learn Postgres" value={this.state.taskName}/>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Time Spent</ControlLabel>
            {' '}
            <FormControl onChange={this.updateTimeSpent} type="text" placeholder="2 hours" value={this.state.timeSpent} />
          </FormGroup>
          {' '}
          <Button type="submit">
            Add Task
          </Button>
        </Form>
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Time Spent</th>
              <th>Date</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.tasks.map((item, index) => {
                return (<tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.task_name}</td>
                  <td>{item.timeSpent}</td>
                  <td>{item.date}</td>
                  <td>
                    {this.compareDate(index) ? <Button onClick={this.showModal.bind(null, index)}>Edit</Button> : <Button disabled>Edit</Button>}
                  </td>
                </tr>)
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TimeTrackerTable;