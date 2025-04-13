import { Metadata } from "next";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const params = await props.params;

  return {
    title: `Product #${params.id} | Bihar Bazaar`,
    description: `Handmade Madhubani painting depicting Lord Krishna`,
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
