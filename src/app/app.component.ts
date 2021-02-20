import { Component } from '@angular/core';
import {IconsService} from "./icons.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blabla';

  constructor(public iconService: IconsService) {
  }
}
