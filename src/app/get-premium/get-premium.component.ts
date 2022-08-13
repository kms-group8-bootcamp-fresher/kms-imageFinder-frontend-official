import { Component, Inject, Injector, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-premium',
  templateUrl: './get-premium.component.html',
  styleUrls: ['./get-premium.component.css']
})
export class GetPremiumComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder, @Inject(Injector) private injector: Injector) { }
  private get _toast(): ToastrService {
    return this.injector.get(ToastrService);
  }
  ngOnInit(): void {
  }
  hienThongBao() {
    this._toast.success("Paid successfully!", "Successfully");
  }
  public formUpload1 = this._formBuilder.group({
		name:['',Validators.compose([Validators.required,Validators.minLength(3)])],
	})
  get typeCardNumberInput(){
    // return this.formUpload.controls['name'];
    return this.formUpload1.controls['typeCardNumber'];
  }
  public loaiThe:string='';
  creditCardType(event: any) {
    let amex = new RegExp('^3[47][0-9]{13}$');
    let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
    let cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
    let cup2 = new RegExp('^81[0-9]{14}[0-9]*$');
  
    let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');
  
    let disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
    let disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
    let disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');
    
    let diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
    let jcb =  new RegExp('^35[0-9]{14}[0-9]*$');
    // this.loaiThe='b';
  
    if (visa.test(event.target.value)) {
      this.loaiThe = 'VISA';
    }
    else if (amex.test(event.target.value)) {
      this.loaiThe = 'AMEX';
    }
    else if (mastercard.test(event.target.value) || mastercard2.test(event.target.value)) {
      this.loaiThe = 'MASTERCARD';
    }
    else if (disco1.test(event.target.value) || disco2.test(event.target.value) || disco3.test(event.target.value)) {
      this.loaiThe = 'DISCOVER';
    }
    else if (diners.test(event.target.value)) {
      this.loaiThe = 'DINERS';
    }
    else if (jcb.test(event.target.value)) {
      this.loaiThe = 'JCB';
    }
    else if (cup1.test(event.target.value) || cup2.test(event.target.value)) {
      this.loaiThe = 'CHINA_UNION_PAY';
    }
    else {
      this.loaiThe='';
    }
  }
}
