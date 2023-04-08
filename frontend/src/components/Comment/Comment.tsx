/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './Comment.scss';
import { CommentType } from '../../types/CommentType';
import { commentsApi } from '../../api/comments';
import { CommentForm } from '../CommentForm/CommentForm';

const BASE_URL = 'https://comments-app-server.onrender.com';

interface Props {
  comment: CommentType;
  level: number;
}

export const Comment: React.FC<Props> = React.memo(({ comment, level }) => {
  const [childrenComments, setChildrenComments] = useState<CommentType[]>([]);
  const [showForm, setShowForm] = useState(false);

  const { id, image_link, text_file_link } = comment;

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

  const handleImageClick = (imageLink: string | null) => {
    if (imageLink) {
      window.open(`${BASE_URL}/${imageLink}`, '_blank');
    }
  };

  const handleTextFileClick = (textFileLink: string | null) => {
    if (textFileLink) {
      window.open(`${BASE_URL}/${textFileLink}`, '_blank');
    }
  };

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

            {(image_link || text_file_link) && (
              <div className="Comment__attachments">
                <span>Files attached:</span>

                {image_link && (
                  <img
                    className="Comment__attachedImage"
                    src={`${BASE_URL}/${image_link}`}
                    alt="Attachment"
                    onClick={() => handleImageClick(image_link)}
                  />
                )}

                {text_file_link && (
                  <div
                    className="Comment__fileIcon"
                    onClick={() => handleTextFileClick(text_file_link)}
                  >
                  </div>
                )}
              </div>
            )}
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
