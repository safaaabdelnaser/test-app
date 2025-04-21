import { Component, OnInit } from '@angular/core';
import { Icategory } from '../../Models/icategory';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, ProductsComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  categoryList: Icategory[] = [];
  selectedCategoryID: number = 0;
  totalOrderPrice: number = 0;
  constructor(private _CategoryService: CategoryService) {}
  ngOnInit(): void {
    this._CategoryService.getAllcategories().subscribe((categories) => {
      this.categoryList = categories;
    });
  }

  showOrderPrice(price: number): void {
    this.totalOrderPrice = price;
  }
}
