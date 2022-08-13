import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-storage-management',
  templateUrl: './admin-storage-management.component.html',
  styleUrls: ['./admin-storage-management.component.css']
})
export class AdminStorageManagementComponent implements OnInit {

  constructor() { }
  values = 'Nothing';

  onKey(event: any) { // without type info
	var splitted = event.target.value.split("://"); 
	var demo='';
    // this.values = event.target.value;
	for (var var0 of splitted){
		demo+=var0+'.';
	}
	var demo2 = demo.split("."); 
	for (var val of demo2) {
		if(val=='facebook'){
			this.values = 'Facebook';
			break;
		}
		else if(val=='google'){
			this.values = 'Google Drive';
			break;
		}
		else if(val=='onedrive' || val=='1drv'){
			this.values = 'OneDrive';
			break;
		}
		else{
			this.values = 'Nothing';
		}
	  
  }
  
}
  ngOnInit(): void {
  }

}
