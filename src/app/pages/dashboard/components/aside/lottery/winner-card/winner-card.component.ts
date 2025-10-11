import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Participant } from '../lottery.model'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-winner-card',
  imports: [
    NgIf,
  ],
  templateUrl: './winner-card.component.html',
  styleUrl: './winner-card.component.scss'
})
export class WinnerCardComponent {
  @Input() winner: Participant | null = null;
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeCard(): void {
    this.close.emit();
  }
}
