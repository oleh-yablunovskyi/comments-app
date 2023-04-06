/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './App.scss';
import { CommentsList } from './components/CommentsList/CommentsList';
import { CommentForm } from './components/CommentForm/CommentForm';
import { Loader } from './components/Loader/Loader';
import { commentsApi } from './api/comments';
import { CommentType } from './types/CommentType';

export const App: React.FC = () => {
  const [topComments, setTopComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadTopComments = async () => {
    setIsLoading(true);

    try {
      const comments = await commentsApi.getTopComments();

      console.log('Loaded topComments:', comments);

      setTopComments(comments);
    } catch (error) {
      console.error('Error loading top comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTopComments();
  }, []);

  return (
    <div className="container">
      <div className="App">
        <h1 className="App__title">Comments</h1>

        <div className="App__main">
          {isLoading
            ? (
              <Loader />
            )
            : (
              <CommentsList topComments={topComments} />
            )}
        </div>

        <div className="App__bottom">
          <CommentForm onSubmitLoadComments={loadTopComments} />
        </div>
      </div>
    </div>
  );
};
