async ({ userId, data, subject }) => {
  const record = { userId, data, subject };
  const queryResult = app.db
    .insert('Posts', record);
  if (queryResult) return { result: 'success' };
}
