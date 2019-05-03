import CharacterPage from '../../pages/CharacterPage';
import RegistrationPage from '../../pages/RegistrationPage';
import CharactersPage from '../../pages/CharactersPage';
import NewCharacterPage from '../../pages/NewCharacterPage';
import ErrorPage from '../../pages/ErrorPage';
import HomePage from '../../pages/HomePage';

export default {
  homePage: {
    path: '/',
    exact: true,
    component: HomePage,
  },
  registrationPage: {
    path: '/register',
    component: RegistrationPage,
  },
  charactersPage: {
    path: '/characters',
    exact: true,
    component: CharactersPage,
  },
  newCharacterPage: {
    path: '/characters/new',
    exact: true,
    component: NewCharacterPage,
  },
  characterPage: {
    path: '/characters/:characterId',
    component: CharacterPage,
  },
  errorPage: {
    path: '/error',
    exact: true,
    component: ErrorPage,
  },
};
