import { HttpResponse } from '@angular/common/http';
import { asNativeElements, Component, OnInit } from '@angular/core';
import { CompareRequestDto } from 'src/app/core/models/compareRequest.mode';
import { GameService } from 'src/app/core/services/game.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-bublesort',
  templateUrl: './bublesort.component.html',
  styleUrls: ['./bublesort.component.scss']
})
export class BublesortComponent implements OnInit {
  index:Array<Number> = [0,1,2,3,4,5,6,7,8,9]
  green:Number = -1
  selectedFirst:Number = -1
  compared:CompareRequestDto = new CompareRequestDto()
  selected:number = 0
  selectedSecond:Number = -1
  constructor(private gameService:GameService, private userService:UserService) { }

  ngOnInit(): void {
  }

  selectOneItem(i:Number){
    this.selected = this.selected +1;
    if(this.selected == 1){
      this.selectedFirst = i;
    }else if(this.selected == 2){
      this.selectedSecond = i;
      this.compared.i = this.selectedFirst;
      this.compared.j = this.selectedSecond;
      this.gameService.compareByIndex(this.compared).subscribe({
        next: (response: HttpResponse<number>) => {
          console.log(response.body)
          if(response.body != null && response.body > 0){
            this.green = this.selectedFirst;
          }else{
            this.green = this.selectedSecond;
          }
          this.selected = 0;
          this.selectedFirst = -1;
          this.selectedSecond = -1;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    // console.log("selectonitem")
  }

  containerActive(i:Number){
    if(this.selectedFirst == i || this.selectedSecond == i){
      return true
    }
    return false;
  }

  containerActiveGreen(i:Number){
    if(this.green == i){
      return true
    }
    return false;
  }

  swap(){
    this.green = -1;
  }

  noswap(){
    this.green = -1;
  }
}
