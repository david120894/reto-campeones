import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { ParticipantsService } from '../../../../../core/services/participants.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ParticipantSeminar } from '../../../../../core/models/model.seminar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seminar',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './seminar.component.html',
  styleUrl: './seminar.component.scss'
})
export class SeminarComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  loading = true;
  listToExcel: any[] = [];
  totalInscriptions = 0;
  listParticipantsSeminar: ParticipantSeminar[] = [];
  listParticipantsAux: ParticipantSeminar[] = [];
  paginatedReservations: ParticipantSeminar[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;
  maxVisiblePages = 5; // For pagination controls

  constructor(
    private readonly participantsService: ParticipantsService,
  ) {}

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  searchForm : FormGroup = new FormGroup({
    searchQuery: new FormControl(''),
  })

  get searchQuery() {
    return this.searchForm.get('searchQuery')!;
  }

  ngOnInit() {
    this.getParticipantsSeminar()
  }
  getParticipantsSeminar() {
    this.loading = true;
    const sub = this.participantsService.getAllParticipantsSeminar().subscribe({
      next: (response) => {
        this.listParticipantsSeminar = response || [];
        this.totalInscriptions = this.listParticipantsSeminar.length;
        this.listParticipantsAux = [...this.listParticipantsSeminar];
        this.updatePagination();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching participants:', error);
        // this.toastr.error('Error al cargar los participantes. Por favor, intente nuevamente.', 'Error');
        this.loading = false;
      },
    });
    this.subscriptions.add(sub);
  }

  mapParticipants() {
    this.listToExcel = this.listParticipantsSeminar.map((participant) => ({
      Nombre: participant.name,
      Apellido: participant.lastName,
      dni: participant.dni,
      edad: participant.age,
      Genero: participant.gender,
      Correo: participant.email,
      Celular: participant.phone,
      Profesion: participant.profession,
      Trabajo: participant.workplace,
      Titulo: participant.academicDegree,
    }))
    return this.listToExcel
  }

  exportExcelSeminar(): void {
    try {
      if (this.listParticipantsSeminar.length === 0) {
        // this.toastr.warning('No hay datos para exportar', 'Advertencia');
        return;
      }

      const data = this.mapParticipants();
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const workbook: XLSX.WorkBook = {
        Sheets: { 'Participantes': worksheet },
        SheetNames: ['Participantes'],
      };

      const excelBuffer: any = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const date = new Date().toISOString().split('T')[0];
      saveAs(blob, `participantes_seminario_${date}.xlsx`);
      // this.toastr.success('Exportación completada con éxito', 'Éxito');
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
      // this.toastr.error('Error al exportar a Excel', 'Error');
    }
  }

  updatePagination() {
    if (!this.listParticipantsAux || this.listParticipantsAux.length === 0) {
      this.paginatedReservations = [];
      this.totalPages = 1;
      return;
    }

    const searchTerm = (this.searchQuery.value || '').toLowerCase().trim();

    const filteredReservations = searchTerm
      ? this.listParticipantsAux.filter(r =>
          (r.name?.toLowerCase().includes(searchTerm) ||
          r.lastName?.toLowerCase().includes(searchTerm) ||
          r.email?.toLowerCase().includes(searchTerm) ||
          r.dni?.toLowerCase().includes(searchTerm) ||
          r.phone?.toLowerCase().includes(searchTerm) ||
          r.profession?.toLowerCase().includes(searchTerm) ||
          r.workplace?.toLowerCase().includes(searchTerm) ||
          r.academicDegree?.toLowerCase().includes(searchTerm))
        )
      : [...this.listParticipantsAux];

    this.totalInscriptions = filteredReservations.length;
    this.totalPages = Math.max(1, Math.ceil(filteredReservations.length / this.itemsPerPage));

    // Ensure currentPage is within valid range
    this.currentPage = Math.min(Math.max(1, this.currentPage), this.totalPages);

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedReservations = filteredReservations.slice(startIndex, endIndex);
  }

  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxPagesToShow = this.maxVisiblePages;
    const total = this.totalPages;
    let startPage: number, endPage: number;

    if (total <= maxPagesToShow) {
      // Less than maxPagesToShow total pages so show all
      startPage = 1;
      endPage = total;
    } else {
      // More than maxPagesToShow total pages so calculate start and end pages
      const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;

      if (this.currentPage <= maxPagesBeforeCurrentPage) {
        // Current page near the start
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (this.currentPage + maxPagesAfterCurrentPage >= total) {
        // Current page near the end
        startPage = total - maxPagesToShow + 1;
        endPage = total;
      } else {
        // Current page somewhere in the middle
        startPage = this.currentPage - maxPagesBeforeCurrentPage;
        endPage = this.currentPage + maxPagesAfterCurrentPage;
      }
    }

    // Add page numbers and ellipsis
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < total) {
      if (endPage < total - 1) {
        pages.push('...');
      }
      pages.push(total);
    }

    return pages;
  }

  onSearchChangeFilter() {
    this.currentPage = 1;
    this.updatePagination();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      // Optional: Scroll to top of the table
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
