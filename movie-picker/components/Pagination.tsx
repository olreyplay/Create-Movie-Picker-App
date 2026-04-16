type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-neutral-600 px-4 py-2 text-sm text-white disabled:opacity-40"
      >
        Previous
      </button>

      <span className="text-sm text-neutral-400">
        Page {currentPage} Of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-neutral-600 px-4 py-2 text-sm text-white disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
