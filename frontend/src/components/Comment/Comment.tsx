/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './Comment.scss';
import { CommentType } from '../../types/CommentType';
import { commentsApi } from '../../api/comments';
import { CommentForm } from '../CommentForm/CommentForm';

interface Props {
  comment: CommentType;
  level: number;
}

export const Comment: React.FC<Props> = React.memo(({ comment, level }) => {
  const [childrenComments, setChildrenComments] = useState<CommentType[]>([]);
  const [showForm, setShowForm] = useState(false);

  const { id } = comment;

  const loadChildrenComments = async () => {
    try {
      const comments = await commentsApi.getChildrenCommentsByID(id);

      setChildrenComments(comments);
    } catch (error) {
      console.error(`Error loading comments for comment with id ${id}:`, error);
    }
  };

  useEffect(() => {
    loadChildrenComments();
  }, [id]);

  return (
    <>
      <div className={`Comment Comment--level-${level}`}>
        <div className="Comment__wrapper">
          <img
            className="Comment__avatar"
            src={`https://avatars.dicebear.com/api/human/${id}.svg`}
            alt=""
          />

          <div className="Comment__body">
            <div className="Comment__header">
              <span className="Comment__authorName">
                {comment.author.user_name}
              </span>

              <span className="Comment__date">
                {new Date(comment.created_at).toLocaleString()}
              </span>
            </div>

            <p
              className="Comment__text"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />
          </div>
        </div>

        <button
          type="button"
          className="Comment__answerButton"
          onClick={() => setShowForm((prevState) => !prevState)}
        >
          {showForm ? '— Answer' : 'Answer'}
        </button>

        {showForm && (
          <CommentForm
            onSubmitLoadComments={loadChildrenComments}
            onSubmitHideForm={() => setShowForm(false)}
            parentId={id.toString()}
          />
        )}
      </div>

      <>
        {childrenComments.length > 0 && (
          <>
            {childrenComments.map((childComment) => (
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
