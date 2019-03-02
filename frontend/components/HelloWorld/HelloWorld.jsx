import React from 'react';
import PropTypes from 'prop-types';

export default class HelloWorld extends React.Component {
  render() {
    const { message } = this.props;

    return <div className="hello-world">{ message }</div>;
  }
}

HelloWorld.propTypes = {
  message: PropTypes.string.isRequired,
};
