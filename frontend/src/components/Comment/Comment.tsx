import React from 'react';
import './Comment.scss';
import { CommentType } from '../../types/CommentType';

interface Props {
  comment: CommentType;
}

export const Comment: React.FC<Props> = React.memo(({ comment }) => {
  return (
    <div className="Comment">
      <div className="Comment__wrapper">
        <img
          className="Comment__avatar"
          src={`https://avatars.dicebear.com/api/human/${comment.id}.svg`}
          alt=""
        />

        <div className="Comment__body">
          <div className="Comment__header">
            <span className="Comment__authorName">
              Anonym
            </span>

            <span className="Comment__date">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>

          <p className="Comment__text">
            {comment.text}
          </p>
        </div>
      </div>
    </div>
  );
});
