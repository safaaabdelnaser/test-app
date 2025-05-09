import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  viewChild,
} from '@angular/core';
import { OrderComponent } from '../order/order.component';
// import { SwiperModule } from 'swiper/angular';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, OrderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  welcomeMessage: string = 'Hello In Our Test App';
  textGreeting: string = "Here's everything you need";
  myDate: Date = new Date();
  // share data from view to controller
  @ViewChild('welcomeMessageColor') changeBackColor!: ElementRef;

  //hook lifecycle that will be called when the view is rendered
  ngAfterViewInit(): void {
    console.log(this.changeBackColor.nativeElement);

    this.changeBackColor.nativeElement.className =
      'bg-black p-3  bg-opacity-100 rounded text-center text-danger';
  }
}
