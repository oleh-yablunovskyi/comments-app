/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './Comment.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import socket from '../../socket';
import { CommentType } from '../../types/CommentType';
import { commentsApi } from '../../api/comments';
import { CommentForm } from '../CommentForm/CommentForm';
import { ModalWindow } from '../ModalWindow/ModalWindow';

const BASE_URL = 'https://comments-app-server.onrender.com';

interface Props {
  comment: CommentType;
  level: number;
}

export const Comment: React.FC<Props> = React.memo(({ comment, level }) => {
  const [childrenComments, setChildrenComments] = useState<CommentType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isTextModalOpen, setTextModalOpen] = useState(false);
  const [textModalContent, setTextModalContent] = useState('File is empty');

  const { id, image_link, text_file_link } = comment;

  const loadChildrenComments = async () => {
    try {
      const comments = await commentsApi.getChildrenCommentsByID(id);

      setChildrenComments(comments);
    } catch (error) {
      console.error(`Error loading comments for comment with id ${id}:`, error);

      Notify.failure(
        `Error loading comments for comment with id ${id}. Please try again.`,
        { timeout: 5000 },
      );
    }
  };

  const loadTextFileContent = async (fileLink: string) => {
    try {
      const fileBlob = await commentsApi.getFile(fileLink);
      const text = await fileBlob.text();

      return text;
    } catch (error) {
      console.error('Error loading text file:', error);

      Notify.failure(
        'Error loading text file. Please try again.',
        { timeout: 5000 },
      );

      return '';
    }
  };

  useEffect(() => {
    loadChildrenComments();
  }, [id]);

  useEffect(() => {
    const handleNewComment = (newComment: CommentType) => {
      // Check if the new comment is a direct child of the current comment
      if (newComment.parent_comment_id === id) {
        setChildrenComments((prevComments) => [...prevComments, newComment]);
      }
    };

    // Add event listener for 'new_childComment' event from the WebSocket
    socket.on('new_childComment', handleNewComment);

    // Clean up the event listener when the component is unmounted
    return () => {
      socket.off('new_childComment', handleNewComment);
    };
  }, [id]);

  const handleImageClick = () => {
    setImageModalOpen(true);
  };

  const handleTextFileClick = async () => {
    setTextModalOpen(true);
    const text = await loadTextFileContent(`${text_file_link}`);

    setTextModalContent(text);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

  const closeTextModal = () => {
    setTextModalOpen(false);
  };

  return (
    <>
      <div className={`Comment Comment--level-${level}`}>
        <div className="Comment__wrapper">
          <img
            className="Comment__avatar"
            src={`https://avatars.dicebear.com/api/human/${comment.author.email}.svg`}
            alt="User avatar"
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
                    alt="Attached"
                    onClick={handleImageClick}
                  />
                )}

                {text_file_link && (
                  <div
                    className="Comment__fileIcon"
                    onClick={handleTextFileClick}
                  >
                  </div>
                )}
              </div>
            )}

            <>
              {isImageModalOpen && (
                <ModalWindow
                  isOpen={isImageModalOpen}
                  onClose={closeImageModal}
                  fileType="image"
                  fileSrc={`${BASE_URL}/${image_link}`}
                />
              )}

              {isTextModalOpen && (
                <ModalWindow
                  isOpen={isTextModalOpen}
                  onClose={closeTextModal}
                  fileType="text"
                  fileSrc={`${BASE_URL}/${text_file_link}`}
                  textContent={textModalContent}
                />
              )}
            </>
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
