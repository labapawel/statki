import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { StanGry } from './stan-gry';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private bs: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);  
  private _stanGry: BehaviorSubject<StanGry|null> = new BehaviorSubject<StanGry|null>(null); // stanGry

  public get subscribe(){
    return this.bs.asObservable();
  }
  public get stanGry(){
    return this._stanGry.asObservable();
  }

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

    this.socket.on('stanGry', (stanGry: StanGry) => { 
      stanGry.my = this.userUnqId; // dodajemy nasze id do stanu gry
      this._stanGry.next(stanGry); // poinformuj subskrybentów o zmianie stanu gry
    });

    this.socket.on('modTablice', (tablica:any) => {
      this.bs.next(tablica); // poinformuj subskrybentów o zmianie tablicy
      console.log(tablica);
    });

   }
}
