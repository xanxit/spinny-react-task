import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import Card from "./Card";
import SearchBar from "./SearchBar";
import { getPagination } from "../actions/getItems";

const Container = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const loading = useSelector((state) => state.loading);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [animeData, setAnimeData] = useState();
  const paginationCall = () => {
    console.log(page);
    dispatch(getPagination(page, query));
  };
  useEffect(() => {
    setAnimeData(items?.items?.data);
  });
  useEffect(() => {
    paginationCall();
  }, [dispatch, page]);
  const onSearchSubmit = _.memoize(async (term) => {
    setQuery(term);
    const parsedQuery = term.toLowerCase().replaceAll(" ", "+");
    dispatch(getPagination(page, parsedQuery));
  });
  console.log(items);
  return (
    <div className="container">
      <div className="py-4">
        <SearchBar onSearchSubmit={(term) => onSearchSubmit(term)} />
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-4 md:my-8 md:ml-20">
        {loading ? (
          <div>Loading...</div>
        ) : (
          animeData?.map((value) => <Card key={value.id} data={value} />)
        )}
      </div>
      {items?.items?.pagination?.has_next_page ? (
        <div
          className="flex justify-center cursor-pointer text-white text-3xl"
          onClick={() => {
            setPage(page + 1);
            paginationCall();
          }}
        >
          Load More......
        </div>
      ) : null}
    </div>
  );
};
export default Container;
