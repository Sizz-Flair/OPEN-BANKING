// App.jsx
import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
 
class Cookies extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
    super(props);
 
    const { cookies } = props;
    this.state = {
      name: cookies.get('name') || 'Ben'
    };
  }
 
  handleNameChange(name) {
    const { cookies } = this.props;
 
    cookies.set('name', name, { path: '/' });
    this.setState({ name });
  }
 
  render() {
    const { name } = this.state;
 
    return (
        <>
        </>
    );
  }
}
 
export default withCookies(Cookies);