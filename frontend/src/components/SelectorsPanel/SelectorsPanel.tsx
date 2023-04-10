import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './SelectorsPanel.scss';
import { Selector } from '../Selector/Selector';

export const SelectorsPanel = () => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || 'created_at:desc';

  const sortByOptions = [
    ['user_name:asc', 'User name: A - Z'],
    ['user_name:desc', 'User name: Z - A'],
    ['email:asc', 'Email: A - Z'],
    ['email:desc', 'Email: Z - A'],
    ['created_at:desc', 'Newest first'],
    ['created_at:asc', 'Oldest first'],
  ];

  return (
    <div className="SelectorsPanel">
      <div className="SelectorsPanel__selector">
        <div className="SelectorsPanel__title">Sort by</div>

        <Selector
          options={sortByOptions}
          defaultValue={sortBy}
        />
      </div>
    </div>
  );
};
