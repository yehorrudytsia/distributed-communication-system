async (user) => {
  const data = await app.sessions.getUser(user);
  return { result: 'success', data };
};
