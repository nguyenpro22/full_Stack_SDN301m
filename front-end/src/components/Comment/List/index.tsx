import { Card, Button, Popconfirm, Rate, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IComment } from "@/types";

interface ICommentsListProps {
  comments: IComment[];
  id: string;
  popOpen: boolean;
  openEditModal: (id: string, rating: number, content: string) => void;
  handleDeleteComment: (commentId: string) => void;
  showPopconfirm: () => void;
  handleCancel: () => void;
}

const CommentsList: React.FC<ICommentsListProps> = ({
  comments,
  id,
  popOpen,
  openEditModal,
  handleDeleteComment,
  showPopconfirm,
  handleCancel,
}) => {
  return (
    <div className="space-y-4">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Card key={index} className="bg-gray-100">
            <div className="flex items-center gap-4">
              <Avatar
                src={`${comment?.author?.avatar}?seed=${comment?.author?.name}`}
                size="large"
              />
              <div>
                <div className="font-medium">{comment?.author?.name}</div>
                <Rate disabled value={comment.rating} />
              </div>
              {comment?.author?._id === id && (
                <div className="ml-auto flex items-center gap-2">
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() =>
                      openEditModal(
                        comment._id,
                        comment.rating,
                        comment.content
                      )
                    }
                  />
                  <Popconfirm
                    title="Xóa đánh giá"
                    description="Bạn có chắc muốn xóa đánh giá này không?"
                    open={popOpen}
                    onConfirm={() => handleDeleteComment(comment._id)}
                    onCancel={handleCancel}
                  >
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={showPopconfirm}
                    />
                  </Popconfirm>
                </div>
              )}
            </div>
            <p className="mt-2">{comment.content}</p>
          </Card>
        ))
      ) : (
        <div className="text-center py-4">Hiện tại chưa có đánh giá</div>
      )}
    </div>
  );
};

export default CommentsList;
