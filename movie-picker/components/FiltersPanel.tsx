type FiltersPanelProps = {
  search: string;
  genre: string;
  minRating: string;
  onSearchChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onRatingChange: (value: string) => void;
};

export default function FiltersPanel({
  search,
  genre,
  minRating,
  onSearchChange,
  onGenreChange,
  onRatingChange,
}: FiltersPanelProps) {
  return (
    <div className="mb-8 rounded-lg border border-neutral-700 bg-neutral-800/60 p-4">
      <h2 className="mb-4 text-lg font-semibold">Choose Your Preferences</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-neutral-300"
          >
            Search
          </label>

          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search movies..."
            className="w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-white outline-none"
          />
        </div>

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
            onChange={(e) => onGenreChange(e.target.value)}
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
            onChange={(e) => onRatingChange(e.target.value)}
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
  );
}
