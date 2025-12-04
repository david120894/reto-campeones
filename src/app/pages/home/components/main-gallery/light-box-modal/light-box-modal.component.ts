import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-light-box-modal',
  imports: [
    NgIf,
  ],
  templateUrl: './light-box-modal.component.html',
  styleUrl: './light-box-modal.component.scss'
})
export class LightBoxModalComponent {
  @Input() imageUrl: string = '';
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  isLoading: boolean = true;

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.onClose();
    }
  }

  onClose(): void {
    this.close.emit();
  }

  onImageLoad(): void {
    this.isLoading = false;
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }
}
