import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../movie.service';
import Movie from '../../Movie';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  providers: [DatePipe],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
    movieForm !: FormGroup;
    successMessage: string = '';
    errorMessage: string = '';
    movies: Movie[] = [];

    constructor(
      private formbuilder: FormBuilder,
      private movieService: MovieService,
      private datePipe: DatePipe
    ) {
      this.movieForm = this.formbuilder.group({
        title : ['', Validators.required],
        description : ['', Validators.required],
        video: [null, Validators.required],
      })
    }

    ngOnInit(): void {
      this.getAllMovies();
    }

    getAllMovies(): void {
      this.movieService.fetchAllMovies().then((response) => {
        this.movies = response.data.map((movie: any) => {
          movie.dateAdded = this.datePipe.transform(movie.date_added, 'mediumDate');  // Format the date
          return movie;
        });
      }).catch((error) => {
        console.error('Error fetching movies:', error);
        this.errorMessage = 'Failed to load movies. Please try again later.';
      });
    }

    onFileChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        console.log(file);
        this.movieForm.patchValue({ video: file });
        this.movieForm.get('video')?.updateValueAndValidity();
      }
    }

  async addMovie() {
    console.log('hi im here');
    if (this.movieForm.invalid) {
      return;
    }

    const movie: Movie = this.movieForm.value;

    try {
      console.log('Adding movie:', movie);
      const response = await this.movieService.addMovie(movie);
      console.log('Movie added successfully:', response.data);
      this.successMessage = 'Movie added successfully!';
      this.errorMessage = '';

      this.closeMovieModal();
      this.resetForm();
      this.getAllMovies();
    } catch (error) {
      console.error('Error adding movie:', error);
      this.successMessage = '';
      this.errorMessage = 'Failed to add movie. Please try again.';
    }
  }

    resetForm() {
      this.movieForm.reset();
      const fileInput = document.getElementById('video') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }

    closeMovieModal() {
      const closeButton = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
    }
}
