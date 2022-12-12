import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserDto } from '../models/loginUser.model';
import { RegisterUserDto } from '../models/registerUser.model';
import { UserResponseDto } from '../models/userResponse.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  
  registerUser(userDto: RegisterUserDto) {
    return this.http.post<Boolean>(
      'http://localhost:8080/user/register',
      userDto,
      { observe: 'response' }
    );
  }

  logInUser(logInUserDto: LoginUserDto) {
    return this.http.post<UserResponseDto>(
      'http://localhost:8080/user/login',
      logInUserDto,
      { observe: 'response' }
    );
  }
}