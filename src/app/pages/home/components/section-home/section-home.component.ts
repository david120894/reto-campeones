import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef, EventEmitter,
  OnDestroy,
  OnInit, Output,
  ViewChild,
} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'

interface CarouselItem {
  type: 'image' | 'video';
  src: string;
  title?: string;
}

@Component({
  selector: 'app-section-home',
  standalone: true,
  imports: [
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './section-home.component.html',
  styleUrls: ['./section-home.component.scss']
})
export class SectionHomeComponent implements OnInit, OnDestroy , AfterViewInit  {

  @Output() sectionChanged = new EventEmitter<string>();
  items: CarouselItem[] = [
    { type: 'image', src: 'championship/logo1.png', title: 'Imagen 1' },
    { type: 'image', src: 'championship/logo2.png', title: 'Imagen 2' },
  ];

  selectedItem = ''
  currentIndex = 0;

  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';

  private intervalId: any;

  ngOnInit() {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
    this.selectItem(0);
  }


  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  get currentItem(): CarouselItem {
    return this.items[this.currentIndex];
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.selectItem(this.currentIndex);
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.selectItem(this.currentIndex);
  }

  selectItem(index: number) {
    const item: Record<string, string> = {
      0:"challenge-champions",
      1:"bike-ride",
      // 3:"interscholastic-championship",
    }
    this.selectedItem = item[index] || '';
    console.log(this.selectedItem);
    this.currentIndex = index;
    this.sectionChanged.emit(this.selectedItem);
    console.log(this.currentIndex);
  }

  private updateCountdown() {
    const eventDate = new Date('August 16, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      this.days = this.hours = this.minutes = this.seconds = '00';
      clearInterval(this.intervalId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.days = days.toString().padStart(2, '0');
    this.hours = hours.toString().padStart(2, '0');
    this.minutes = minutes.toString().padStart(2, '0');
    this.seconds = seconds.toString().padStart(2, '0');
  }

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer2', { static: false }) videoPlayer2!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.videoPlayer.nativeElement;
    const video2 = this.videoPlayer2.nativeElement;

    video.muted = true;
    video.playsInline = true;
    video2.muted = true;
    video2.playsInline = true;

    video.play().catch(err => {
      console.warn('⚠️ Autoplay bloqueado por Chrome, esperando interacción del usuario:', err);
    });
    video2.play().catch(err => {
      console.warn('⚠️ Autoplay bloqueado por Chrome, esperando interacción del usuario:', err);
    });
  }
}
