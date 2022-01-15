import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService implements OnDestroy {
  roomCode: any;

  joinedPlayer = new BehaviorSubject(null);
  leftPlayerId = new BehaviorSubject(null);

  hubConnection: HubConnection = new HubConnectionBuilder()
                                    .withUrl('https://157.230.24.19/servicehub',{transport: HttpTransportType.LongPolling})
                                    //.withUrl('https://localhost:5004/servicehub',{transport: HttpTransportType.LongPolling})
                                    .build();
  
  constructor(private matSnackbar: MatSnackBar){
  }

  ngOnDestroy(): void {
    this.closeConnection();
  }
  
  public startConnection = (roomCode: string, username: string, playerId: number) => {
    
    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started')
        this.hubConnection.invoke("JoinRoom",roomCode, playerId);
        this.roomCode = roomCode;
        this.StartEvents();
      })
      .catch((err: any) => console.log('Error while starting connection: ' + err))
  }

  public closeConnection(){
    return new Promise((res)=>{
      this.EndEvents();
      this.hubConnection.stop().then(()=>{
        this.roomCode = null;
      });  

      res(true);
    });
  }

  private StartEvents(){
    this.getMessageListener();
    this.playerJoined();
    this.playerLeft();
  }

  private EndEvents(){
    this.hubConnection.off('sendMessage');
    this.hubConnection.off('playerJoined');
    this.hubConnection.off('playerLeft');
  }

  public getMessageListener(){
      this.hubConnection.on('sendMessage', (message:any) => {
        this.matSnackbar.open(message)._dismissAfter(5000);
    });     
  }

  public playerJoined(){
    this.hubConnection.on('playerJoined', (player:any)=>{
      player.itsMe = false;
      this.joinedPlayer.next(player);
    });
  }

  public playerLeft(){
    this.hubConnection.on('playerLeft', (playerId: any)=>{
      //console.log('Player with Id ' + playerId + ' disconnected');
      this.leftPlayerId.next(playerId);
    });
  }
}
