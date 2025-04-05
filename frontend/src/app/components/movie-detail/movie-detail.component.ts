import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../movie.service';
import Movie from '../../Movie';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule, RouterLink],
  providers: [DatePipe],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  movie: Movie | undefined;
  movieId: number | undefined;

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieId = +this.route.snapshot.paramMap.get('id')!;

    if (this.movieId) {
      this.fetchMovieDetails(this.movieId);
    }
  }

  fetchMovieDetails(id: number): void {
    this.movieService.getMovie(id).then((response) => {
      this.movie = response;
    }).catch((error) => {
      console.error('Error fetching movie details:', error);
    });
  }
}
