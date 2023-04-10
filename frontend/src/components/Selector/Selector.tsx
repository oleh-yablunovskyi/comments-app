import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './Selector.scss';
import { getSearchWith } from '../../helpers/getSearchWith';

type Props = {
  options: string[][];
  defaultValue: string | number;
};

export const Selector: React.FC<Props> = ({
  options,
  defaultValue,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (value: string) => {
    const [sortBy, sortOrder] = value.split(':');

    const newParams = getSearchWith(searchParams, {
      sortBy,
      sortOrder,
      page: '1',
    });

    setSearchParams(newParams);
  };

  return (
    <select
      className="Selector"
      defaultValue={defaultValue}
      onChange={(event) => updateSearchParams(event.target.value)}
    >
      {options.map((option) => {
        const [optionValue, optionName] = option;

        return (
          <option
            key={optionValue}
            className="Selector__option"
            value={optionValue}
          >
            {optionName}
          </option>
        );
      })}
    </select>
  );
};
