import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../../../core/services/reservation.service';
import { Reservation } from '../../../../../core/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../core/services/auth.service';
import { ParticipantsService } from '../../../../../core/services/participants.service';
import { ParticipantsModel } from '../../../../../core/models/participants.model';
import { NgSelectComponent } from '@ng-select/ng-select';
import { forkJoin, map, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';


const NG_MODULES = [FormsModule, CommonModule];

@Component({
  selector: 'app-notifications',
  imports: [...NG_MODULES, NgSelectComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {

  categories = [
    'Tramo I',
    'Tramo II',
    'Tramo  III',
  ];
  loading = false;
  listToExcel: Array<any> = [];
  typeChange = 'all';
  totalInscriptions = 0;
  totalFemales = 0;
  totalMales = 0;
  totalMinor = 0;
  reservations: Reservation[] = [];
  listParticipants: Array<ParticipantsModel> = [];
  listParticipantsAux: Array<any> = [];
  paginatedReservations: any[] = [];
  searchQuery: string = '';
  searchQueryCategory: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  selectedReservation: Reservation | null = null;
  showDeleteModal: boolean = false;
  showViewModal: boolean = false;
  currentUser: any = null;
  isAdmin: boolean = false;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private readonly participantsService: ParticipantsService,
  ) {
  }

  ngOnInit() {
      this.getParticipants();
  }


  filterFemale() {
    this.updatePagination('Femenino');
    this.typeChange = 'Femenino';
  }

  filterMinor() {
    this.updatePagination('Menor');
    this.typeChange = 'Menor';
  }

  filterMale() {
    this.updatePagination('Masculino');
    this.typeChange = 'Masculino';

  }

  filterAll() {
    this.updatePagination('all');
    this.typeChange = 'all';

  }

  getParticipants() {
    this.participantsService.getAllParticipants().subscribe({
      next: (response) => {
        this.listParticipants = response;
        this.totalInscriptions = response.length;
          this.loading = false;
              this.listParticipantsAux = response;
              this.updatePagination('all');
      },
      error: (error) => {
        this.loading = true;
        console.error('Error fetching participants:', error);
      },
    });
  }

  mapParticipants() {
    this.listToExcel = this.listParticipants.map((participant) => ({
      Nombre: participant.name,
      Apellido: participant.lastName,
      dni: participant.dni,
      edad: participant.age,
      Genero: participant.gender,
      Correo: participant.email,
      Celular: participant.phone,
      Talla: participant.shirtSize,
      Categoria: participant.category,
      T_Seguro: participant.healthInsurance,
      Direccion: participant.district,
    }))
    return this.listToExcel
  }

  exportExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.mapParticipants());
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Participantes': worksheet },
      SheetNames: ['Participantes'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    FileSaver.saveAs(data, `participantes_export.xlsx`);
  }

  downloadFile(dataUrl: string) {
    this.participantsService.getParticipantsById(dataUrl).subscribe({
      next: (response) => {
        const link = document.createElement('a');
        link.href = response;
        link.download = 'archivo.pdf';
        link.click();
    }})
  }

  updatePagination(type?: string) {
    let filteredReservations: any[] = [];
    let listAux: any[] = [];
    if (type === 'Femenino') {
      listAux = this.listParticipantsAux.filter(r => r.gender === type);
    }
    if (type === 'Masculino') {
      listAux = this.listParticipantsAux.filter(r => r.gender === type);
    }
    if (type === 'Menor') {
      listAux = this.listParticipantsAux.filter(r => r.age < 18);
    }
    if (type === 'all') {
      listAux = this.listParticipantsAux;
    }
    if (this.searchQuery) {
      this.searchQueryCategory = '';
      filteredReservations = listAux.filter(r =>
        r.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        r.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        r.dni.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        r.phone.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    } else if (this.searchQueryCategory) {
      this.searchQuery = '';
      filteredReservations = listAux.filter(r =>
        r.category.toLowerCase() === this.searchQueryCategory.toLowerCase(),
      );
      this.totalFemales = filteredReservations.filter(r => r.gender === 'Femenino').length;
      this.totalMales = filteredReservations.filter(r => r.gender === 'Masculino').length;
      this.totalMinor = filteredReservations.filter(r => r.age < 18).length;
    } else {
      filteredReservations = [...listAux]; // Mostrar todos si no hay búsqueda
      this.totalFemales = filteredReservations.filter(r => r.gender === 'Femenino').length;
      this.totalMales = filteredReservations.filter(r => r.gender === 'Masculino').length;
      this.totalMinor = filteredReservations.filter(r => r.age < 18).length;

    }

    this.totalPages = Math.ceil(filteredReservations.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedReservations = filteredReservations.slice(startIndex, endIndex);
  }


  onSearchChange() {
    this.searchQueryCategory = '';
    this.currentPage = 1;
    this.updatePagination('all');
  }

  onSearchChangeFilter() {
    this.searchQuery = '';
    this.currentPage = 1;
    this.updatePagination(this.typeChange);
  }

  changePage(page: number, type?: string) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination(this.typeChange);
    }
  }


  // closeModal() {
  //   this.showDeleteModal = false;
  //   this.showViewModal = false;
  //   this.selectedReservation = null;
  // }

  // confirmDelete() {
  //   if (this.selectedReservation?.id) {
  //     this.reservationService.deleteReservation(this.selectedReservation.id).subscribe({
  //       next: () => {
  //         this.reservations = this.reservations.filter(r => r.id !== this.selectedReservation!.id);
  //         this.closeModal();
  //         this.updatePagination();
  //       },
  //       error: (error) => console.error('Error deleting reservation:', error),
  //     });
  //   }
  // }
}
