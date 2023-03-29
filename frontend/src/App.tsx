import React, { useEffect, useState } from 'react';
import './App.scss';
import { CommentsList } from './components/CommentsList/CommentsList';
import { commentsFromServer } from './mockup_data/comments';
import { CommentType } from './types/CommentType';

export const App: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    setComments(commentsFromServer);
  }, []);

  return (
    <div className="container">
      <div className="App">
        <h1 className="App__title">Comments</h1>

        <div className="App__main">
          <CommentsList comments={comments} />
        </div>
      </div>
    </div>
  );
};
