import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const imageService = "ImageManager/";
const roomService = "Room/";

const baseUrl = "https://157.230.24.19/";
const apiKey = "b851e72a-cad9-4eda-84a9-0d44eae13b80";
const httpOptions: any = {
  headers: new HttpHeaders({'apiKey' : apiKey,
                            'Access-Control-Allow-Origin' : '*'}),
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

  public JoinRoom(roomCode: string){
    return new Promise((resolve) => {
      let content = JSON.stringify({roomCode: roomCode});
      this.httpClient.post(baseUrl + roomService + "JoinRoom", content, httpOptions)
          .subscribe((res:any) =>{
            resolve(res);
          },
          //error => console.log(error)
      );
    });
  }
}
