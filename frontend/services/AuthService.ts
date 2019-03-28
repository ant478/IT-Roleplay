import _ from 'lodash';
import BaseAPIService from './BaseAPIService';

const USERS_API_LOCATION = '/api/user';

export interface User {
  id: number;
  login: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRegistrationData {
  login: string;
  email: string;
  password: string;
}

export interface UserLoginData {
  login: string;
  password: string;
}

export class AuthService extends BaseAPIService {
  private currentUser: User | null;

  constructor() {
    super();

    const storedUser = localStorage.getItem('currentUser');

    this.currentUser = storedUser ?
      JSON.parse(storedUser) as User :
      null;
  }

  public isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public register(userRegistrationData: UserRegistrationData): Promise<User> {
    const location = `${USERS_API_LOCATION}/register`;
    const options = { method: 'POST', body: JSON.stringify(userRegistrationData) };

    return this.makeRequest<User>(location, options);
  }

  public logIn(userLoginData: UserLoginData): Promise<User> {
    const location = `${USERS_API_LOCATION}/login`;
    const options = { method: 'POST', body: JSON.stringify(userLoginData) };

    return this.makeRequest<User>(location, options).then((user) => {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));

      return user;
    });
  }

  public logOut(): Promise<void> {
    const location = `${USERS_API_LOCATION}/logout`;
    const options = { method: 'POST' };

    return this.makeRequest<void>(location, options).finally(() => {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
    }).catch(_.noop);
  }
}

export default new AuthService();
