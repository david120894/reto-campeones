import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterModule } from "@angular/router";

interface Room {
  title: string;
  fullDayPrice: string;
  halfDayPrice: string;
  roomSize: string;
  maxCapacity: number;
  features: string;
  imageUrl: string;
}
const NG_MODULES = [CommonModule, RouterModule];

@Component({
  selector: 'app-carrousel',
  imports: [...NG_MODULES],
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {
  rooms: Room[] = [
    {
      title: "MACHUPICCHU",
      fullDayPrice: "7,862.00",
      halfDayPrice: "6.290.00",
      roomSize: "645 m2",
      maxCapacity: 700,
      features: "Encuentros, premiaciones, sesiones plenarias, cenas empresariales y/o show.",
      imageUrl: "images/machupicchu_2.jpeg"
    },
    {
      title: "OLLANTAYTAMBO",
      fullDayPrice: "5,211.00",
      halfDayPrice: "4,169.00",
      roomSize: "375 m2",
      maxCapacity: 300,
      features: "Exposiciones, mesa de negocios, inauguraciones.",
      imageUrl: "images/ollantaytambo_3.jpeg"
    },
    {
      title: "PISAQ",
      fullDayPrice: "3,269.00",
      halfDayPrice: "2,615.00",
      roomSize: "270 m2",
      maxCapacity: 300,
      features: "Congresos, charlas técnicas, presentación de productos.",
      imageUrl: "images/pisaq.jpeg"
    },
    {
      title: "SAQSAYHUAMÁN",
      fullDayPrice: "710.00",
      halfDayPrice: "568.00",
      roomSize: "107 m2",
      maxCapacity: 100,
      features: "Conferencia de prensa, aniversarios, homenajes, salas de trabajo.",
      imageUrl: "images/saqsayhuaman_5.png"
    },
    {
      title: "TIPÓN",
      fullDayPrice: "521.00",
      halfDayPrice: "417.00",
      roomSize: "100 m2",
      maxCapacity: 100,
      features: "Charlas especializadas, rueda de prensa, cursos, talleres.",
      imageUrl: "images/tipon.jpeg"
    },
    {
      title: "Q'ENQO",
      fullDayPrice: "294.00",
      halfDayPrice: "235.00",
      roomSize: "95 m2",
      maxCapacity: 100,
      features: "Mesa de trabajo, salas de estar, entrevistas.",
      imageUrl: "images/quenqo_1.jpeg"
    },
    {
      title: "PATIO PRINCIPAL",
      fullDayPrice: "229.00",
      halfDayPrice: "224.00",
      roomSize: "Ambiente abierto",
      maxCapacity: 600,
      features: "Charlas técnicas, presentación de productos.",
      imageUrl: "images/patrio_central.jpg"
    },
    {
      title: "PATIO PARA STANDS",
      fullDayPrice: "1,221.00",
      halfDayPrice: "1,221.00",
      roomSize: "Ambiente abierto",
      maxCapacity: 150,
      features: "Presentación de productos.",
      imageUrl: "images/patio_stands.jpg"
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void { }

  scrollToEmail() {
    const emailSection = document.getElementById('email');
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}