import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = "Hello World. I'm learning angular";

  public constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Hello World!');
  }

}
