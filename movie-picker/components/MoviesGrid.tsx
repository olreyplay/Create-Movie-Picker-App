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
};

type MoviesGridProps = {
  movies: Movie[];
};

export default function MoviesGrid({ movies }: MoviesGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {movies.map((movie) => (
        <article
          key={movie.id}
          className="overflow-hidden rounded-lg border border-neutral-700 bg-neutral-800"
        >
          {movie.image && (
            <img
              src={movie.image.medium}
              alt={movie.name}
              className="h-72 w-full object-cover"
            />
          )}

          <div className="p-4">
            <h2 className="mb-2 text-lg font-semibold">{movie.name}</h2>

            <p className="mb-1 text-sm text-neutral-400">
              Rating: {movie.rating.average ?? "Not available"}
            </p>

            <p className="mb-1 text-sm text-neutral-400">
              Premiered: {movie.premiered ?? "Not available"}
            </p>

            <p className="text-sm text-neutral-400">
              {movie.genres.length > 0 ? movie.genres.join(", ") : "No genres"}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
