import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeTrackerTable from './../TimeTrackerTable.js';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      profile: {}
    }
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

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                Hello, {this.state.profile.given_name}!
                {this.state.profile.sub ? <TimeTrackerTable /> : ''}
              </h4>
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
