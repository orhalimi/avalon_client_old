import { Component, OnInit } from '@angular/core';
import {PlayersService} from "../players.service";
import {BoardGameModel} from "../model/board-game.model";

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {

  board: BoardGameModel = null;

  constructor(private playerService: PlayersService) {
    this.playerService.boardSubject.subscribe((board: BoardGameModel) => {
      console.log("new board", board);
      this.board = board;
    })
  }

  ngOnInit(): void {
  }

}
