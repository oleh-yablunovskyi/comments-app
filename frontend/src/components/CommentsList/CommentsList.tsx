import React from 'react';
import { CommentType } from '../../types/CommentType';
import { Comment } from '../Comment/Comment';

interface Props {
  topComments: CommentType[];
}

export const CommentsList: React.FC<Props> = React.memo(({ topComments }) => {
  return (
    <div className="CommentsList">
      {topComments.map((topComment) => (
        <Comment
          comment={topComment}
          level={1}
          key={topComment.id}
        />
      ))}
    </div>
  );
});
