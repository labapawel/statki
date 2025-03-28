import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Ship } from '../ship';

@Component({
  selector: 'app-board',
  imports: [NgFor, NgClass],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  @Input() shipsSelected: boolean = false;
  @Input() ships: Ship[] = [];
  cellsCount = 10;
  cells: any[] = [];

  constructor() {

    for(let i = 0; i < this.cellsCount**2; i++){
      this.cells[i] = {ship: false};
      }
    
  }


  checkIfShip(index:number): boolean {
     let res =true;
     let rowIndex = index % this.cellsCount;
     [-11, -10, -9, -1, 1, 9, 10, 11].forEach((i) => {
      let el = index-i;
      let row = el % this.cellsCount;
    if((el >= 0 && el < this.cellsCount**2) && ((rowIndex==0 && row < 2) || (rowIndex==9 && row > 0))){
          if(this.cells[el].ship) res = false;
        }
     });
     return res;
  }

  shipConflictsV(item: any, shipLength: number): boolean {
    let index = this.cells.indexOf(item);
    let res = false;
    let slen = (index % this.cellsCount)-1;
    console.log('--------------------------------------------');
    console.log(slen, (slen + shipLength) < this.cellsCount);
    if(!((slen + shipLength) < this.cellsCount)) 
        return true;

    console.log('--------------------------------------------');
    
    for(let i = 0; i < shipLength; i++){
      console.log(i, index + i, this.checkIfShip(index + i));
      if(this.cells[index + i].ship) res = true;
    }
    return res;
  }
  shipConflictsH(item: any, shipLength: number): boolean {
    let index = this.cells.indexOf(item);
    let res = false;
    

    for(let i = 0; i < shipLength; i+=this.cellsCount){
      if(this.cells[index + i].ship ) res = true;
    }
    
    return res;
  }


  klik(item: any) {
    if(this.shipsSelected){
        let statek = this.ships.filter((s) => !s.selected)[0];
        if(!statek) return;

        let index = this.cells.indexOf(item);
        let shipLength = statek.size;
        
        if(!this.shipConflictsV(item, shipLength)){
        statek.selected = true;
        for(let i = 0; i < shipLength; i++){
          this.cells[index + i].ship = true;
          this.cells[index + i].shipItem = statek;
        }
       }

    }
  }
}
