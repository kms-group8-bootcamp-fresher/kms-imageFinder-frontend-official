import { Component, Inject, Injector, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private scroll: ViewportScroller, @Inject(Injector) private injector: Injector) { }
  private get _toast(): ToastrService {
    return this.injector.get(ToastrService);
  }
  ngOnInit(): void {
  }
  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }
  hienThongBaoDangXuat(){
    this._toast.success("Logout successfully!", "Successfully");
  }
}
