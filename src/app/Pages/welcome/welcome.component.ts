import { Component, OnInit } from '@angular/core';
import { WtmApiService } from 'src/app/services/wtm-api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private wtmService: WtmApiService) {
    this.wtmService.GetRandomMemes(1).then((res)=>{
      console.log(res);
    });
  }

  ngOnInit(): void {
  }

}
