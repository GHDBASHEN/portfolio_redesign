import { useCallback, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import HomeSection from '@/components/sections/HomeSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import CredentialsSection from '@/components/sections/CredentialsSection';
import ContactSection from '@/components/sections/ContactSection';
import ScrollProgress from '@/components/scroll/ScrollProgress';
import SectionRail from '@/components/scroll/SectionRail';
import SectionReveal from '@/components/scroll/SectionReveal';
import VelocityMarquee from '@/components/ui/VelocityMarquee';
import IntroLoader from '@/components/ui/IntroLoader';

import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';
import Certificate from '@/models/Certificate';
import Award from '@/models/Award';

// ObjectId / Date → plain strings so Next can serialise props
const serialize = (docs) => JSON.parse(JSON.stringify(docs));

export default function Home({ projects = [], certificates = [], awards = [] }) {
  const [ready, setReady] = useState(false);
  const handleIntroDone = useCallback(() => setReady(true), []);

  return (
    <>
      <Head>
        <title>G.H.D.B. Ashen — Software Engineer</title>
        <meta
          name="description"
          content="Software Engineer & BICT (Hons) undergraduate at the University of Ruhuna. Full-stack (Next.js, Node.js, MongoDB), Java/Spring Boot and AI development."
        />
        <meta property="og:title" content="G.H.D.B. Ashen — Software Engineer" />
        <meta name="theme-color" content="#05060A" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#EBE7DF" media="(prefers-color-scheme: light)" />
      </Head>

      <IntroLoader onDone={handleIntroDone} />
      <ScrollProgress />
      <Header />
      <SectionRail />

      <main className="overflow-x-clip">
        <HomeSection ready={ready} />

        <VelocityMarquee items={['Next.js', 'Spring Boot', 'MongoDB', 'Node.js', 'AI Agents', 'UI/UX']} />

        <SectionReveal><AboutSection /></SectionReveal>
        <SectionReveal><ServicesSection /></SectionReveal>
        <SectionReveal><ProjectsSection projects={projects} /></SectionReveal>
        <SectionReveal>
          <CredentialsSection certificates={certificates} awards={awards} />
        </SectionReveal>

        <VelocityMarquee items={['Open to work', "Let's build", 'Available 2026', 'Say hello']} baseVelocity={1.6} />

        <SectionReveal><ContactSection /></SectionReveal>
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
