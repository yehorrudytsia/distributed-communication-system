async ({ login, password, fullname }) => {
  const hash = await app.Crypto.hashPassword(password);
  await app.storage.registration(login, hash, fullname);
  return { result: 'success' };
};
