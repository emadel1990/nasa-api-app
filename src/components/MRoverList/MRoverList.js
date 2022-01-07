import React, { useState, useEffect, useCallback } from "react";
import "./mRoverList.css";
import Mrover from "../MRover/Mrover";
import RoverInfo from "../RoverInfo/RoverInfo";
import Paginator from "../Paginator/Paginator";

import Loading from "../Loading/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

import debounce from "lodash.debounce";

const MRoverList = ({
  marsPhotos,
  manifest,
  page,
  setPage,
  sol,
  setSol,
  filteredCamera,
}) => {
  const [newArr, setNewArr] = useState([]);
  const [newFilteredArr, setNewFilteredArr] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageSolComponent, setpageSolComponent] = useState(0);

  useEffect(() => {
    if (page === 1) {
      setNewArr(marsPhotos.photos);
    }
    if (newArr.length < 23) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [marsPhotos.photos, newArr, page, setNewArr, sol]);

  useEffect(() => {
    if (filteredCamera.length > 0) {
      let filteredArr = [];
      for (let i = 0; i < filteredCamera.length; i++) {
        for (let j = 0; j < newArr.length; j++) {
          if (newArr[j].camera.name === filteredCamera[i].value) {
            filteredArr = [...filteredArr, newArr[j]];
          }
        }
      }
      setNewFilteredArr(filteredArr);
      setTimeout(() => {
        if (marsPhotos.photos.length === 0) {
          setHasMore(false);
        }
      }, 1000);
    } else setNewFilteredArr([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCamera, newArr, sol]);

  /* lazy load - infinite scroll */
  const fetchMoreData = () => {
    if (marsPhotos.photos.length === 0) {
      setHasMore(false);
      return;
    }
    setPage((page) => page + 1);
    setTimeout(() => {
      setNewArr([...newArr, ...marsPhotos.photos]);
    }, 2600);
  };

  /* Performing debounce for pagination */
  const debouncePageChange = (value) => {
    setpageSolComponent(value);
    debounceHandler(value);
    setPage(1);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandler = useCallback(
    debounce((value) => {
      setSol(value);
    }, 1000),
    []
  );

  return (
    <div className="photos-container">
      <RoverInfo manifest={manifest} />

      <Paginator
        manifest={manifest}
        pageSolComponent={pageSolComponent}
        debouncePageChange={debouncePageChange}
      />
      <InfiniteScroll
        className="infScroll"
        dataLength={newArr.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loading className="loading" />}
      >
        {filteredCamera.length > 0 ? (
          <div className="photos">
            {newFilteredArr.length > 0 ? (
              newFilteredArr.map((photo, index) => (
                <Mrover className="photo" photo={photo} key={index} />
              ))
            ) : (
              <h1>Nothing here...</h1>
            )}
          </div>
        ) : (
          <div className="photos">
            {newArr.length > 0 ? (
              newArr.map((photo, index) => (
                <Mrover className="photo" photo={photo} key={index} />
              ))
            ) : (
              <h1>Nothing here...</h1>
            )}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default MRoverList;
