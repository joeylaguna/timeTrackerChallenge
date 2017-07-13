import React, { Component } from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel, Table} from 'react-bootstrap';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      correctDetails: false
    }
    this.updateUserName = this.updateUserName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateUserName(e) {
    this.setState({
      userName: e.target.value
    });
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.userName === 'admin' && this.state.password === '123') {
      this.setState({
        correctDetails: true
      });
    }
  }

  render(){
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup  controlId="formInlineName">
            <ControlLabel>Update item # {this.props.index + 1}</ControlLabel>
            {' '}
            <FormControl onChange={this.updateUserName} type="text" value={this.state.userName}/>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Time Spent</ControlLabel>
            {' '}
            <FormControl onChange={this.updatePassword} type="password"  value={this.state.password} />
            <Button type="submit">
              Update Task
            </Button>
          </FormGroup>
        </Form>
        {
          this.state.correctDetails ? 
          <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Task</th>
              <th>Time Spent</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </Table>
          : ''
        }
      </div>
    )
  }
}

export default AdminForm;
