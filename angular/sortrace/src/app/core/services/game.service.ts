import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompareRequestDto } from '../models/compareRequest.mode';
import { LoginUserDto } from '../models/loginUser.model';
import { RegisterUserDto } from '../models/registerUser.model';
import { SearchGameDto } from '../models/searchGame.model';
import { UserResponseDto } from '../models/userResponse.model';
import { SwapRequestDto } from '../models/swapRequest.model';


@Injectable({ providedIn: 'root' })
export class GameService {
  constructor(private http: HttpClient) {}
  link: string = 'http://localhost:8080/game'
  searchForGame(searchGameDto: SearchGameDto) {
    return this.http.post<Number>(
      this.link+'/searchforgame',
      searchGameDto,
      { observe: 'response' }
    );
  }

  waitForPlayers(id: Number): Observable<any> {
    return this.http.get<any>(this.link+'/waitforplayers/' + id);
  }
  startBubleMethod(id: Number): Observable<any>{
    return this.http.get<any>(this.link+'/startBubleMethod/' + id);
  }
  compareByIndex(compareRequest: CompareRequestDto) {
    return this.http.post<number>(this.link+'/compareByIndex/', compareRequest, { observe: 'response'});
  }
  swapByIndex(swapRequest: SwapRequestDto){
    return this.http.post<any>(this.link+'/swapByIndex/', swapRequest, { observe: 'response'});
  }
}