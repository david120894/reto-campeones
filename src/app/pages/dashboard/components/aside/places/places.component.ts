import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Place } from '../../../../../core/models';
import { PlaceService } from '../../../../../core/services/place.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../core/services/auth.service';

const NG_MODULES = [CommonModule, ReactiveFormsModule];

@Component({
  selector: 'app-places',
  imports: [...NG_MODULES],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss'
})
export class PlacesComponent implements OnInit {
  places: Place[] = [];
  placeForm: FormGroup;
  selectedPlace: Place | null = null;
  showFormModal = false; 
  showViewModal = false; 
  showDeleteModal = false; 

  constructor(
    private placeService: PlaceService,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.placeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      full_day_price: [0, [Validators.required, Validators.min(0)]],
      half_day_price: [0, [Validators.required, Validators.min(0)]],
      place_size: ['', [Validators.required, Validators.maxLength(20)]],
      max_capacity: [0, [Validators.required, Validators.min(1)]],
      features: ['', Validators.required],
      image: [null]
    });
  }

  ngOnInit() {
    this.loadPlaces();
  }

  loadPlaces() {
    this.placeService.getPlaces().subscribe({
      next: (places) => this.places = places,
      error: (err) => console.error('Error loading places:', err)
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.placeForm.patchValue({
        image: event.target.files[0]
      });
    }
  }

  savePlace() {
    const formValue = this.placeForm.value;

    if (this.selectedPlace && this.selectedPlace.id) {
      // Actualización
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput?.files?.length) {
        const formData = new FormData();
        formData.append('name', formValue.name);
        formData.append('full_day_price', formValue.full_day_price.toString());
        formData.append('half_day_price', formValue.half_day_price.toString());
        formData.append('place_size', formValue.place_size);
        formData.append('max_capacity', formValue.max_capacity.toString());
        formData.append('features', formValue.features);
        formData.append('image', fileInput.files[0]);

        this.placeService.updatePlace(this.selectedPlace.id, formData).pipe(
          switchMap(() => this.placeService.getPlaces())
        ).subscribe({
          next: (places) => {
            this.places = places;
            this.resetForm();
          },
          error: (err) => console.error('Error updating place with image:', err)
        });
      } else {
        const placeData: Partial<Place> = {
          name: formValue.name,
          full_day_price: formValue.full_day_price,
          half_day_price: formValue.half_day_price,
          place_size: formValue.place_size,
          max_capacity: formValue.max_capacity,
          features: formValue.features
        };

        this.placeService.updatePlace(this.selectedPlace.id, placeData).pipe(
          switchMap(() => this.placeService.getPlaces())
        ).subscribe({
          next: (places) => {
            this.places = places;
            this.resetForm();
          },
          error: (err) => console.error('Error updating place:', err)
        });
      }
    } else {
      // Creación
      const formData = new FormData();
      formData.append('name', formValue.name);
      formData.append('full_day_price', formValue.full_day_price.toString());
      formData.append('half_day_price', formValue.half_day_price.toString());
      formData.append('place_size', formValue.place_size);
      formData.append('max_capacity', formValue.max_capacity.toString());
      formData.append('features', formValue.features);

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput?.files?.length) {
        formData.append('image', fileInput.files[0]);
      }

      this.placeService.createPlace(formData).pipe(
        switchMap(() => this.placeService.getPlaces())
      ).subscribe({
        next: (places) => {
          this.places = places;
          this.resetForm();
        },
        error: (err) => console.error('Error creating place:', err)
      });
    }
  }

  viewPlace(place: Place) {
    this.selectedPlace = place;
    this.showViewModal = true;
  }

  editPlace(place: Place) {
    this.selectedPlace = place;
    this.showFormModal = true;
    this.placeForm.patchValue({
      name: place.name,
      full_day_price: place.full_day_price,
      half_day_price: place.half_day_price,
      place_size: place.place_size,
      max_capacity: place.max_capacity,
      features: place.features
    });
  }

  deletePlace(id: number) {
    this.selectedPlace = this.places.find(place => place.id === id) || null;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.selectedPlace?.id) {
      this.placeService.deletePlace(this.selectedPlace.id).pipe(
        switchMap(() => this.placeService.getPlaces())
      ).subscribe({
        next: (places) => {
          this.places = places;
          this.showDeleteModal = false;
          this.selectedPlace = null;
        },
        error: (err) => console.error('Error deleting place:', err)
      });
    }
  }

  resetForm() {
    this.placeForm.reset({
      name: '',
      full_day_price: 0,
      half_day_price: 0,
      place_size: '',
      max_capacity: 0,
      features: ''
    });
    this.selectedPlace = null;
    this.showFormModal = false;
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  closeModal() {
    this.showFormModal = false;
    this.showViewModal = false;
    this.showDeleteModal = false;
    this.selectedPlace = null;
  }
}