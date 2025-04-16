import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../../../core/services/reservation.service';
import { Reservation } from '../../../../../core/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../core/services/auth.service';

const NG_MODULES = [FormsModule, CommonModule];

@Component({
  selector: 'app-notifications',
  imports: [...NG_MODULES],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  reservations: Reservation[] = [];
  paginatedReservations: Reservation[] = [];
  searchQuery: string = '';
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
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Subscribe to the user observable to get current user data
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
    this.reservationService.getConsulting().subscribe({
      next: (reservations) => {
        // Filter reservations based on user role
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
    
    // data for admin
    if (this.authService.isAdmin()) {
      return reservations;
    }
    
    // data for not admin
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

  openDeleteModal(reservation: Reservation) {
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
        error: (error) => console.error('Error deleting reservation:', error)
      });
    }
  }
}