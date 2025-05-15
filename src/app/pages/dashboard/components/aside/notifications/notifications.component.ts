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
    'Categoria I',
    'Categoria II',
    'Categoria III',
    'Categoria IV',
    'Categoria V',
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
    this.authService.getUser().subscribe(user => {
      this.currentUser = user;
      this.checkAdminStatus();
      this.getParticipants();
    });
  }

  private checkAdminStatus() {
    this.authService.getUser().subscribe((user) => {
      this.isAdmin = this.authService.isAdmin();
    });
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
        this.mapParticipants(this.listParticipants);
        this.totalInscriptions = response.length;
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.getParticipantsByDni(this.listParticipants).subscribe(result => {
            this.listParticipantsAux = result;
            console.log(this.listParticipantsAux);
            this.updatePagination('all');
          });
        }, 3000);

      },
      error: (error) => {
        this.loading = true;
        console.error('Error fetching participants:', error);
      },
    });
  }

  mapParticipants(participants: ParticipantsModel[]) {
    this.listToExcel = participants.map((participant) => ({
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
  }

  exportExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listToExcel);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Participantes': worksheet },
      SheetNames: ['Participantes'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    FileSaver.saveAs(data, `participantes_export.xlsx`);
  }

  downloadFile(dataUrl: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'archivo.pdf';
    link.click();
  }


  getParticipantsByDni(listParticipantsAux: ParticipantsModel[]): Observable<ParticipantsModel[]> {
    const observables = listParticipantsAux.map(participant => {
      if (participant.age < 18) {
        return this.participantsService.getParticipantsById(participant.dni).pipe(
          map(archive => ({ ...participant, file: archive })),
          catchError(error => {
            console.error(`Error al buscar datos para DNI ${participant.dni}:`, error);
            return of({ ...participant, file: null });
          }),
        );
      } else {
        return of({ ...participant, file: null });
      }
    });

    return forkJoin(observables);
  }

  private filterReservations(reservations: ParticipantsModel[]): ParticipantsModel[] {
    if (!this.currentUser) {
      return [];
    }

    // data for admin
    if (this.authService.isAdmin()) {
      return reservations;
    }

    // data for not admin
    return reservations.filter(reservation =>
      reservation.email === this.currentUser.email,
    );
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

  openViewModal(reservation: any) {
    this.selectedReservation = reservation;
    this.showViewModal = true;
  }

  openDeleteModal(reservation: any) {
    this.selectedReservation = reservation;
    this.showDeleteModal = true;
  }

  closeModal() {
    this.showDeleteModal = false;
    this.showViewModal = false;
    this.selectedReservation = null;
  }

  confirmDelete() {
    if (this.selectedReservation?.id) {
      this.reservationService.deleteReservation(this.selectedReservation.id).subscribe({
        next: () => {
          this.reservations = this.reservations.filter(r => r.id !== this.selectedReservation!.id);
          this.closeModal();
          this.updatePagination();
        },
        error: (error) => console.error('Error deleting reservation:', error),
      });
    }
  }
}
