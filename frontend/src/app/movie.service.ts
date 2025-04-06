import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import Movie from './Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url: string = "http://localhost:8000/api/movies/";

  constructor() {}

  async addMovie(movie: Movie): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await axios.post(this.url, movie, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding movie:', error);
      throw error;
    }
  }

  async fetchAllMovies(): Promise<Movie[]> {
    try {
      const response: AxiosResponse<Movie[]> = await axios.get(this.url);
      return response.data;
    } catch (error) {
      console.error('Error fetching all movies:', error);
      throw error;
    }
  }

  async getMovie(id: number): Promise<Movie> {
    try {
      const response: AxiosResponse<Movie> = await axios.get(`${this.url}${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
      throw error;
    }
  }

  async updateMovie(id: number, formData: FormData): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.put(`${this.url}${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  }

  async deleteMovie(id: number): Promise<void> {
    try {
      await axios.delete(`${this.url}${id}/`);
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
  }
}
