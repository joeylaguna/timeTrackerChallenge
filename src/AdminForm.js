import React, { Component } from 'react';
import { Form, FormGroup, Button, FormControl, ControlLabel, Table} from 'react-bootstrap';
import axios from 'axios';

class AdminForm extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      correctDetails: false,
      tasks: [],
      users: []
    }
    this.updateUserName = this.updateUserName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildTaskList = this.buildTaskList.bind(this);
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

  buildTaskList(tasks) {
    this.setState({
      tasks: this.state.tasks.concat(tasks)
    });
  }

  componentDidMount() {
    axios.get('/users')
      .then((res) => {
        this.setState({
          users: res.data.rows
        });
        res.data.rows.forEach((user, index) => {
          let userID = user['user_id'];
          let userName = user['name'];
          this.setState({
            userID: userName
          });
          axios.get(`/tasks/${userID}`)
            .then((response) => {
              this.buildTaskList(response.data.rows);
            })
            .catch((error) => {
              console.log(`got an error getting tasks for user: ${error}`)
            });
        })
      })
      .catch((err) => {
        console.log(`got error trying to get user list: ${err}`);
      });
  }

  render(){
    return (
      <div>
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup  controlId="formInlineName">
            <ControlLabel>Username:</ControlLabel>
            {' '}
            <FormControl onChange={this.updateUserName} type="text" value={this.state.userName}/>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Password:</ControlLabel>
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
            {
              this.state.tasks.map((item, index) => {
                  return (<tr key={index}>
                    <td>{index + 1}</td>
                    <td>{this.state.item.user_id}</td>
                    <td>{item.task_name}</td>
                    <td>{item.time_spent}</td>
                    <td>{item.date}</td>
                  </tr>);
              })
            }
          </tbody>
        </Table>
          : ''
        }
      </div>
    )
  }
}

export default AdminForm;
