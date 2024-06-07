export interface User {
  id: number;
  name: string;
  posts: Post[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
}