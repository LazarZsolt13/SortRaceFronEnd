import { HttpResponse } from '@angular/common/http';
import { asNativeElements, Component, OnInit, HostListener} from '@angular/core';
import { CompareRequestDto } from 'src/app/core/models/compareRequest.mode';
import { SwapRequestDto } from 'src/app/core/models/swapRequest.model';
import { GameService } from 'src/app/core/services/game.service';
import { UserService } from 'src/app/core/services/user.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})

export class PlayComponent implements OnInit {
  @HostListener('window:keydown', ['$event']) 
    onKeyDown(e:KeyboardEvent) {
      if (e.key==='1'){
        this.selectOneItem(0)
      
      }
      if (e.key==='2'){
        this.selectOneItem(1)
        
      }
      if (e.key==='3'){
        this.selectOneItem(2)
        
      }
      if (e.key==='4'){
        this.selectOneItem(3)
        
      }
      if (e.key==='5'){
        this.selectOneItem(4)
        
      }
      if (e.key==='6'){
        this.selectOneItem(5)
        
      }
      if (e.key==='7'){
        this.selectOneItem(6)
        
      }
      if (e.key==='8'){
        this.selectOneItem(7)
        
      }if (e.key==='9'){
        this.selectOneItem(8)
        
      }if (e.key==='0'){
        this.selectOneItem(9)
        
      }if (e.key===' '){
        this.swap()
        
      }if (e.key==='Escape'){
        this.noswap()
        
      }
      console.log(e.key)
      
  }
  index:Array<Number> = [0,1,2,3,4,5,6,7,8,9]
  selectedFirst:Number = -1;
  selectedSecond:Number = -1;
  compared:CompareRequestDto = new CompareRequestDto();
  swaping:SwapRequestDto = new SwapRequestDto();
  selected:number = 0;
  green:Number = -1;
 
  constructor(public gameService:GameService, private userService:UserService) { }

  ngOnInit(): void {
    // if(this.userService)
    // kell egy kérés a backendre ami megmondja, hogy érvényesen vagyok e a ../play cim alatt vagyis van e tokenem
    // swap no swap buttons and swap function in backend
  }


  selectOneItem(i:Number){
    this.selected = this.selected +1;
    if(this.selected == 1){
      this.selectedFirst = i;
    }else if(this.selected == 2){
      this.selectedSecond = i;
      this.compared.i = this.selectedFirst;
      this.compared.j = this.selectedSecond;
      this.swaping.i = this.selectedFirst;
      this.swaping.j = this.selectedSecond;
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
    let done=0;
    console.log(done);
    this.green = -1;
    this.gameService.swapByIndex(this.swaping).subscribe({
        next: (response: HttpResponse<number>) => {
        if (response.body != null && response.body > 1){
          done = 1;
          this.gameService.removePlayer().subscribe({
            next: (response: HttpResponse<number>) => {
              console.log(response.body)
            }
          })
          let sec = Math.floor(response.body / 1000)
          let min = Math.floor(sec / 60)
          sec = sec - (min*60)
          Swal.fire({
            position: 'center',
            icon: 'success',
            confirmButtonText: 'Ready',
            title: 'Nice job your time is ' + min.toString().padStart(2, '0') + ":" + sec.toString().padStart(2, '0'),
            footer: 'Please ready'
          })
        }
        this.selected = 0;
        this.swaping.i = -1;
        this.swaping.j = -1;
        
      },
       error: (err) => {
        console.log(err);
      }
    });

    
  }

  noswap(){
    this.green = -1;
  }
}
