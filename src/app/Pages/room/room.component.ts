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

  constructor(private signalRService: SignalRService,
              private route: ActivatedRoute,
              private wtmService: WtmApiService,
              private matDialog: MatDialog) 
              {
    this.joinRoomDialog = this.matDialog.open(JoinRoomDialogComponent, {disableClose: true})
                          .afterClosed()
                          .subscribe((username: any) =>{
                            this.username = username;
                            this.joinRoom();
                          })

  }

  ngOnInit(): void {
  }

  joinRoom(){
    this.roomCode = this.route.snapshot.paramMap.get('roomCode');
    this.signalRService.startConnection(this.roomCode, this.username);
    this.signalRService.getMessageListener();

    this.wtmService.JoinRoom(this.roomCode, this.username).then((room:any) => {
      // console.log(room);
      this.room = room;
    });  
  }
}
