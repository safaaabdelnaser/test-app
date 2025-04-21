import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlightCard]',
  standalone: true,
})
export class HighlightCardDirective implements OnChanges {
  @Input('appHighlightCard') defaultColor: string = 'red';
  constructor(private ele: ElementRef) {}
  // called when @input changes color
  ngOnChanges(): void {
    this.ele.nativeElement.style.backgroundColor = '#D2B6B1';
  }
  @HostListener('mouseover') over() {
    this.ele.nativeElement.style.backgroundColor = this.defaultColor;
  }
  @HostListener('mouseout') out() {
    this.ele.nativeElement.style.backgroundColor = '#D2B6B1';
  }
}
