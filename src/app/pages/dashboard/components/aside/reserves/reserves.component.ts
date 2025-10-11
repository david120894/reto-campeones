import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../../../../core/models';
import { ReservationService } from '../../../../../core/services/reservation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../core/services/auth.service';

const NG_MODULES = [FormsModule, CommonModule]

@Component({
  selector: 'app-reserves',
  imports: [...NG_MODULES],
  templateUrl: './reserves.component.html',
  styleUrl: './reserves.component.scss'
})
export class ReservesComponent implements OnInit {
  reservations: Reservation[] = [];
  paginatedReservations: Reservation[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  selectedReservation: Reservation | null = null;
  showDeleteModal: boolean = false;
  showViewModal: boolean = false;
  showEditStateModal: boolean = false;
  newState: string = '';
  currentUser: any = null;
  isAdmin: boolean = false;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService
  )
    {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.currentUser = user;
      this.loadReservations();
      this.checkAdminStatus();
    });
  }

  private checkAdminStatus() {
    this.authService.getUser().subscribe((user) => {
      this.isAdmin = this.authService.isAdmin();
    });
  }

  loadReservations() {
    this.reservationService.getReservation().subscribe({
      next: (reservations) => {
        this.reservations = this.filterReservations(reservations);
        this.updatePagination();
      },
      error: (error) => console.error('Error loading reservations:', error)
    });
  }

  private filterReservations(reservations: Reservation[]): Reservation[] {
    if (!this.currentUser) {
      return [];
    }
    
    if (this.authService.isAdmin()) {
      return reservations;
    }
    
    return reservations.filter(reservation => 
      reservation.email === this.currentUser.email
    );
  }

  updatePagination() {
    const filteredReservations = this.reservations.filter(r =>
      r.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    
    this.totalPages = Math.ceil(filteredReservations.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedReservations = filteredReservations.slice(startIndex, endIndex);
  }

  onSearchChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  openViewModal(reservation: Reservation) {
    this.selectedReservation = reservation;
    this.showViewModal = true;
  }

  openEditStateModal(reservation: Reservation) {
    this.selectedReservation = reservation;
    this.newState = reservation.req_state || 'pending';
    this.showEditStateModal = true;
  }

  openDeleteModal(reservation: Reservation) {
    this.selectedReservation = reservation;
    this.showDeleteModal = true;
  }

  closeModal() {
    this.showDeleteModal = false;
    this.showViewModal = false;
    this.showEditStateModal = false;
    this.selectedReservation = null;
    this.newState = '';
  }

  confirmDelete() {
    if (this.selectedReservation?.id) {
      this.reservationService.deleteReservation(+this.selectedReservation.id).subscribe({
        next: () => {
          this.reservations = this.reservations.filter(r => r.id !== this.selectedReservation!.id);
          this.updatePagination();
          this.closeModal();
        },
        error: (error) => console.error('Error deleting reservation:', error)
      });
    }
  }

  updateState() {
    if (this.selectedReservation?.id) {
      this.reservationService.updateReserveState(this.selectedReservation.id, this.newState).subscribe({
        next: (response) => {
          const reservationIndex = this.reservations.findIndex(r => r.id === this.selectedReservation!.id);
          if (reservationIndex !== -1) {
            this.reservations[reservationIndex].req_state = response.state.req_state;
            this.updatePagination();
          }
          this.closeModal();
        },
        error: (error) => console.error('Error updating state:', error)
      });
    }
}
}