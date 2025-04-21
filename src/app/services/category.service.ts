import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icategory } from '../Models/icategory';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _httpClient: HttpClient) {}
  getAllcategories(): Observable<Icategory[]> {
    return this._httpClient.get<Icategory[]>(
      `${environment.baseURL}/categories`
    );
  }
}
