"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MoviePageProps = {
  params: Promise<{
    id: string;
  }>;
};

type Movie = {
  id: number;
  name: string;
  image: {
    medium: string;
    original?: string;
  } | null;
  genres: string[];
  rating: {
    average: number | null;
  };
  premiered: string | null;
  summary: string | null;
  language: string | null;
  status: string | null;
};

export default function MovieDetailsPage({ params }: MoviePageProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function loadMovie() {
      const { id } = await params;

      const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
      const data: Movie = await res.json();

      setMovie(data);

      const storedMovies = localStorage.getItem("saved-movies");
      const savedMovies: Movie[] = storedMovies ? JSON.parse(storedMovies) : [];
      const alreadySaved = savedMovies.some(
        (savedMovie) => savedMovie.id === data.id,
      );

      setIsSaved(alreadySaved);
    }

    loadMovie();
  }, [params]);

  function toggleFavorite() {
    if (!movie) return;

    const storedMovies = localStorage.getItem("saved-movies");
    const savedMovies: Movie[] = storedMovies ? JSON.parse(storedMovies) : [];

    if (isSaved) {
      const updatedMovies = savedMovies.filter(
        (savedMovie) => savedMovie.id !== movie.id,
      );

      localStorage.setItem("saved-movies", JSON.stringify(updatedMovies));
      setIsSaved(false);
      return;
    }

    const updatedMovies = [...savedMovies, movie];
    localStorage.setItem("saved-movies", JSON.stringify(updatedMovies));
    setIsSaved(true);
  }

  if (!movie) {
    return (
      <main className="min-h-screen bg-neutral-900 px-6 py-10 text-white">
        <p className="text-center text-neutral-400">Loading movie...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-900 px-6 py-10 text-white">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-neutral-400 hover:text-white"
        >
          Back To Movies
        </Link>

        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          <div>
            {movie.image && (
              <img
                src={movie.image.original || movie.image.medium}
                alt={movie.name}
                className="w-full rounded-lg object-cover"
              />
            )}
          </div>

          <div>
            <h1 className="mb-4 text-3xl font-bold">{movie.name}</h1>

            <div className="mb-6 space-y-2 text-sm text-neutral-300">
              <p>Rating: {movie.rating.average ?? "Not available"}</p>
              <p>Premiered: {movie.premiered ?? "Not available"}</p>
              <p>Language: {movie.language ?? "Not available"}</p>
              <p>Status: {movie.status ?? "Not available"}</p>
              <p>
                Genres:{" "}
                {movie.genres.length > 0
                  ? movie.genres.join(", ")
                  : "No genres"}
              </p>
            </div>

            <button
              onClick={toggleFavorite}
              className={`mb-6 rounded-lg px-4 py-2 transition ${
                isSaved
                  ? "border border-neutral-600 bg-transparent text-white hover:bg-neutral-800"
                  : "bg-white text-black hover:bg-neutral-200"
              }`}
            >
              {isSaved ? "Remove From Favorites" : "Save To Favorites"}
            </button>

            <div
              className="prose prose-invert max-w-none text-neutral-200"
              dangerouslySetInnerHTML={{
                __html: movie.summary ?? "No summary available.",
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
