/**
 * This is for the Post structure
 */
export type Post = {
  prompt: string;
  tag: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  image?: string;
};

export type PostWithUser = Post & {
  _id: string;
  creator: User;
};
