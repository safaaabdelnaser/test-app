import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../Models/iproduct';

@Component({
  selector: 'app-product-detials',
  standalone: true,
  imports: [],
  templateUrl: './product-detials.component.html',
  styleUrl: './product-detials.component.css',
})
export class ProductDetialsComponent implements OnInit {
  singleProduct: any;
  productID!: string;
  totalOrderPrice: number = 0;
  @Output() onTotalPriceChange: EventEmitter<number> = new EventEmitter();

  constructor(
    private _productService: ProductService,
    private _ActivatedService: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.productID =
      this._ActivatedService.snapshot.paramMap.get('idProd') ?? '1';
    console.log(this._ActivatedService.snapshot.paramMap.get('idProd'));
    this._productService.getProductByProductID(this.productID).subscribe({
      next: (product) => {
        this.singleProduct = product;
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }
  getTotalPrice(count: string, price: number): number {
    this.totalOrderPrice += +count * price;
    // fire event
    this.onTotalPriceChange.emit(this.totalOrderPrice);
    this._router.navigate(['/home']);
    return this.totalOrderPrice;
  }
}
