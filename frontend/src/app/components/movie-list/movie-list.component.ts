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
  selectedMovie: Movie | null = null;
  showAddMovieModal = false;
  showDeleteMovieModal = false;

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
      this.movies = response.map((movie: any) => {
        movie.date_added = this.datePipe.transform(movie.date_added, 'mediumDate');
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
    this.movieForm.markAllAsTouched();
    if (this.movieForm.invalid) {
      return;
    }

    const movie: Movie = this.movieForm.value;

    try {
      console.log('Adding movie:', movie);
      const response = await this.movieService.addMovie(movie);
      console.log('Movie added successfully:', response);
      this.successMessage = 'Movie added successfully!';
      this.errorMessage = '';

      this.closeAddMovieModal();
      this.getAllMovies();
    } catch (error) {
      console.error('Error adding movie:', error);
      this.successMessage = '';
      this.errorMessage = 'Failed to add movie. Please try again.';
    }
  }

  deleteMovie(): void {
    console.log('delete here')
    if (this.selectedMovie?.id) {
      this.movieService.deleteMovie(this.selectedMovie?.id).then((response) => {
        this.closeDeleteMovieModal();
        this.getAllMovies();
      }).catch((error) => {
        console.error('Error removing movie details:', error);
      })
    }
  }

  closeAddMovieModal() {
    this.showAddMovieModal = false;
    this.resetMovieForm();
  }

  resetMovieForm() {
    this.movieForm.reset();
    const fileInput = document.getElementById('video') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  openDeleteMovieModal(movie: Movie): void {
    this.selectedMovie = movie;
    this.showDeleteMovieModal = true;
  }

  closeDeleteMovieModal() {
    this.showDeleteMovieModal = false;
    this.selectedMovie = null;
  }
}
