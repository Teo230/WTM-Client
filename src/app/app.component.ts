import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';

const darkClassName = 'darkMode';

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
      console.log('darkmode ON');
      this.overlay.getContainerElement().classList.add(darkClassName);
      document.body.classList.add(darkClassName);
    } else {
      console.log('darkmode OFF');
      this.overlay.getContainerElement().classList.remove(darkClassName);
      document.body.classList.remove(darkClassName);
    }
  }
}