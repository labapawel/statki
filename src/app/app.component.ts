import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { Ship } from './ship';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  imports: [BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Statki';
  

}