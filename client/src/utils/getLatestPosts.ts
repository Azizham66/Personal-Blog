
export function getLatestPosts<T extends { createdAt: string | Date }>(
  posts: T[],
  count: number = 3
): T[] {
  return posts
    .slice() // copy so we don’t mutate original
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // newest first
    })
    .slice(0, count);
}

