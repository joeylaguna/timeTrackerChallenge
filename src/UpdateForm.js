import React, { Component } from 'react';
import {Form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';
class UpdateForm extends Component {
  constructor(){
    super();
    this.state = {
      taskName: '',
      timeSpent: ''
    }
    this.updateTaskName = this.updateTaskName.bind(this);
    this.updateTimeSpent = this.updateTimeSpent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    let index = this.props.index;
    let tasks = this.props.tasks;
    let itemToUpdate = tasks[index];
    itemToUpdate['task_name'] = this.state.taskName;
    itemToUpdate['timeSpent'] = this.state.timeSpent;
    axios.post(`/update/${index}/${this.state.taskName}/${this.state.timeSpent}`)
      .then((res) => {
        this.props.getTasks();
      })
    this.props.updateItem();
  }


  render() {
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup  controlId="formInlineName">
            <ControlLabel>Update item # {this.props.index + 1}</ControlLabel>
            {' '}
            <FormControl onChange={this.updateTaskName} type="text" placeholder='Update Task' value={this.state.taskName}/>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Time Spent</ControlLabel>
            {' '}
            <FormControl onChange={this.updateTimeSpent} type="text" placeholder="2 hours" value={this.state.timeSpent} />
            <Button type="submit">
              Update Task
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default UpdateForm;