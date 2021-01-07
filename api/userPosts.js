async ({ userId }) => {
  const userPosts = await app.db
    .select('Posts', ['Data', 'Subject'], { userId });
  if (userPosts) return { result: 'success', userPosts };
}
