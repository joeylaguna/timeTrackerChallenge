import React, { Component } from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
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
    let userID = this.props.profile.sub.split('|')[1];
    axios.post(`/update/${userID}/${index}/${this.state.taskName}/${this.state.timeSpent}`)
      .then((res) => {
        console.log('Updating');
        this.props.getTasks();
        this.props.updateItem();
      })
  }


  render() {
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup  controlId="formInlineName">
            <ControlLabel>Update item # {this.props.index}</ControlLabel>
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