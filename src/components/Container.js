import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import Card from "./Card";
import SearchBar from "./SearchBar";
import { getPagination } from "../actions/getItems";

const LoadMore = ({ setPage, page }) => {
  return (
    <div
      className="flex justify-center cursor-pointer text-white text-3xl"
      onClick={() => {
        setPage(page + 1);
      }}
    >
      Load More......
    </div>
  );
};

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="spinner-border animate-spin inline-block w-20 h-20 border-4 rounded-full"
        role="status"
      ></div>
    </div>
  );
};

const Container = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [animeData, setAnimeData] = useState();
  const paginationCall = () => {
    dispatch(getPagination(page, query));
  };
  useEffect(() => {
    setAnimeData(items?.items);
  }, [items]);
  useEffect(() => {
    if (page !== 1) paginationCall();
  }, [page]);
  const apRequest = _.memoize(async (term) => {
    setQuery(term);
    const parsedQuery = term.toLowerCase().replaceAll(" ", "+");
    dispatch(getPagination(page, parsedQuery));
  });
  const onSearchSubmit = useCallback(async(query) => {
    await apRequest(query);
  });

  return (
    <div className="container">
      <div className="py-4">
        <SearchBar
          onSearchSubmit={(term) => onSearchSubmit(term)}
          setPage={setPage}
        />
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-4 md:my-8 md:ml-20">
        {animeData?.map((value) => (
          <Card key={value.id} data={value} />
        ))}
      </div>
      {items?.pagination?.has_next_page ? (
        items?.loading ? (
          <Loader />
        ) : (
          <LoadMore setPage={setPage} page={page} />
        )
      ) : null}
    </div>
  );
};
export default Container;
