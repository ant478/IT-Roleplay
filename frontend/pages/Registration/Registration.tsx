import * as React from 'react';
import RegistrationForm from '../../components/RegistrationForm';

export default class Registration extends React.Component {
  public async componentDidMount(): Promise<void> {
    document.title = 'IT Roleplay: Регистрация';
  }

  public render(): React.ReactNode {
    return (
      <div className="page registration-page">
        <h1>Registration page</h1>
        <RegistrationForm />
      </div>
    );
  }
}
