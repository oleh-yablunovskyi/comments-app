import { CommentType } from '../types/CommentType';
import { commentsFromServer } from '../mockup_data/comments';

const loadTopComments = (): CommentType[] => {
  return commentsFromServer.filter(c => c.parentId === null);
};

const loadCommentsByParentId = (parentId: number | null): CommentType[] => {
  if (!parentId) {
    return [];
  }

  return commentsFromServer
    .filter(comment => comment.parentId === parentId)
    .sort((a, b) => (
      new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
    ));
};

export const commentsApi = {
  loadTopComments,
  loadCommentsByParentId,
};
