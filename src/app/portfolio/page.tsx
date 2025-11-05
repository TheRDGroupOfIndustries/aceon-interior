import Footer from "@/components/footer";
import Header from "@/components/Header";
import PortfolioListing from "@/components/PortfolioListing";

import { client } from "@/sanity/lib/sanity";

const getCreationsQuery = `*[_type == "creation"] | order(order asc) {
  title,
  description,
  "slug": slug.current,
  "imageSrc": image.asset->url
}`;

interface Creation {
  title: string;
  description: string;
  slug: string;
  imageSrc: string;
}

export default async function Page() {
  const creationsData: Creation[] = await client.fetch(getCreationsQuery);
  console.log("creationsData", creationsData);

  return (
    <div>
      <Header />
      <PortfolioListing creationsData={creationsData} />
      <Footer />
    </div>
  );
}
