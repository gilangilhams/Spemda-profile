import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoSekolah from './assets/logo.png';

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

// 2. Variants Framer Motion untuk Efek Slide Kanan-Kiri
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
  // Hero Slider State
  const [[page, direction], setPage] = useState([0, 0]);

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
    <div className="min-h-screen font-sans text-slate-800">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3">
            <img
              src={logoSekolah}
              alt="Logo SMP Muhammadiyah 2"
              className="h-10 w-auto object-contain"
            />
            <span className="font-axiforma text-lg md:text-xl font-bold tracking-wide text-slate-900">
              SMP MUHAMMADIYAH 2 SURABAYA
            </span>
          </div>


          <div
            ref={navRef}
            onMouseLeave={handleMouseLeave}
            className="relative hidden items-center rounded-2xl border border-white/60 bg-white/30 p-1.5 shadow-inner shadow-white/40 backdrop-blur-xl md:flex"
          >
            <div
              className={`pointer-events-none absolute left-0 top-0 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg shadow-blue-500/30 ${isHovered ? 'transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]' : 'transition-opacity duration-200'
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
            className="hidden rounded-full border border-white/60 bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(59,130,246,0.4)] transition hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(79,70,229,0.45)] md:inline-block"
          >
            Hubungi Kami
          </a>
        </div>
      </nav>

      {/* HERO SLIDER SECTION */}
      <section id="beranda" className="relative w-full h-[85vh] min-h-[550px] overflow-hidden bg-slate-900 text-white">
        {/* ANIMATED SLIDER BACKGROUND */}
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

        {/* OVERLAY CONTENT */}
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
                <span className="inline-block bg-blue-600/90 text-white backdrop-blur-md font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-4 border border-blue-400/30">
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
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5"
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

        {/* NAVIGATION BUTTONS */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/40 hover:bg-blue-600/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition hover:scale-110 active:scale-95"
          aria-label="Previous Slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-slate-900/40 hover:bg-blue-600/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition hover:scale-110 active:scale-95"
          aria-label="Next Slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* PAGINATION DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
          {slidesData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const dir = index > slideIndex ? 1 : -1;
                setPage([index, dir]);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${index === slideIndex
                ? 'w-8 bg-blue-500'
                : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* PROFIL SECTION */}
      <section id="profil" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            className="rounded-[28px] border border-white/60 bg-white/20 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(59,130,246,0.14)] md:p-10"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Tentang Kami</h2>
            <p className="mb-4 leading-relaxed text-slate-600">
              Berdiri sejak tahun 2020, kami berkomitmen untuk menjembatani kesenjangan teknologi dalam dunia pendidikan. Melalui pendekatan inovatif dan interaktif, kami membantu sekolah, guru, serta siswa menguasai keterampilan digital era masa kini.
            </p>
            <p className="mb-6 leading-relaxed text-slate-600">
              Fokus utama kami meliputi pengembangan materi berbasis logika pemrograman, komputasi terapan, serta otomatisasi alur kerja pembelajaran.
            </p>
          </motion.div>

          <motion.div
            className="rounded-[30px] border border-white/40 bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-violet-600/90 p-8 text-white shadow-[0_25px_70px_rgba(79,70,229,0.35)] backdrop-blur-xl md:p-10"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-4 text-2xl font-bold">Visi & Misi</h3>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-sm font-semibold text-blue-100">Visi</p>
                <p className="mt-1 text-sm leading-relaxed text-white/90">
                  Menjadi penggerak utama transformasi digital pendidikan yang inklusif dan berkualitas tinggi.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-sm font-semibold text-blue-100">Misi Utama</p>
                <p className="mt-1 text-sm leading-relaxed text-white/90">
                  Menyediakan platform belajar interaktif, modul kurikulum modern, serta pelatihan teknis terstruktur bagi pendidik.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LAYANAN SECTION */}
      <section id="layanan" className="py-20 bg-gradient-to-b from-white to-slate-50">
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
                className="group rounded-[28px] border border-white/60 bg-white/25 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(59,130,246,0.12)]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: service.delay }}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-xl text-blue-600 shadow-inner shadow-white/50 transition-transform duration-300 group-hover:scale-110">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAK SECTION */}
      <section id="kontak" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 rounded-[30px] border border-white/60 bg-white/20 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:grid-cols-2 md:p-12">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Hubungi Kami</h2>
            <p className="mb-8 leading-relaxed text-slate-600">
              Punya pertanyaan mengenai program atau ingin berkolaborasi? Isi formulir di samping atau hubungi kami melalui saluran berikut:
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 rounded-2xl border border-white/60 bg-white/30 p-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">📍</div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Alamat Kantor</p>
                  <p className="text-sm font-semibold text-slate-800">Jl. Pendidikan No. 12, Surabaya, Jawa Timur</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 rounded-2xl border border-white/60 bg-white/30 p-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">✉️</div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Email Resmi</p>
                  <p className="text-sm font-semibold text-slate-800">kontak@edutech.sch.id</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-[26px] border border-white/60 bg-white/25 p-5 shadow-inner shadow-white/40 backdrop-blur-xl md:p-6"
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
                className="w-full rounded-xl border border-white/70 bg-white/60 px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
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
                className="w-full rounded-xl border border-white/70 bg-white/60 px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
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
                className="w-full rounded-xl border border-white/70 bg-white/60 px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-[0_18px_35px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(79,70,229,0.45)]"
            >
              Kirim Pesan
            </button>
          </motion.form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/50 bg-slate-900/80 py-8 text-center text-sm text-slate-300 backdrop-blur-md">
        <p>© {new Date().getFullYear()} SMP MUHAMMADIYAH 2 SURABAYA. Hak Cipta Dilindungi Undang-Undang.</p>
      </footer>
    </div>
  );
}