import { Component, OnInit } from '@angular/core';
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
export class RoomComponent implements OnInit {

  roomCode: any;
  room: any;
  joinRoomDialog: any;
  username: any;
  players: any[] = [{username:'test1',points: 20},{username:'test2',points: 10}];

  constructor(private signalRService: SignalRService,
              private route: ActivatedRoute,
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

  ngOnInit(): void {
    setInterval(()=>{
      this.players[this.players.length - 1].points += 30;
      this.players = this.players.sort((a,b) => b.points - a.points);
    },5000);
  }

  joinRoom(){
    this.roomCode = this.route.snapshot.paramMap.get('roomCode');
    this.signalRService.startConnection(this.roomCode, this.username);

    this.wtmService.JoinRoom(this.roomCode, this.username).then((room:any) => {
      //console.log(room);
      this.room = room;
      this.players.push({username: this.username, itsMe: true, points: 0});

      this.signalRService.player.subscribe(player => {
        if(player !== null)
          this.players.push(player)
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
