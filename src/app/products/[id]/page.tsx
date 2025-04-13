import { ClientProductPage } from "./client-product-page";

type Props = Readonly<{
  params: Promise<{ id: string }>;
}>;

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  return <ClientProductPage id={id} />;
}
