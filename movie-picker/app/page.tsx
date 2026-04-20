"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FiltersPanel from "@/components/FiltersPanel";
import MoviesGrid from "@/components/MoviesGrid";
import Pagination from "@/components/Pagination";

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

const MOVIES_PER_PAGE = 8;

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState("All");
  const [minRating, setMinRating] = useState("Any");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setGenre(searchParams.get("genre") || "All");
    setMinRating(searchParams.get("rating") || "Any");
  }, [searchParams]);

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data: Movie[]) => {
        setMovies(data);
      });
  }, []);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesGenre = genre === "All" || movie.genres.includes(genre);

      const matchesRating =
        minRating === "Any" ||
        (movie.rating.average !== null &&
          movie.rating.average >= Number(minRating));

      return matchesSearch && matchesGenre && matchesRating;
    });
  }, [movies, search, genre, minRating]);

  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);

  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
    const endIndex = startIndex + MOVIES_PER_PAGE;
    return filteredMovies.slice(startIndex, endIndex);
  }, [filteredMovies, currentPage]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
    updateURL(value, genre, minRating);
  }

  function handleGenreChange(value: string) {
    setGenre(value);
    setCurrentPage(1);
    updateURL(search, value, minRating);
  }

  function handleRatingChange(value: string) {
    setMinRating(value);
    setCurrentPage(1);
    updateURL(search, genre, value);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function updateURL(
    nextSearch: string,
    nextGenre: string,
    nextRating: string,
  ) {
    const params = new URLSearchParams();

    if (nextSearch) {
      params.set("search", nextSearch);
    }

    if (nextGenre !== "All") {
      params.set("genre", nextGenre);
    }

    if (nextRating !== "Any") {
      params.set("rating", nextRating);
    }

    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : "/");
  }

  return (
    <main className="min-h-screen bg-neutral-900 px-6 py-10 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Movie Picker</h1>

          <Link
            href="/saved"
            className="text-sm text-neutral-400 hover:text-white"
          >
            Saved Movies
          </Link>
        </div>

        <FiltersPanel
          search={search}
          genre={genre}
          minRating={minRating}
          onSearchChange={handleSearchChange}
          onGenreChange={handleGenreChange}
          onRatingChange={handleRatingChange}
        />
        {movies.length === 0 && (
          <p className="text-center text-neutral-400">Loading movies...</p>
        )}

        {movies.length > 0 && filteredMovies.length === 0 && (
          <p className="text-center text-neutral-400">
            No movies match your current filters.
          </p>
        )}

        {paginatedMovies.length > 0 && (
          <>
            <MoviesGrid movies={paginatedMovies} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </main>
  );
}
