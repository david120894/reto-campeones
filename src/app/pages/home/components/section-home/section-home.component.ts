import { Component } from '@angular/core';

@Component({
  selector: 'app-section-home',
  imports: [],
  templateUrl: './section-home.component.html',
  styleUrl: './section-home.component.scss'
})
export class SectionHomeComponent {

  scrollToEmail(){
    const emailSection = document.getElementById('email');
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContacts(){
    const emailSection = document.getElementById('contacts');
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
