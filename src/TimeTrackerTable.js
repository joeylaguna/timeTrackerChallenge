import React, { Component } from 'react';
import { Table, Form, FormGroup, Button, FormControl, ControlLabel } from 'react-bootstrap';
  
class TimeTrackerTable extends Component {
  render() {
    return (
      <div>
        <Form inline>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Task</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="Learn Postgres" />
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Time Spent</ControlLabel>
            {' '}
            <FormControl type="text" placeholder="2 hours" />
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

          </tbody>
        </Table>
      </div>
    );
  }
}

export default TimeTrackerTable;