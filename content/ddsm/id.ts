import type { Dict } from "./types";

export const id: Dict = {
  locale: "id",
  htmlLang: "id-ID",
  langName: "Indonesia",
  flag: "🇮🇩",

  nav: [
    { label: "Kekayaan", slug: "wealth" },
    { label: "Emas Digital", slug: "digital-gold" },
    { label: "Emas Fisik", slug: "physical-gold" },
    { label: "Informasi", slug: "info" },
    { label: "Perusahaan", slug: "company" },
  ],

  common: {
    menu: "Menu",
    close: "Tutup",
    invest: "Mulai Investasi",
    explore: "Keamanan Brankas",
    contactUs: "Hubungi Kami",
    readMore: "Selengkapnya",
    langSwitchLabel: "Pilih bahasa",
    skipToContent: "Lompat ke konten utama",
  },

  home: {
    metaTitle: "DDSM — Emas fisik, dibuat sederhana",
    metaDescription:
      "Beli, simpan, jual, dan cetak emas bersertifikat 99,99% lewat satu platform. Harga transparan, penyimpanan terasuransi, penarikan fisik kapan pun.",
    hero: {
      eyebrow: "Emas yang nyata, bukan sekadar terlihat",
      title: "Dibangun untuk emas murni, diamankan untuk kamu",
      lead: "Penyimpanan emas batangan dan emas digital tepercaya, terlindungi dari ujung ke ujung.",
      primary: "Mulai Investasi",
      secondary: "Keamanan Brankas",
    },
    ticker: {
      date: "Kamis, 10 September 2026",
      label: "Harga Emas Hari Ini",
      buy: "Beli",
      sell: "Jual",
      buyDelta: "0,83%",
      sellDelta: "0,30%",
    },
    intro: {
      eyebrow: "Emas fisik teralokasi penuh & akses digital seketika",
      heading: "Emas fisik dan emas digital, mulus dalam satu genggaman",
      sideHeading: "Bangun fondasi keuangan yang lebih kuat. Mulai perjalanan menabung emas kamu hari ini.",
      body: "PT Datar Dana Sukses Makmur mengubah cara orang Indonesia mengakses dan mengelola emas. Sebagai platform perdagangan ritel digital, kami memadukan keandalan emas berkadar tinggi dengan keluwesan teknologi modern. Lewat satu platform terpadu, pelanggan bisa membeli, menabung, menjual, dan menarik emas secara nyaman, aman, dan transparan.",
    },
    pillars: [
      {
        title: "Emas fisik bersertifikat",
        desc: "Kemurnian terverifikasi dan kepemilikan fisik yang benar-benar atas nama kamu.",
      },
      {
        title: "Harga langsung dan terbuka",
        desc: "Harga emas bergerak real-time dengan rincian biaya yang ditampilkan sebelum konfirmasi.",
      },
      {
        title: "Berizin dan patuh",
        desc: "Mengikuti standar regulasi yang ketat, dengan perlindungan hukum atas kepemilikan kamu.",
      },
      {
        title: "Perlindungan aset warisan",
        desc: "Emas tersimpan aman dan bisa diwariskan tanpa proses yang berbelit.",
      },
    ],
    market: {
      eyebrow: "Harga berjalan",
      heading: "Ringkasan Pasar",
      lead: "Harga diperbarui sepanjang hari perdagangan. Kunci denominasi pilihan kamu kapan pun siap.",
      cols: ["Ukuran", "Harga Beli", "Harga Jual", "Stok"],
      available: "Tersedia",
    },
    contact: {
      eyebrow: "Hubungi kami",
      heading: "Kirim Pesan",
      lead: "Punya pertanyaan atau menemui kendala? Sampaikan lewat formulir ini. Kalau kamu menyampaikan keluhan, cantumkan nomor telepon dan email supaya kami bisa menindaklanjuti langsung.",
      fields: {
        name: "Nama lengkap*",
        namePh: "Masukkan nama lengkap kamu",
        email: "Email*",
        emailPh: "nama@email.com",
        phone: "Nomor telepon*",
        phonePh: "Masukkan nomor telepon kamu",
        category: "Kategori*",
        categoryPh: "Pilih kategori",
        message: "Pesan",
        messagePh: "Tulis pesan kamu",
        consent: "Saya menyetujui kebijakan privasi.",
        submit: "Kirim pesan",
      },
      categories: ["Pembelian emas", "Penyimpanan emas", "Bantuan akun", "Penarikan fisik", "Lainnya"],
    },
  },

  pages: {
    wealth: {
      eyebrow: "Kekayaan",
      title: "Menumbuhkan kekayaan, satu gram setiap kali",
      lead: "Program menabung emas yang dirancang untuk kebiasaan, bukan untuk menebak-nebak pasar.",
      metaTitle: "Kekayaan — Program menabung emas DDSM",
      metaDescription:
        "Tabungan emas berkala, panen emas bertenor, dan gadai kilat. Bangun kekayaan dalam gram, bukan sekadar rupiah.",
      intro: {
        heading: "Kekayaan dibangun dari kebiasaan, bukan keberuntungan",
        body: [
          "Menebak titik terendah harga emas adalah pekerjaan yang hampir mustahil dimenangkan secara konsisten. Yang bisa dikendalikan adalah keteraturan: menyisihkan porsi tetap setiap bulan, lalu membiarkan rata-rata harga beli bekerja untuk kamu.",
          "Semua program di halaman ini berdiri di atas satu prinsip yang sama — saldo kamu dihitung dalam gram. Ketika harga naik, nilai rupiahnya ikut naik; ketika turun, jumlah gram yang kamu kumpulkan justru bertambah lebih cepat.",
        ],
      },
      features: {
        heading: "Tiga cara menumbuhkan saldo",
        lead: "Bisa dijalankan bersamaan, dan semuanya tanpa biaya penyimpanan.",
        items: [
          {
            title: "Tabungan berkala",
            desc: "Atur pembelian otomatis harian, mingguan, atau bulanan mulai Rp 10.000. Harga beli kamu jadi rata-rata pasar, bukan hasil menebak.",
          },
          {
            title: "Panen emas",
            desc: "Titipkan saldo dalam tenor 3–12 bulan dan terima imbal hasil dalam gram. Yang bertambah jumlah logamnya, bukan cuma angka rupiahnya.",
          },
          {
            title: "Gadai kilat",
            desc: "Butuh dana mendesak tanpa melepas emas? Jaminkan saldo kamu, cair dalam hitungan menit, tanpa penalti kalau dilunasi lebih awal.",
          },
          {
            title: "Hadiah emas",
            desc: "Kirim gram ke sesama pengguna lewat nomor ponsel. Tercatat di mutasi kedua pihak, tanpa biaya transfer.",
          },
        ],
      },
      steps: {
        heading: "Cara memulai",
        lead: "Dari daftar sampai gram pertama, biasanya kurang dari sepuluh menit.",
        items: [
          { title: "01 — Verifikasi identitas", desc: "Siapkan KTP dan swafoto. Proses pemeriksaan rata-rata tiga menit." },
          { title: "02 — Tentukan porsi", desc: "Pilih nominal dan ritme yang realistis buat arus kas kamu, bukan yang paling besar." },
          { title: "03 — Aktifkan otomatis", desc: "Sambungkan sumber dana, lalu biarkan sistem yang menjaga konsistensinya." },
          { title: "04 — Tinjau tiap kuartal", desc: "Periksa jumlah gram, bukan nilai hariannya. Itu ukuran yang benar untuk tabungan emas." },
        ],
      },
      faq: {
        heading: "Pertanyaan seputar program",
        items: [
          {
            q: "Apakah ada biaya penyimpanan untuk saldo emas?",
            a: "Tidak ada. Saldo emas kamu tidak dikenai biaya penyimpanan bulanan maupun tahunan, berapa pun jumlah gramnya dan berapa lama pun disimpan.",
          },
          {
            q: "Berapa minimum untuk mulai menabung?",
            a: "Pembelian dimulai dari Rp 10.000, dan tidak ada biaya buka rekening. Kamu bisa menaikkan atau menurunkan porsi kapan saja tanpa penalti.",
          },
          {
            q: "Apakah imbal hasil panen emas dijamin?",
            a: "Imbal hasil panen emas mengikuti tenor yang disepakati di awal dan dibayarkan dalam gram. Nilai rupiahnya tetap mengikuti harga pasar pada saat pencairan, jadi jumlah gramnya yang pasti, bukan nilai rupiahnya.",
          },
          {
            q: "Bisakah saya berhenti kapan saja?",
            a: "Bisa. Tabungan berkala dapat dijeda atau dihentikan kapan saja lewat aplikasi, dan saldo yang sudah terkumpul tetap menjadi milik kamu sepenuhnya.",
          },
        ],
      },
    },

    "digital-gold": {
      eyebrow: "Emas Digital",
      title: "Kecepatan digital, dijamin logam sungguhan",
      lead: "Beli, jual, dan pindahkan emas dalam hitungan detik — setiap gramnya tetap berdiri di atas batangan fisik.",
      metaTitle: "Emas Digital — Beli dan jual emas 24 jam di DDSM",
      metaDescription:
        "Transaksi emas digital 24 jam dengan harga acuan berjalan, spread transparan, dan setiap gram dijamin batangan fisik di brankas.",
      intro: {
        heading: "Bukan derivatif, bukan klaim kertas",
        body: [
          "Emas digital sering disalahpahami sebagai kontrak atau janji nilai. Di DDSM tidak begitu. Setiap gram yang tercatat di akun kamu punya padanan fisik berupa batangan bersertifikat yang tersimpan di brankas pihak ketiga.",
          "Artinya kamu mendapat kemudahan transaksi digital — instan, 24 jam, pecahan sekecil apa pun — tanpa kehilangan hal yang membuat emas bernilai sejak awal: logamnya benar-benar ada dan bisa kamu tarik.",
        ],
      },
      features: {
        heading: "Yang bisa kamu lakukan",
        lead: "Semuanya dari satu saldo yang sama.",
        items: [
          {
            title: "Order pasar 24 jam",
            desc: "Beli dan jual kapan saja pada harga acuan berjalan. Spread ditampilkan sebelum kamu menekan konfirmasi.",
          },
          {
            title: "Pecahan sekecil apa pun",
            desc: "Tidak perlu menunggu terkumpul satu gram. Transaksi bisa dilakukan sampai empat angka di belakang koma.",
          },
          {
            title: "Transfer antarpengguna",
            desc: "Kirim gram lewat nomor ponsel, tanpa biaya, dan tercatat rapi di mutasi kedua belah pihak.",
          },
          {
            title: "Tarik jadi fisik",
            desc: "Saldo digital bisa ditukar jadi batangan atau koin kapan pun, lalu diantar berasuransi.",
          },
        ],
      },
      steps: {
        heading: "Bagaimana harga dibentuk",
        lead: "Tidak ada angka yang muncul begitu saja — ini rantainya.",
        items: [
          { title: "01 — Harga spot global", desc: "Acuan diambil dari pasar spot internasional yang bergerak sepanjang hari." },
          { title: "02 — Kurs tengah", desc: "Dikonversi ke rupiah memakai kurs tengah Bank Indonesia." },
          { title: "03 — Spread beli–jual", desc: "Selisih beli dan jual ditampilkan terbuka sebelum konfirmasi, bukan disembunyikan di dalam harga." },
          { title: "04 — Harga final", desc: "Angka yang kamu lihat saat konfirmasi adalah angka yang dieksekusi." },
        ],
      },
      faq: {
        heading: "Pertanyaan seputar emas digital",
        items: [
          {
            q: "Apa bedanya emas digital dengan menabung emas biasa?",
            a: "Secara kepemilikan tidak berbeda — keduanya berupa emas fisik yang tersimpan atas nama kamu. Yang berbeda hanya cara mengaksesnya: emas digital bisa dibeli, dijual, dan dipindahkan lewat aplikasi tanpa perlu memindahkan logamnya secara fisik.",
          },
          {
            q: "Berapa spread beli dan jual?",
            a: "Spread berada di kisaran 2,8% dan selalu ditampilkan sebelum kamu mengonfirmasi transaksi. Tidak ada biaya tersembunyi yang disisipkan ke dalam harga.",
          },
          {
            q: "Apakah harga berubah setelah saya konfirmasi?",
            a: "Tidak. Harga dikunci pada saat konfirmasi, jadi angka yang kamu setujui adalah angka yang dieksekusi meski pasar bergerak sesaat kemudian.",
          },
          {
            q: "Bagaimana kalau aplikasi sedang gangguan?",
            a: "Saldo emas kamu tercatat di sistem pembukuan yang terpisah dari aplikasi dan tetap utuh. Transaksi bisa dilanjutkan setelah layanan pulih, dan riwayatnya tidak berubah.",
          },
        ],
      },
    },

    "physical-gold": {
      eyebrow: "Emas Fisik",
      title: "Emas yang bisa kamu genggam",
      lead: "Batangan, koin, dan perhiasan bersertifikat — dicetak atas permintaan, diantar berasuransi.",
      metaTitle: "Emas Fisik — Batangan, koin, dan perhiasan bersertifikat",
      metaDescription:
        "Tukar saldo digital jadi logam mulia 99,99%, koin emas, atau perhiasan bersertifikat. Diantar berasuransi ke seluruh Indonesia.",
      intro: {
        heading: "Dari saldo ke logam, kapan pun kamu mau",
        body: [
          "Emas digital memudahkan transaksi, tapi sebagian orang tetap ingin memegang logamnya. Keduanya tidak harus dipilih salah satu — saldo di aplikasi bisa ditukar menjadi bentuk fisik kapan pun tanpa perlu menjual dulu.",
          "Setiap keping yang kami kirim datang dengan sertifikat kadar dan berat, dikemas tersegel, dan diasuransikan sepanjang perjalanan sampai diterima di alamat kamu.",
        ],
      },
      features: {
        heading: "Pilihan bentuk",
        lead: "Semua bersertifikat dan bisa dibeli kembali kapan saja.",
        items: [
          {
            title: "Logam mulia",
            desc: "Batangan bersertifikat dari 0,5 gram sampai 1 kilogram. Tersedia varian Antam, UBS, dan Galeri 24.",
          },
          {
            title: "Koin emas",
            desc: "Seri Nusantara, edisi Lunar tahunan, dan cetakan khusus dari 1 sampai 10 gram.",
          },
          {
            title: "Perhiasan",
            desc: "Kalung, cincin, dan gelang 17K hingga 24K, lengkap dengan sertifikat kadar dan berat.",
          },
          {
            title: "Buyback",
            desc: "Semua produk fisik kami bisa dijual kembali pada harga buyback hari itu, tanpa perlu negosiasi.",
          },
        ],
      },
      steps: {
        heading: "Proses penarikan fisik",
        lead: "Dari permintaan sampai di tangan kamu.",
        items: [
          { title: "01 — Pilih bentuk", desc: "Tentukan jenis, kadar, dan pecahan yang mau dicetak dari saldo emas kamu." },
          { title: "02 — Verifikasi", desc: "Konfirmasi alamat pengiriman dan identitas penerima demi keamanan kiriman." },
          { title: "03 — Pencetakan", desc: "Logam disiapkan dan disegel bersama sertifikat kadar dan beratnya." },
          { title: "04 — Pengiriman berasuransi", desc: "Dikirim dengan asuransi nilai penuh dan bisa dilacak sampai diterima." },
        ],
      },
      faq: {
        heading: "Pertanyaan seputar emas fisik",
        items: [
          {
            q: "Berapa lama proses penarikan fisik?",
            a: "Untuk pecahan yang tersedia di stok, penyiapan memakan waktu satu sampai tiga hari kerja, ditambah waktu pengiriman sesuai wilayah tujuan.",
          },
          {
            q: "Apakah ada biaya cetak?",
            a: "Ada biaya cetak dan kirim yang besarnya bergantung pada pecahan dan tujuan pengiriman. Rinciannya ditampilkan sebelum kamu mengonfirmasi permintaan.",
          },
          {
            q: "Bagaimana kalau kiriman rusak atau hilang?",
            a: "Setiap kiriman diasuransikan pada nilai penuh. Kalau terjadi kerusakan atau kehilangan dalam perjalanan, penggantian diproses tanpa membebani kamu.",
          },
          {
            q: "Apakah emas dari luar DDSM bisa dijual ke sini?",
            a: "Buyback diprioritaskan untuk produk bersertifikat yang kami terbitkan. Untuk produk lain, diperlukan pemeriksaan kadar terlebih dahulu dan harganya menyesuaikan hasil pemeriksaan.",
          },
        ],
      },
    },

    info: {
      eyebrow: "Informasi",
      title: "Paham dulu, baru beli",
      lead: "Panduan, penjelasan biaya, dan kabar pasar — ditulis untuk dibaca, bukan untuk menakut-nakuti.",
      metaTitle: "Informasi — Panduan dan edukasi emas DDSM",
      metaDescription:
        "Panduan menabung emas, penjelasan spread dan biaya, serta kabar pasar. Sumber belajar sebelum kamu membeli gram pertama.",
      intro: {
        heading: "Keputusan yang baik butuh angka yang jelas",
        body: [
          "Emas sering dijual dengan cerita, padahal yang menentukan hasil justru hal-hal membosankan: berapa spread-nya, berapa biaya cetaknya, dan seberapa disiplin kamu menabung.",
          "Halaman ini kami isi dengan hal-hal membosankan itu. Tidak ada janji imbal hasil, tidak ada dorongan untuk buru-buru — hanya penjelasan yang bisa kamu bandingkan dengan penyedia lain.",
        ],
      },
      features: {
        heading: "Yang perlu kamu tahu sebelum membeli",
        lead: "Empat hal yang paling sering terlewat.",
        items: [
          {
            title: "Spread bukan biaya tersembunyi",
            desc: "Selisih harga beli dan jual adalah biaya nyata. Kalau kamu beli lalu langsung jual, selisih itulah kerugiannya. Pastikan angkanya kamu lihat sebelum konfirmasi.",
          },
          {
            title: "Emas itu penyeimbang, bukan mesin cepat kaya",
            desc: "Perannya menjaga daya beli dalam jangka panjang. Menaruh seluruh dana darurat di emas justru mengurangi keluwesan keuangan kamu.",
          },
          {
            title: "Biaya cetak berlaku saat menarik fisik",
            desc: "Menyimpan dalam bentuk digital tidak dikenai biaya, tapi mencetaknya jadi batangan atau koin ada ongkosnya. Hitung ini sejak awal.",
          },
          {
            title: "Periksa legalitas penyedia",
            desc: "Pastikan penyedia terdaftar dan cadangannya diaudit pihak independen. Nomor izin dan laporan audit seharusnya bisa kamu akses tanpa harus meminta.",
          },
        ],
      },
      steps: {
        heading: "Kabar dan pembaruan",
        lead: "Ringkasan terbaru dari tim kami.",
        items: [
          { title: "10 Sep 2026 — Harga", desc: "Emas 24 karat menguat 0,83% ke Rp 2.810.000 per gram seiring pelemahan indeks dolar." },
          { title: "07 Sep 2026 — Layanan", desc: "Penarikan fisik pecahan 25 gram dan 50 gram kembali tersedia untuk seluruh wilayah pengiriman." },
          { title: "02 Sep 2026 — Edukasi", desc: "Panduan baru: menghitung porsi menabung emas dari gaji bulanan tanpa mengganggu dana darurat." },
          { title: "28 Agu 2026 — Kepatuhan", desc: "Laporan audit cadangan kuartal kedua 2026 telah diterbitkan dan dapat diunduh publik." },
        ],
      },
      faq: {
        heading: "Pertanyaan yang paling sering masuk",
        items: [
          {
            q: "Kapan waktu terbaik membeli emas?",
            a: "Tidak ada yang bisa menjawabnya dengan pasti, termasuk kami. Yang secara historis lebih bisa diandalkan adalah membeli secara berkala dalam porsi tetap, sehingga harga beli kamu mendekati rata-rata pasar.",
          },
          {
            q: "Berapa persen kekayaan yang sebaiknya di emas?",
            a: "Kami tidak memberikan saran investasi. Sebagai gambaran umum, banyak perencana keuangan menempatkan emas sebagai porsi penyeimbang, bukan porsi utama. Sesuaikan dengan tujuan dan jangka waktu kamu sendiri.",
          },
          {
            q: "Apakah harga di DDSM sama dengan harga Antam?",
            a: "Tidak selalu. Harga acuan digital kami mengikuti pasar spot dan kurs tengah, sedangkan harga batangan bermerek mengikuti kebijakan produsennya masing-masing. Keduanya kami tampilkan terpisah agar bisa dibandingkan.",
          },
          {
            q: "Di mana saya bisa melihat laporan audit?",
            a: "Laporan audit cadangan diterbitkan tiap kuartal dan dapat diakses dari halaman Perusahaan tanpa perlu login.",
          },
        ],
      },
    },

    company: {
      eyebrow: "Perusahaan",
      title: "Siapa di balik DDSM",
      lead: "PT Datar Dana Sukses Makmur — perizinan, tata kelola, dan cara kami menjaga emas kamu.",
      metaTitle: "Perusahaan — Tentang PT Datar Dana Sukses Makmur",
      metaDescription:
        "Profil, perizinan, tata kelola, dan standar keamanan PT Datar Dana Sukses Makmur, penyelenggara perdagangan emas digital DDSM.",
      intro: {
        heading: "Emas kamu bisa dihitung, bukan sekadar dijanjikan",
        body: [
          "Kepercayaan dalam bisnis emas tidak dibangun lewat slogan, melainkan lewat hal yang bisa diperiksa: nomor izin yang bisa dicek, cadangan yang diaudit pihak ketiga, dan brankas yang terasuransi.",
          "Semua itu kami buka di halaman ini. Kalau ada yang tidak bisa kami buktikan, kami tidak mencantumkannya.",
        ],
      },
      features: {
        heading: "Perizinan dan kepatuhan",
        lead: "Bisa diverifikasi secara mandiri.",
        items: [
          { title: "Izin pedagang emas digital", desc: "Terdaftar dan diawasi sesuai ketentuan perdagangan emas fisik digital yang berlaku." },
          { title: "Keanggotaan bursa & kliring", desc: "Terhubung dengan bursa berjangka dan lembaga kliring untuk penyelesaian transaksi." },
          { title: "Sertifikasi keamanan informasi", desc: "Sistem manajemen keamanan informasi mengikuti standar ISO/IEC 27001:2022." },
          { title: "Audit cadangan berkala", desc: "Cadangan emas diperiksa kantor akuntan publik independen setiap kuartal." },
          { title: "Asuransi brankas", desc: "Seluruh simpanan diasuransikan all-risk pada nilai penuh." },
          { title: "Penyimpanan pihak ketiga", desc: "Logam disimpan di brankas pihak ketiga di Jakarta, terpisah dari aset perusahaan." },
        ],
      },
      steps: {
        heading: "Tata kelola",
        lead: "Bagaimana keputusan diambil dan diawasi.",
        items: [
          { title: "Pemisahan aset", desc: "Aset pelanggan dicatat dan disimpan terpisah dari aset operasional perusahaan." },
          { title: "Rekonsiliasi harian", desc: "Saldo pembukuan dicocokkan dengan catatan brankas setiap hari kerja." },
          { title: "Kanal whistleblowing", desc: "Laporan dugaan pelanggaran dapat disampaikan secara anonim dan ditangani unit independen." },
          { title: "Perlindungan konsumen", desc: "Keluhan yang tidak selesai di kanal kami dapat diteruskan ke lembaga perlindungan konsumen." },
        ],
      },
      faq: {
        heading: "Pertanyaan tentang perusahaan",
        items: [
          {
            q: "Apa yang terjadi pada emas saya kalau DDSM berhenti beroperasi?",
            a: "Emas pelanggan dicatat dan disimpan terpisah dari aset perusahaan, sehingga tidak menjadi bagian dari harta perusahaan. Dalam skenario penghentian layanan, saldo dikembalikan kepada pemiliknya sesuai catatan kepemilikan dan hasil rekonsiliasi.",
          },
          {
            q: "Siapa yang mengaudit cadangan emas?",
            a: "Pemeriksaan dilakukan oleh kantor akuntan publik independen setiap kuartal, dan ringkasan hasilnya diterbitkan untuk publik.",
          },
          {
            q: "Bagaimana cara menyampaikan keluhan?",
            a: "Gunakan formulir di halaman utama, email resmi, atau layanan telepon kami. Sertakan nomor telepon dan email agar tindak lanjut bisa dilakukan langsung.",
          },
          {
            q: "Apakah data pribadi saya aman?",
            a: "Sistem kami mengikuti standar ISO/IEC 27001:2022 untuk manajemen keamanan informasi, dan data pribadi hanya digunakan sesuai kebijakan privasi yang berlaku.",
          },
        ],
      },
    },
  },

  cta: {
    heading: "Mulai gram pertama kamu hari ini",
    body: "Verifikasi identitas sekitar tiga menit. Tanpa biaya buka rekening, tanpa biaya penyimpanan.",
    primary: "Mulai Investasi",
    secondary: "Hubungi Kami",
  },

  footer: {
    address: "Plaza Merdeka Lt. 5, Jl. Merdeka Raya, Kuningan City, Jakarta.",
    hours: "Senin–Jumat, 09.00–17.00 WIB.",
    email: "hello@ddsm.co.id",
    phone: "Voice Call 14045",
    disclaimer:
      "PT Datar Dana Sukses Makmur adalah perusahaan yang bergerak di bidang perdagangan emas digital dan layanan terkait. Informasi pada halaman ini bersifat demonstrasi dan bukan merupakan penawaran, rekomendasi, atau saran investasi.",
    rights: "© 2026 PT Datar Dana Sukses Makmur.",
    legal: ["Privasi", "Syarat & Ketentuan", "Aksesibilitas"],
  },
};
