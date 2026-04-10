"use client";

import { useEffect, useMemo, useState } from "react";
import MoviesGrid from "@/components/MoviesGrid";

type Movie = {
  id: number;
  name: string;
  image: {
    medium: string;
  } | null;
  genres: string[];
  rating: {
    average: number | null;
  };
  premiered: string | null;
  summary: string | null;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState("All");
  const [minRating, setMinRating] = useState("Any");

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data: Movie[]) => {
        setMovies(data);
      });
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesGenre = genre === "All" || movie.genres.includes(genre);

      const matchesRating =
        minRating === "Any" ||
        (movie.rating.average !== null &&
          movie.rating.average >= Number(minRating));

      return matchesGenre && matchesRating;
    });
  }, [movies, genre, minRating]);

  return (
    <main className="min-h-screen bg-neutral-900 px-6 py-10 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold">Movie Picker</h1>

        <div className="mb-8 rounded-lg border border-neutral-700 bg-neutral-800/60 p-4">
          <h2 className="mb-4 text-lg font-semibold">
            Choose Your Preferences
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="genre"
                className="mb-2 block text-sm font-medium text-neutral-300"
              >
                Genre
              </label>

              <select
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2"
              >
                <option value="All">Any Genre</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Action">Action</option>
                <option value="Thriller">Thriller</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="rating"
                className="mb-2 block text-sm font-medium text-neutral-300"
              >
                Minimum Rating
              </label>

              <select
                id="rating"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2"
              >
                <option value="Any">Any Rating</option>
                <option value="5">5+</option>
                <option value="6">6+</option>
                <option value="7">7+</option>
                <option value="8">8+</option>
                <option value="9">9+</option>
              </select>
            </div>
          </div>
        </div>

        {movies.length === 0 && (
          <p className="text-center text-neutral-400">Loading movies...</p>
        )}

        {movies.length > 0 && filteredMovies.length === 0 && (
          <p className="text-center text-neutral-400">
            No movies match your current filters.
          </p>
        )}

        {filteredMovies.length > 0 && <MoviesGrid movies={filteredMovies} />}
      </div>
    </main>
  );
}
