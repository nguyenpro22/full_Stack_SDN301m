import { IComment } from "./CommentType";

export interface IWatch {
  id: string;
  watchName: string;
  image: string;
  price: number;
  Automatic: boolean;
  watchDescription: string;
  brand: {
    _id: string;
    brandName: string;
  };
  comments: IComment[];
}
