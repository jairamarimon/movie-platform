import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../movie.service';
import Movie from '../../Movie';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  movie: Movie | undefined;
  movieId: number | undefined;
  movieForm : FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  showEditMovieModal = false;
  selectedFile: File | null = null;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService,
    private datePipe: DatePipe,
    private formbuilder: FormBuilder,
  ) {
    this.movieForm = this.formbuilder.group({
      title : ['', Validators.required],
      description : ['', Validators.required],
      video: [''],
    })
  }

  ngOnInit(): void {
    this.movieId = +this.route.snapshot.paramMap.get('id')!;

    if (this.movieId) {
      this.fetchMovieDetails(this.movieId);
    }
  }

  fetchMovieDetails(id: number): void {
    this.isLoading = true;
    this.movieService.getMovie(id).then((response) => {
      this.movie = response;
      let formattedDateAdded = this.datePipe.transform(response.date_added, 'longDate');
      this.movie.date_added = formattedDateAdded as string;

      this.movieForm.setValue({
        title: this.movie?.title,
        description: this.movie?.description,
        video: this.movie?.video,
      });
      this.isLoading = false;
    }).catch((error) => {
      console.error('Error fetching movie details:', error);
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.movieForm.markAsDirty();
    }
  }
  
  async editMovie() {
    const formData = new FormData();

    if (this.movieForm.get('title')?.dirty) {
      formData.append('title', this.movieForm.get('title')?.value);
    }

    if (this.movieForm.get('description')?.dirty) {
      formData.append('description', this.movieForm.get('description')?.value);
    }

    if (this.selectedFile) {
      formData.append('video', this.selectedFile);
    }

    const id = this.movieId as number;
    try {
      const response = await this.movieService.updateMovie(id, formData);
      console.log('Movie added successfully:', response);
      this.successMessage = 'Movie added successfully!';
      this.errorMessage = '';

      this.closeEditMovieModal();
      this.fetchMovieDetails(id);
    } catch (error) {
      console.error('Error adding movie:', error);
      this.successMessage = '';
      this.errorMessage = 'Failed to add movie. Please try again.';
    }
  }

  closeEditMovieModal() {
    this.showEditMovieModal = false;
  }
}
