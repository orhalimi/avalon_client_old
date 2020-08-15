import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { PlayersService } from '../players.service';
import {SocketService} from '../socket.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

    public movie: any;
    public allGoodChracters: any;
    public allBadChracters: any;
    public numOfPlayersToBads: any;
  public BadChosen: any;
  public maxChracters: any;
  public amt: any;
  public amtBad: any;
  public amtGood: any;
  public maxBads: any;
  public maxGoods: any;
  public numOfPlayers: any;
  public chosen: any;
  public assassin: any;
  public numOfAssassin: any;
  public assassinChosen: any;
  public excalibur: any;
    public constructor(private location: Location, private router: Router, private http: HttpClient, public pl: PlayersService, private socket: SocketService) {
        this.movie = {
          good: {
            merlin: false,
            goodAngel: false,
            persibal: false
            },
          bad: {
            morgana: false,
          }
        };
        this.allGoodChracters = [{ name: 'Merlin', checked: false},
        { name: 'Percival', checked: false},
        { name: 'Good-Angel', checked: false},
        { name: 'Titanya', checked: false},
          { name: 'Nimue', checked: false},
          { name: 'Galahad', checked: false},
          { name: 'Sir-Kay', checked: false},
          { name: 'Seer', checked: false},
          { name: 'King-Arthur', checked: false},
          { name: 'Puck', checked: false},
          { name: 'Viviana', checked: false},
          { name: 'Tristan', checked: false},
          { name: 'Iseult', checked: false},
          { name: 'Prince-Claudin', checked: false},
          { name: 'Nirlem', checked: false},
          { name: 'Sir-Robin', checked: false},
          { name: 'Pellinore', checked: false},
          { name: 'Lot', checked: false},
          {name: 'Cordana', checked: false},
          {name: 'The-Coward', checked: false},
          {name: 'Merlin-Apprentice', checked: false},
          {name: 'Guinevere', checked: false},
          {name: 'Lancelot-Good', checked: false}
      ];
        this.allBadChracters = [{ name: 'Morgana', checked: false, assassin: false},
        { name: 'Assassin', checked: false, assassin: false},
        { name: 'Mordred', checked: false, assassin: false},
        { name: 'Oberon', checked: false, assassin: false},
        { name: 'Bad-Angel', checked: false, assassin: false},
          { name: 'King-Claudin', checked: false, assassin: false},
          { name: 'Ginerva', checked: false, assassin: false},
          { name: 'Polygraph', checked: false, assassin: false},
          {name: 'The-Questing-Beast', checked: false, assassin: false},
          {name: 'Accolon', checked: false, assassin: false},
          {name: 'Gawain', checked: false, assassin: false},
          {name: 'Lancelot-Bad', checked: false, assassin: false},
          {name: 'Queen-Mab', checked: false, assassin: false},
      ];
        this.BadChosen = 0;
        this.numOfPlayers = 0;
        this.amtBad = 0;
        this.amtGood = 0;
        this.amt = 0;
        this.assassin = '';
        this.assassinChosen = false;
        this.numOfAssassin = 0;
        this.numOfPlayersToBads = [ -1, 0, 1, -1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 5];
        this.excalibur = false;
    }

    public ngOnInit() {
      this.numOfPlayers = this.pl.getNumOfPlayers();
    }

  onChange(isChecked: boolean) {
    this.numOfPlayers = this.pl.getNumOfPlayers();
    if (isChecked) {
      this.amt++;
      this.amtGood++;
    }
    else {
      this.amt--;
      this.amtGood--;
    }
    this.amt === this.pl.boardGame.players.total ? this.maxChracters = true : this.maxChracters = false;
    // tslint:disable-next-line:max-line-length
    this.amtGood === (this.pl.boardGame.players.total - this.numOfPlayersToBads[this.pl.boardGame.players.total]) ? this.maxGoods = true : this.maxGoods = false;
  }

  onChangeAssassin(isChecked: boolean) {
    if (isChecked) {
      this.numOfAssassin++;
    }
    else {
      this.numOfAssassin--;
    }
  }

  onChangeBad(ch: any, isChecked: boolean) {
    this.numOfPlayers = this.pl.getNumOfPlayers();
    if (ch === 'Assassin') {
      this.assassinChosen = isChecked;
    }
    if (isChecked) {
      this.amtBad++;
      this.amt++;
    }
    else {
      this.amtBad--;
      this.amt--;
    }
    this.amtBad === this.numOfPlayersToBads[this.pl.boardGame.players.total] ? this.maxBads = true : this.maxBads = false;
    this.amt === this.pl.boardGame.players.total ? this.maxChracters = true : this.maxChracters = false;
  }

    public save() {
      if (!this.assassinChosen && this.numOfAssassin === 0) {
        return;
      }
      this.chosen = [ ...this.allGoodChracters, ...this.allBadChracters];
      // tslint:disable-next-line:max-line-length
      this.socket.send('{"type":"start_game", "content": {"characters" : ' + JSON.stringify(this.chosen) + ' , "excalibur": ' + JSON.stringify(this.excalibur) + '}}');
      /*this.http.post('http://localhost:12345/start-game', JSON.stringify(this.chosen))
                .subscribe(result => {
                    this.location.back();
                });*/
      this.excalibur = false;
      this.location.back();
    }

  public return() {
    this.location.back();
  }
}
