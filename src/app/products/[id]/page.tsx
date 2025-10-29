import Footer from "@/components/footer";
import Header from "@/components/Header";
import ProductDetailsPage from "@/components/ProductDetailsPage";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <>
      <Header />
      <ProductDetailsPage productId={id} />
      <Footer />
    </>
  );
}
