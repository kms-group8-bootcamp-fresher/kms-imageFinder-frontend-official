import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {decode} from 'base64-arraybuffer';
import {WebcamImage} from 'ngx-webcam';
import {ExampleService} from './../services/example.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imagesResponse: Array<string> | undefined;
  imageBuffer: string | ArrayBuffer | null | undefined;
  registerForm: any = FormGroup;
  submitted = false;
  isFileUploaded = false;
  file: any = null;
  products: any;
  public show: boolean = true;
  public framework = 'angular';
  public formUpload = this._formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    //name:['',[Validators.required,Validators.minLength(3)]],
    file: [''],
    price: ['']
  })
  public formUpload1 = this._formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
  })
  public formUpload2 = this._formBuilder.group({
    file: [''],
  })
// webcamImage: WebcamImage = null;
  webcamImage: WebcamImage | undefined;

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _service: ExampleService) {
  }

  get f() {
    return this.registerForm.controls;
  }

  public boHinhVao: any = '';

  onSubmitImage(data: any) {
    console.log('data ne', this.imageBuffer);
    const formData = {
      userFile: this.imageBuffer,
      user_id: 'ml_test_bucket_team_8',
      imageNum: 10
    }
    //Send data to server
    this._service.uploadData(formData).subscribe({
      next: (res: any) => {
        this.imagesResponse = res.matchedImageLinks.matchedImageUrls
        //this.getData();
      },
      error: err => {
        console.log(err.message);
      }
    })
  }

  getData() {
    this._service.getAllProducts().subscribe({
      next: data => this.products = data,
      error: error => console.log(error)
    })
  }

  ngOnInit(): void {
    //   this._service.getAllProducts().subscribe({
    // 		  next: data=>this.products=data,
    // 		  error: error=>console.log(error)
    // 	  })
    this.registerForm = this._formBuilder.group({
      imageInput: ['', [Validators.required]],

    });
    this.getData();

  }

  onImageChangeFromFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageBuffer = reader.result;
    };
  }

  // getData(){
  //     this._service.getAllProducts().subscribe({
  // 		  next: data=>this.products=data,
  // 		  error: error=>console.log(error)
  // 	  })
  // }

  onChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log("File info: ", event.target.files[0]);
      if (this.file.typefile.type == "image/jpeg" ||
        this.file.typefile.type == "image/jpg" ||
        this.file.typefile.type == "image/png") {
        console.log("correct");
      } else {
        this.file = null;
      }
    } else {
      this.file = null;
    }
  }

  onSubmit(data: any) {
    /* console.log("Data:",data); */
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("file", this.file);
    formData.append("price", data.price);
    // console.log("FormData:",formData);
    // for(let pair of formData.entries()){
    // 	//cấu hình entries trong tsconfig.json
    // 	console.log(pair[0],pair[1]);
    // }

    //Send data to server
    // this._service.uploadData(formData).subscribe({
    // 	next: res=>{
    // 		console.log(res);
    // 		this.getData();
    // 	},
    // 	error:err=>{
    // 		console.log(err.message);
    // 	}
    // })


  }

  onSubmitForm1(data: any) {
    /* console.log("Data:",data); */
    let formData = new FormData();
    formData.append("name", data.name);
  }

  onSubmitForm2(data: any) {
    /* console.log("Data:",data); */
    let formData = new FormData();
    formData.append("file", this.file);
  }

  onSelect(id: any) {
    this._router.navigate(['/details', id])
  }

  get nameInput() {
    // return this.formUpload.controls['name'];
    return this.formUpload1.controls['name'];
  }

  changeView(): void {
    this.show = !this.show;
  }

  changeView1(): void {
    this.show = !this.show;
  }

  selectedMode = 'Portrait';
// 	onSelected(value:string): void {
// 		this.selectedMode = value;
// 	}
// 	isVisible: any;
//   isSelected: boolean = true;

  GoogleDriveInput: boolean = false;
  OneDriveInput: boolean = false;
  FacebookInput: boolean = false;

  resetAllForms() {
    this.isFileUploaded = false;
    this.registerForm.reset();
    this.registerForm.controls["imageInput"].setValidators([Validators.required]);
    this.registerForm.get('imageInput').updateValueAndValidity();
    this.formUpload1.reset();
    this.formUpload1.controls["nameInput"].setValidators([Validators.required]);
    // this.formUpload1.get('nameInput').updateValueAndValidity(); // lỗi
  }

  values = 'Nothing';

  onKey(event: any) { // without type info
    var splitted = event.target.value.split("://");
    var demo = '';
    // this.values = event.target.value;
    for (var var0 of splitted) {
      demo += var0 + '.';
    }
    var demo2 = demo.split(".");
    for (var val of demo2) {
      if (val == 'facebook') {
        this.values = 'Facebook';
        break;
      } else if (val == 'google') {
        this.values = 'Google Drive';
        break;
      } else if (val == 'onedrive' || val == '1drv') {
        this.values = 'OneDrive';
        break;
      } else {
        this.values = 'Nothing';
      }

    }

  }

  public images = "https://pictures-finder-team-8.uc.r.appspot.com";
