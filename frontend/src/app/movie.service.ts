import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import Movie from './Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url: string = "http://localhost:8000/api/movies/";

  constructor() {}

  addMovie(movie: Movie) {
    return axios.post<Movie>(this.url, movie, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  }

  fetchAllMovies() {
    return axios.get<Movie[]>(this.url);
  }

  // getMovie(id: number) {
  //   return axios
  //     .get<Movie>(`${this.url}${id}`)
  //     .then((response) => response.data)
  //     .catch((error) => {
  //       console.error('Error fetching movie by ID:', error);
  //       throw error;
  //     });
  // }

  async getMovie(id: number): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await axios.get(`${this.url}${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
      throw error;
    }
  }

  updateMovie(id: number, movie: Movie) {
    return axios.put<Movie>(`${this.url}/${id}`, movie);
  }

  deleteMovie(id: number) {
    return axios.delete(`${this.url}/${id}`);
  }
}
