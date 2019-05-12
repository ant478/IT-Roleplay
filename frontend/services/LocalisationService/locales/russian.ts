const joinWithLineBreaks = (...lines: string[]): string => {
  return lines.join('\n');
};

/* tslint:disable:no-invalid-template-strings */

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
    cannotSaveText: 'Нужно выбрать класс персонажа',
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
        name: 'Разработчик',
        description: joinWithLineBreaks(
          'Разработчик',
          '',
          'Разработчик - инженер, занимающийся разработкой и совершенствованием программного обеспечения. Слаженный труд разработчиков составляет основу работы всех без исключения IT команд. Быстрее других классов изучает новые технологии и единственный класс для которого навык "Программирование" является классовым.',
          '',
          'Требования:',
          '- нет',
          '',
          'Очки на уровень:',
          '- Технологии: 3',
          '- Способности: 2/3',
          '- Навыки: 2',
          '',
          'Классовые навыки:',
          '- Дисциплина',
          '- Программирование',
        ),
      },
      Teamlead: {
        name: 'Тимлид',
        description: joinWithLineBreaks(
          'Тимлид',
          '',
          'Тимлид - самый опытный инженер в команде разработчиков. Тимлид - голова команды, а от глупой головы как известно страдает всё остальное, Нед Старк не даст соврать. На плечи тимлида ложится общее руководство командой, грамотное планирование работы, задание общего курса технического развития проекта, а также коммуникация с заказчиком и вышестоящим начальством. Для всего этого необходим многолетний опыт, а также некоторая харизма. Тимлид имеет больше очков технологий, навыков и способностей на уровень чем в среднем для других классов, но меньше чем у специализированных классов. Также тимлиду доступна уникальная классовая способность "Лидерство", повышающая эффективностть работы людей под его началом.',
          '',
          'Требования:',
          ' - Уровень 15',
          ' - Харизма 14',
          '',
          'Очки на уровень:',
          '- Технологии: 1.5',
          '- Способности: 1',
          '- Навыки: 4',
          '',
          'Классовые навыки:',
          '- Дисциплина',
          '- Планирование',
          '- Коммуникация',
        ),
      },
      Reviewer: {
        name: 'Ревьюер',
        description: joinWithLineBreaks(
          'Ревьюер',
          '',
          'Даже самые сложные технологии и самые продуманные технические решения всё равно пишут люди, а где люди - там человеческий фактор. Задача ревьюера - недопускать чтобы человеческий фактор отрицательно влиял на качество продукта. В компетенции ревьюера вводить стайгайды, методологии, делать технические улучшения направленные на повышение поддерживаемости продукта, а также непосредственно проводить ревью кода. Гибкость ума, а также умение видеть на много шагов вперед необходимы для такой работы. Ревьюер изучает новые способности быстрее других классов, имеет классовую способность "Ревью", повышающую показатель "Качество" написанного кода, а также раньше других классов получает доступ к способносли "Опыт".',
          '',
          'Требования:',
          ' - Уровень 5',
          ' - Мудрость 14',
          '',
          'Очки на уровень:',
          '- Технологии: 1',
          '- Способности: 1.5',
          '- Навыки: 2',
          '',
          'Классовые навыки:',
          '- Дисциплина',
          '- Отладка',
        ),
      },
      SupportEngineer: {
        name: 'Инженер поддержки',
        description: joinWithLineBreaks(
          'Инженер поддержки',
          '',
          'Инженер поддержки - специалист, основная задача которого - техническая поддержка, решение проблем пользователей при использовании продукта. Проблемы могут возникнуть самые разные - от невоткнутого шнура до ошибок в архитектуре приложения и чтобы оперативно их решать инженеру поддержки приходится быть "мастером на все руки". Умение объяснять сложные вещи "на пальцах", а также терпение и выносливость также являются обязательными качествами инженера поддержки. Класс имеет наибольшее число очков навыков на уровень, а также классовую способность "Лайв ишью", позволяющую ускорять выполнение задач в ущерб их качеству.',
          '',
          'Требования:',
          ' - Уровень 5',
          ' - Выносливость 14',
          '',
          'Очки на уровень:',
          '- Технологии: 1',
          '- Способности: 2/3',
          '- Навыки: 6',
          '',
          'Классовые навыки:',
          '- Дисциплина',
          '- Документация',
          '- Отладка',
          '- Коммуникация',
        ),
      },
    },
    attributes: {
      name: 'Аттрибуты',
      Strength: {
        name: 'Сила',
        description: joinWithLineBreaks(
          'Сила',
          '',
          'Сила инженера это прежде всего сила воли - способность делать то что нужно независимо от обстоятельств и трудностей. Инженер с высокой силой возьмется за дело даже будучи голодным, невыспавшимся и с похмелья и будет не менее эффективным, в то время как инженера с низкой силой выведет из строя даже легкое недомогание. Влияет на эффективность использования навыка "Дисциплина", а также косвенно влияет на скорость выполнения задач.',
        ),
      },
      Dexterity: {
        name: 'Ловкость',
        description: joinWithLineBreaks(
          'Ловкость',
          '',
          'Ловкость инженера это его способность видеть проблему под разными углами и находить оптимальное решение под каждый случай. Высокая ловкость означает что инженер гибко комбинирует разные подходы и практики для достижения наилучшего результата, низкая - что будет подгонять любую задачу под известные и проверенные способы. Влияет на эффективность навыка "Планирование", также уменьшает штраф за изучение множества разнородных технологий.',
        ),
      },
      Endurance: {
        name: 'Выносливость',
        description: joinWithLineBreaks(
          'Выносливость',
          '',
          'Выносливость - запас сил инженера, определяет какую нагрузку он может вынести прежде чем ему потребуется отдых. Определяет количество очков запаса сил, влияет на эффективность использования навыка "Документация".',
        ),
      },
      Intelligence: {
        name: 'Интеллект',
        description: joinWithLineBreaks(
          'Интеллект',
          '',
          'Интеллект - важнейшая характеристика инженера, определяет способность выполнять умственную работу, использовать свои знания для нахождения верных решений. Влияет на эффективность применения навыка "Программирование", также высокий интеллект уменьшает вероятность ошибки при выполнении задачи.',
        ),
      },
      Wisdom: {
        name: 'Мудрость',
        description: joinWithLineBreaks(
          'Мудрость',
          '',
          'Мудрость - интуиция инженера, "чуйка" или шестое чувство. Помогает найти решение тогда, когда другими способами это не представляется возможным. Также определяет способность наперёд предвидеть последствия и нестандартные сценарии. Влияет на эффективность использования навыка "Отладка", увеличивает количество получаемых очков опыта.',
        ),
      },
      Charisma: {
        name: 'Харизма',
        description: joinWithLineBreaks(
          'Харизма',
          '',
          'Харизма - способность инженера ясно излагать свои мысли, убеждать, впечатлять, располагать на свою сторону. Повышает эффективность командной работы, помогает налаживать общение с заказчиком. Влияет на эффективность использования навыка "Коммуникация".',
        ),
      },
    },
    perks: {
      name: 'Способности',
      LiveIssue1: {
        name: 'Лайв ишью I',
        description: joinWithLineBreaks(
          'Лайв ишью I',
          'Требования:',
          ' - Инженер поддержки уровень 1',
        ),
      },
      LiveIssue2: {
        name: 'Лайв ишью II',
        description: joinWithLineBreaks(
          'Лайв ишью II',
          'Требования:',
          ' - Инженер поддержки уровень 3',
        ),
      },
      LiveIssue3: {
        name: 'Лайв ишью III',
        description: joinWithLineBreaks(
          'Лайв ишью III',
          'Требования:',
          ' - Инженер поддержки уровень 5',
        ),
      },
      Review1: {
        name: 'Ревью I',
        description: joinWithLineBreaks(
          'Ревью I',
          'Требования:',
          ' - Ревьюер уровень 1',
        ),
      },
      Review2: {
        name: 'Ревью II',
        description: joinWithLineBreaks(
          'Ревью II',
          'Требования:',
          ' - Ревьюер уровень 3',
        ),
      },
      Review3: {
        name: 'Ревью III',
        description: joinWithLineBreaks(
          'Ревью III',
          'Требования:',
          ' - Ревьюер уровень 5',
        ),
      },
      Leadership1: {
        name: 'Лидерство I',
        description: joinWithLineBreaks(
          'Лидерство I',
          'Требования:',
          ' - Тимлид уровень 1',
        ),
      },
      Leadership2: {
        name: 'Лидерство II',
        description: joinWithLineBreaks(
          'Лидерство II',
          'Требования:',
          ' - Тимлид уровень 3',
        ),
      },
      Leadership3: {
        name: 'Лидерство III',
        description: joinWithLineBreaks(
          'Лидерство III',
          'Требования:',
          ' - Тимлид уровень 5',
        ),
      },
      Algorithms1: {
        name: 'Знание алгоритмов I',
        description: joinWithLineBreaks(
          'Знание алгоритмов I',
          '',
          '',
        ),
      },
      Algorithms2: {
        name: 'Знание алгоритмов II',
        description: joinWithLineBreaks(
          'Знание алгоритмов II',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      Algorithms3: {
        name: 'Знание алгоритмов III',
        description: joinWithLineBreaks(
          'Знание алгоритмов III',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      Patterns1: {
        name: 'Знание паттернов I',
        description: joinWithLineBreaks(
          'Знание паттернов I',
          '',
          '',
        ),
      },
      Patterns2: {
        name: 'Знание паттернов II',
        description: joinWithLineBreaks(
          'Знание паттернов II',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      Patterns3: {
        name: 'Знание паттернов III',
        description: joinWithLineBreaks(
          'Знание паттернов III',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      Experience1: {
        name: 'Опыт I',
        description: joinWithLineBreaks(
          'Опыт I',
          'Требования:',
          ' - Уровень 8 или Уровень 5 и Ревьюер уровень 1',
        ),
      },
      Experience2: {
        name: 'Опыт II',
        description: joinWithLineBreaks(
          'Опыт II',
          'Требования:',
          ' - Уровень 13 или Уровень 10 и Ревьюер уровень 3',
        ),
      },
      Experience3: {
        name: 'Опыт III',
        description: joinWithLineBreaks(
          'Опыт III',
          'Требования:',
          ' - Уровень 18 или Уровень 15 и Ревьюер уровень 5',
        ),
      },
      Boldness1: {
        name: 'Кураж I',
        description: joinWithLineBreaks(
          'Кураж I',
          'Требования:',
          ' - Сила 12',
        ),
      },
      Boldness2: {
        name: 'Кураж II',
        description: joinWithLineBreaks(
          'Кураж II',
          'Требования:',
          ' - Уровень 5',
          ' - Сила 15',
        ),
      },
      Boldness3: {
        name: 'Кураж III',
        description: joinWithLineBreaks(
          'Кураж III',
          'Требования:',
          ' - Уровень 10',
          ' - Сила 18',
        ),
      },
      Concentration1: {
        name: 'Концентрация I',
        description: joinWithLineBreaks(
          'Концентрация I',
          'Требования:',
          ' - Сила 12',
        ),
      },
      Concentration2: {
        name: 'Концентрация II',
        description: joinWithLineBreaks(
          'Концентрация II',
          'Требования:',
          ' - Уровень 5',
          ' - Сила 15',
        ),
      },
      Concentration3: {
        name: 'Концентрация III',
        description: joinWithLineBreaks(
          'Концентрация III',
          'Требования:',
          ' - Уровень 10',
          ' - Сила 18',
        ),
      },
      Multitasking1: {
        name: 'Мультизадачность I',
        description: joinWithLineBreaks(
          'Мультизадачность I',
          'Требования:',
          ' - Ловкость 12',
        ),
      },
      Multitasking2: {
        name: 'Мультизадачность II',
        description: joinWithLineBreaks(
          'Мультизадачность II',
          'Требования:',
          ' - Уровень 5',
          ' - Ловкость 15',
        ),
      },
      Multitasking3: {
        name: 'Мультизадачность III',
        description: joinWithLineBreaks(
          'Мультизадачность III',
          'Требования:',
          ' - Уровень 10',
          ' - Ловкость 18',
        ),
      },
      Experiment1: {
        name: 'Экспериментатор I',
        description: joinWithLineBreaks(
          'Экспериментатор I',
          'Требования:',
          ' - Ловкость 12',
        ),
      },
      Experiment2: {
        name: 'Экспериментатор II',
        description: joinWithLineBreaks(
          'Экспериментатор II',
          'Требования:',
          ' - Уровень 5',
          ' - Ловкость 15',
        ),
      },
      Experiment3: {
        name: 'Экспериментатор III',
        description: joinWithLineBreaks(
          'Экспериментатор III',
          'Требования:',
          ' - Уровень 10',
          ' - Ловкость 18',
        ),
      },
      Quality1: {
        name: 'Качество I',
        description: joinWithLineBreaks(
          'Качество I',
          'Требования:',
          ' - Выносливость 12',
        ),
      },
      Quality2: {
        name: 'Качество II',
        description: joinWithLineBreaks(
          'Качество II',
          'Требования:',
          ' - Уровень 5',
          ' - Выносливость 15',
        ),
      },
      Quality3: {
        name: 'Качество III',
        description: joinWithLineBreaks(
          'Качество III',
          'Требования:',
          ' - Уровень 10',
          ' - Выносливость 18',
        ),
      },
      Persistence1: {
        name: 'Стойкость I',
        description: joinWithLineBreaks(
          'Стойкость I',
          'Требования:',
          ' - Выносливость 12',
        ),
      },
      Persistence2: {
        name: 'Стойкость II',
        description: joinWithLineBreaks(
          'Стойкость II',
          'Требования:',
          ' - Уровень 5',
          ' - Выносливость 15',
        ),
      },
      Persistence3: {
        name: 'Стойкость III',
        description: joinWithLineBreaks(
          'Стойкость III',
          'Требования:',
          ' - Уровень 10',
          ' - Выносливость 18',
        ),
      },
      BasicKnowledge1: {
        name: 'Фундаментальные знания I',
        description: joinWithLineBreaks(
          'Фундаментальные знания I',
          'Требования:',
          ' - Интеллект 12',
        ),
      },
      BasicKnowledge2: {
        name: 'Фундаментальные знания II',
        description: joinWithLineBreaks(
          'Фундаментальные знания II',
          'Требования:',
          ' - Уровень 5',
          ' - Интеллект 15',
        ),
      },
      BasicKnowledge3: {
        name: 'Фундаментальные знания III',
        description: joinWithLineBreaks(
          'Фундаментальные знания III',
          'Требования:',
          ' - Уровень 10',
          ' - Интеллект 18',
        ),
      },
      ExactCalculation1: {
        name: 'Точный расчет I',
        description: joinWithLineBreaks(
          'Точный расчет I',
          'Требования:',
          ' - Интеллект 12',
        ),
      },
      ExactCalculation2: {
        name: 'Точный расчет II',
        description: joinWithLineBreaks(
          'Точный расчет II',
          'Требования:',
          ' - Уровень 5',
          ' - Интеллект 15',
        ),
      },
      ExactCalculation3: {
        name: 'Точный расчет III',
        description: joinWithLineBreaks(
          'Точный расчет III',
          'Требования:',
          ' - Уровень 10',
          ' - Интеллект 18',
        ),
      },
      Rethinking1: {
        name: 'Переосмысление I',
        description: joinWithLineBreaks(
          'Переосмысление I',
          'Требования:',
          ' - Мудрость 12',
        ),
      },
      Rethinking2: {
        name: 'Переосмысление II',
        description: joinWithLineBreaks(
          'Переосмысление II',
          'Требования:',
          ' - Уровень 5',
          ' - Мудрость 15',
        ),
      },
      Rethinking3: {
        name: 'Переосмысление III',
        description: joinWithLineBreaks(
          'Переосмысление III',
          'Требования:',
          ' - Уровень 10',
          ' - Мудрость 18',
        ),
      },
      Guesswork1: {
        name: 'Метод тыка I',
        description: joinWithLineBreaks(
          'Метод тыка I',
          'Требования:',
          ' - Мудрость 12',
        ),
      },
      Guesswork2: {
        name: 'Метод тыка II',
        description: joinWithLineBreaks(
          'Метод тыка II',
          'Требования:',
          ' - Уровень 5',
          ' - Мудрость 15',
        ),
      },
      Guesswork3: {
        name: 'Метод тыка III',
        description: joinWithLineBreaks(
          'Метод тыка III',
          'Требования:',
          ' - Уровень 10',
          ' - Мудрость 18',
        ),
      },
      ExperienceExchange1: {
        name: 'Обмен опытом I',
        description: joinWithLineBreaks(
          'Обмен опытом I',
          'Требования:',
          ' - Харизма 12',
        ),
      },
      ExperienceExchange2: {
        name: 'Обмен опытом II',
        description: joinWithLineBreaks(
          'Обмен опытом II',
          'Требования:',
          ' - Уровень 5',
          ' - Харизма 15',
        ),
      },
      ExperienceExchange3: {
        name: 'Обмен опытом III',
        description: joinWithLineBreaks(
          'Обмен опытом III',
          'Требования:',
          ' - Уровень 10',
          ' - Харизма 18',
        ),
      },
      Pride1: {
        name: 'Тщеславие I',
        description: joinWithLineBreaks(
          'Тщеславие I',
          'Требования:',
          ' - Харизма 12',
        ),
      },
      Pride2: {
        name: 'Тщеславие II',
        description: joinWithLineBreaks(
          'Тщеславие II',
          'Требования:',
          ' - Уровень 5',
          ' - Харизма 15',
        ),
      },
      Pride3: {
        name: 'Тщеславие III',
        description: joinWithLineBreaks(
          'Тщеславие III',
          'Требования:',
          ' - Уровень 10',
          ' - Харизма 18',
        ),
      },
    },
    skills: {
      name: 'Навыки',
      roleAttachedLabel: 'Классовый навык',
      roleNotAttachedLabel: 'Неклассовый навык',
      Communication: {
        name: 'Коммуникация',
        description: joinWithLineBreaks(
          'Коммуникация',
          '',
          'Базовая характеристика: Харизма',
          '',
          'Деловая коммуникация – это взаимодействие в сфере официальных отношений, целью которого является решение конкретных задач, достижение определенных результатов, оптимизация какой-либо деятельности. Высокий навык коммуникации означает что общение будет результативным и цель будет достигнута, низкая - что на переговоры лучше отправить кого-нибудь другого.',
        ),
      },
      Planning: {
        name: 'Планирование',
        description: joinWithLineBreaks(
          'Планирование',
          '',
          'Базовая характеристика: Ловкость',
          '',
          'Планирование включает в себя постановку целей и задач, выявление необходимых ресурсов и их источников, составление программы действий, учет возможных сложностей и форс мажоров. Высокий навык планирования означает стабильную работу и гарантированный результат, низкий приводит к непредсказуемости и срыву задачи из-за непредвиденных сложностей или случайностей.',
        ),
      },
      Debugging: {
        name: 'Отладка',
        description: joinWithLineBreaks(
          'Отладка',
          '',
          'Базовая характеристика: Мудрость',
          '',
          'Отладка - процесс выявления и устранения ошибок в продукте. Высокий навык означает что инженер может обнаружить потенциальный или реальный дефект в продукте и быстро найти решение, которое не приведет к негативным последствиям. Низкий навык означает что инженер потратит полдня на то чтобы воспроизвести дефект, потом напишет костыль который если и ничего не сломает, то потребует дальнейшей доработки инженером с более высоким навыком.',
        ),
      },
      Discipline: {
        name: 'Дисциплина',
        description: joinWithLineBreaks(
          'Дисциплина',
          '',
          'Базовая характеристика: Сила',
          '',
          'Злейший враг эффективной работы это лень. Поддавшись действию лени инженер теряет концентрацию, допускает ошибки, выполняет задачи хуже чем они могли бы быть сделаны. Каждому действию персонажа предшествует проверка, определяющая поддался ли он действию лени. Если результат меньше класса сложности задачи время выполнения задачи, увеличивается на 20% и показатель качества результата падает на 1 ступень за каждые 10 пунктов разницы с округлением в большую сторону. Навык "Дисциплина" определяет насколько успешно персонаж выполняет эту проверку.',
        ),
      },
      Documenting: {
        name: 'Документиция',
        description: joinWithLineBreaks(
          'Документиция',
          '',
          'Базовая характеристика: Выносливость',
          '',
          'Документация может быть технической и пользовательской. Техническая нужна инженерам для лучшего понимания продукта и как следствие лучшего качества и скорости работы. Пользовательская помогает быстрее освоить продукт и тем самым создает более приятный опыт для пользователя. Хорошая документация на вес золота, а плохая - ещё хуже чем никакой.',
        ),
      },
      Programming: {
        name: 'Программирование',
        description: joinWithLineBreaks(
          'Программирование',
          '',
          'Базовая характеристика: Интеллект',
          '',
          'Навык программирования включает в себя владение различными инструментами разработчика, знание и применение эффективных способов и практик, знание принципов и понятий программирования.',
        ),
      },
    },
    technologies: {
      name: 'Технологии',
      groups: {
        Frontend: {
          name: 'Frontend',
        },
        FrontendFramework: {
          name: 'Frontend фреймворк',
        },
        Backend: {
          name: 'Backend',
        },
        DBMS: {
          name: 'СУБД',
        },
        VCS: {
          name: 'VCS',
        },
      },
      JavaScript1: {
        name: 'JavaScript уровень 1',
        summary: joinWithLineBreaks(
          'JavaScript уровень 1',
        ),
      },
      JavaScript2: {
        name: 'JavaScript уровень 2',
        summary: joinWithLineBreaks(
          'JavaScript уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      JavaScript3: {
        name: 'JavaScript уровень 3',
        summary: joinWithLineBreaks(
          'JavaScript уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      JavaScript4: {
        name: 'JavaScript уровень 4',
        summary: joinWithLineBreaks(
          'JavaScript уровень 4',
          'Требования:',
          ' - Уровень 9',
        ),
      },
      JavaScript5: {
        name: 'JavaScript уровень 5',
        summary: joinWithLineBreaks(
          'JavaScript уровень 5',
          'Требования:',
          ' - Уровень 15',
        ),
      },
      Dart1: {
        name: 'Dart уровень 1',
        summary: joinWithLineBreaks(
          'Dart уровень 1',
          'Требования:',
          ' - JavaScript уровень 3',
        ),
      },
      Dart2: {
        name: 'Dart уровень 2',
        summary: joinWithLineBreaks(
          'Dart уровень 2',
          'Требования:',
          ' - JavaScript уровень 4',
        ),
      },
      Dart3: {
        name: 'Dart уровень 3',
        summary: joinWithLineBreaks(
          'Dart уровень 3',
          'Требования:',
          ' - JavaScript уровень 5',
        ),
      },
      TypeScript1: {
        name: 'TypeScript уровень 1',
        summary: joinWithLineBreaks(
          'TypeScript уровень 1',
          'Требования:',
          ' - JavaScript уровень 3',
        ),
      },
      TypeScript2: {
        name: 'TypeScript уровень 2',
        summary: joinWithLineBreaks(
          'TypeScript уровень 2',
          'Требования:',
          ' - JavaScript уровень 4',
        ),
      },
      TypeScript3: {
        name: 'TypeScript уровень 3',
        summary: joinWithLineBreaks(
          'TypeScript уровень 3',
          'Требования:',
          ' - JavaScript уровень 5',
        ),
      },
      ScalaJS1: {
        name: 'Scala JS уровень 1',
        summary: joinWithLineBreaks(
          'Scala JS уровень 1',
          'Требования:',
          ' - JavaScript уровень 3',
        ),
      },
      ScalaJS2: {
        name: 'Scala JS уровень 2',
        summary: joinWithLineBreaks(
          'Scala JS уровень 2',
          'Требования:',
          ' - JavaScript уровень 4',
        ),
      },
      ScalaJS3: {
        name: 'Scala JS уровень 3',
        summary: joinWithLineBreaks(
          'Scala JS уровень 3',
          'Требования:',
          ' - JavaScript уровень 5',
        ),
      },
      CoffeeScript1: {
        name: 'CoffeeScript уровень 1',
        summary: joinWithLineBreaks(
          'CoffeeScript уровень 1',
          'Требования:',
          ' - JavaScript уровень 3',
        ),
      },
      CoffeeScript2: {
        name: 'CoffeeScript уровень 2',
        summary: joinWithLineBreaks(
          'CoffeeScript уровень 2',
          'Требования:',
          ' - JavaScript уровень 4',
        ),
      },
      CoffeeScript3: {
        name: 'CoffeeScript уровень 3',
        summary: joinWithLineBreaks(
          'CoffeeScript уровень 3',
          'Требования:',
          ' - JavaScript уровень 5',
        ),
      },
      HTML1: {
        name: 'HTML уровень 1',
        summary: joinWithLineBreaks(
          'HTML уровень 1',
        ),
      },
      HTML2: {
        name: 'HTML уровень 2',
        summary: joinWithLineBreaks(
          'HTML уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      HTML3: {
        name: 'HTML уровень 3',
        summary: joinWithLineBreaks(
          'HTML уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      HTML4: {
        name: 'HTML уровень 4',
        summary: joinWithLineBreaks(
          'HTML уровень 4',
          'Требования:',
          ' - Уровень 9',
        ),
      },
      Handlebars1: {
        name: 'Handlebars уровень 1',
        summary: joinWithLineBreaks(
          'Handlebars уровень 1',
          'Требования:',
          ' - HTML уровень 2',
        ),
      },
      Handlebars2: {
        name: 'Handlebars уровень 2',
        summary: joinWithLineBreaks(
          'Handlebars уровень 2',
          'Требования:',
          ' - HTML уровень 3',
        ),
      },
      HAML1: {
        name: 'HAML уровень 1',
        summary: joinWithLineBreaks(
          'HAML уровень 1',
          'Требования:',
          ' - HTML уровень 2',
        ),
      },
      HAML2: {
        name: 'HAML уровень 2',
        summary: joinWithLineBreaks(
          'HAML уровень 2',
          'Требования:',
          ' - HTML уровень 3',
        ),
      },
      CSS1: {
        name: 'CSS уровень 1',
        summary: joinWithLineBreaks(
          'CSS уровень 1',
        ),
      },
      CSS2: {
        name: 'CSS уровень 2',
        summary: joinWithLineBreaks(
          'CSS уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      CSS3: {
        name: 'CSS уровень 3',
        summary: joinWithLineBreaks(
          'CSS уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      CSS4: {
        name: 'CSS уровень 4',
        summary: joinWithLineBreaks(
          'CSS уровень 4',
          'Требования:',
          ' - Уровень 9',
        ),
      },
      SASS1: {
        name: 'SASS уровень 1',
        summary: joinWithLineBreaks(
          'SASS уровень 1',
          'Требования:',
          ' - CSS уровень 2',
        ),
      },
      SASS2: {
        name: 'SASS уровень 2',
        summary: joinWithLineBreaks(
          'SASS уровень 2',
          'Требования:',
          ' - CSS уровень 3',
        ),
      },
      LESS1: {
        name: 'LESS уровень 1',
        summary: joinWithLineBreaks(
          'LESS уровень 1',
          'Требования:',
          ' - CSS уровень 2',
        ),
      },
      LESS2: {
        name: 'LESS уровень 2',
        summary: joinWithLineBreaks(
          'LESS уровень 2',
          'Требования:',
          ' - CSS уровень 3',
        ),
      },
      Stylus1: {
        name: 'Stylus уровень 1',
        summary: joinWithLineBreaks(
          'Stylus уровень 1',
          'Требования:',
          ' - CSS уровень 2',
        ),
      },
      Stylus2: {
        name: 'Stylus уровень 2',
        summary: joinWithLineBreaks(
          'Stylus уровень 2',
          'Требования:',
          ' - CSS уровень 3',
        ),
      },
      PostCSS1: {
        name: 'PostCSS уровень 1',
        summary: joinWithLineBreaks(
          'PostCSS уровень 1',
          'Требования:',
          ' - CSS уровень 2',
        ),
      },
      PostCSS2: {
        name: 'PostCSS уровень 2',
        summary: joinWithLineBreaks(
          'PostCSS уровень 2',
          'Требования:',
          ' - CSS уровень 3',
        ),
      },
      VueJS1: {
        name: 'Vue JS уровень 1',
        summary: joinWithLineBreaks(
          'Vue JS уровень 1',
          'Требования:',
          ' - JavaScript уровень 2',
        ),
      },
      VueJS2: {
        name: 'Vue JS уровень 2',
        summary: joinWithLineBreaks(
          'Vue JS уровень 2',
          'Требования:',
          ' - JavaScript уровень 3',
        ),
      },
      VueJS3: {
        name: 'Vue JS уровень 3',
        summary: joinWithLineBreaks(
          'Vue JS уровень 3',
          'Требования:',
          ' - JavaScript уровень 4',
        ),
      },
      AngularJS1: {
        name: 'Angular JS уровень 1',
        summary: joinWithLineBreaks(
          'Angular JS уровень 1',
          'Требования:',
          ' - JavaScript уровень 2',
        ),
      },
      AngularJS2: {
        name: 'Angular JS уровень 2',
        summary: joinWithLineBreaks(
          'Angular JS уровень 2',
          'Требования:',
          ' - JavaScript уровень 3',
        ),
      },
      AngularJS3: {
        name: 'Angular JS уровень 3',
        summary: joinWithLineBreaks(
          'Angular JS уровень 3',
          'Требования:',
          ' - JavaScript уровень 4',
        ),
      },
      React1: {
        name: 'React уровень 1',
        summary: joinWithLineBreaks(
          'React уровень 1',
          'Требования:',
          ' - JavaScript уровень 2',
        ),
      },
      React2: {
        name: 'React уровень 2',
        summary: joinWithLineBreaks(
          'React уровень 2',
          'Требования:',
          ' - JavaScript уровень 3',
        ),
      },
      React3: {
        name: 'React уровень 3',
        summary: joinWithLineBreaks(
          'React уровень 3',
          'Требования:',
          ' - JavaScript уровень 4',
        ),
      },
      EmberJS1: {
        name: 'Ember JS уровень 1',
        summary: joinWithLineBreaks(
          'Ember JS уровень 1',
          'Требования:',
          ' - JavaScript уровень 2',
        ),
      },
      EmberJS2: {
        name: 'Ember JS уровень 2',
        summary: joinWithLineBreaks(
          'Ember JS уровень 2',
          'Требования:',
          ' - JavaScript уровень 3',
        ),
      },
      EmberJS3: {
        name: 'Ember JS уровень 3',
        summary: joinWithLineBreaks(
          'Ember JS уровень 3',
          'Требования:',
          ' - JavaScript уровень 4',
        ),
      },
      BackboneJS1: {
        name: 'Backbone JS уровень 1',
        summary: joinWithLineBreaks(
          'Backbone JS уровень 1',
          'Требования:',
          ' - JavaScript уровень 2',
        ),
      },
      BackboneJS2: {
        name: 'Backbone JS уровень 2',
        summary: joinWithLineBreaks(
          'Backbone JS уровень 2',
          'Требования:',
          ' - JavaScript уровень 3',
        ),
      },
      BackboneJS3: {
        name: 'Backbone JS уровень 3',
        summary: joinWithLineBreaks(
          'Backbone JS уровень 3',
          'Требования:',
          ' - JavaScript уровень 4',
        ),
      },
      KnockoutJS1: {
        name: 'Knockout JS уровень 1',
        summary: joinWithLineBreaks(
          'Knockout JS уровень 1',
          'Требования:',
          ' - JavaScript уровень 2',
        ),
      },
      KnockoutJS2: {
        name: 'Knockout JS уровень 2',
        summary: joinWithLineBreaks(
          'Knockout JS уровень 2',
          'Требования:',
          ' - JavaScript уровень 3',
        ),
      },
      KnockoutJS3: {
        name: 'Knockout JS уровень 3',
        summary: joinWithLineBreaks(
          'Knockout JS уровень 3',
          'Требования:',
          ' - JavaScript уровень 4',
        ),
      },
      Rails1: {
        name: 'Rails уровень 1',
        summary: joinWithLineBreaks(
          'Rails уровень 1',
        ),
      },
      Rails2: {
        name: 'Rails уровень 2',
        summary: joinWithLineBreaks(
          'Rails уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      Rails3: {
        name: 'Rails уровень 3',
        summary: joinWithLineBreaks(
          'Rails уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      Rails4: {
        name: 'Rails уровень 4',
        summary: joinWithLineBreaks(
          'Rails уровень 4',
          'Требования:',
          ' - Уровень 9',
        ),
      },
      Rails5: {
        name: 'Rails уровень 5',
        summary: joinWithLineBreaks(
          'Rails уровень 5',
          'Требования:',
          ' - Уровень 15',
        ),
      },
      NodeJS1: {
        name: 'Node JS уровень 1',
        summary: joinWithLineBreaks(
          'Node JS уровень 1',
          'Требования:',
          ' - JavaScript уровень 2',
        ),
      },
      NodeJS2: {
        name: 'Node JS уровень 2',
        summary: joinWithLineBreaks(
          'Node JS уровень 2',
          'Требования:',
          ' - JavaScript уровень 3',
        ),
      },
      NodeJS3: {
        name: 'Node JS уровень 3',
        summary: joinWithLineBreaks(
          'Node JS уровень 3',
          'Требования:',
          ' - JavaScript уровень 4',
        ),
      },
      Java1: {
        name: 'Java уровень 1',
        summary: joinWithLineBreaks(
          'Java уровень 1',
        ),
      },
      Java2: {
        name: 'Java уровень 2',
        summary: joinWithLineBreaks(
          'Java уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      Java3: {
        name: 'Java уровень 3',
        summary: joinWithLineBreaks(
          'Java уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      Java4: {
        name: 'Java уровень 4',
        summary: joinWithLineBreaks(
          'Java уровень 4',
          'Требования:',
          ' - Уровень 9',
        ),
      },
      Java5: {
        name: 'Java уровень 5',
        summary: joinWithLineBreaks(
          'Java уровень 5',
          'Требования:',
          ' - Уровень 15',
        ),
      },
      Python1: {
        name: 'Python уровень 1',
        summary: joinWithLineBreaks(
          'Python уровень 1',
        ),
      },
      Python2: {
        name: 'Python уровень 2',
        summary: joinWithLineBreaks(
          'Python уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      Python3: {
        name: 'Python уровень 3',
        summary: joinWithLineBreaks(
          'Python уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      Python4: {
        name: 'Python уровень 4',
        summary: joinWithLineBreaks(
          'Python уровень 4',
          'Требования:',
          ' - Уровень 9',
        ),
      },
      Python5: {
        name: 'Python уровень 5',
        summary: joinWithLineBreaks(
          'Python уровень 5',
          'Требования:',
          ' - Уровень 15',
        ),
      },
      PHP1: {
        name: 'PHP уровень 1',
        summary: joinWithLineBreaks(
          'PHP уровень 1',
        ),
      },
      PHP2: {
        name: 'PHP уровень 2',
        summary: joinWithLineBreaks(
          'PHP уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      PHP3: {
        name: 'PHP уровень 3',
        summary: joinWithLineBreaks(
          'PHP уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      PHP4: {
        name: 'PHP уровень 4',
        summary: joinWithLineBreaks(
          'PHP уровень 4',
          'Требования:',
          ' - Уровень 9',
        ),
      },
      PHP5: {
        name: 'PHP уровень 5',
        summary: joinWithLineBreaks(
          'PHP уровень 5',
          'Требования:',
          ' - Уровень 15',
        ),
      },
      CPlusPlus1: {
        name: 'C++ уровень 1',
        summary: joinWithLineBreaks(
          'C++ уровень 1',
        ),
      },
      CPlusPlus2: {
        name: 'C++ уровень 2',
        summary: joinWithLineBreaks(
          'C++ уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      CPlusPlus3: {
        name: 'C++ уровень 3',
        summary: joinWithLineBreaks(
          'C++ уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      CPlusPlus4: {
        name: 'C++ уровень 4',
        summary: joinWithLineBreaks(
          'C++ уровень 4',
          'Требования:',
          ' - Уровень 9',
        ),
      },
      CPlusPlus5: {
        name: 'C++ уровень 5',
        summary: joinWithLineBreaks(
          'C++ уровень 5',
          'Требования:',
          ' - Уровень 15',
        ),
      },
      CSharp1: {
        name: 'C# уровень 1',
        summary: joinWithLineBreaks(
          'C# уровень 1',
        ),
      },
      CSharp2: {
        name: 'C# уровень 2',
        summary: joinWithLineBreaks(
          'C# уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      CSharp3: {
        name: 'C# уровень 3',
        summary: joinWithLineBreaks(
          'C# уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      CSharp4: {
        name: 'C# уровень 4',
        summary: joinWithLineBreaks(
          'C# уровень 4',
          'Требования:',
          ' - Уровень 9',
        ),
      },
      CSharp5: {
        name: 'C# уровень 5',
        summary: joinWithLineBreaks(
          'C# уровень 5',
          'Требования:',
          ' - Уровень 15',
        ),
      },
      MySQL1: {
        name: 'MySQL уровень 1',
        summary: joinWithLineBreaks(
          'MySQL уровень 1',
        ),
      },
      MySQL2: {
        name: 'MySQL уровень 2',
        summary: joinWithLineBreaks(
          'MySQL уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      MySQL3: {
        name: 'MySQL уровень 3',
        summary: joinWithLineBreaks(
          'MySQL уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      MySQL4: {
        name: 'MySQL уровень 4',
        summary: joinWithLineBreaks(
          'MySQL уровень 4',
          'Требования:',
          ' - Уровень 9',
        ),
      },
      PostgreSQL1: {
        name: 'PostgreSQL уровень 1',
        summary: joinWithLineBreaks(
          'PostgreSQL уровень 1',
        ),
      },
      PostgreSQL2: {
        name: 'PostgreSQL уровень 2',
        summary: joinWithLineBreaks(
          'PostgreSQL уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      PostgreSQL3: {
        name: 'PostgreSQL уровень 3',
        summary: joinWithLineBreaks(
          'PostgreSQL уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      PostgreSQL4: {
        name: 'PostgreSQL уровень 4',
        summary: joinWithLineBreaks(
          'PostgreSQL уровень 4',
          'Требования:',
          ' - Уровень 9',
        ),
      },
      MongoDB1: {
        name: 'MongoDB уровень 1',
        summary: joinWithLineBreaks(
          'MongoDB уровень 1',
        ),
      },
      MongoDB2: {
        name: 'MongoDB уровень 2',
        summary: joinWithLineBreaks(
          'MongoDB уровень 2',
        ),
      },
      MongoDB3: {
        name: 'MongoDB уровень 3',
        summary: joinWithLineBreaks(
          'MongoDB уровень 3',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      SQLite1: {
        name: 'SQLite уровень 1',
        summary: joinWithLineBreaks(
          'SQLite уровень 1',
        ),
      },
      SQLite2: {
        name: 'SQLite уровень 2',
        summary: joinWithLineBreaks(
          'SQLite уровень 2',
        ),
      },
      SQLite3: {
        name: 'SQLite уровень 3',
        summary: joinWithLineBreaks(
          'SQLite уровень 3',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      OracleDatabase1: {
        name: 'Oracle Database уровень 1',
        summary: joinWithLineBreaks(
          'Oracle Database уровень 1',
        ),
      },
      OracleDatabase2: {
        name: 'Oracle Database уровень 2',
        summary: joinWithLineBreaks(
          'Oracle Database уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      OracleDatabase3: {
        name: 'Oracle Database уровень 3',
        summary: joinWithLineBreaks(
          'Oracle Database уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      OracleDatabase4: {
        name: 'Oracle Database уровень 4',
        summary: joinWithLineBreaks(
          'Oracle Database уровень 4',
          'Требования:',
          ' - Уровень 9',
        ),
      },
      Git1: {
        name: 'Git уровень 1',
        summary: joinWithLineBreaks(
          'Git уровень 1',
        ),
      },
      Git2: {
        name: 'Git уровень 2',
        summary: joinWithLineBreaks(
          'Git уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      Git3: {
        name: 'Git уровень 3',
        summary: joinWithLineBreaks(
          'Git уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      SVN1: {
        name: 'SVN уровень 1',
        summary: joinWithLineBreaks(
          'SVN уровень 1',
        ),
      },
      SVN2: {
        name: 'SVN уровень 2',
        summary: joinWithLineBreaks(
          'SVN уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      SVN3: {
        name: 'SVN уровень 3',
        summary: joinWithLineBreaks(
          'SVN уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
      },
      Mercurial1: {
        name: 'Mercurial уровень 1',
        summary: joinWithLineBreaks(
          'Mercurial уровень 1',
        ),
      },
      Mercurial2: {
        name: 'Mercurial уровень 2',
        summary: joinWithLineBreaks(
          'Mercurial уровень 2',
          'Требования:',
          ' - Уровень 3',
        ),
      },
      Mercurial3: {
        name: 'Mercurial уровень 3',
        summary: joinWithLineBreaks(
          'Mercurial уровень 3',
          'Требования:',
          ' - Уровень 5',
        ),
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
