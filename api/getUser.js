async (user) => {
  const data = await app.storage.getUser(user);
  return { result: 'success', data };
};
