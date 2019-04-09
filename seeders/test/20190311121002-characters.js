module.exports = {
  up: queryInterface => queryInterface.bulkInsert('characters', [{
    id: 1,
    name: 'Thomas Anderson',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/ru/4/4c/Neo2.jpg',
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
      technologies: [1, 3, 7, 5, 12],
      perks: [1, 3, 7, 5, 12],
      availablePoints: {
        role: 0, attributes: 0, skills: 0, technologies: 0, perks: 0,
      },
    }),
  }, {
    id: 2,
    name: 'Антон Городецкий',
    avatar_url: 'https://vignette.wikia.nocookie.net/dozory/images/f/fd/Habensky_00000.jpg/revision/latest',
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
      technologies: [1, 3, 7, 5, 12],
      perks: [1, 3, 7, 5, 12],
      availablePoints: {
        role: 0, attributes: 0, skills: 0, technologies: 0, perks: 0,
      },
    }),
  }]),

  down: queryInterface => queryInterface.bulkDelete('characters'),
};
