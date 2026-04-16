import Link from "next/link";

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

export default async function MovieDetailsPage({ params }: MoviePageProps) {
  const { id } = await params;

  const res = await fetch(`https://api.tvmaze.com/shows/${id}`, {
    cache: "no-store",
  });

  const movie: Movie = await res.json();

  return (
    <main className="min-h-screen bg-neutral-900 px-6 py-10 text-white">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-neutral-400 hover:text-white"
        >
          ← Back To Movies
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
