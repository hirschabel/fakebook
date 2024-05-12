import { Component } from '@angular/core';
import {FormBuilder, FormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {PostService} from "../shared/services/post.service";
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
import {User} from "../shared/model/User";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    FormsModule,
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
    NgIf
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss'
})
export class FriendsComponent {
  friends!: User[];
  friendEmail: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userService.getAllFriends().subscribe({
      next: (data) => {
        this.friends = data;
        console.log("Friends", this.friends);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  addFriend() {
    // Ellenőrizd, hogy a felhasználó megadott-e email címet
    if (this.friendEmail.trim() === '') {
      alert('Please enter a valid email address');
      return;
    }

    // Hívás a '/register' végpontra a megadott email cím felhasználójának regisztrációjához
    this.authService.registerFriend(this.friendEmail).subscribe({
      next: (data) => {
        console.log('Friend added successfully:', data);
        alert('Friend added successfully');
        this.friendEmail = '';
      },
      error: (err) => {
        console.error('Error adding friend:', err);
        alert('Failed to add friend. Please try again.');
      }
    });
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

}
