"use client";

import { useEffect, useState } from "react";

type Movie = {
  id: number;
  name: string;
  image: {
    medium: string;
  } | null;
  summary: string | null;
  genres: string[];
  rating: {
    average: number | null;
  };
  premiered: string | null;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [genre, setGenre] = useState("All");
  const [minRating, setMinRating] = useState("Any");

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data: Movie[]) => {
        setMovies(data);
        setMovie(data[0]);
      });
  }, []);

  function pickRandomMovie() {
    const filtered = movies.filter((m) => {
      const matchesGenre = genre === "All" || m.genres.includes(genre);

      const matchesRating =
        minRating === "Any" ||
        (m.rating.average !== null && m.rating.average >= Number(minRating));

      return matchesGenre && matchesRating;
    });

    if (filtered.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filtered.length);
    setMovie(filtered[randomIndex]);
  }

  return (
    <main className="min-h-screen bg-neutral-900 text-white flex justify-center">
      <div className="w-full max-w-xl p-6">
        <h1 className="mb-6 text-center text-3xl font-bold">Movie Picker</h1>
        <div className="mb-6 rounded-lg border border-neutral-700 bg-neutral-800/60 p-4">
          <h2 className="mb-4 text-left text-lg font-semibold">
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
                className="w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-white outline-none"
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
                className="w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-white outline-none"
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
        <section className="rounded-lg border border-neutral-700 p-6 text-center">
          {!movie && <p className="text-neutral-400">Loading...</p>}

          {movie && (
            <div>
              {movie.image && (
                <img
                  src={movie.image.medium}
                  alt={movie.name}
                  className="mx-auto mb-4 rounded"
                />
              )}

              <h2 className="mb-2 text-xl font-semibold">{movie.name}</h2>

              <div className="mb-4 space-y-1 text-sm text-neutral-400">
                <p>Rating: {movie.rating.average ?? "Not available"}</p>
                <p>Premiered: {movie.premiered ?? "Not available"}</p>
                <p>
                  Genres:{" "}
                  {movie.genres.length > 0
                    ? movie.genres.join(", ")
                    : "Not available"}
                </p>
              </div>

              <p
                className="mb-6 text-sm text-neutral-300"
                dangerouslySetInnerHTML={{
                  __html: movie.summary ?? "No summary available.",
                }}
              />

              <button
                onClick={pickRandomMovie}
                className="rounded-lg bg-white px-4 py-2 text-black transition hover:bg-neutral-200"
              >
                Pick Another Movie
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
