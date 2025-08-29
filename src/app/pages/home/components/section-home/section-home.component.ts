import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { LlamaSceneComponent } from '../llama-scene/llama-scene.component'

@Component({
  selector: 'app-section-home',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './section-home.component.html',
  styleUrls: ['./section-home.component.scss']
})
export class SectionHomeComponent implements OnInit, OnDestroy , AfterViewInit  {

  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';

  private intervalId: any;

  ngOnInit() {
    this.updateCountdown();
    this.intervalId = setInterval(() => this.updateCountdown(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
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

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer2', { static: true }) videoPlayer2!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.videoPlayer.nativeElement;
    const video2 = this.videoPlayer2.nativeElement;

    // Asegurar muteado antes de reproducir
    video.muted = true;
    video.playsInline = true;
    video2.muted = true;
    video2.playsInline = true;

    // Forzar autoplay
    video.play().catch(err => {
      console.warn('⚠️ Autoplay bloqueado por Chrome, esperando interacción del usuario:', err);
    });
    video2.play().catch(err => {
      console.warn('⚠️ Autoplay bloqueado por Chrome, esperando interacción del usuario:', err);
    });
  }
}
