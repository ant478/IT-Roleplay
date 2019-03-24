import * as React from 'react';
import RegistrationForm from '../../components/RegistrationForm';

export default class Registration extends React.Component {
  public render(): React.ReactNode {
    return (
      <div>
        <h1>Registration page</h1>
        <RegistrationForm />
      </div>
    );
  }
}
