import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, retry, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(private _http: HttpClient) { }

  readonly api_url = 'https://pictures-finder-team-8.uc.r.appspot.com'
  //readonly api_url = 'http://localhost:3001'

  uploadData(data: any){
    console.log('asdasdasd', data)
    return this._http.post(`${this.api_url}/google/upload_user_image`, data).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getAllProducts(){
    return this._http.get(`${this.api_url}/google/upload_user_image`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

getProductInfo(id:any){
  return this._http.get(`${this.api_url}/products/${id}`).pipe(
    retry(2),
    catchError(this.handleError)
  )
}

  handleError(err:HttpErrorResponse){
    return throwError(()=>new Error(err.message))
  }

}
