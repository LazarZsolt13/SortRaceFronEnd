import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserDto } from '../models/loginUser.model';
import { RegisterUserDto } from '../models/registerUser.model';
import { SearchGameDto } from '../models/searchGame.model';
import { UserResponseDto } from '../models/userResponse.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private http: HttpClient) {}
  
  searchForGame(searchGameDto: SearchGameDto) {
    return this.http.post<Number>(
      'http://25.62.242.88:8080/game/searchforgame',
      searchGameDto,
      { observe: 'response' }
    );
  }

  waitForPlayers(id: Number): Observable<any> {
    return this.http.get<any>('http://25.62.242.88:8080/game/waitforplayers/' + id);
  }

}