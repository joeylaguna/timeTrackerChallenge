import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeTrackerTable from './../TimeTrackerTable.js';
import { Button } from 'react-bootstrap';
import AdminForm from './../AdminForm.js';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      adminActive: false
    }
    this.showAdmin = this.showAdmin.bind(this);
  }

  componentWillMount() {
    this.setState({
      profile: {}
    });

    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({
          profile: profile
        });
      });
    } else {
      this.setState({
        profile: userProfile
      });
    }
  }

  login() {
    this.props.auth.login();
  }

  showAdmin() {
    this.setState({
      adminActive: true
    });
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
            <div>
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.showAdmin}
              >
                Admin Login
              </Button>
              <h4>
                Hello, {this.state.profile.given_name}!
                {this.state.adminActive ? <AdminForm /> : '' }
                {this.state.profile.sub ? <TimeTrackerTable profile={this.state.profile} /> : ''}
              </h4>
            </div>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
