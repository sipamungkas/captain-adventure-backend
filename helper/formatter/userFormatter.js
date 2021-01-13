const formatUser = (user, token) => {
  const formatter = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    token,
  };
  return formatter;
};

module.exports = {formatUser};
