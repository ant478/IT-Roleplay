const user = {
  id: 1,
  login: 'ant478',
  email: 'ant478@gmail.com',
  createdAt: '2019-02-21T14:54:42.779Z',
  updatedAt: '2019-02-21T14:54:42.779Z',
};

module.exports.register = function register(req, res) {
  res.status(201).json(user);
};

module.exports.login = function login(req, res) {
  res.status(200).json(user);
};

module.exports.logout = function logout(req, res) {
  res.status(200).json({ message: 'OK', code: 200 });
};
