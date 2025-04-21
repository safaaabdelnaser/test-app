import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true,
})
export class DiscountPipe implements PipeTransform {
  transform(value: number, precent: number = 0.01): number {
    return value - value * precent;
  }
}
