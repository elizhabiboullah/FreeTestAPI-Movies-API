import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TextInput, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInRight, FadeOutLeft, Layout } from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchMovies, searchMovies, Movie } from '@/services/api';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const backgroundColor = useThemeColor({ light: '#f0f0f0', dark: '#121212' }, 'background');
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMovies();
      setMovies(data);
      setFilteredMovies(data);
    } catch (err) {
      setError('Failed to load movies. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredMovies(movies);
      return;
    }
    
    try {
      const results = await searchMovies(text);
      setFilteredMovies(results);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      layout={Layout.springify()}
    >
      <TouchableOpacity 
        style={styles.movieCard} 
        onPress={() => router.push(`/movie/${item.id}`)}
      >
        <Image 
          source={{ uri: item.image }} 
          style={styles.movieImage} 
          resizeMode="cover"
        />
        <View style={styles.movieInfo}>
          <ThemedText type="subtitle" numberOfLines={1}>{item.title}</ThemedText>
          <ThemedText numberOfLines={1}>{item.year} • {item.genre}</ThemedText>
          <ThemedText numberOfLines={1}>⭐ {item.rating}/10</ThemedText>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ThemedText type="title" style={styles.header}>Movies</ThemedText>
      
      <TextInput
        style={[styles.searchInput, { color: textColor, borderColor: textColor }]}
        placeholder="Search movies..."
        placeholderTextColor={textColor + '80'}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {isLoading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : error ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <TouchableOpacity style={styles.retryButton} onPress={loadMovies}>
            <ThemedText style={styles.retryButtonText}>Retry</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ) : filteredMovies.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <ThemedText>No movies found</ThemedText>
        </ThemedView>
      ) : (
        <Animated.FlatList
          data={filteredMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          itemLayoutAnimation={Layout.springify()}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginTop: 50,
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  movieCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  movieImage: {
    width: 100,
    height: 150,
  },
  movieInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
