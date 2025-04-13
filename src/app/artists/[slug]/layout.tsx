import { Metadata } from "next";
import { artisans } from "@/components/artisans/artisans-data";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artist = artisans.find((a) => a.slug === params.slug);

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

export default function ArtistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
