import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import './Pagination.scss';
import { getSearchWith } from '../../helpers/getSearchWith';
import { getNumbers } from '../../helpers/getNumbers';

type Props = {
  total: number;
};

export const Pagination: React.FC<Props> = ({ total }) => {
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = 25;

  const lastPage = Math.ceil(total / perPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const pages = getNumbers(1, lastPage);

  return (
    <ul className="Pagination">
      <li>
        <Link
          className={cn(
            'Pagination__link Pagination__link_prev',
            {
              Pagination__link_disabled: isFirstPage,
            },
          )}
          to={{
            search: getSearchWith(searchParams, {
              page: isFirstPage
                ? currentPage.toString()
                : (currentPage - 1).toString(),
            }),
          }}
        >
        </Link>
      </li>

      <li className="Pagination__list">
        {pages.map((page) => (
          <div key={page}>
            <Link
              className={cn('Pagination__link', {
                Pagination__link_active: page === currentPage,
              })}
              to={{
                search: getSearchWith(searchParams, {
                  page: page.toString(),
                }),
              }}
            >
              {page}
            </Link>
          </div>
        ))}
      </li>

      <li>
        <Link
          type="button"
          className={cn(
            'Pagination__link Pagination__link_next',
            {
              Pagination__link_disabled: isLastPage,
            },
          )}
          to={{
            search: getSearchWith(searchParams, {
              page: isLastPage
                ? currentPage.toString()
                : (currentPage + 1).toString(),
            }),
          }}
        >
        </Link>
      </li>
    </ul>
  );
};
