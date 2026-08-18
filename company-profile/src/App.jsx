import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import logoSekolah from './assets/logo.png';
import smp2sbyLogo from './assets/logo.png';
import visiMisiImg from './assets/visi_misi.png';
import hero1Img from './assets/Hero1.JPG';
import hero2Img from './assets/Hero2.JPG';
import hero3Img from './assets/Hero3.JPG';

// 1. Data Slider Kegiatan Sekolah
const slidesData = [
  {
    id: 1,
    badge: "Informatika & Pemrograman",
    title: "Pembelajaran Berbasis Computational Thinking & Web Development",
    description: "Siswa diajak mengeksplorasi dunia logika pemrograman, pembuatan web, dan teknologi digital interaktif sejak dini.",
    image: hero1Img,
  },
  {
    id: 2,
    badge: "Laboratorium & Sains",
    title: "Praktikum Interaktif & Eksperimen Sains Terapan",
    description: "Fasilitas laboratorium modern yang mendukung kegiatan ilmiah, observasi, dan pengujian konsep sains secara langsung.",
    image: hero2Img,
  },
  {
    id: 3,
    badge: "Ekstrakurikuler & Karakter",
    title: "Pengembangan Potensi, Kepemimpinan, dan Kreativitas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: hero3Img,
  },
];

// 2. Data Mitra / Instansi Kerja Sama
const partnersData = [
  { name: "Kemendikbudristek", icon: "🏛️" },
  { name: "Google for Education", icon: "🌐" },
  { name: "Intel Skills for Innovation", icon: "💻" },
  { name: "MikroTik Academy", icon: "📡" },
  { name: "Canva for Education", icon: "🎨" },
  { name: "Yamaha Motor Tech", icon: "🏍️" },
];

