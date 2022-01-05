import { Component, OnInit } from '@angular/core';
import { WtmApiService } from 'src/app/services/wtm-api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

  meme: any = {};

  constructor(private wtmService: WtmApiService) {
    this.getRandomMeme();
  }

  ngOnInit(): void {
  }

  getRandomMeme(){
    this.wtmService.GetRandomMemes(1).then((res:any)=>{
      this.meme = res.memes[0];
      //console.log(this.meme);
    });
  }

  createRoom(){
    this.wtmService.GenerateRoom().then((roomCode:any) => {
      console.log(roomCode);
      this.wtmService.JoinRoom(roomCode).then((room:any) => {
        console.log(room);
      });
    });
  }
}
