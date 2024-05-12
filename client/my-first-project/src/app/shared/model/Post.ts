import {CommentForPost} from "./Comment";

export interface Post {
  author: string;
  autherName: string;
  postHeader: string;
  postText: string;
  createdAt: Date;
  isCommenting: boolean;
  commentText: string;
  comments: CommentForPost[];
}
