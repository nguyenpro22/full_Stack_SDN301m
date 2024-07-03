import WatchCard from "@/components/Card";
import { useGetWatchByBrandIdQuery, useGetWatchesQuery } from "@/services/apis";
import { Watch } from "@/types";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useState, useEffect } from "react";

interface IHomePageProps {
  brandId?: string;
}

const HomePage: React.FC<HomePageProps> = ({ brandId }) => {
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

  const [filteredWatches, setFilteredWatches] = useState<Watch[]>([]);

  useEffect(() => {
    if (brandId && watchData) {
      setFilteredWatches(watchData.data);
    } else if (watchesData) {
      setFilteredWatches(watchesData.data);
    }
  }, [brandId, watchData, watchesData]);

  const isLoading = watchesLoading || watchLoading;
  const error = watchesError || watchError;

  if (isLoading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    );
  }

  if (error) {
    return <p>Error loading watches</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {filteredWatches.length > 0 ? (
        filteredWatches.map((watch: Watch) => (
          <WatchCard key={watch.id} watch={watch} loading={isLoading} />
        ))
      ) : (
        <div>No watches found</div>
      )}
    </div>
  );
};

export default HomePage;
