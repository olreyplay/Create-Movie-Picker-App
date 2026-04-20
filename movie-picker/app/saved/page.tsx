"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MoviesGrid from "@/components/MoviesGrid";

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
};

export default function SavedPage() {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const storedMovies = localStorage.getItem("saved-movies");

    if (storedMovies) {
      setSavedMovies(JSON.parse(storedMovies));
    }
  }, []);

  return (
    <main className="min-h-screen bg-neutral-900 px-6 py-10 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-neutral-400 hover:text-white"
        >
          Back To Movies
        </Link>

        <h1 className="mb-8 text-3xl font-bold">Saved Movies</h1>

        {savedMovies.length === 0 && (
          <p className="text-neutral-400">You have not saved any movies yet.</p>
        )}

        {savedMovies.length > 0 && <MoviesGrid movies={savedMovies} />}
      </div>
    </main>
  );
}
