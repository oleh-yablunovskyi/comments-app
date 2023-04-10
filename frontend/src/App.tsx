/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './App.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import socket from './socket';
import { CommentsList } from './components/CommentsList/CommentsList';
import { CommentForm } from './components/CommentForm/CommentForm';
import { Loader } from './components/Loader/Loader';
import { commentsApi } from './api/comments';
import { CommentType } from './types/CommentType';
import { SelectorsPanel } from './components/SelectorsPanel/SelectorsPanel';

export const App: React.FC = () => {
  const [topComments, setTopComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'created_at';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const currentPage = Number(searchParams.get('page')) || 1;

  const loadTopComments = async () => {
    setIsLoading(true);

    try {
      const comments = await commentsApi.getTopComments(sortBy, sortOrder, currentPage);

      console.log('Loaded topComments:', comments);

      setTopComments(comments);
    } catch (error) {
      console.error('Error loading top comments:', error);

      Notify.failure(
        'Error loading top comments. Please try again.',
        { timeout: 5000 },
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewComment = (newComment: CommentType) => {
    setTopComments((prevComments) => {
      const updatedComments = [...prevComments];

      const insertionIndex = updatedComments.findIndex((comment) => {
        let compareValueNewComment: any;
        let compareValueComment: any;

        switch (sortBy) {
          case 'user_name':
            compareValueNewComment = newComment.author.user_name.toLowerCase();
            compareValueComment = comment.author.user_name.toLowerCase();
            break;

          case 'email':
            compareValueNewComment = newComment.author.email;
            compareValueComment = comment.author.email;
            break;

          default:
            compareValueNewComment = newComment[sortBy as keyof CommentType];
            compareValueComment = comment[sortBy as keyof CommentType];
        }

        if (sortOrder === 'asc') {
          return compareValueNewComment < compareValueComment;
        }

        return compareValueNewComment > compareValueComment;
      });

      if (insertionIndex === -1) {
        updatedComments.push(newComment);
      } else if (insertionIndex < topComments.length) {
        // Only insert the new comment if it belongs on the current page
        updatedComments.splice(insertionIndex, 0, newComment);
      }

      return updatedComments;
    });
  };

  // First useEffect hook to handle WebSocket event
  useEffect(() => {
    // Add event listener for 'new_topComment' event from the WebSocket
    socket.on('new_topComment', handleNewComment);

    return () => {
    // Clean up the event listener when the component is unmounted
      socket.off('new_topComment');
    };
  }, [sortBy, sortOrder, topComments.length]);

  // Second useEffect hook to fetch data when sortBy or sortOrder change
  useEffect(() => {
    loadTopComments();
  }, [sortBy, sortOrder, currentPage]);

  return (
    <div className="container">
      <div className="App">
        <h1 className="App__title">Comments</h1>

        <div className="App__main">

          <SelectorsPanel />

          {isLoading
            ? (
              <Loader />
            )
            : (
              <CommentsList topComments={topComments} />
            )}
        </div>

        <div className="App__bottom">
          <CommentForm />
        </div>
      </div>
    </div>
  );
};
