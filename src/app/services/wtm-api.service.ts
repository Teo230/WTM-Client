import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const imageService = "ImageManager/";
const roomService = "Room/";

const baseUrl = "https://157.230.24.19/";
//const baseUrl = "https://localhost:5004/";
const apiKey = "b851e72a-cad9-4eda-84a9-0d44eae13b80";
const httpOptions: any = {
  headers: new HttpHeaders({'apiKey' : apiKey,
                            'Access-Control-Allow-Origin' : '*',
                            'Content-Type': 'application/json'}),
}

@Injectable({
  providedIn: 'root'
})

export class WtmApiService {

  constructor(private httpClient: HttpClient){ 
  }

  public GetRandomMemes(count: number){
    return new Promise((resolve) => {
      this.httpClient.get(baseUrl + imageService + "GetRandomMemes/" + count, httpOptions)
          .subscribe((res:any) =>{
            resolve(res);
          }, 
          //error => console.log(error)
      );
    });
  }

  public GenerateRoom(){
    return new Promise((resolve) => {
      let localOptions = httpOptions;
      localOptions.responseType = "text";

      this.httpClient.post(baseUrl + roomService + "GenerateRoom", null, localOptions)
          .subscribe((res:any) =>{
            resolve(res);
          },
          //error => console.log(error)
      );
    });
  }

  public JoinRoom(roomCode: string, username: string){
    return new Promise((resolve) => {
      this.httpClient.post(baseUrl + roomService + "JoinRoom?roomCode=" + roomCode + "&username=" + username, null, httpOptions)
          .subscribe((res:any) =>{
            resolve(res);
          },
          //error => console.log(error)
      );
    });
  }
}
