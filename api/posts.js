async () => {
  const posts = await app.db
    .select('Posts', ['Data', 'Subject']);
  if (posts) return { result: 'success', posts };
}
