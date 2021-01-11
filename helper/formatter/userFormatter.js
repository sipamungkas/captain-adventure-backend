const formatUser = (user, token) => {
  const formatter = {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
  return formatter;
};

module.exports = {formatUser};
