import { Component, EventEmitter, Input, Output } from '@angular/core'
import { NgForOf } from '@angular/common'
import { Category } from '../photo.service'

@Component({
  selector: 'app-category-tabs',
  imports: [
    NgForOf,
  ],
  templateUrl: './category-tabs.component.html',
  styleUrl: './category-tabs.component.scss'
})
export class CategoryTabsComponent {
  @Input() categories: Category[] = [];
  @Input() activeCategory: string = '';
  @Output() categoryChange = new EventEmitter<string>();

  onCategorySelect(categoryId: string): void {
    this.categoryChange.emit(categoryId);
  }

  getCategoryLabel(category: Category): string {
    return category.label.split(' ')[0];
  }
  // En category-tabs.component.ts - método adicional
  getButtonClasses(categoryId: string): string {
    const baseClasses = 'px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap';

    if (this.activeCategory === categoryId) {
      return `${baseClasses} bg-primary text-primary-foreground shadow-lg scale-105`;
    }

    return `${baseClasses} bg-secondary text-secondary-foreground hover:bg-muted border border-border`;
  }
}
