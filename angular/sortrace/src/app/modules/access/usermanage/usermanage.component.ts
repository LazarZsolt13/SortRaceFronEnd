import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserDto } from 'src/app/core/models/loginUser.model';
import { RegisterUserDto } from 'src/app/core/models/registerUser.model';
import { UserResponseDto } from 'src/app/core/models/userResponse.model';
import { CookieService } from 'src/app/core/services/cookie.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.scss']
})
export class UsermanageComponent implements OnInit {
  userLoginDto: LoginUserDto = new LoginUserDto();
  registerDto: RegisterUserDto = new RegisterUserDto();
  constructor( private cookieService:CookieService, private router:Router, private userService:UserService, ) { }

  ngOnInit(): void {
  }

  login():void{
    this.userService.logInUser(this.userLoginDto).subscribe({
      next: (response: HttpResponse<UserResponseDto>) => {
        let logedInUser = new UserResponseDto();
        logedInUser = response.body as UserResponseDto;
        logedInUser.token = String(response.headers.get('Authorization'));
        this.cookieService.setCookie(
          'currentUser',
          JSON.stringify(logedInUser),
          7
        )
        console.log("login siker");
        // this.router.navigateByUrl("")
      },
      error: (err) => {
        if (err.status === 403) {
          console.log("Hibas email vagy jelszo");
        }
      }
    });
  }

  register():void{
    this.userService.registerUser(this.registerDto).subscribe({
      next: (response: HttpResponse<Boolean>) => {
        if(response.body === true){
          console.log("sikeres regisztracio");
          // this.router.navigateByUrl("")
        }
      },
      error: (err) => {
        console.log("sikertelen regisztracio");
        console.log(err.message);
      }
    });
  }

}
