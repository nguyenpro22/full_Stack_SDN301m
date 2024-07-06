import { Modal, Rate, Input } from "antd";

interface ICommentModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handleSubmit: () => void;
  rating: number;
  setRating: (rating: number) => void;
  content: string;
  setContent: (content: string) => void;
  title: string;
}

const CommentModal: React.FC<ICommentModalProps> = ({
  showModal,
  setShowModal,
  handleSubmit,
  rating,
  setRating,
  content,
  setContent,
  title,
}) => {
  return (
    <Modal
      title={title}
      open={showModal}
      onCancel={() => setShowModal(false)}
      onOk={handleSubmit}
      okButtonProps={{ disabled: !content.trim() || rating <= 0 }}
    >
      <div className="flex flex-col items-center gap-4 py-4">
        <Rate onChange={(value) => setRating(value)} value={rating} />
        <Input.TextArea
          placeholder="Viết đánh giá của bạn"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default CommentModal;
