
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JoinRoomDialogComponent } from 'src/app/Components/join-room-dialog/join-room-dialog.component';
import { SignalRService } from 'src/app/services/signal-r.service';
import { WtmApiService } from 'src/app/services/wtm-api.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  roomCode: any;
  room: any;
  joinRoomDialog: any;
  username: any;
  players: any[] = [];
  localPlayer: any;

  constructor(private signalRService: SignalRService,
              private activatedRoute: ActivatedRoute,
              private wtmService: WtmApiService,
              private matDialog: MatDialog) 
              {
    this.joinRoomDialog = this.matDialog.open(JoinRoomDialogComponent, {disableClose: true, backdropClass:'joinRoomDialogBackground'});
    this.joinRoomDialog.afterClosed()
    .subscribe((username: any) =>{
      this.username = username;
      this.joinRoom();
    })
  }

  ngOnDestroy(): void {
    this.signalRService.closeConnection();
  }

  ngOnInit(): void {
    window.addEventListener('beforeunload',(event)=>{
      this.signalRService.closeConnection().then();
    });

    window.addEventListener('unload',(event)=>{
      this.signalRService.closeConnection().then();
    })

    this.signalRService.joinedPlayer.subscribe((player:any) => {
      if(player !== null)
        this.players.push(player)
    });

    this.signalRService.leftPlayerId.subscribe((playerId:any)=>{
      if(playerId !== null)
        this.players = this.players.filter(x => x.id !== playerId);
    });

    setInterval(()=>{
      this.players[this.players.length - 1].points += 30;
      this.players = this.players.sort((a,b) => b.points - a.points);
    },5000);
  }

  joinRoom(){
    this.roomCode = this.activatedRoute.snapshot.paramMap.get('roomCode');

    this.wtmService.JoinRoom(this.roomCode, this.username).then((player:any) => {
      this.signalRService.startConnection(this.roomCode, this.username, player.id);

      this.room = player.room;

      this.localPlayer = player;
      this.localPlayer.itsMe = true;
      this.players.push(this.localPlayer);
      this.getPlayers();
    });  
  }

  getPlayers(){
    this.wtmService.GetPlayers(this.room.id).then((players:any)=>{
      console.log(this.players);
      let tempPlayers = players.filter((x: any) => x.id !== this.localPlayer.id);
      tempPlayers.forEach((player: any) => {
        this.players.push(player);
      });
    });
  }

  voteKick(player: any){
    this.players = this.players.filter(x => x !== player);
  }

  copyUrl(){
    return window.location.href;
  }
}
