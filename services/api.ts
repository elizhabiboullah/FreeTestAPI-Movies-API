import { Alert } from 'react-native';

// Base URL for the FreeTestAPI Movies API
const BASE_URL = 'https://freetestapi.com/api/v1/movies';

// Types for movie data
export interface Movie {
  id: number;
  title: string;
  director: string;
  genre: string;
  year: number;
  description: string;
  image: string;
  rating: number;
  runtime: number;
  cast: string[];
}

// Function to fetch all movies
export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    Alert.alert('Error', 'Failed to fetch movies. Please try again later.');
    return [];
  }
};

// Function to fetch a single movie by ID
export const fetchMovieById = async (id: number): Promise<Movie | null> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error);
    Alert.alert('Error', 'Failed to fetch movie details. Please try again later.');
    return null;
  }
};

// Function to search movies by title
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    // Fetch all movies and filter by title (since the API doesn't have a search endpoint)
    const allMovies = await fetchMovies();
    const filteredMovies = allMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    return filteredMovies;
  } catch (error) {
    console.error('Error searching movies:', error);
    Alert.alert('Error', 'Failed to search movies. Please try again later.');
    return [];
  }
};