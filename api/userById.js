async id => {
  const data = await app.db.select('SystemUsers', ['login'], { id });
  return { result: 'success', data };
};
