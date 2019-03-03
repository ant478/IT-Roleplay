import React from 'react';
import HelloWorld from '../../components/HelloWorld/HelloWorld';
import * as helloWorldService from '../../services/helloWorldService';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
    };
  }

  componentDidMount() {
    helloWorldService.getMessage().then((data) => {
      this.setState({ message: data.message });
    });
  }

  render() {
    const { message } = this.state;
    const greeting = message ? `Home: ${message}` : 'Home alone :(';

    return <HelloWorld message={greeting} />;
  }
}
