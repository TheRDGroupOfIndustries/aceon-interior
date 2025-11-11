import Contact from '@/components/contact';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Aceon Interio',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Contact />
    </main>
  );
}
