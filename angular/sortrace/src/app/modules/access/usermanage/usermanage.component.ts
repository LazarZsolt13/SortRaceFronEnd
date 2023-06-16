import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUserDto } from 'src/app/core/models/loginUser.model';
import { RegisterUserDto } from 'src/app/core/models/registerUser.model';
import { UserResponseDto } from 'src/app/core/models/userResponse.model';
import { SearchGameDto } from 'src/app/core/models/searchGame.model';
import { CookieService } from 'src/app/core/services/cookie.service';
import { GameService } from 'src/app/core/services/game.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';

@Component({
  selector: 'app-usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.scss']
})
export class UsermanageComponent implements OnInit {
  userLoginDto: LoginUserDto = new LoginUserDto();
  registerDto: RegisterUserDto = new RegisterUserDto();
  loged: Boolean = false;
  nickname: String| undefined = "";
  cookie: String|null = "";
  searchGameDto:SearchGameDto = new SearchGameDto();
  roomID:Number = -1;
  constructor(  private cookieService:CookieService, private router:Router, private userService:UserService, private gameService:GameService) { }

  ngOnInit(): void {
    this.loged = this.cookieService.getCookie('currentUser') == null;
    this.cookie = this.cookieService.getCookie('currentUser');
    this.nickname = this.cookie?.split(',')[3].split(':')[1].replace("\"", '').replace("\"", '');
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
        // window.location.reload();
        let elem = document.getElementById('closeButton');
        let evt = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window});
        elem?.dispatchEvent(evt);
        this.ngOnInit();
      },
      error: (err) => {
        if (err.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            background: '#19191a',
            color: 'white',
            text: 'Email or password not correct!',
          })
        }
      }
    });
  }

  register():void{
    this.userService.registerUser(this.registerDto).subscribe({
      next: (response: HttpResponse<Boolean>) => {
        if(response.body === true){
          Swal.fire({
            icon: 'success',
            title: 'You have registrated successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          let elem = document.getElementById('closeRegister');
          let evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window});
          elem?.dispatchEvent(evt);
        }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          background: '#19191a',
          color: 'white',
          text: 'Register not complete!',
        })
      }
    });
  }

  logout():void{
    this.cookieService.deleteCookie('currentUser');
  }

  getRoom(){
    if(this.searchGameDto.roomsize == 1 || this.searchGameDto.roomsize == 2 || this.searchGameDto.roomsize == 3 || this.searchGameDto.roomsize == 4){
      this.gameService.searchForGame(this.searchGameDto).subscribe({
        next: (response: HttpResponse<Number>) => {
          this.roomID = response.body!!
          this.timer()
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  getBubleMethodRoom(){
    this.gameService.startBubleMethod(43).subscribe({
      next: (response: HttpResponse<Number>) => {
        this.roomID = response.body!!
        //this.timer()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  timer(){
    Swal.fire({
      title: 'Searching for your worthy opponent...',
      timer: 20000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading(Swal.getDenyButton())
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {}
    })
    this.gameService.waitForPlayers(this.roomID).subscribe({
      next: (response: HttpResponse<Boolean>) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          confirmButtonText: 'Ready',
          title: 'We found your enemy',
          footer: 'Please ready'
        }).then(function(isConfirm) {
          if (isConfirm) {
            window.location.href='/play';
          }
        })
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Searching time stopped, try again!",
        });
      }
    });
  }

  selectRoom():any{
    Swal.fire({
      title: 'Select player numbers',
      input: 'select',
      inputOptions: {
        'Room Size': {
          1: 1,
          2: 2,
          3: 3,
          4: 4
        }
      },
      inputPlaceholder: 'Select player numbers',
      showCancelButton: false,
    }).then((data) => {
      this.searchGameDto.roomsize = data.value
      this.getRoom()
     });
  }

  learnStart():any{
    Swal.fire({
      title: 'Select the sort method',
      input: 'select',
      inputOptions: {
        'The method': {
          1: 'Buble Sort'
        }
      },
      inputPlaceholder: 'Select the sort method',
      showCancelButton: false,
    }).then((data) => {
      //this.searchGameDto.roomsize = data.value
      this.getBubleMethodRoom()
      window.location.href='/bublesort';
     });
  }
}
  
