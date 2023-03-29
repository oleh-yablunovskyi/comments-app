// export interface CommentType {
//   id: number;
//   parentId: number | null;
//   createdAt: string;
//   text: string;
// }

export interface CommentType {
  id: number;
  parentId: number | null;
  userId: number;
  text: string;
  createdAt: string;
  imageLink: string | null;
  textFileLink: string | null;
}
