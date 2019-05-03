/* tslint:disable:no-invalid-template-strings */

const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const loremIpsumShort = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export default {
  pageTitle: {
    registration: 'IT Roleplay: Регистрация',
    home: 'IT Roleplay',
    newCharacter: 'IT Roleplay: Новый Персонаж',
    character: 'IT Roleplay: ${characterName}',
    charactersList: 'IT Roleplay: Список персонажей',
  },
  header: {
    status: {
      authenticated: 'Добро пожаловать, ${login}.',
      notAuthenticated: 'Пользователь не опознан.',
    },
    navigation: {
      charactersList: 'Список персонажей',
      newCharacter: 'Создать персонажа',
      login: 'Вход',
      logout: 'Выход',
      register: 'Регистрация',
    },
  },
  undergroundBroadcast: {
    connectionStatus: {
      disabled: 'Нет сигнала',
      lost: 'Нет сигнала',
      establishing: 'Установка соединения',
      established: 'Соединение установлено',
    },
  },
  registration: {
    formLabel: {
      email: 'Адрес электронной почты',
      login: 'Имя пользователя',
      password: 'Пароль',
      submit: 'Зарегистрироваться',
      passwordConfirmation: 'Подтверждение пароля',
      areTermsAccepted: 'Я обещаю поставить звезду на гитхабе если проект понравится или написать конструктивный отзыв автору если нет.',
    },
    error: {
      400: 'Введённые данные некорректны.',
      409: 'Введенный логин или email уже занят.',
    },
    success: 'Новый пользователь успешно зарегистрирован.',
    pageHeader: 'Регистрация',
  },
  login: {
    formLabel: {
      login: 'Имя пользователя',
      password: 'Пароль',
      submit: 'Войти',
    },
    error: {
      400: 'Неправильный логин или пароль.',
    },
  },
  charactersPage: {
    header: 'Список персонажей',
  },
  newCharacterPage: {
    header: 'Создание персонажа',
    defaultCharacterName: 'Новый персонаж',
  },
  characterPage: {
    header: 'Профиль персонажа',
    levelUpHeader: 'Повышение уровня: ${level}',
  },
  mainLoader: {
    loadingMessage: 'Синхронизация',
  },
  characterProfile: {
    cancelButtonText: 'Отменить',
    nextButtonText: 'Далее',
    saveButtonText: 'Сохранить',
    cannotSaveText: 'У персонажа остались непотраченные очки классов, аттрибутов или способностей',
    tabs: {
      nameAndAvatar: {
        levelUpButtonText: 'Повысить уровень',
        cancelNewCharacterButtonText: 'Отменить создание персонажа',
        cancelLevelUpButtonText: 'Отменить повышение уровня',
        deleteButtonText: 'Удалить персонажа',
        nextTabButtonText: 'Продолжить',
        avatarEditLabel: 'URL картинки',
        uploadingAvatar: 'Загрузка...',
      },
      attributes: {
        availablePointsLabel: 'Осталось очков',
        priceLabel: 'Цена пункта',
        modifierLabel: 'Модификатор',
      },
      skills: {
        availablePointsLabel: 'Осталось очков',
        priceLabel: 'Цена пункта',
      },
      technologies: {
        availablePointsLabel: 'Осталось очков',
        priceLabel: 'Цена пункта',
      },
      perks: {
        availablePointsLabel: 'Осталось очков',
        priceLabel: 'Цена пункта',
      },
    },
  },
  rolePlayingSystem: {
    name: {
      name: 'Имя',
    },
    roles: {
      name: 'Классы',
      Developer: {
        name: 'Программист',
        description: `Описание программиста: ${loremIpsum}`,
      },
      Teamlead: {
        name: 'Тимлид',
        description: `Описание тимлида: ${loremIpsum}`,
      },
      Reviewer: {
        name: 'Ревьюер',
        description: `Описание ревьюера: ${loremIpsum}`,
      },
      SupportEngineer: {
        name: 'Инженер поддержки',
        description: `Описание инженера поддержки: ${loremIpsum}`,
      },
    },
    attributes: {
      name: 'Аттрибуты',
      Strength: {
        name: 'Сила',
        description: `Описание силы: ${loremIpsum}`,
      },
      Dexterity: {
        name: 'Ловкость',
        description: `Описание ловкости: ${loremIpsum}`,
      },
      Endurance: {
        name: 'Выносливость',
        description: `Описание вынослиости: ${loremIpsum}`,
      },
      Intelligence: {
        name: 'Интеллект',
        description: `Описание интеллекта: ${loremIpsum}`,
      },
      Wisdom: {
        name: 'Мудрость',
        description: `Описание мудрости: ${loremIpsum}`,
      },
      Charisma: {
        name: 'Харизма',
        description: `Описание харизмы: ${loremIpsum}`,
      },
    },
    perks: {
      name: 'Способности',
      Algorithms1: {
        name: 'Знание алгоритмов 1',
        description: `Знание алгоритмов 1: ${loremIpsum}`,
      },
      Algorithms2: {
        name: 'Знание алгоритмов 2',
        description: `Знание алгоритмов 2: ${loremIpsum}`,
      },
      Algorithms3: {
        name: 'Знание алгоритмов 3',
        description: `Знание алгоритмов 3: ${loremIpsum}`,
      },
      Patterns1: {
        name: 'Знание паттернов 1',
        description: `Знание паттернов 1: ${loremIpsum}`,
      },
      Patterns2: {
        name: 'Знание паттернов 2',
        description: `Знание паттернов 2: ${loremIpsum}`,
      },
      Patterns3: {
        name: 'Знание паттернов 3',
        description: `Знание паттернов 3: ${loremIpsum}`,
      },
      Review1: {
        name: 'Ревьюер 1',
        description: `Ревьюер 1: ${loremIpsum}`,
      },
      Review2: {
        name: 'Ревьюер 2',
        description: `Ревьюер 2: ${loremIpsum}`,
      },
      Review3: {
        name: 'Ревьюер 3',
        description: `Ревьюер 3: ${loremIpsum}`,
      },
    },
    skills: {
      name: 'Навыки',
      roleAttachedLabel: 'Классовый навык',
      roleNotAttachedLabel: 'Неклассовый навык',
      Communication: {
        name: 'Коммуникация',
        description: `Описание коммуникации: ${loremIpsum}`,
      },
      Planning: {
        name: 'Планирование',
        description: `Описание планирования: ${loremIpsum}`,
      },
      Debugging: {
        name: 'Отладка',
        description: `Описание отладки: ${loremIpsum}`,
      },
      Discipline: {
        name: 'Дисциплина',
        description: `Описание дисциплины: ${loremIpsum}`,
      },
      Documenting: {
        name: 'Документиция',
        description: `Описание документации: ${loremIpsum}`,
      },
      Programming: {
        name: 'Программирование',
        description: `Описание программирования: ${loremIpsum}`,
      },
    },
    technologies: {
      name: 'Технологии',
      groups: {
        Frontend: {
          name: 'Frontend',
        },
        Backend: {
          name: 'Backend',
        },
      },
      JavaScript1: {
        name: 'JavaScript ур. 1',
        summary: `JavaScript ур. 1: ${loremIpsumShort}`,
      },
      JavaScript2: {
        name: 'JavaScript ур. 2',
        summary: `JavaScript ур. 2: ${loremIpsumShort}`,
      },
      JavaScript3: {
        name: 'JavaScript ур. 3',
        summary: `JavaScript ур. 3: ${loremIpsumShort}`,
      },
      JavaScript4: {
        name: 'JavaScript ур. 4',
        summary: `JavaScript ур. 4: ${loremIpsumShort}`,
      },
      JavaScript5: {
        name: 'JavaScript ур. 5',
        summary: `JavaScript ур. 5: ${loremIpsumShort}`,
      },
      HTML1: {
        name: 'HTML ур. 1',
        summary: `HTML ур. 1: ${loremIpsumShort}`,
      },
      HTML2: {
        name: 'HTML ур. 2',
        summary: `HTML ур. 2: ${loremIpsumShort}`,
      },
      HTML3: {
        name: 'HTML ур. 3',
        summary: `HTML ур. 3: ${loremIpsumShort}`,
      },
      CSS1: {
        name: 'CSS ур. 1',
        summary: `CSS ур. 1: ${loremIpsumShort}`,
      },
      CSS2: {
        name: 'CSS ур. 2',
        summary: `CSS ур. 2: ${loremIpsumShort}`,
      },
      CSS3: {
        name: 'CSS ур. 3',
        summary: `CSS ур. 3: ${loremIpsumShort}`,
      },
    },
  },
  error: {
    400: 'Введенные данные некорректны.',
    404: 'Данные не найдены.',
    500: 'Произошла неизвестная ошибка.',
  },
};
/* tslint:enable:no-invalid-template-strings */
