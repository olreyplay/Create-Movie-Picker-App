"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setMovie(data[0]);
      });
  }, []);

  function pickRandomMovie() {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setMovie(movies[randomIndex]);
  }

  return (
    <main className="min-h-screen bg-neutral-900 text-white flex justify-center">
      <div className="w-full max-w-xl p-6">
        <h1 className="mb-6 text-center text-3xl font-bold">Movie Picker</h1>

        <section className="rounded-lg border border-neutral-700 p-6 text-center">
          {!movie && <p className="text-neutral-400">Loading...</p>}

          {movie && (
            <div>
              <h2 className="mb-2 text-xl font-semibold">{movie.name}</h2>

              <img
                src={movie.image?.medium}
                alt={movie.name}
                className="mx-auto mb-4 rounded"
              />

              <p
                className="mb-6 text-sm text-neutral-300"
                dangerouslySetInnerHTML={{ __html: movie.summary }}
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
