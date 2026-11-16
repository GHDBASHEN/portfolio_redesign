import Head from 'next/head';
import Header from '@/components/Header';
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CredentialsSection from '@/components/sections/CredentialsSection';
import ContactSection from '@/components/sections/ContactSection';

import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
import Certificate from '@/models/Certificate';
import Award from '@/models/Award';

// ObjectId / Date → plain strings so Next can serialise props
const serialize = (docs) => JSON.parse(JSON.stringify(docs));

export default function Home({ projects = [], certificates = [], awards = [] }) {
  return (
    <>
      <Head>
        <title>Basith Ashen — Software Engineer</title>
        <meta
          name="description"
          content="Software Engineer & BICT (Hons) undergraduate at the University of Ruhuna. Full-stack (Next.js, Node.js, MongoDB), Java/Spring Boot and AI development."
        />
        <meta property="og:title" content="Basith Ashen — Software Engineer" />
        <meta name="theme-color" content="#05060A" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#FAFAFA" media="(prefers-color-scheme: light)" />
      </Head>
      <Header />
      <main className="overflow-x-clip">
        <HomeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection projects={projects} />
        <CredentialsSection certificates={certificates} awards={awards} />
        <ContactSection />
      </main>
    </>
  );
}

export async function getStaticProps() {
  await dbConnect();
  const sort = { order: 1, createdAt: -1 }; // honours /api/reorder; createdAt breaks ties
  const [projects, certificates, awards] = await Promise.all([
    Project.find({}).sort(sort).lean(),
    Certificate.find({}).sort(sort).lean(),
    Award.find({}).sort(sort).lean(),
  ]);

  return {
    props: {
      projects: serialize(projects),
      certificates: serialize(certificates),
      awards: serialize(awards),
    },
    revalidate: 60,
  };
}
