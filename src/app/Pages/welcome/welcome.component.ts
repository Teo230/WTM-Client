import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WtmApiService } from 'src/app/services/wtm-api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

  meme: any = {};

  constructor(private wtmService: WtmApiService,
              private router: Router) {
    
  }

  ngOnInit(): void {
    this.getRandomMeme();
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
      this.router.navigate(['room/' + roomCode]);

    });
  }
}
