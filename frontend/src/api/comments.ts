import { CommentType } from '../types/CommentType';
import { commentsFromServer } from '../mockup_data/comments';

const loadComments = (): CommentType[] => {
  return commentsFromServer.filter(c => c.parentId === null);
};

export const commentsApi = {
  loadComments,
};
