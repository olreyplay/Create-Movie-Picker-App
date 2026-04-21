import HomeClient from "@/components/HomeClient";

type PageProps = {
  searchParams: Promise<{
    search?: string;
    genre?: string;
    rating?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <HomeClient
      initialSearch={params.search ?? ""}
      initialGenre={params.genre ?? "All"}
      initialMinRating={params.rating ?? "Any"}
    />
  );
}
