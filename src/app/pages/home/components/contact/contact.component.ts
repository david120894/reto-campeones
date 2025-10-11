import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [
    
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  scrollToEmail(){
    const emailSection = document.getElementById('email');
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
