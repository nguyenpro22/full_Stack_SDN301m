import React from "react";
import Link from "next/link";
import { Card, Button, Image } from "antd";
import { IWatch } from "@/types";

const { Meta } = Card;

const WatchCard: React.FC<{ watch?: IWatch; loading?: boolean }> = ({
  watch,
  loading,
}) => {
  return (
    <Card
      className="bg-gradient-to-r from-green-500 to-yellow-500"
      loading={loading}
      hoverable
      style={{ width: 300 }}
      cover={
        <Image
          width="100%"
          height={200}
          src={watch?.image}
          alt={watch?.watchName}
          preview={{
            destroyOnClose: true,
            toolbarRender: () => null,
          }}
          className="object-cover rounded-t-lg"
        />
      }
    >
      <Meta
        title={
          <span className="text-xl font-bold text-gray-900">
            {watch?.watchName}
          </span>
        }
        description={
          <>
            <p className="text-gray-600">Brand: {watch?.brand.brandName}</p>
            <p className="text-gray-600">Price: ${watch?.price}</p>
            <Link href={`/watch/${watch?.id}`}>
              <Button type="primary" className="mt-2">
                View Details
              </Button>
            </Link>
          </>
        }
      />
    </Card>
  );
};

export default WatchCard;
