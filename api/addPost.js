async ({ userId, text, subject }) => {
  const record = { userId, text, subject };
  const queryResult = app.database
    .insert('Posts', record);
  if (queryResult) return { result: 'success' };
}
