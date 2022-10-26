import React, { Dispatch, SetStateAction } from 'react';
import styles from './pagination.module.css';

interface PaginationProps {
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  blockNum: number;
  setBlockNum: Dispatch<SetStateAction<number>>;
  counts: number;
}

const Pagination: React.FunctionComponent<PaginationProps> = ({
  limit,
  page,
  setPage,
  blockNum,
  setBlockNum,
  counts,
}) => {
  const pageLimit = 3; //보여줄 페이지네이션 개수
  const totalPage: number = Math.ceil(counts / limit); //전체 페이지 개수

  const blockArea: number = Number(blockNum * pageLimit);
  const nArr = Array.from({ length: totalPage }, (v, i) => i + 1);
  let pArr = nArr?.slice(blockArea, pageLimit + blockArea);

  const firstPage = () => {
    setPage(1);
    setBlockNum(0);
  };
  const lastPage = () => {
    setPage(totalPage);
    setBlockNum(Math.ceil(totalPage / pageLimit) - 1);
  };
  const prevPage = () => {
    if (page <= 1) return;
    if (pageLimit * blockNum >= page - 1) {
      setBlockNum((n: number) => n - 1);
    }
    setPage((n: number) => n - 1);
  };
  const nextPage = () => {
    if (page >= totalPage) return;
    if (pageLimit * (blockNum + 1) < page + 1) {
      setBlockNum((n: number) => n + 1);
    }
    setPage((n: number) => n + 1);
  };

  if (counts <= 0) return null;

  return (
    <div className={styles.pagination_container}>
      <button onClick={firstPage}>&lt;&lt;</button>
      <button onClick={prevPage} disabled={page === 1}>
        &lt;
      </button>
      <div className={styles.buttonWrap}>
        {pArr.map((n: number) => (
          <button
            className={`${page === n && styles.currentPageBtn}`}
            key={n}
            onClick={() => {
              setPage(n);
            }}
          >
            {n}
          </button>
        ))}
      </div>
      <button onClick={nextPage} disabled={page === totalPage}>
        &gt;
      </button>
      <button onClick={lastPage}>&gt;&gt;</button>
    </div>
  );
};

export default Pagination;
