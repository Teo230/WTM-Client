import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';

const themeClassName = 'lightMode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private overlay: OverlayContainer) {

  }
  
  ngOnInit(): void {

  }

  themeModeSwitch(event: any){
    if (event.checked) {
      console.log('lightMode ON');
      this.overlay.getContainerElement().classList.add(themeClassName);
      document.body.classList.add(themeClassName);
    } else {
      console.log('lightMode OFF');
      this.overlay.getContainerElement().classList.remove(themeClassName);
      document.body.classList.remove(themeClassName);
    }
  }
}