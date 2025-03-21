import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { Ship } from './ship';

@Component({
  selector: 'app-root',
  imports: [BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Statki';
  ships: Ship[]   = [
    {name: 'Carrier', size: 4, selected: false},
    {name: 'Battleship', size: 3, selected: false},
    {name: 'Battleship', size: 3, selected: false},
    {name: 'Submarine', size: 2, selected: false},
    {name: 'Submarine', size: 2, selected: false},
    {name: 'Submarine', size: 2, selected: false},
    {name: 'Destroyer', size: 1, selected: false},
    {name: 'Destroyer', size: 1, selected: false},
    {name: 'Destroyer', size: 1, selected: false},
    {name: 'Destroyer', size: 1, selected: false},
  ];
}