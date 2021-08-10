import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  pageName: String;

  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.pageName = this.titleService.getTitle();
  }




}





