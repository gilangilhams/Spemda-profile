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
    <div className="font-sans text-gray-800 bg-slate-50 min-h-screen">

      {/* 1. NAVBAR DENGAN SLIDING HOVER PILL */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SMP MUHAMMADIYAH 2 SURABAYA
            </span>
          </div>

          {/* Container Menu Navigasi dengan Hover Pill */}
          <div
            ref={navRef}
            onMouseLeave={handleMouseLeave}
            className="relative hidden md:flex items-center bg-gray-50/80 p-1.5 rounded-2xl border border-gray-100"
          >
            {/* Kapsul Background Meluncur */}
            <div
              className={`absolute top-0 left-0 bg-violet-600 rounded-xl pointer-events-none ${isHovered
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
                className={`relative z-10 font-bold text-sm px-6 py-2.5 rounded-xl transition-colors duration-200 ${activeHoverIndex === index ? 'text-white' : 'text-gray-700'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#kontak"
            className="hidden md:inline-block bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md hover:bg-blue-700 transition"
          >
            Hubungi Kami
          </a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="beranda" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-blue-100 text-blue-700 font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-6">
            Solusi Transformasi Digital Education
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Membangun Ekosistem Digital Berbasis Pembelajaran Modern
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Kami menghadirkan platform interaktif, pelatihan teknologi, dan infrastruktur digital terpadu untuk mendukung kemajuan pendidikan di Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#layanan"
              className="bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition"
            >
              Lihat Layanan Kami
            </a>
            <a
              href="#profil"
              className="bg-white text-gray-700 border border-gray-200 font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition"
            >
              Pelajari Profil
            </a>
          </div>
        </div>
      </section>

      {/* 3. PROFIL PERUSAHAAN / INSTITUSI */}
      <section id="profil" className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Tentang Kami</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Berdiri sejak tahun 2020, kami berkomitmen untuk menjembatani kesenjangan teknologi dalam dunia pendidikan. Melalui pendekatan inovatif dan interaktif, kami membantu sekolah, guru, serta siswa menguasai keterampilan digital era masa kini.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Fokus utama kami meliputi pengembangan materi berbasis logika pemrograman, komputasi terapan, serta otomatisasi alur kerja pembelajaran.
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
              <div>
                <p className="text-3xl font-extrabold text-blue-600">50+</p>
                <p className="text-sm text-gray-500 font-medium">Sekolah Mitra</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-blue-600">10k+</p>
                <p className="text-sm text-gray-500 font-medium">Siswa Terjangkau</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-8 rounded-3xl text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Visi & Misi</h3>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <p className="font-semibold text-blue-100 text-sm">Visi</p>
                <p className="text-sm mt-1">Menjadi penggerak utama transformasi digital pendidikan yang inklusif dan berkualitas tinggi.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <p className="font-semibold text-blue-100 text-sm">Misi Utama</p>
                <p className="text-sm mt-1">Menyediakan platform belajar interaktif, modul kurikulum modern, serta pelatihan teknis terstruktur bagi pendidik.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LAYANAN UNGGULAN */}
      <section id="layanan" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Layanan Unggulan</h2>
            <p className="text-gray-600">Solusi terintegrasi yang dirancang khusus untuk kebutuhan digitalisasi lembaga pendidikan.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">
                💻
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pengembangan LMS & Web</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pembuatan platform manajemen pembelajaran (LMS) kustom dan situs profil lembaga yang cepat, aman, serta mudah dikelola.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">
                🚀
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Kurikulum Informatics</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Penyusunan alur materi Computational Thinking, dasar coding, hingga analisis data interaktif untuk jenjang sekolah.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">
                🛠️
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Infrastruktur & CBT</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Pembangunan jaringan Computer-Based Testing (CBT) berbasis Wi-Fi lokal yang dapat diakses siswa dengan lancar dan aman.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT FORM */}
      <section id="kontak" className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Hubungi Kami</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Punya pertanyaan mengenai program atau ingin berkolaborasi? Isi formulir di samping atau hubungi kami melalui saluran berikut:
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                  📍
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Alamat Kantor</p>
                  <p className="text-sm font-semibold text-slate-800">Jl. Pendidikan No. 12, Surabaya, Jawa Timur</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                  ✉️
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email Resmi</p>
                  <p className="text-sm font-semibold text-slate-800">kontak@edutech.sch.id</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {submitted && (
              <div className="p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-sm font-medium">
                Pesan Anda berhasil terkirim! Tim kami akan segera menghubungi Anda.
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Alamat Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Pesan / Pertanyaan</label>
              <textarea
                rows="4"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tuliskan pesan Anda di sini..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-gray-400 py-8 border-t border-slate-800 text-center text-sm">
        <p>© {new Date().getFullYear()} SMP MUHAMMADIYAH 2 SURABAYA. Hak Cipta Dilindungi Undang-Undang.</p>
      </footer>

    </div>
  );
}