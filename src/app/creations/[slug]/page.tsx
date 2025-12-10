import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/sanity";
import Footer from "@/components/footer";
import Header from "@/components/Header";

// GROQ query to fetch a single creation by slug
const getCreationBySlugQuery = `*[_type == "creation" && slug.current == $slug][0] {
  title,
  description,
  "slug": slug.current,
  "imageSrc": image.asset->url,
  content,
  publishedAt,
  category
}`;

// GROQ query to get all slugs for static generation
const getAllCreationSlugsQuery = `*[_type == "creation"] {
  "slug": slug.current
}`;

interface Creation {
  title: string;
  description: string;
  slug: string;
  imageSrc: string;
  content?: string;
  publishedAt?: string;
  category?: string;
}

// export async function generateStaticParams() {
//   const creations = await client.fetch<{ slug: string }[]>(
//     getAllCreationSlugsQuery
//   );

//   return creations.map((creation) => ({
//     slug: creation.slug,
//   }));
// }


export async function generateStaticParams() {
  const creations = await client.fetch<{ slug: string }[]>(
    getAllCreationSlugsQuery
  );

  return creations
    .filter((c) => typeof c.slug === "string" && c.slug.length > 0) 
    .map((c) => ({
      slug: c.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | any;
}) {
  // `params` may be a thenable in some Next.js runtimes — await it before using
  const { slug } = await params;

  const creation = await client.fetch<Creation>(getCreationBySlugQuery, {
    slug,
  });

  if (!creation) {
    return {
      title: "Creation Not Found",
    };
  }

  return {
    title: `${creation.title} | Creations`,
    description: creation.description,
  };
}

export default async function CreationPage({
  params,
}: {
  params: { slug: string } | any;
}) {
  // await params to support runtimes where params is a promise-like
  const { slug } = await params;

  const creation = await client.fetch<Creation>(getCreationBySlugQuery, {
    slug,
  });

  if (!creation) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header/Navigation */}
      {/* <nav className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-[#936a53] hover:text-[#7d5945] transition-colors inline-flex items-center gap-2"
          >
            ← Back to Creations
          </Link>
        </div>
      </nav> */}
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Category & Date */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            {creation.category && (
              <span className="uppercase tracking-wide">
                {creation.category}
              </span>
            )}
            {creation.publishedAt && (
              <>
                <span>•</span>
                <time dateTime={creation.publishedAt}>
                  {new Date(creation.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="font-semibold text-4xl md:text-5xl lg:text-6xl text-gray-800 uppercase leading-tight mb-6">
            {creation.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            {creation.description}
          </p>

          {/* Featured Image */}
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-12">
            <Image
              src={creation.imageSrc || "/placeholder.svg"}
              alt={creation.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Content */}
          {creation.content && (
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {creation.content}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Interested in this creation?
                </h3>
                <p className="text-gray-600">
                  Get in touch to learn more about our work.
                </p>
              </div>
              <Link
                href="/contact"
                className="px-8 py-3 bg-[#936a53] text-white font-medium rounded-lg hover:bg-[#7d5945] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
