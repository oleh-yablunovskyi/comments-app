import React, { useEffect, useState } from 'react';
import './App.scss';
import { CommentsList } from './components/CommentsList/CommentsList';
import { commentsApi } from './api/comments';
import { CommentType } from './types/CommentType';

export const App: React.FC = () => {
  const [topComments, setTopComments] = useState<CommentType[]>([]);

  useEffect(() => {
    setTopComments(commentsApi.loadTopComments());
  }, []);

  return (
    <div className="container">
      <div className="App">
        <h1 className="App__title">Comments</h1>

        <div className="App__main">
          <CommentsList topComments={topComments} />
        </div>
      </div>
    </div>
  );
};
