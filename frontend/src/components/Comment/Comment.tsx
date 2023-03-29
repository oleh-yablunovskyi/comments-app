import React, { useEffect, useState } from 'react';
import './Comment.scss';
import { CommentType } from '../../types/CommentType';
import { commentsApi } from '../../api/comments';

interface Props {
  comment: CommentType;
  level: number;
}

export const Comment: React.FC<Props> = React.memo(({ comment, level }) => {
  const [commentsChildren, setCommentsChildren] = useState<CommentType[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setCommentsChildren(commentsApi.loadCommentsByParentId(comment.id));
  }, [comment.id]);

  return (
    <>
      <div className={`Comment Comment--level-${level}`}>
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

        <button
          type="button"
          className="Comment__answerButton"
          onClick={() => setShowForm((prevState) => !prevState)}
        >
          {showForm ? '— Answer' : 'Answer'}
        </button>
      </div>

      <>
        {commentsChildren.length > 0 && (
          <>
            {commentsChildren.map((childComment) => (
              <Comment
                comment={childComment}
                level={level < 10 ? level + 1 : level}
                key={childComment.id}
              />
            ))}
          </>
        )}
      </>
    </>
  );
});
