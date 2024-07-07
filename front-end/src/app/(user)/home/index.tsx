"use client";
import React, { useState, useRef, useEffect } from "react";
import WatchCard from "@/components/Card";
import { useGetWatchByBrandIdQuery, useGetWatchesQuery } from "@/services/apis";
import { IWatch } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Button } from "antd";

interface IHomePageProps {
  brandId?: string;
  searchQuery?: string;
}

const HomePage: React.FC<IHomePageProps> = ({ brandId, searchQuery }) => {
  const {
    data: watchesData,
    error: watchesError,
    isLoading: watchesLoading,
  } = useGetWatchesQuery();
  const {
    data: watchData,
    error: watchError,
    isLoading: watchLoading,
  } = useGetWatchByBrandIdQuery(brandId, {
    skip: !brandId,
  });

  const [filteredWatches, setFilteredWatches] = useState<IWatch[]>([]);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  useEffect(() => {
    if (brandId && watchData) {
      setFilteredWatches(
        watchData.data.filter((watch: IWatch) =>
          watch.watchName
            .toLowerCase()
            .includes(searchQuery?.toLowerCase() || "")
        )
      );
    } else if (watchesData) {
      setFilteredWatches(
        watchesData.data.filter((watch: IWatch) =>
          watch.watchName
            .toLowerCase()
            .includes(searchQuery?.toLowerCase() || "")
        )
      );
    }
  }, [brandId, watchData, watchesData, searchQuery]);

  const isLoading = watchesLoading || watchLoading;
  const error = watchesError || watchError;

  const handleScroll = (direction: string) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = carousel.clientWidth / 2;
    if (direction === "left") {
      setTranslateX((prev) => Math.min(prev + scrollAmount, 0));
    } else if (direction === "right") {
      const maxTranslateX = -carousel.scrollWidth + carousel.clientWidth;
      setTranslateX((prev) => Math.max(prev - scrollAmount, maxTranslateX));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - translateX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const carousel = carouselRef.current;
    if (!carousel) return;

    currentX.current = e.pageX - startX.current;
    const maxTranslateX = -carousel.scrollWidth + carousel.clientWidth;

    if (currentX.current > 0) {
      setTranslateX(0);
    } else if (currentX.current < maxTranslateX) {
      setTranslateX(maxTranslateX);
    } else {
      setTranslateX(currentX.current);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollAmount = carousel.clientWidth / 4;
    const maxTranslateX = -carousel.scrollWidth + carousel.clientWidth;

    if (e.deltaY < 0) {
      setTranslateX((prev) => Math.min(prev + scrollAmount, 0));
    } else {
      setTranslateX((prev) => Math.max(prev - scrollAmount, maxTranslateX));
    }
  };

  if (isLoading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    );
  }

  if (error) {
    return <p>Error loading watches</p>;
  }

  return (
    <>
      <div className="carousel-container">
        {filteredWatches.length > 0 && (
          <Button
            className="carousel-button left"
            onClick={() => handleScroll("left")}
          >
            {"<"}
          </Button>
        )}
        <div
          className="carousel-wrapper"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <div
            className="carousel-content"
            style={{ transform: `translateX(${translateX}px)` }}
            ref={carouselRef}
          >
            {filteredWatches.length > 0 ? (
              filteredWatches.map((watch: IWatch) => (
                <div key={watch.id} className="inline-block watch-card-wrapper">
                  <WatchCard watch={watch} loading={isLoading} />
                </div>
              ))
            ) : (
              <div>No watches found</div>
            )}
          </div>
        </div>
        {filteredWatches.length > 0 && (
          <Button
            className="carousel-button right"
            onClick={() => handleScroll("right")}
          >
            {">"}
          </Button>
        )}
      </div>
    </>
  );
};

export default HomePage;
