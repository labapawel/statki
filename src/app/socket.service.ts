import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public get userUnqId(): number {
    this._userUnqId = localStorage.getItem('userUnqId') ? parseInt(localStorage.getItem('userUnqId')!) : 0;    
    if(!this._userUnqId){
      this._userUnqId = Math.floor(Math.random() * 1000000000000000);
      localStorage.setItem('userUnqId', this._userUnqId.toString());
    }
    return this._userUnqId;
  }

  private socket: Socket = io('wss://localhost:443', {
    query:{
      unqId: this.userUnqId
    }
  });
  private _userUnqId:number = 0;

  wyslijTablice(tablica: any){
    this.socket.emit('modTablice', tablica);
  }

  constructor() {

    this.socket.on('connect', () => {});
    this.socket.on('modTablice', (tablica:any) => {
      console.log(tablica);
    });

   }
}
