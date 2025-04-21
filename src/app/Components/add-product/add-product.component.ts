import { Component, OnInit } from '@angular/core';
import { Icategory } from '../../Models/icategory';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Iproduct } from '../../Models/iproduct';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  categoryList: Icategory[] = [];
  newProduct: Iproduct = {} as Iproduct;
  constructor(
    private _CategoryService: CategoryService,
    private _ProductService: ProductService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this._CategoryService.getAllcategories().subscribe((categories) => {
      this.categoryList = categories;
    });
  }
  addNewProduct() {
    this._ProductService.addNewProduct(this.newProduct).subscribe({
      next: () => {
        alert(this.newProduct.name + ' added successfully');
        this._router.navigateByUrl('/product');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
