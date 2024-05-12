import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserProfile} from "../shared/model/UserProfile";
import {UserProfileService} from "../shared/services/user-profile.service";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    FormsModule,
    MatIcon,
    MatLabel,
    MatFormField,
    MatButton,
    MatInput,
    NgIf
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  userProfile!: UserProfile;
  profileImage: string | ArrayBuffer | null = null;
  uploading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userProfileService: UserProfileService,
  ) {}

  ngOnInit() {
    this.userProfileService.getUserProfile().subscribe({
      next: (data) => {
        this.userProfile = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit() {
    this.userProfileService.updateUserProfile(this.userProfile).subscribe({
      next: (data) => {
        console.log('Profile updated successfully:', data);
      },
      error: (err) => {
        console.error('Error updating profile:', err);
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

}
