import React, { useState, useEffect, useRef, useCallback } from 'react';
import './SuperHeroList.scss'
import SuperHeroCard from '../SuperHeroCard/SuperHeroCard';
import ReactPaginate from 'react-paginate';

const SuperheroList = () => {
  const [superHeroes, setSuperHeroes] = useState([]);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();


  const handlePageClick = (e) => {
    currentPage.current=e.selected + 1;
    getPaginatedUsers();
  }
  const getPaginatedUsers = useCallback(async () => {
    await fetch(`http://localhost:3001/api/superheroes?page=${currentPage.current}&limit=${limit}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPageCount(data.pageCount);
        setSuperHeroes(data.result)
      });
  }, [limit]);

  useEffect(() => {
    currentPage.current = 1;
    getPaginatedUsers()
  }, [currentPage, getPaginatedUsers ]);

  return (
    <>
      <div className="heroes">
        <div className="heroes__container _container">
          <div className="heroes__body">
            <div className="heroes__list">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                marginPagesDisplayed={2}
                containerClassName="pagination justify-content-center"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
              />
              {superHeroes.map((superHero) => (
                <SuperHeroCard key={superHero._id} superHero={superHero} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperheroList;


