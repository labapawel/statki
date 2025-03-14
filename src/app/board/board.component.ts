import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  imports: [NgFor],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  cellsCount = 10;
  cells = Array(this.cellsCount**2).fill({});
}
