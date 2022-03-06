import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'equals';
  mode:any;
  constructor(){
    this.mode=localStorage.getItem("mode")

  }
}
