"use client";

import {
  Card,
  Button,
  Rate,
  Modal,
  Input,
  Image,
  Popconfirm,
  Avatar,
} from "antd";
import { useState, useEffect } from "react";
import { StarOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IWatch } from "@/types";
import { GetDataByToken, getCookie } from "@/utils";
import {
  useCreateCommentMutation,
  useUpdateCommentByIdMutation,
  useDeleteCommentByIdMutation,
  useGetWatchByIdQuery,
} from "@/services/apis";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import WatchDetails from "@/components/Details";
import { CommentModal, CommentsList } from "@/components/Comment";
import AppHeader from "@/components/Header";

interface Props {
  data: IWatch;
}

const Details: React.FC<Props> = () => {
  const params = useParams();
  const router = useRouter();
  const watchId = params.id as string;
  const { data: watchData, refetch } = useGetWatchByIdQuery(watchId, {
    skip: !watchId,
  });
  const comments = watchData?.data.comments
    ? [...watchData?.data.comments].reverse()
    : [];

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [popOpen, setPopOpen] = useState<boolean>(false);
  const [createComment] = useCreateCommentMutation();
  const [updateCommentById] = useUpdateCommentByIdMutation();
  const [deleteCommentById] = useDeleteCommentByIdMutation();

  const token = getCookie("jwt") as string;

  const { id } = GetDataByToken(token);

  useEffect(() => {
    if (comments.length > 0) {
      const totalRating = comments.reduce(
        (sum, comment) => sum + comment.rating,
        0
      );
      setAvgRating(totalRating / comments.length);
    }
  }, [comments]);

  const checkComments = () => {
    return comments.some((comment) => comment.author._id === id);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const openEditModal = (
    id: string,
    commentRating: number,
    commentContent: string
  ) => {
    setCurrentCommentId(id);
    setRating(commentRating);
    setContent(commentContent);
    setShowEditModal(true);
  };

  const handleOnCloseModal = () => {
    setCurrentCommentId("");
    setRating(0);
    setShowEditModal(false);
    setContent("");
    setShowModal(false);
    refetch();
  };

  const handleCreateComment = async () => {
    try {
      const newComment = { rating, content };
      await createComment({ watchId, body: newComment }).unwrap();
      toast.success("Đánh giá đã được tạo thành công");
      handleOnCloseModal();
    } catch (error) {
      toast.error("Tạo đánh giá không thành công");
    }
  };

  const handleUpdateComment = async () => {
    try {
      if (currentCommentId) {
        await updateCommentById({
          watchId: watchId,
          body: { rating, content },
        }).unwrap();
        toast.success("Đánh giá đã được cập nhật thành công");
        handleOnCloseModal();
      }
    } catch (error: any) {
      if (error && error.status === 401) {
        toast.error(
          "Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục."
        );
        router.push("/auth/login");
        return;
      }

      toast.error("Cập nhật đánh giá không thành công");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      setPopOpen(false);
      await deleteCommentById({ watchId: watchId, commentId }).unwrap();
      toast.success("Đánh giá đã được xóa thành công");
      handleOnCloseModal();
    } catch (error) {
      toast.error("Xóa đánh giá không thành công");
    }
  };

  const showPopconfirm = () => {
    setPopOpen(true);
  };

  const handleCancel = () => {
    setPopOpen(false);
  };

  if (!watchData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppHeader />
      <div className="max-w-6xl mx-auto p-6 mt-2 mb-2 bg-white rounded-lg shadow-lg">
        <div className="grid md:grid-cols-2 gap-10">
          <WatchDetails data={watchData?.data} avgRating={avgRating} />
          <Card
            title="Đánh giá"
            className="h-full max-h-[600px] overflow-auto"
            styles={{
              header: {
                position: "sticky",
                top: 0,
                zIndex: 1,
                background: "#fff",
              },
            }}
          >
            <div className="flex justify-end mb-4">
              {id && (
                <Button
                  type="primary"
                  icon={<StarOutlined />}
                  onClick={() => {
                    if (checkComments()) {
                      toast.error("Bạn chỉ được đánh giá một lần❌");
                    } else {
                      setShowModal(true);
                    }
                  }}
                >
                  Viết đánh giá
                </Button>
              )}
            </div>
            <CommentsList
              comments={comments}
              id={id}
              popOpen={popOpen}
              openEditModal={openEditModal}
              handleDeleteComment={handleDeleteComment}
              showPopconfirm={showPopconfirm}
              handleCancel={handleCancel}
            />
          </Card>
        </div>
        <CommentModal
          showModal={showModal}
          setShowModal={setShowModal}
          handleSubmit={handleCreateComment}
          rating={rating}
          setRating={setRating}
          content={content}
          setContent={setContent}
          title="Viết đánh giá"
        />
        <CommentModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          handleSubmit={handleUpdateComment}
          rating={rating}
          setRating={setRating}
          content={content}
          setContent={setContent}
          title="Chỉnh sửa đánh giá"
        />
      </div>
    </>
  );
};

export default Details;
