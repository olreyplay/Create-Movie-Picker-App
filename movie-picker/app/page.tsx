export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white flex justify-center">
      <div className="w-full max-w-xl p-6">
        <h1 className="mb-6 text-center text-3xl font-bold">Movie Picker</h1>

        <section className="rounded-lg border border-neutral-700 p-6 text-center">
          <p className="text-neutral-400">Your movie result will appear here</p>
        </section>
      </div>
    </main>
  );
}
