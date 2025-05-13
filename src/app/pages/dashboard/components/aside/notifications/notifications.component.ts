import { Component, OnInit } from '@angular/core'
import { ReservationService } from '../../../../../core/services/reservation.service'
import { Reservation } from '../../../../../core/models'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AuthService } from '../../../../../core/services/auth.service'
import { ParticipantsService } from '../../../../../core/services/participants.service'
import { ParticipantsModel } from '../../../../../core/models/participants.model'
import { NgLabelTemplateDirective, NgSelectComponent } from '@ng-select/ng-select'
import { forkJoin, map, Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'

const NG_MODULES = [FormsModule, CommonModule]

@Component({
  selector: 'app-notifications',
  imports: [...NG_MODULES, NgSelectComponent, NgLabelTemplateDirective],
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
  ]
  reservations: Reservation[] = []
  listParticipants: Array<ParticipantsModel> = []
  listParticipantsAux: Array<any> = []
  paginatedReservations: any[] = []
  searchQuery: string = ''
  searchQueryCategory: string = ''
  currentPage: number = 1
  itemsPerPage: number = 10
  totalPages: number = 1
  selectedReservation: Reservation | null = null
  showDeleteModal: boolean = false
  showViewModal: boolean = false
  currentUser: any = null
  isAdmin: boolean = false

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private readonly participantsService: ParticipantsService,
  ) {
  }

  ngOnInit() {
    // Subscribe to the user observable to get current user data
    this.authService.getUser().subscribe(user => {
      this.currentUser = user
      // this.loadReservations()
      this.checkAdminStatus()
      this.getParticipants()
    })
  }

  private checkAdminStatus() {
    this.authService.getUser().subscribe((user) => {
      this.isAdmin = this.authService.isAdmin()
    })
  }


  getParticipants() {
    this.participantsService.getAllParticipants().subscribe({
      next: (response) => {
        this.listParticipants = response
        this.getParticipantsByDni(this.listParticipants).subscribe(result => {
          this.listParticipantsAux = result
          this.updatePagination()
        })
      },
      error: (error) => {
        console.error('Error fetching participants:', error)
      },
    })
  }

  downloadFile(dataUrl: string) {
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = 'archivo.pdf'
    link.click()
  }


  getParticipantsByDni(listParticipantsAux: ParticipantsModel[]): Observable<ParticipantsModel[]> {
    const observables = listParticipantsAux.map(participant => {
      if (participant.age < 18) {
        return this.participantsService.getParticipantsById(participant.dni).pipe(
          map(archive => ({ ...participant, file: archive })),
          catchError(error => {
            console.error(`Error al buscar datos para DNI ${participant.dni}:`, error)
            return of({ ...participant, file: null })
          }),
        )
      } else {
        return of({ ...participant, file: null })
      }
    })

    return forkJoin(observables)
  }


  // loadReservations() {
  //   this.reservationService.getConsulting().subscribe({
  //     next: (reservations) => {
  //       this.updatePagination()
  //     },
  //     error: (error) => console.error('Error loading reservations:', error),
  //   })
  // }

  private filterReservations(reservations: ParticipantsModel[]): ParticipantsModel[] {
    if (!this.currentUser) {
      return []
    }

    // data for admin
    if (this.authService.isAdmin()) {
      return reservations
    }

    // data for not admin
    return reservations.filter(reservation =>
      reservation.email === this.currentUser.email,
    )
  }

  updatePagination() {
    let filteredReservations: any[] = []
    if (this.searchQuery) {
      this.searchQueryCategory = ''
      filteredReservations = this.listParticipantsAux.filter(r =>
        r.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        r.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        r.dni.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        r.phone.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(this.searchQuery.toLowerCase()),
      )
    } else if (this.searchQueryCategory) {
      this.searchQuery = ''
      filteredReservations = this.listParticipantsAux.filter(r =>
        r.category.toLowerCase() === this.searchQueryCategory.toLowerCase(),
      )
    } else {
      filteredReservations = [...this.listParticipantsAux] // Mostrar todos si no hay búsqueda
    }

    this.totalPages = Math.ceil(filteredReservations.length / this.itemsPerPage)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    this.paginatedReservations = filteredReservations.slice(startIndex, endIndex)
  }


  onSearchChange() {
    this.searchQueryCategory = ''
    this.currentPage = 1
    this.updatePagination()
  }

  onSearchChangeFilter() {
    this.searchQuery = ''
    this.currentPage = 1
    this.updatePagination()
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page
      this.updatePagination()
    }
  }

  openViewModal(reservation: any) {
    this.selectedReservation = reservation
    this.showViewModal = true
  }

  openDeleteModal(reservation: any) {
    this.selectedReservation = reservation
    this.showDeleteModal = true
  }

  closeModal() {
    this.showDeleteModal = false
    this.showViewModal = false
    this.selectedReservation = null
  }

  confirmDelete() {
    if (this.selectedReservation?.id) {
      this.reservationService.deleteReservation(this.selectedReservation.id).subscribe({
        next: () => {
          this.reservations = this.reservations.filter(r => r.id !== this.selectedReservation!.id)
          this.closeModal()
          this.updatePagination()
        },
        error: (error) => console.error('Error deleting reservation:', error),
      })
    }
  }
}
