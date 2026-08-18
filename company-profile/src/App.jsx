import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import logoSekolah from './assets/logo.png';
import smp2sbyLogo from './assets/SMP2SBY.JPG';
import visiMisiImg from './assets/visi_misi.png';

// 1. Data Slider Kegiatan Sekolah
const slidesData = [
  {
    id: 1,
    badge: "Informatika & Pemrograman",
    title: "Pembelajaran Berbasis Computational Thinking & Web Development",
    description: "Siswa diajak mengeksplorasi dunia logika pemrograman, pembuatan web, dan teknologi digital interaktif sejak dini.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    badge: "Laboratorium & Sains",
    title: "Praktikum Interaktif & Eksperimen Sains Terapan",
    description: "Fasilitas laboratorium modern yang mendukung kegiatan ilmiah, observasi, dan pengujian konsep sains secara langsung.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    badge: "Ekstrakurikuler & Karakter",
    title: "Pengembangan Potensi, Kepemimpinan, dan Kreativitas",
    description: "Berbagai kegiatan ekstrakurikuler mulai dari HW, Robotik, Seni, hingga Olahraga untuk membentuk karakter siswa yang holistik.",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1600&auto=format&fit=crop",
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
  // Intro Splash Screen State
  const [isLoading, setIsLoading] = useState(true);

  // Hero Slider State
  const [[page, direction], setPage] = useState([0, 0]);

  // Preview Modal Visi Misi State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Scroll Adaptation State
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

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

  // Form & Navbar State
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const navRef = useRef(null);
  const [activeHoverIndex, setActiveHoverIndex] = useState(null);
  const [pillStyle, setPillStyle] = useState({
    width: 0,
    height: 0,
    transform: 'translate(0px, 0px)',
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const navMenuItems = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Profil', href: '#profil' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Kontak', href: '#kontak' },
  ];

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

  // Navbar Logic
  const handleMouseEnter = (e, index) => {
    if (!navRef.current) return;
    const itemRect = e.currentTarget.getBoundingClientRect();
    const containerRect = navRef.current.getBoundingClientRect();
    const left = itemRect.left - containerRect.left;
    const top = itemRect.top - containerRect.top;

    setPillStyle({
      width: `${itemRect.width}px`,
      height: `${itemRect.height}px`,
      transform: `translate(${left}px, ${top}px)`,
      opacity: 1,
    });

    setIsHovered(true);
    setActiveHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setActiveHoverIndex(null);
    setPillStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-white">

      {/* 0. INTRO SPLASH SCREEN DENGAN GAMBAR INTRO SMP2SBY.JPG & SMOOTH ZOOM */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="intro-splash"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 2.2, // Efek Zoom In Menembus Masuk ke Website
              transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white select-none"
          >
            {/* Animasi Zoom Bounce Logo SMP2SBY.JPG */}
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
              className="w-32 h-32 md:w-44 md:h-44 object-cover rounded-2xl mb-6 shadow-2xl border-2 border-white/20 drop-shadow-[0_0_35px_rgba(38,59,170,0.5)]"
            />

            {/* Teks Judul Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center px-4"
            >
              <h1 className="text-xl md:text-2xl font-bold tracking-widest font-axiforma text-[#ee944f] mb-2">
                SMP MUHAMMADIYAH 2 SURABAYA
              </h1>
              <p className="text-xs md:text-sm text-slate-300 font-medium tracking-wide">
                Membangun Ekosistem Digital Berbasis Pembelajaran Modern
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. NAVBAR (DOMINAN 60% PUTIH + AKSEN 10% ROYAL BLUE #263BAA) */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${isScrolled
          ? 'bg-white/95 border-slate-200/80 shadow-md backdrop-blur-xl'
          : 'bg-white/80 border-white/40 shadow-sm backdrop-blur-xl'
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
                color: isScrolled ? '#263BAA' : '#0f172a'
              }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="font-axiforma text-lg md:text-xl font-bold tracking-wide"
            >
              SMP MUHAMMADIYAH 2 SURABAYA
            </motion.span>
          </div>

          <div
            ref={navRef}
            onMouseLeave={handleMouseLeave}
            className="relative hidden items-center rounded-2xl border border-slate-200/60 bg-slate-50 p-1.5 backdrop-blur-xl md:flex"
          >
            <div
              className={`pointer-events-none absolute left-0 top-0 rounded-xl bg-[#263BAA] shadow-md shadow-[#263BAA]/30 ${isHovered ? 'transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]' : 'transition-opacity duration-200'
                }`}
              style={{
                width: pillStyle.width,
                height: pillStyle.height,
                transform: pillStyle.transform,
                opacity: pillStyle.opacity,
              }}
            />

            {navMenuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onMouseEnter={(e) => handleMouseEnter(e, index)}
                className={`relative z-10 rounded-xl px-6 py-2.5 text-sm font-bold transition-colors duration-200 ${activeHoverIndex === index ? 'text-white' : 'text-slate-700'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#kontak"
            className="hidden rounded-full bg-[#263BAA] hover:bg-[#1f308a] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#263BAA]/30 transition transform hover:scale-[1.02] md:inline-block"
          >
            Hubungi Kami
          </a>
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

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-end pb-20 md:justify-center md:pb-0">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block bg-[#ee944f] text-white font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-4 shadow-sm">
                  {currentSlide.badge}
                </span>

                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-md">
                  {currentSlide.title}
                </h1>

                <p className="text-base md:text-lg text-slate-200 mb-8 leading-relaxed max-w-2xl font-light">
                  {currentSlide.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a
                    href="#layanan"
                    className="bg-[#263BAA] hover:bg-[#1f308a] text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-[#263BAA]/30 transition transform hover:-translate-y-0.5"
                  >
                    Jelajahi Program
                  </a>
                  <a
                    href="#profil"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-semibold px-7 py-3.5 rounded-xl transition"
                  >
                    Profil Sekolah
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/40 hover:bg-[#ee944f] backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition hover:scale-110 active:scale-95"
          aria-label="Previous Slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/40 hover:bg-[#ee944f] backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition hover:scale-110 active:scale-95"
          aria-label="Next Slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Pagination Dots */}
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

      {/* 3. HERO BAR KECIL - INFINITE MARQUEE MITRA & INSTANSI */}
      <div className="w-full bg-slate-50 border-b border-slate-200/70 py-5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-3 flex items-center justify-center space-x-3">
          <div className="h-px bg-slate-200 flex-1 max-w-[80px] md:max-w-[150px]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#ee944f]">
            Kemitraan & Kolaborasi Strategis
          </span>
          <div className="h-px bg-slate-200 flex-1 max-w-[80px] md:max-w-[150px]" />
        </div>

        {/* Running Marquee Container */}
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
                className="flex items-center space-x-3 bg-white px-5 py-2.5 rounded-xl border border-slate-200/80 shadow-sm hover:border-[#263BAA] hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <span className="text-xl">{partner.icon}</span>
                <span className="text-sm font-bold text-slate-700">{partner.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 4. PROFIL SECTION (DENGAN GAMBAR VISI MISI CLICKABLE) */}
      <section id="profil" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Card 1: Tentang Kami */}
          <motion.div
            className="rounded-[28px] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/50 md:p-10"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-[#ee944f]">Tentang Kami</h2>
            <p className="mb-4 leading-relaxed text-slate-600">
              Berdiri sejak tahun 2020, kami berkomitmen untuk menjembatani kesenjangan teknologi dalam dunia pendidikan. Melalui pendekatan inovatif dan interaktif, kami membantu sekolah, guru, serta siswa menguasai keterampilan digital era masa kini.
            </p>
            <p className="mb-6 leading-relaxed text-slate-600">
              Fokus utama kami meliputi pengembangan materi berbasis logika pemrograman, komputasi terapan, serta otomatisasi alur kerja pembelajaran.
            </p>
          </motion.div>

          {/* Card 2: Gambar Visi & Misi Clickable */}
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
              {/* Overlay Hint saat Hover */}
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl backdrop-blur-[2px]">
                <span className="bg-white/95 text-slate-900 font-bold px-5 py-2.5 rounded-full text-xs shadow-lg transform -translate-y-1 group-hover:translate-y-0 transition-all">
                  🔍 Klik untuk Memperbesar
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL PREVIEW DENGAN ANIMASI SWEEP KE ATAS SAAT EXITED */}
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
                y: -350, // Animasi Sweep Ke Atas
                scale: 0.9,
                transition: { duration: 0.45, ease: [0.32, 0, 0.67, 0] }
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-3xl p-4 md:p-6 shadow-2xl border border-slate-100 overflow-hidden cursor-default flex flex-col items-center"
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
                <p className="text-xs font-semibold text-slate-500">
                  Klik di luar gambar atau tombol silang untuk keluar (Sweep Up Exit)
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. LAYANAN SECTION (AKSEN 10% ROYAL BLUE #263BAA) */}
      <section id="layanan" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Layanan Unggulan</h2>
            <p className="text-slate-600">Solusi terintegrasi yang dirancang khusus untuk kebutuhan digitalisasi lembaga pendidikan.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: '💻', title: 'Pengembangan LMS & Web', desc: 'Pembuatan platform manajemen pembelajaran (LMS) kustom dan situs profil lembaga yang cepat, aman, serta mudah dikelola.', delay: 0.1 },
              { icon: '🚀', title: 'Kurikulum Informatics', desc: 'Penyusunan alur materi Computational Thinking, dasar coding, hingga analisis data interaktif untuk jenjang sekolah.', delay: 0.2 },
              { icon: '🛠️', title: 'Infrastruktur & CBT', desc: 'Pembangunan jaringan Computer-Based Testing (CBT) berbasis Wi-Fi lokal yang dapat diakses siswa dengan lancar dan aman.', delay: 0.3 },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="group rounded-[28px] border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 hover:border-[#263BAA]/40"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: service.delay }}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#263BAA]/15 text-xl text-[#263BAA] transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. KONTAK SECTION (AKSEN 10% ROYAL BLUE #263BAA) */}
      <section id="kontak" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 rounded-[30px] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/60 md:grid-cols-2 md:p-12">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-[#ee944f]">Hubungi Kami</h2>
            <p className="mb-8 leading-relaxed text-slate-600">
              Punya pertanyaan mengenai program atau ingin berkolaborasi? Isi formulir di samping atau hubungi kami melalui saluran berikut:
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 rounded-2xl bg-slate-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ee944f]/15 text-[#ee944f]">📍</div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Alamat Kantor</p>
                  <p className="text-sm font-semibold text-slate-800">Jl. Pendidikan No. 12, Surabaya, Jawa Timur</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 rounded-2xl bg-slate-50 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ee944f]/15 text-[#ee944f]">✉️</div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Email Resmi</p>
                  <p className="text-sm font-semibold text-slate-800">kontak@edutech.sch.id</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-[26px] bg-slate-50 p-5 md:p-6"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                Pesan Anda berhasil terkirim! Tim kami akan segera menghubungi Anda.
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Nama Lengkap</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama Anda"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-[#263BAA] focus:ring-2 focus:ring-[#263BAA]/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Alamat Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nama@email.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-[#263BAA] focus:ring-2 focus:ring-[#263BAA]/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Pesan / Pertanyaan</label>
              <textarea
                rows="4"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tuliskan pesan Anda di sini..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-[#263BAA] focus:ring-2 focus:ring-[#263BAA]/20"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#263BAA] hover:bg-[#1f308a] py-3.5 font-semibold text-white shadow-lg shadow-[#263BAA]/30 transition hover:-translate-y-0.5"
            >
              Kirim Pesan
            </button>
          </motion.form>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-[#ee944f] py-8 text-center text-sm text-white">
        <p>© {new Date().getFullYear()} SMP MUHAMMADIYAH 2 SURABAYA. Hak Cipta Dilindungi Undang-Undang.</p>
      </footer>
    </div>
  );
}