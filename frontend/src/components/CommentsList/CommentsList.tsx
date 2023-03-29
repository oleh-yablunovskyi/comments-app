import React from 'react';
import { CommentType } from '../../types/CommentType';
import { Comment } from '../Comment/Comment';

interface Props {
  comments: CommentType[];
}

export const CommentsList: React.FC<Props> = React.memo(({ comments }) => {
  return (
    <div className="CommentsList">
      {comments.map((comment) => (
        <Comment
          comment={comment}
          key={comment.id}
        />
      ))}
    </div>
  );
});
