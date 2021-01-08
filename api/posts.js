async () => {
  const posts = await app.db
    .select('Posts', ['Data', 'Subject', 'userId']);
  if (posts) return { result: 'success', posts };
}
