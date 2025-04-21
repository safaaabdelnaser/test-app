import { Injectable } from '@angular/core';
import { Iproduct } from '../Models/iproduct';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productList: Iproduct[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private _httpClient: HttpClient) {}

  getAllProducts(): Observable<Iproduct[]> {
    return this._httpClient.get<Iproduct[]>(`${environment.baseURL}/products`);
  }
  getProductByCatID(id: number): Observable<Iproduct[]> {
    if (id == 0) {
      return this._httpClient.get<Iproduct[]>(
        `${environment.baseURL}/products`
      );
    } else {
      return this._httpClient.get<Iproduct[]>(
        `${environment.baseURL}/products?catID=${id}`
      );
    }
  }
  getProductByProductID(prodID: string): Observable<Iproduct> {
    return this._httpClient.get<Iproduct>(
      `${environment.baseURL}/products/${prodID}`
    );
  }
  addNewProduct(newProd: Iproduct): Observable<Iproduct> {
    return this._httpClient.post<Iproduct>(
      `${environment.baseURL}/products`,
      newProd,
      this.httpOptions
    );
  }
}