// 3. Variants Framer Motion untuk Efek Slide Hero
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export default function App() {
  // Mode Gelap (Dark Mode) State dengan Persistence LocalStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Intro Splash Screen State
  const [isLoading, setIsLoading] = useState(true);

  // Hero Slider State
  const [[page, direction], setPage] = useState([0, 0]);

  // Preview Modal Visi Misi State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Scroll Adaptation State
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Active & Hover State untuk Navbar Pill
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [hoveredNavIndex, setHoveredNavIndex] = useState(null);

  // State & Ref penanda navigasi via klik (Mencegah animasi berlebihan saat klik)
  const [isClickScrolling, setIsClickScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const navMenuItems = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Profil', href: '#profil' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Kontak', href: '#kontak' },
  ];

  // Target index: jika sedang dikursor gunakan hoveredNavIndex, jika tidak gunakan activeNavIndex
  const targetIndex = hoveredNavIndex !== null ? hoveredNavIndex : activeNavIndex;

  // Deteksi posisi scroll layar secara manual (Aktif saat tidak sedang berpindah via klik)
  useEffect(() => {
    const handleScrollActiveSection = () => {
      if (isClickScrolling) return;

      const scrollPosition = window.scrollY + 200;
      navMenuItems.forEach((item, index) => {
        const element = document.querySelector(item.href);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveNavIndex(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScrollActiveSection);
    return () => window.removeEventListener('scroll', handleScrollActiveSection);
  }, [isClickScrolling]);

  // Durasi Tampil Intro Splash Screen (2.6 Detik)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Hero Slider Logic
  const slideIndex = Math.abs(page % slidesData.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [page]);

  const currentSlide = slidesData[slideIndex];

  // Handler Klik Menu Navbar dengan Smooth Scroll
  const handleNavClick = (e, href, index) => {
    e.preventDefault();

    setIsClickScrolling(true);
    setActiveNavIndex(index);
    setHoveredNavIndex(null);

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsClickScrolling(false);
    }, 800);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-800'}`}>

      {/* 0. INTRO SPLASH SCREEN */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="intro-splash"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 2.2,
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white select-none"
          >
            <motion.img
              src={smp2sbyLogo}
              alt="Logo Intro SMP Muhammadiyah 2 Surabaya"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{
                scale: [0.2, 1.15, 1],
                opacity: 1
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut"
              }}
              className="w-32 h-32 md:w-44 md:h-44 object-cover rounded-2xl mb-6 shadow-2xl drop-shadow-[0_0_35px_rgba(38,59,170,0.5)]"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center px-4"
            >
              <h1 className="text-xl md:text-2xl font-bold tracking-widest font-axiforma text-white mb-2">
                SMP MUHAMMADIYAH 2 SURABAYA
              </h1>
              <p className="text-xs md:text-sm text-slate-300 font-medium tracking-wide">
                Membangun Ekosistem Digital Berbasis Pembelajaran Modern
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. NAVBAR DENGAN MODE GELAP & ANIMASI FRAMER MOTION */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${darkMode
          ? (isScrolled ? 'bg-slate-900/95 border-slate-800/80 shadow-slate-950/50 backdrop-blur-xl' : 'bg-slate-900/80 border-slate-800/50 backdrop-blur-xl')
          : (isScrolled ? 'bg-white/95 border-slate-200/80 shadow-md backdrop-blur-xl' : 'bg-white/80 border-white/40 shadow-sm backdrop-blur-xl')
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <img
              src={logoSekolah}
              alt="Logo SMP Muhammadiyah 2"
              className="h-10 w-auto object-contain"
            />
            <motion.span
              animate={{
                color: darkMode ? '#ffffff' : (isScrolled ? '#263BAA' : '#0f172a')
              }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="font-axiforma text-lg md:text-xl font-bold tracking-wide"
            >
              SMP MUHAMMADIYAH 2 SURABAYA
            </motion.span>
          </div>

          {/* MENU NAVIGASI */}
          <div className="flex items-center space-x-3">
            <div
              onMouseLeave={() => setHoveredNavIndex(null)}
              className={`relative hidden items-center rounded-2xl border p-1.5 backdrop-blur-xl md:flex ${darkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200/60 bg-slate-50'
                }`}
            >
              {navMenuItems.map((item, index) => {
                const isSelected = targetIndex === index;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, index)}
                    onMouseEnter={() => setHoveredNavIndex(index)}
                    className={`relative rounded-xl px-6 py-2.5 text-sm font-bold transition-colors duration-200 ${isSelected
                      ? 'text-white'
                      : (darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900')
                      }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="active-navbar-pill"
                        transition={
                          isClickScrolling
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 30 }
                        }
                        className="absolute inset-0 rounded-xl bg-[#263BAA] shadow-md shadow-[#263BAA]/30"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </div>

            {/* TOMBOL TOGGLE DARK MODE */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-colors ${darkMode
                ? 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800'
                : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              aria-label="Toggle Dark Mode"
            >
              <motion.span
                key={darkMode ? 'dark' : 'light'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-lg"
              >
                {darkMode ? '☀️' : '🌙'}
              </motion.span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SLIDER UTAMA */}
      <section id="beranda" className="relative w-full h-[80vh] min-h-[520px] overflow-hidden bg-slate-900 text-white">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -10000) {
                paginate(1);
              } else if (swipe > 10000) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/30" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto h-full px-14 sm:px-20 md:px-24 flex flex-col justify-end pb-20 md:justify-center md:pb-0">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block bg-[#ee944f] text-[#ffffff] font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-4 shadow-sm">
                  {currentSlide.badge}
                </span>

                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-md text-white">
                  {currentSlide.title}
                </h1>

                <p className="text-base md:text-lg text-slate-200 mb-8 leading-relaxed max-w-2xl font-light">
                  {currentSlide.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#layanan"
                    onClick={(e) => handleNavClick(e, '#layanan', 2)}
                    className="bg-[#263BAA] hover:bg-[#1f308a] text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-[#263BAA]/30 transition transform hover:-translate-y-0.5"
                  >
                    Jelajahi Program
                  </a>
                  <a
                    href="#profil"
                    onClick={(e) => handleNavClick(e, '#profil', 1)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-semibold px-7 py-3.5 rounded-xl transition"
                  >
                    Profil Sekolah
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={() => paginate(-1)}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/40 hover:bg-[#ee944f] backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition hover:scale-110 active:scale-95"
          aria-label="Previous Slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/40 hover:bg-[#ee944f] backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition hover:scale-110 active:scale-95"
          aria-label="Next Slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const dir = index > slideIndex ? 1 : -1;
                setPage([index, dir]);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${index === slideIndex
                ? 'w-8 bg-[#263BAA]'
                : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 3. MARQUEE MITRA & INSTANSI */}
      <div className={`w-full py-5 overflow-hidden border-b transition-colors duration-300 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200/70'
        }`}>
        <div className="max-w-7xl mx-auto px-6 mb-3 flex items-center justify-center space-x-3">
          <div className={`h-px flex-1 max-w-[80px] md:max-w-[150px] ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
          <span className="text-xs font-bold uppercase tracking-widest text-[#ee944f]">
            Kemitraan & Kolaborasi Strategis
          </span>
          <div className={`h-px flex-1 max-w-[80px] md:max-w-[150px] ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
        </div>

        <div className="relative flex overflow-x-hidden">
          <motion.div
            className="flex space-x-8 md:space-x-12 whitespace-nowrap py-2"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 22,
              ease: "linear",
            }}
          >
            {[...partnersData, ...partnersData, ...partnersData].map((partner, idx) => (
              <div
                key={idx}
                className={`flex items-center space-x-3 px-5 py-2.5 rounded-xl border shadow-sm hover:border-[#263BAA] hover:shadow-md transition-all duration-300 cursor-pointer ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200/80 text-slate-700'
                  }`}
              >
                <span className="text-xl">{partner.icon}</span>
                <span className="text-sm font-bold">{partner.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 4. PROFIL SECTION */}
      <section id="profil" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            className={`rounded-[28px] border p-8 shadow-xl md:p-10 transition-colors duration-300 ${darkMode
              ? 'bg-slate-900 border-slate-800 text-slate-300 shadow-slate-950/50'
              : 'bg-white border-slate-100 text-slate-600 shadow-slate-200/50'
              }`}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-[#ee944f]">Tentang Kami</h2>
            <p className="mb-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="mb-6 leading-relaxed">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </motion.div>

          <motion.div
            className="group relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-[#ee944f] p-6 text-white shadow-xl shadow-[#ee944f]/25 md:p-8 cursor-pointer"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setIsPreviewOpen(true)}
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <img
                src={visiMisiImg}
                alt="Visi dan Misi SMP Muhammadiyah 2 Surabaya"
                className="w-full h-full object-cover rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl backdrop-blur-[2px]">
                <span className="bg-white/95 text-slate-900 font-bold px-5 py-2.5 rounded-full text-xs shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-all">
                  🔍 Klik untuk Memperbesar
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL PREVIEW */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onClick={() => setIsPreviewOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              key="modal-card"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -350,
                scale: 0.9,
                transition: { duration: 0.45, ease: [0.32, 0, 0.67, 0] }
              }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-5xl w-full max-h-[90vh] rounded-3xl p-4 md:p-6 shadow-2xl border overflow-hidden cursor-default flex flex-col items-center transition-colors ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-100 text-slate-800'
                }`}
            >
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-[#ee944f] backdrop-blur-md text-white font-bold flex items-center justify-center transition shadow-md"
                aria-label="Tutup Preview"
              >
                ✕
              </button>

              <div className="w-full h-full overflow-auto rounded-2xl flex items-center justify-center">
                <img
                  src={visiMisiImg}
                  alt="Preview Visi dan Misi SMP Muhammadiyah 2 Surabaya"
                  className="w-full h-auto max-h-[78vh] object-contain rounded-xl shadow-sm"
                />
              </div>

              <div className="mt-4 text-center">
                <p className={`text-xs font-semibold ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Klik di luar gambar atau tombol silang untuk keluar (Sweep Up Exit)
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. LAYANAN SECTION */}
      <section id="layanan" className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-slate-900/60' : 'bg-slate-50'}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className={`mb-4 text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Layanan Unggulan</h2>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: '💻', title: 'Pengembangan LMS & Web', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', delay: 0.1 },
              { icon: '🚀', title: 'Kurikulum Informatics', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', delay: 0.2 },
              { icon: '🛠️', title: 'Infrastruktur & CBT', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', delay: 0.3 },
            ].map((service, index) => (
              <motion.div
                key={index}
                className={`group rounded-[28px] border p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#263BAA]/40 ${darkMode
                  ? 'bg-slate-900 border-slate-800 shadow-slate-950/40'
                  : 'bg-white border-slate-100 shadow-slate-200/50'
                  }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: service.delay }}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#263BAA]/15 text-xl text-[#263BAA] transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className={`mb-3 text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. KONTAK SECTION (PETA LOKASI GOOGLE MAPS) */}
      <section id="kontak" className="mx-auto max-w-7xl px-6 py-20">
        <div className={`grid gap-12 rounded-[30px] border p-8 shadow-xl md:grid-cols-2 md:p-12 transition-colors duration-300 ${darkMode
          ? 'bg-slate-900 border-slate-800 shadow-slate-950/50'
          : 'bg-white border-slate-100 shadow-slate-200/60'
          }`}>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-[#ee944f]">Hubungi Kami</h2>
            <p className={`mb-8 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Kunjungi lokasi kami secara langsung atau hubungi kontak resmi SMP Muhammadiyah 2 Surabaya untuk informasi pendaftaran dan kerja sama:
            </p>

            <div className="space-y-4">
              <div className={`flex items-center space-x-4 rounded-2xl p-4 ${darkMode ? 'bg-slate-800/60' : 'bg-slate-50'}`}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ee944f]/15 text-xl text-[#ee944f]">📍</div>
                <div>
                  <p className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Alamat Sekolah</p>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    Jl. Genteng Muhammadiyah No.28, Genteng, Kec. Genteng, Surabaya, Jawa Timur 60275
                  </p>
                </div>
              </div>

              <div className={`flex items-center space-x-4 rounded-2xl p-4 ${darkMode ? 'bg-slate-800/60' : 'bg-slate-50'}`}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ee944f]/15 text-xl text-[#ee944f]">✉️</div>
                <div>
                  <p className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email Resmi</p>
                  <p className={`text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    smpmudaprestasi@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* EMBED GOOGLE MAPS LOKASI SEKOLAH */}
          <motion.div
            className={`h-full min-h-[380px] w-full overflow-hidden rounded-[26px] border shadow-md transition-colors ${darkMode ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-slate-100'
              }`}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              title="Peta Lokasi SMP Muhammadiyah 2 Surabaya"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.84927954261!2d112.74138269999999!3d-7.2579887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f967c7f0eab9%3A0x32528eebe5e367c7!2sSMP%20Muhammadiyah%202%20Surabaya!5e0!3m2!1sid!2sid!4v1787024020689!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-[26px]"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#ee944f] py-8 text-center text-sm text-white">
        <p>© {new Date().getFullYear()} SMP MUHAMMADIYAH 2 SURABAYA. Hak Cipta Dilindungi Undang-Undang.</p>
      </footer>
    </div>
  );
}