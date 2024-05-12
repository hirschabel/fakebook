import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserProfile} from "../model/UserProfile";
import {Post} from "../model/Post";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getUserProfile() {
    return this.http.get<UserProfile>('http://localhost:5000/app/getUserProfile', {withCredentials: true});
  }

  updateUserProfile(userProfile: UserProfile) {
    const body = new URLSearchParams();
    body.set('userProfileId', (userProfile as any)._id);
    body.set('description', userProfile.description);
    body.set('profilePicture', userProfile.profilePicture);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/updateUserProfile', body, {headers: headers, withCredentials: true});
  }
}
