async (id) => {
  const fields = ['login'];
  id = id.userId;
  const data = await app.db.select('SystemUsers', fields, { id });
  return { result: 'success', data };
};
