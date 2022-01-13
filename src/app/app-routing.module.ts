import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './Pages/room/room.component';
import { WelcomeComponent } from './Pages/welcome/welcome.component';

const routes: Routes = [
  {
    path:'',
    component: WelcomeComponent
  },
  {
    path:'room',
    redirectTo: ''
  },
  {
    path:'room/:roomCode',
    component: RoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
