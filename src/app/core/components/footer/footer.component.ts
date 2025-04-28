import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  contactOne() {
    const phoneNumber = '+51942743899'; // Número de destino
    const message = encodeURIComponent('Hola Buen dia Raquel, Información para la inscripcion del Hatun phaway...?')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }


  contactTwo() {
    const phoneNumber = '+51958355301'; // Número de destino
    const message = encodeURIComponent('Hola Buen dia Carlos, Información para la inscripcion del Hatun phaway...?')
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
    window.open('https://wa.me/+51958355301', '_blank')
  }
}
