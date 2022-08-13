import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private scroll: ViewportScroller) { }

  ngOnInit(): void {
  }
  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }
}
