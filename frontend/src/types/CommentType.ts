export interface CommentType {
  id: number;
  parent_comment_id: number | null;
  user_id: number;
  text: string;
  created_at: string;
  image_link: string | null;
  text_file_link: string | null;
  author: UserType;
}

interface UserType {
  id: number;
  user_name: string;
  email: string;
  home_page: string | null;
}
