import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Post} from "../model/Post";
import {CommentForPost} from "../model/Comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(post: Post) {
    const body = new URLSearchParams();
    body.set('commentText', post.commentText);
    body.set('postId', (post as any)._id);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/createComment', body, {headers: headers, withCredentials: true});
  }

  getAllCommentsForPost(post: Post) {
    const postId = (post as any)._id
    return this.http.get<CommentForPost[]>(`http://localhost:5000/app/getAllComments?postId=${postId}`, {withCredentials: true});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:5000/app/deleteComment?id=' + id, {withCredentials: true});
  }

}
