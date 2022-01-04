import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const imageService = "ImageManager/";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class WtmApiService {

  baseUrl: string = "http://157.230.24.19:8080/";

  constructor(private httpClient: HttpClient){ 
  }

  public GetRandomMemes(count: number){
    return new Promise((resolve) => {

      this.httpClient.get(this.baseUrl + imageService + "GetRandomMemes/" + count, httpOptions)
          .subscribe((res:any) =>{
            resolve(res);
          }, error => console.log(error));
    });
  }
}
