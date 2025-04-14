import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchMovieById, Movie } from '@/services/api';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const backgroundColor = useThemeColor({ light: '#f0f0f0', dark: '#121212' }, 'background');

  useEffect(() => {
    if (id) {
      loadMovie(parseInt(id, 10));
    }
  }, [id]);

  const loadMovie = async (movieId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMovieById(movieId);
      setMovie(data);
    } catch (err) {
      setError('Failed to load movie details. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, styles.centered, { backgroundColor }]}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error || !movie) {
    return (
      <ThemedView style={[styles.container, styles.centered, { backgroundColor }]}>
        <ThemedText style={styles.errorText}>{error || 'Movie not found'}</ThemedText>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <ThemedText style={styles.buttonText}>Go Back</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <StatusBar style="light" />
      
      <Image 
        source={{ uri: movie.image }} 
        style={styles.coverImage} 
        resizeMode="cover"
      />
      
      <ThemedView style={styles.content}>
        <ThemedText type="title">{movie.title}</ThemedText>
        
        <ThemedView style={styles.infoRow}>
          <ThemedText>{movie.year}</ThemedText>
          <ThemedText>•</ThemedText>
          <ThemedText>{movie.genre}</ThemedText>
          <ThemedText>•</ThemedText>
          <ThemedText>{movie.runtime} min</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.ratingContainer}>
          <ThemedText style={styles.rating}>⭐ {movie.rating}/10</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Overview</ThemedText>
          <ThemedText style={styles.description}>{movie.description}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Director</ThemedText>
          <ThemedText>{movie.director}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Cast</ThemedText>
          <ThemedText>{movie.cast ? movie.cast.join(', ') : 'No cast information available'}</ThemedText>
        </ThemedView>
        
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <ThemedText style={styles.buttonText}>Back to Movies</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
  },
  ratingContainer: {
    marginBottom: 16,
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 16,
  },
  description: {
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    marginBottom: 16,
    textAlign: 'center',
  },
});