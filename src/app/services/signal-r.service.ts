import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnDestroy {

  roomCode: any;
  player = new BehaviorSubject(null);

  hubConnection: HubConnection = new HubConnectionBuilder()
                                    .withUrl('https://157.230.24.19/servicehub',{transport: HttpTransportType.LongPolling})
                                    //.withUrl('https://localhost:5004/servicehub',{transport: HttpTransportType.LongPolling})
                                    .build();
  
  constructor(private matSnackbar: MatSnackBar){
  }

  ngOnDestroy(): void {
    this.hubConnection.invoke("LeaveRoom",this.roomCode).then(() =>{
      this.hubConnection.stop().then(() =>{
        console.log('Connection stoped');
      });  
    })
  }
  
  public startConnection = (roomCode: string, username: string) => {
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started')
        this.hubConnection.invoke("JoinRoom",roomCode);
        this.roomCode = roomCode;
        this.StartEvents();
      })
      .catch((err: any) => console.log('Error while starting connection: ' + err))
  }

  private StartEvents(){
    this.getMessageListener();
    this.playerJoined();
  }

  public getMessageListener(){
    this.hubConnection.on('sendMessage', (message:any) => {
      this.matSnackbar.open(message)._dismissAfter(3000);
    });     
  }

  public playerJoined(){
    this.hubConnection.on('playerJoined', (username:any)=>{
      let player: any = {};
      player.username = username
      player.itsMe = false;
      player.points = 0;     
      this.player.next(player);
    })
  }
}
