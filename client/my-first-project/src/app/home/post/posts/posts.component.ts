import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {PostService} from "../../../shared/services/post.service";
import {FormBuilder, FormsModule, Validators} from "@angular/forms";
import {Post} from "../../../shared/model/Post";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import {CommentService} from "../../../shared/services/comment.service";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

  posts!: Post[];
  columns = ['postHeader', 'postText', 'author', 'createdAt'];

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    ) { }

  ngOnInit() {
    this.postService.getAll().subscribe({
      next: (data) => {
        this.posts = data;
        console.log('Posts', data);
        // Initialize commentText property for each post
        this.posts.forEach(post => post.commentText = '');
        this.posts.forEach(post => {
          this.commentService.getAllCommentsForPost(post).subscribe({
            next: (data) => {
              post.comments = data;
            },
            error: (err) => {
              console.log(err);
            }
          })
        })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  startCommenting(post: Post) {
    // Set the post's isCommenting property to true to show the comment textarea
    post.isCommenting = true;
  }

  submitComment(post: Post) {
    // Handle submitting the comment here, for example, send it to the server
    console.log('Comment:', post.commentText);

    if (post.commentText.trim() !== '') {
      this.commentService.createComment(post).subscribe({
        next: (data) => {
          console.log('Comment created successfully:', data);
          window.location.reload();
        },
        error: (err) => {
          console.error('Error creating post:', err);
          alert('Nem sikerült a posztot létrehozni.');
        }
      });
    }

    // Reset the comment textarea
    post.commentText = '';
    // Set isCommenting back to false to hide the comment textarea
    post.isCommenting = false;
  }
}
