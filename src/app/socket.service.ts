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

  public ships: Ship[]   = [
    {name: 'Carrier 1', size: 4, selected: false, bullseye: false, direction:false, startPosition:0}, // statek 4 kratki
    {name: 'Battleship 1', size: 3, selected: false, bullseye: false, direction:false, startPosition:0},
    {name: 'Battleship 2', size: 3, selected: false, bullseye: false, direction:false, startPosition:0},
    {name: 'Submarine 1', size: 2, selected: false, bullseye: false, direction:false, startPosition:0},
    {name: 'Submarine 2', size: 2, selected: false, bullseye: false, direction:false, startPosition:0},
    {name: 'Submarine 3', size: 2, selected: false, bullseye: false, direction:false, startPosition:0},
    {name: 'Destroyer 1', size: 1, selected: false, bullseye: false, direction:false, startPosition:0},
    {name: 'Destroyer 2', size: 1, selected: false, bullseye: false, direction:false, startPosition:0},
    {name: 'Destroyer 3', size: 1, selected: false, bullseye: false, direction:false, startPosition:0},
    {name: 'Destroyer 4', size: 1, selected: false, bullseye: false, direction:false, startPosition:0},
  ];


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

  akcjaGracza(id: number) {
    this.socket.emit('akcjaGracza', id);
  }

  constructor() {

    this.socket.on('connect', () => {

    });

    this.socket.on('ustawienieStatkow', (stan:any) => {
      // console.log("Ustawienie statkow: ",stan);
      // console.log(stan.wybranePola);
      this.ships.forEach((ship: Ship) => {
        
        let isSel = stan.wybranePola.find((e: any) => e.ship && e.shipItem.name == ship.name); // sprawdzamy czy statek jest zaznaczony
        
        if(isSel != undefined && isSel.ship)
          ship.selected = true; // zaznaczamy statki, które zostały ustawione
                
      });

    }); 
      
    this.socket.on('stanGry', (stanGry: StanGry) => { 
      stanGry.my = this.userUnqId; // dodajemy nasze id do stanu gry
      console.log(stanGry);
      
      this._stanGry.next(stanGry); // poinformuj subskrybentów o zmianie stanu gry
    });

    this.socket.on('modTablice', (tablica:any, ships:Ship[]) => {
      this.bs.next({'tablica':tablica, 'statki':ships}); // poinformuj subskrybentów o zmianie tablicy
      console.log(tablica);
    });

   }
}
