import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { StanGry } from './stan-gry';
import { Ship } from './ship';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private bs: BehaviorSubject<any> = new BehaviorSubject<any>({'tablica':[], 'statki':[]}); // tablica i statki
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

  wyslijTablice(tablica: any, ships: Ship[] = []) {
    this.socket.emit('modTablice', tablica, ships);
  }

  constructor() {

    this.socket.on('connect', () => {});

    this.socket.on('stanGry', (stanGry: StanGry) => { 
      stanGry.my = this.userUnqId; // dodajemy nasze id do stanu gry
      this._stanGry.next(stanGry); // poinformuj subskrybentów o zmianie stanu gry
    });

    this.socket.on('modTablice', (tablica:any, ships:Ship[]) => {
      this.bs.next({'tablica':tablica, 'statki':ships}); // poinformuj subskrybentów o zmianie tablicy
      console.log(tablica);
    });

   }
}
