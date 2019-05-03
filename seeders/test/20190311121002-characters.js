module.exports = {
  up: queryInterface => queryInterface.bulkInsert('characters', [{
    id: 1,
    name: 'Thomas Anderson',
    avatar_id: 'IT-Roleplay/avatar/default.jpg',
    author_id: 1,
    data: JSON.stringify({
      attributes: [
        { id: 1, value: 10 }, { id: 2, value: 14 }, { id: 3, value: 14 },
        { id: 4, value: 12 }, { id: 5, value: 16 }, { id: 6, value: 8 },
      ],
      roles: [{ id: 1, value: 10 }, { id: 2, value: 4 }],
      skills: [
        { id: 1, value: 10 }, { id: 2, value: 14 }, { id: 3, value: 14 },
        { id: 4, value: 12 }, { id: 5, value: 16 }, { id: 6, value: 8 },
      ],
      technologies: [1, 2, 3, 4, 5, 6],
      perks: [1, 2, 3, 4, 5],
      availablePoints: {
        roles: 0, attributes: 0, skills: 0, technologies: 0, perks: 0,
      },
    }),
  }, {
    id: 2,
    name: 'Антон Городецкий',
    avatar_id: 'IT-Roleplay/avatar/default.jpg',
    author_id: 1,
    data: JSON.stringify({
      attributes: [
        { id: 1, value: 10 }, { id: 2, value: 14 }, { id: 3, value: 14 },
        { id: 4, value: 12 }, { id: 5, value: 16 }, { id: 6, value: 8 },
      ],
      roles: [{ id: 1, value: 10 }, { id: 2, value: 4 }],
      skills: [
        { id: 1, value: 10 }, { id: 2, value: 14 }, { id: 3, value: 14 },
        { id: 4, value: 12 }, { id: 5, value: 16 }, { id: 6, value: 8 },
      ],
      technologies: [1, 2, 3, 4, 5, 6],
      perks: [1, 2, 3, 4, 5],
      availablePoints: {
        roles: 0, attributes: 0, skills: 0, technologies: 0, perks: 0,
      },
    }),
  }]),

  down: queryInterface => queryInterface.bulkDelete('characters'),
};
