import { Metadata } from "next";
import { artisans } from "@/components/artisans/artisans-data";

type Props = {
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const artist = artisans.find((a) => a.slug === resolvedParams.slug);

  if (!artist) {
    return {
      title: "Artist Not Found | Bihar Bazaar",
    };
  }

  return {
    title: `${artist.name} | Bihar Bazaar`,
    description: artist.description,
  };
}

export default function ArtistLayout({ children }: Props) {
  return <>{children}</>;
}
