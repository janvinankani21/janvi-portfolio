import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PORTFOLIO_DATA } from './data/portfolioData';
import CustomCursor from './components/common/CustomCursor';
import Preloader from './components/common/Preloader';
import ScrollProgress from './components/common/ScrollProgress';
import BackToTop from './components/common/BackToTop';
import PlaceholderToast from './components/common/PlaceholderToast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import TechMarquee from './components/sections/TechMarquee';
import About from './components/sections/About';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Research from './components/sections/Research';
import Achievements from './components/sections/Achievements';
import Journey from './components/sections/Journey';
import Contact from './components/sections/Contact';
import ProjectModal from './components/modals/ProjectModal';
import CertificateModal from './components/modals/CertificateModal';

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [toastNotice, setToastNotice] = useState(null);

  const allCertificates = useMemo(
    () => [
      PORTFOLIO_DATA.experience,
      PORTFOLIO_DATA.achievements.featured,
      ...PORTFOLIO_DATA.achievements.items,
      ...PORTFOLIO_DATA.certifications.map((cert) => ({
        ...cert,
        issuer: cert.provider,
        credentialScope: cert.detail,
        description: `${cert.title} (${cert.detail}) — Issued by ${cert.provider}.`,
      })),
    ],
    []
  );

  const handlePlaceholderLink = useCallback((notice) => {
    setToastNotice(notice);
  }, []);

  useEffect(() => {
    if (!toastNotice) return undefined;
    const timer = window.setTimeout(() => {
      setToastNotice(null);
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [toastNotice]);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--ink)] transition-colors duration-300">
        <Preloader onComplete={() => setLoaderDone(true)} />
        <CustomCursor />
        <ScrollProgress />

        {/* Accessible Skip Link */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[var(--accent-contrast)]"
        >
          Skip to main content
        </a>

        <Navbar />

        <main>
          <Hero ready={loaderDone} onPlaceholderLink={handlePlaceholderLink} />
          <TechMarquee />
          <About />
          <Education />
          <Skills />
          <Projects
            onOpenProject={setSelectedProject}
            onPlaceholderLink={handlePlaceholderLink}
          />
          <Research />
          <Achievements onPreviewCertificate={setSelectedCertificate} />
          <Journey />
          <Contact onPlaceholderLink={handlePlaceholderLink} />
        </main>

        <Footer onPlaceholderLink={handlePlaceholderLink} />
        <BackToTop />

        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onPlaceholderLink={handlePlaceholderLink}
        />

        <CertificateModal
          certificate={selectedCertificate}
          certificates={allCertificates}
          onSelectCertificate={setSelectedCertificate}
          onClose={() => setSelectedCertificate(null)}
        />

        <PlaceholderToast
          notice={toastNotice}
          onClose={() => setToastNotice(null)}
        />
      </div>
    </ThemeProvider>
  );
}
