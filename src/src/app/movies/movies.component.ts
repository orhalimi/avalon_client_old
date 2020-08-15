import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PlayersService } from '../players.service';
import {interval, pipe} from 'rxjs';
import { SocketService } from '../socket.service';
import { TruncatePipe } from '../limitpipe';
import { RoundPipe } from '../rountpipe';
import { AuthService } from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})


export class MoviesComponent implements OnInit {

  form: FormGroup;
  public messages: Array<any>;
  public filterqu: Array<boolean>;
  public chatBox: string;
  maxNo = false;
  MurdermaxNo = false;
  amt = 0;
    public movies: any;
    public players: any;
  public player: any;
  public state: any;
  public vote: any;
  public votes: any;
  public journeyVote: any;
  public secrets: any;
  public board: any;
  public flipped: any;
  public collapsed: any;
  public myClass: any;
  public suggestion: any;
  public user: any;
  public oldState: any;
  public panelOpenState: any;
  public showSuggestion: boolean;
  public showPlayer: any;
  public results: any;
  public playersSuggestion: any;
  public colorLabels: any;
  public assassinKill: any;
  public constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private location: Location, public pl: PlayersService, private socket: SocketService, public authService: AuthService) {
        this.movies = [];
        this.colorLabels = {
      Merlin: 'Blue',
      green: 'Green',
      red: 'Red',
    };
        this.players = [];
        this.vote = [];
        this.user = [];
        this.state = 0;
        this.votes = [];
        this.journeyVote = [];
        this.secrets = [];
        this.maxNo = false;
        this.MurdermaxNo = false;
        this.amt = 0;
        this.board = [];
        this.suggestion = [];
        this.oldState = 0;
        this.results = [];
        this.myClass = 'xxssw';
        this.showPlayer = '';
        this.showSuggestion = false;
        this.messages = [];
        this.playersSuggestion = new Set();
        this.filterqu = [true, true, true, true, true, true, true, true, true];
        this.chatBox = '';
        this.assassinKill = '';
        this.journeyVote.vote = -1;
        this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    public ngOnInit() {
        this.location.subscribe(() => {
            this.refresh();
        });
        document.body.classList.add('bg-img');
        this.amt = 0;
        this.refresh();
    }

  // tslint:disable-next-line:use-lifecycle-interface
  public ngOnDestroy() {
    console.log('ChildComponent:OnDestroy');
  }

  logout() {
      this.authService.logout();
      this.socket.close();
  }

  ShowPlayer(pl: string) {
    this.showPlayer = pl;
  }

  login() {
    const val = this.form.value;

    if (val.username && val.password) {
      // tslint:disable-next-line:no-unused-expression
      this.authService.login(val.username, val.password, () => { this.socket.openSocket; });
    }
  }

  onChange(player: string, isChecked: boolean) {
    if (isChecked) {
      this.amt++;
      console.log('amt==', this.amt);
      this.playersSuggestion.add(player);
      this.socket.send('{"type":"suggestion_tmp", "content":' + JSON.stringify([...this.playersSuggestion]) + '}');
      console.log('playersSuggestion==',  this.playersSuggestion);
    }
    else {
      this.amt--;
      console.log('amt2==', this.amt);
      this.playersSuggestion.delete(player);
      this.socket.send('{"type":"suggestion_tmp", "content":' + JSON.stringify([...this.playersSuggestion]) + '}');
    }
    console.log('amt3=', this.pl.boardGame.results[this.pl.boardGame.current].numofplayers);
    this.amt === this.pl.boardGame.results[this.pl.boardGame.current].numofplayers ? this.maxNo = true : this.maxNo = false;
  }

    private refresh() {
    }

  public getMsg() {
    return this.pl.getMsg();
  }

  public isSystemMessage(message: string) {
    return message != null && message.startsWith('/') ? '<strong>' + message.substring(1) + '</strong>' : message;
  }

  public send() {
    if (this.chatBox) {
      this.socket.send(this.chatBox);
      this.chatBox = '';
    }
  }

  public FilterQuests(index) {
      const newIndex = Math.floor(index);
      this.filterqu[newIndex] = !this.filterqu[newIndex];
  }

  public Suggest() {
    this.amt = 0;
    this.socket.send('{"type":"suggestion", "content":' + JSON.stringify([...this.playersSuggestion]) + '}');
    /*this.http.post('http://localhost:12345/suggestion', JSON.stringify(this.players))
        .subscribe(result => {
          this.suggestion.voted == true;
        });*/
    console.log(this.playersSuggestion);
    this.playersSuggestion = new Set();
    this.suggestion.voted = true;
    this.maxNo = false;
  }

  public Murder() {
    this.amt = 0;
    // tslint:disable-next-line:max-line-length
    this.socket.send('{"type":"murder", "content": { "assassinkill": "' + this.assassinKill + '", "rest":' + JSON.stringify(this.pl.boardGame.players.all) + '}}');
    this.MurdermaxNo = false;
  }

  public SirPick() {
    this.amt = 0;
    // tslint:disable-next-line:max-line-length
    this.socket.send('{"type":"sir_pick", "content": { "pick": "' + this.assassinKill + '"}}');
    this.assassinKill = '';
  }

  public reset() {
    this.socket.send('{"type":"reset", "content":""}');
  }

  public SendGoodVote() {
    this.player = this.authService.name;
    this.vote.vote = true;
    this.pl.showSuggestion = false;
    if (this.authService.name !== '' ) {
      this.socket.send('{"type":"vote_for_suggestion", "content":' + '{"playerName": "' + this.player + '", "vote": true }' + '}');
    }
  }

  public SendBadVote() {
    this.player = this.authService.name;
    this.pl.showSuggestion = false;
    if (this.authService.name !== '' ) {
      this.socket.send('{"type":"vote_for_suggestion", "content":' + '{"playerName": "' + this.player + '", "vote": false }' + '}');
    }
  }

  public JourneyVote() {
    this.player = this.authService.name;
    if (this.journeyVote.vote < 0) { return; }
    if (this.player !== '' ) {
      // tslint:disable-next-line:max-line-length
      this.socket.send('{"type":"vote_for_journey", "content":' + '{"playerName": "' + this.player + '", "vote": ' + this.journeyVote.vote + ' }' + '}');
      this.journeyVote = [];
      this.journeyVote.vote = -1;
      this.journeyVote.errorCode = null;
    }
  }

    public create() {
        this.router.navigate(['create']);
    }

  public add() {
    this.router.navigate(['add']);
  }
}
