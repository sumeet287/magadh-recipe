import { Metadata } from "next";

type Props = Readonly<{
  params: { id: string };
  children: React.ReactNode;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await Promise.resolve(params);

  return {
    title: `Product #${id} | Bihar Bazaar`,
    description: `Handmade Madhubani painting depicting Lord Krishna`,
  };
}

export default function ProductLayout({ children }: Props) {
  return children;
}