// public images="http://localhost:3000";
  public images3 = {
    "userImageLink": "https://storage.googleapis.com/ml_test_bucket_team_8/user_face/user_face_715d1300-5f3c-45db-85a7-899cacf23ff0.jpg",
    "matchedImageLinks": {
      "matchedImageUrls": [
        "" +
        "https://storage.googleapis.com/ml_test_bucket_team_8/images/DSC_4785.JPG",
        "https://storage.googleapis.com/ml_test_bucket_team_8/images/DSC_4785.JPG",
        "https://storage.googleapis.com/ml_test_bucket_team_8/images/DSC_4781.JPG",
        "https://storage.googleapis.com/ml_test_bucket_team_8/images/DSC_6093.JPG",
        "https://storage.googleapis.com/ml_test_bucket_team_8/images/DSC_6087.JPG"
      ]
    }
  }

  public images2 = {
    "matchedImageUrls":
      [
        '../../assets/library/E203/Pic (1).jpg',
        '../../assets/library/E203/Pic (2).jpg',
        '../../assets/library/E203/Pic (3).jpg',
        '../../assets/library/E203/Pic (4).jpg',
        '../../assets/library/E203/Pic (5).jpg',
        '../../assets/library/E203/Pic (6).jpg',
        '../../assets/library/E203/Pic (7).jpg',
        '../../assets/library/E203/Pic (8).jpg',
        '../../assets/library/E203/Pic (9).jpg',
        '../../assets/library/E203/Pic (10).jpg',
        '../../assets/library/E203/Pic (11).jpg',
        '../../assets/library/E203/Pic (12).jpg',
        '../../assets/library/E203/Pic (13).jpg',
        '../../assets/library/E203/Pic (14).jpg',
        '../../assets/library/E203/Pic (15).jpg',
        '../../assets/library/E203/Pic (16).jpg',
        '../../assets/library/E203/Pic (17).jpg',
        '../../assets/library/E203/Pic (18).jpg',
        '../../assets/library/E203/Pic (19).jpg',
        '../../assets/library/E203/Pic (20).jpg',
        '../../assets/library/E203/Pic (21).jpg',
        '../../assets/library/E203/Pic (22).jpg',
        '../../assets/library/E203/Pic (23).jpg',
        '../../assets/library/E203/Pic (24).jpg',
        '../../assets/library/E203/Pic (25).jpg',
        '../../assets/library/E203/Pic (26).jpg',
        '../../assets/library/E203/Pic (27).jpg',
        '../../assets/library/E203/Pic (28).jpg',
        '../../assets/library/E203/Pic (29).jpg',
        '../../assets/library/E203/Pic (30).jpg',
        '../../assets/library/E203/Pic (31).jpg',
        '../../assets/library/E203/Pic (32).jpg',
        '../../assets/library/E203/Pic (33).jpg',
        '../../assets/library/E203/Pic (34).jpg',
        '../../assets/library/E203/Pic (35).jpg',
        '../../assets/library/E203/Pic (36).jpg',
        '../../assets/library/E203/Pic (37).jpg',
        '../../assets/library/E203/Pic (38).jpg',
        '../../assets/library/E203/Pic (39).jpg',
        '../../assets/library/E203/Pic (40).jpg',
        '../../assets/library/E203/Pic (41).jpg',
        '../../assets/library/E203/Pic (42).jpg',
        '../../assets/library/E203/Pic (43).jpg',
        '../../assets/library/E203/Pic (44).jpg',
        '../../assets/library/E203/Pic (45).jpg',
        '../../assets/library/E203/Pic (46).jpg',
        '../../assets/library/E203/Pic (47).jpg',
        '../../assets/library/E203/Pic (48).jpg',
        '../../assets/library/E203/Pic (49).jpg',
        '../../assets/library/E203/Pic (50).jpg',
        '../../assets/library/E203/Pic (51).jpg',
        '../../assets/library/E203/Pic (52).jpg',
        '../../assets/library/E203/Pic (53).jpg',
        '../../assets/library/E203/Pic (54).jpg',
        '../../assets/library/E203/Pic (55).jpg',
        '../../assets/library/E203/Pic (56).jpg',
        '../../assets/library/E203/Pic (57).jpg',
        '../../assets/library/E203/Pic (58).jpg',
        '../../assets/library/E203/Pic (59).jpg',
        '../../assets/library/E203/Pic (60).jpg',
        '../../assets/library/E203/Pic (61).jpg',
        '../../assets/library/E203/Pic (62).jpg'

      ]
  }
  public showResults: boolean = false;

  hienKetQua() {
    this.showResults = true;
    // this.images=getAllProducts();
    // this._service.getAllProducts();
  }

  _base64ToArrayBuffer(base64: any) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
