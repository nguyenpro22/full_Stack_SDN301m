export interface IComment {
  _id: string;
  content: string;
  rating: number;
  createAt: Date;
  updateAt: Date;
  author: {
    _id: string;
    name: string;
    avatar: string;
  };
}
