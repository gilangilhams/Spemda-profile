import React, { useState, useRef } from 'react';

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // State & Ref untuk efek Hover Pill pada Navbar
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

  // Handler saat kursor mengarah ke menu
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

  // Handler saat kursor keluar dari area Navbar
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
    <div className="font-sans text-slate-800 min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.2),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(135deg,#eef6ff_0%,#f8faff_35%,#eef2ff_100%)]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="absolute right-[-6rem] top-40 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />
      </div>

      {/* 1. NAVBAR DENGAN SLIDING HOVER PILL */}
      <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent drop-shadow-sm">
              SMP MUHAMMADIYAH 2 SURABAYA
            </span>
          </div>

          {/* Container Menu Navigasi dengan Hover Pill */}
          <div
            ref={navRef}
            onMouseLeave={handleMouseLeave}
            className="relative hidden md:flex items-center rounded-2xl border border-white/60 bg-white/30 p-1.5 shadow-inner shadow-white/40 backdrop-blur-xl"
          >
            {/* Kapsul Background Meluncur */}
            <div
              className={`absolute top-0 left-0 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg shadow-blue-500/30 pointer-events-none ${isHovered
                ? 'transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]'
                : 'transition-opacity duration-200'
                }`}
              style={{
                width: pillStyle.width,
                height: pillStyle.height,
                transform: pillStyle.transform,
                opacity: pillStyle.opacity,
              }}
            />

            {/* Menu Links */}
            {navMenuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onMouseEnter={(e) => handleMouseEnter(e, index)}
                className={`relative z-10 font-bold text-sm px-6 py-2.5 rounded-xl transition-colors duration-200 ${activeHoverIndex === index ? 'text-white' : 'text-slate-700'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#kontak"
            className="hidden md:inline-block rounded-full border border-white/60 bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(59,130,246,0.4)] transition hover:scale-[1.02] hover:shadow-[0_12px_35px_rgba(79,70,229,0.45)]"
          >
            Hubungi Kami
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="beranda" className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mx-auto max-w-5xl rounded-[32px] border border-white/50 bg-white/25 p-8 shadow-[0_20px_80px_rgba(59,130,246,0.16)] backdrop-blur-xl md:p-12">
            <div className="text-center">
              <span className="inline-block rounded-full border border-blue-200/70 bg-white/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700 backdrop-blur-md">
                Solusi Transformasi Digital Education
              </span>
              <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
                Membangun Ekosistem Digital Berbasis Pembelajaran Modern
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-xl">
                Kami menghadirkan platform interaktif, pelatihan teknologi, dan infrastruktur digital terpadu untuk mendukung kemajuan pendidikan di Indonesia.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="#layanan"
                  className="group rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 font-semibold text-white shadow-[0_18px_35px_rgba(59,130,246,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(79,70,229,0.45)]"
                >
                  <span className="inline-flex items-center gap-2">
                    Lihat Layanan Kami
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </a>
                <a
                  href="#profil"
                  className="rounded-2xl border border-white/60 bg-white/30 px-8 py-3.5 font-semibold text-slate-700 shadow-[0_10px_30px_rgba(148,163,184,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/40"
                >
                  Pelajari Profil
                </a>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/60 bg-white/30 p-4 shadow-[0_15px_35px_rgba(148,163,184,0.12)] backdrop-blur-md">
                  <div className="text-2xl font-black text-blue-600">50+</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">Mitra</div>
                </div>
                <div className="rounded-2xl border border-white/60 bg-white/30 p-4 shadow-[0_15px_35px_rgba(148,163,184,0.12)] backdrop-blur-md">
                  <div className="text-2xl font-black text-indigo-600">10K+</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">Siswa</div>
                </div>
                <div className="rounded-2xl border border-white/60 bg-white/30 p-4 shadow-[0_15px_35px_rgba(148,163,184,0.12)] backdrop-blur-md">
                  <div className="text-2xl font-black text-violet-600">24/7</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROFIL PERUSAHAAN / INSTITUSI */}
      <section id="profil" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
<div className="rounded-[28px] border border-white/60 bg-white/20 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(59,130,246,0.14)]">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Tentang Kami</h2>
            <p className="mb-4 leading-relaxed text-slate-600">
              Berdiri sejak tahun 2020, kami berkomitmen untuk menjembatani kesenjangan teknologi dalam dunia pendidikan. Melalui pendekatan inovatif dan interaktif, kami membantu sekolah, guru, serta siswa menguasai keterampilan digital era masa kini.
            </p>
            <p className="mb-6 leading-relaxed text-slate-600">
              Fokus utama kami meliputi pengembangan materi berbasis logika pemrograman, komputasi terapan, serta otomatisasi alur kerja pembelajaran.
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-slate-200/80 pt-6">
              <div className="rounded-2xl border border-white/60 bg-white/30 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <p className="text-3xl font-extrabold text-blue-600">50+</p>
                <p className="text-sm font-medium text-slate-500">Sekolah Mitra</p>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/30 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <p className="text-3xl font-extrabold text-blue-600">10k+</p>
                <p className="text-sm font-medium text-slate-500">Siswa Terjangkau</p>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/40 bg-gradient-to-br from-blue-600/90 via-indigo-600/90 to-violet-600/90 p-8 text-white shadow-[0_25px_70px_rgba(79,70,229,0.35)] backdrop-blur-xl md:p-10">
            <h3 className="mb-4 text-2xl font-bold">Visi & Misi</h3>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-sm font-semibold text-blue-100">Visi</p>
                <p className="mt-1 text-sm leading-relaxed text-white/90">Menjadi penggerak utama transformasi digital pendidikan yang inklusif dan berkualitas tinggi.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-sm font-semibold text-blue-100">Misi Utama</p>
                <p className="mt-1 text-sm leading-relaxed text-white/90">Menyediakan platform belajar interaktif, modul kurikulum modern, serta pelatihan teknis terstruktur bagi pendidik.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LAYANAN UNGGULAN */}
      <section id="layanan" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Layanan Unggulan</h2>
            <p className="text-slate-600">Solusi terintegrasi yang dirancang khusus untuk kebutuhan digitalisasi lembaga pendidikan.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-[28px] border border-white/60 bg-white/25 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(59,130,246,0.12)]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 text-xl text-blue-600 shadow-inner shadow-white/50 transition-transform duration-300 group-hover:scale-110">
                💻
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Pengembangan LMS & Web</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Pembuatan platform manajemen pembelajaran (LMS) kustom dan situs profil lembaga yang cepat, aman, serta mudah dikelola.
              </p>
            </div>

            <div className="group rounded-[28px] border border-white/60 bg-white/25 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(99,102,241,0.12)]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-xl text-indigo-600 shadow-inner shadow-white/50 transition-transform duration-300 group-hover:scale-110">
                🚀
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Kurikulum Informatics</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Penyusunan alur materi Computational Thinking, dasar coding, hingga analisis data interaktif untuk jenjang sekolah.
              </p>
            </div>

            <div className="group rounded-[28px] border border-white/60 bg-white/25 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(16,185,129,0.12)]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-xl text-emerald-600 shadow-inner shadow-white/50 transition-transform duration-300 group-hover:scale-110">
                🛠️
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900">Infrastruktur & CBT</h3>
              <p className="text-sm leading-relaxed text-slate-600">
                Pembangunan jaringan Computer-Based Testing (CBT) berbasis Wi-Fi lokal yang dapat diakses siswa dengan lancar dan aman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT FORM */}
      <section id="kontak" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 rounded-[30px] border border-white/60 bg-white/20 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:grid-cols-2 md:p-12">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900">Hubungi Kami</h2>
            <p className="mb-8 leading-relaxed text-slate-600">
              Punya pertanyaan mengenai program atau ingin berkolaborasi? Isi formulir di samping atau hubungi kami melalui saluran berikut:
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 rounded-2xl border border-white/60 bg-white/30 p-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  📍
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Alamat Kantor</p>
                  <p className="text-sm font-semibold text-slate-800">Jl. Pendidikan No. 12, Surabaya, Jawa Timur</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 rounded-2xl border border-white/60 bg-white/30 p-3 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  ✉️
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Email Resmi</p>
                  <p className="text-sm font-semibold text-slate-800">kontak@edutech.sch.id</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 rounded-[26px] border border-white/60 bg-white/25 p-5 shadow-inner shadow-white/40 backdrop-blur-xl md:p-6">
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
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/50 bg-slate-900/80 py-8 text-center text-sm text-slate-300 backdrop-blur-md">
        <p>© {new Date().getFullYear()} SMP MUHAMMADIYAH 2 SURABAYA. Hak Cipta Dilindungi Undang-Undang.</p>
      </footer>

    </div>
  );
}