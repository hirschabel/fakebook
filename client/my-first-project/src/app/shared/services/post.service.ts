import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Post} from "../model/Post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post: Post) {
    const body = new URLSearchParams();
    body.set('postHeader', post.postHeader);
    body.set('postText', post.postText);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/createPost', body, {headers: headers, withCredentials: true});
  }

  getOne(id: string) {
    return this.http.delete('http://localhost:5000/app/getPost?id=' + id, {withCredentials: true});
  }

  getAll() {
    return this.http.get<Post[]>('http://localhost:5000/app/getAllPosts', {withCredentials: true});
  }
}
