import { Image, Rate } from "antd";
import { IWatch } from "@/types";

interface WatchDetailsProps {
  data: IWatch | undefined;
  avgRating: number;
}

const WatchDetails: React.FC<WatchDetailsProps> = ({ data, avgRating }) => {
  console.log(data);

  return (
    <div>
      <Image
        src={`${data?.image}`}
        alt="Elegant wristwatch"
        width={400}
        height={400}
        className="rounded-lg border"
      />
      <div className="mt-4">
        <h1 className="text-3xl font-bold">{data?.watchName}</h1>
        <div className="flex items-center gap-4 mt-2">
          <Rate disabled value={avgRating} />
          <span className="text-gray-500">({avgRating.toFixed(1)})</span>
        </div>
        <div className="mt-4 text-lg text-gray-700">
          {data?.watchDescription}
        </div>
        <div className="mt-2 text-2xl font-semibold text-gray-900">
          {data?.price.toLocaleString("en-US")} VNĐ
        </div>
      </div>
    </div>
  );
};

export default WatchDetails;
