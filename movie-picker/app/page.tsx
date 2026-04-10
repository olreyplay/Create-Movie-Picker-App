"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data) => {
        setMovie(data[0]);
      });
  }, []);

  return (
    <main className="min-h-screen bg-neutral-900 text-white flex justify-center">
      <div className="w-full max-w-xl p-6">
        <h1 className="mb-6 text-center text-3xl font-bold">Movie Picker</h1>

        <section className="rounded-lg border border-neutral-700 p-6 text-center">
          {!movie && <p className="text-neutral-400">Loading...</p>}

          {movie && (
            <div>
              <h2 className="text-xl font-semibold mb-2">{movie.name}</h2>

              <img
                src={movie.image?.medium}
                alt={movie.name}
                className="mx-auto rounded mb-4"
              />

              <p
                className="text-sm text-neutral-300"
                dangerouslySetInnerHTML={{ __html: movie.summary }}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
