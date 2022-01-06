import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-join-room-dialog',
  templateUrl: './join-room-dialog.component.html',
  styleUrls: ['./join-room-dialog.component.scss']
})
export class JoinRoomDialogComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('', Validators.required)
  });

  constructor(private matDialog: MatDialogRef<JoinRoomDialogComponent>) { 
    this.userForm.markAsPristine();
  }

  ngOnInit(): void {
  }

  confirm(){
    //console.log(this.userForm);
    if(this.userForm.valid)
      this.matDialog.close(this.userForm.value.username);
  }
}
