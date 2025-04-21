import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  output,
} from '@angular/core';
import { Iproduct } from '../../Models/iproduct';
import { FormsModule } from '@angular/forms';
import { HighlightCardDirective } from '../../Directives/highlight-card.directive';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DiscountPipe } from '../../Pipes/discount.pipe';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, HighlightCardDirective, CurrencyPipe, DiscountPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnChanges, OnInit {
  productList: Iproduct[] = [];
  productListFillter: Iproduct[] = [];
  totalOrderPrice: number = 0;
  isProductPage: boolean = false;
  // sharing data from parent components to child components
  @Input() categoryIdFromParent: number = 0;

  // sharing data from child components to parent components
  @Output() onTotalPriceChange: EventEmitter<number> = new EventEmitter();

  // first thing call used to(initialization and injection)
  constructor(
    private _productService: ProductService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.isProductPage = this._router.url.includes('product');
    // subscribe on observable
    this._productService.getAllProducts().subscribe({
      // observable return data
      next: (res) => {
        this.productList = res;
        this.productListFillter = this.productList;
      },
      // observable have an error
      error: (err) => {
        console.log(err);
      },
    });
  }
  // called when @input changes id that i selected from category list
  ngOnChanges() {
    this._productService
      .getProductByCatID(this.categoryIdFromParent)
      .subscribe({
        next: (res) => {
          this.productListFillter = res;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  getTotalPrice(count: string, price: number): number {
    this.totalOrderPrice += +count * price;
    // fire event
    this.onTotalPriceChange.emit(this.totalOrderPrice);
    return this.totalOrderPrice;
  }
  getProductByCatID() {
    console.log(this.categoryIdFromParent);
    if (this.categoryIdFromParent == 0) {
      this.productListFillter = this.productList;
    } else {
      this.productListFillter = this.productList.filter(
        (prod) => prod.catID == this.categoryIdFromParent
      );
    }
  }
  getDetialsOfProduct(id: number) {
    this._router.navigate(['product', id]);
  }

  navgateOnNewProductPage() {
    this._router.navigate(['/addNewProduct']);
  }
}
