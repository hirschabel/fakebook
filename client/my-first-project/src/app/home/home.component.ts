import {ChangeDetectorRef, Component} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {Post} from "../shared/model/Post";
import {PostService} from "../shared/services/post.service";
import {User} from "../shared/model/User";
import {UserService} from "../shared/services/user.service";
import {
  MatCard,
  MatCardActions, MatCardAvatar,
  MatCardContent,
  MatCardFooter,
  MatCardHeader, MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {PostsComponent} from "./post/posts/posts.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatProgressSpinnerModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatIcon, MatRow, MatRowDef, MatTable, ReactiveFormsModule, MatCard, MatCardHeader, MatCardFooter, MatCardContent, MatCardActions, MatCardTitle, MatCardSubtitle, MatButton, MatCardAvatar, PostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  createPostForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private postService: PostService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createPostForm = this.formBuilder.group({
      postHeader: ['', [Validators.required]],
      postText: ['', [Validators.required]]
    })
  }

  createPost() {
    if (this.createPostForm.valid) {
      this.postService.createPost(this.createPostForm.value).subscribe({
        next: (data) => {
          console.log('Post created successfully:', data);
          window.location.reload();
        },
        error: (err) => {
          console.error('Error creating post:', err);
          alert('Nem sikerült a posztot létrehozni.');
        }
      });
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }


  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      }, error: (err) => {
        console.log(err);
      }
    });
  }
}
