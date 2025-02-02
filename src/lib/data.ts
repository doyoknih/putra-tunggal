// highligh
import highlightIMG from "@/assets/Higlight1.svg";
import highlightIMG2 from "@/assets/Highlight2.svg";
import art1IMG from "@/assets/Art1.jpg";
import art2IMG from "@/assets/Art2.jpg";
import art3IMG from "@/assets/Art3.jpg";

// service
import kpIMG from "@/assets/KonsultasiPsikologi.jpg";
import ajIMG from "@/assets/analisisjabatan.jpg";
import taIMG from "@/assets/terapianak.jpg";
import tkIMG from "@/assets/teskesehatan.jpg";
import tmIMG from "@/assets/tesminat.jpg";
import tpIMG from "@/assets/tespenjurusan.jpg";

// psikolog
import dewiIMG from "@/assets/dewi.jpg";
import fathurakmanIMG from "@/assets/fathurakman.jpg";
import kurniasihIMG from "@/assets/kurniasih.jpg";
import rahmawatiIMG from "@/assets/rahmawati.jpg";
import suwartiIMG from "@/assets/suwarti.jpg";
import waraIMG from "@/assets/WARA1.jpg";
import psikologIMG from "@/assets/psikolog.jpg";
import alexanderIMG from "@/assets/Alexander.jpg";
import malikIMG from "@/assets/Malik.jpg";
import rispoIMG from "@/assets/Rispo.jpg";
import vikoIMG from "@/assets/Viko.jpg";
import bambangIMG from "@/assets/Bambang.jpg";
import angelIMG from "@/assets/Angel.jpg";
import arlanIMG from "@/assets/Arlan.jpg";
import rusdianyahIMG from "@/assets/Rusdiansyah.jpg";

// article
import articleIMG from "@/assets/article.png";
import relatedArticleIMG from "@/assets/related_article.png";

const dataBanner = [
  {
    title: "Bagikan ceritamu, Dapatkan dukungan",
    desc: "Biro Psikologi Putra Tunggal menyediakan forum konsultasi online yang berfokus pada kesehatan mental",
    image: highlightIMG,
    button: "Chat Sekarang",
    link: "service",
  },
  {
    title: "Konsultasi dengan Psikolog ahli",
    desc: "Berbincang lebih dekat tentang keluhan kepada dokter / psikiater ahli dibidangnya",
    image: highlightIMG2,
    button: "Buat Janji Sekarang",
    link: "buat_janji",
  },
];

const dataServices = [
  {
    img: kpIMG,
    title: "KONSULTASI PSIKOLOGI",
    desc: "Jaga kesehatan mentalmu, yuk konsultasi dengan psikolog untuk hidup yang lebih bahagia dan seimbang!",
  },
  {
    img: tkIMG,
    title: "TES KESEHATAN PSIKOLOGI",
    desc: "Ingin lebih mengenal dirimu? Yuk, ikut tes psikologi untuk memahami potensi dan kepribadianmu lebih dalam!",
  },
  {
    img: tpIMG,
    title: "TES PENJURUSAN SEKOLAH",
    desc: "Bingung dalam milih jurusan? Temukan jurusan yang tepat untuk masa depanmu! Yuk, ikut tes penjurusan sekolah!",
  },
  {
    img: ajIMG,
    title: "ANALISIS JABATAN",
    desc: "Ayo, lakukan analisis jabatan untuk memahami peran dan tanggung jawabmu, serta tingkatkan kinerja!",
  }, 
  {
    img: taIMG,
    title: "TERAPI ANAK BERKEBUTUHAN",
    desc: "Dukung perkembangan anak dengan terapi yang dirancang khusus untuk memenuhi kebutuhannya!",
  },
  {
    img: tmIMG,
    title: "TES MINAT MASUK SEKOLAH DASAR",
    desc: "Ayo, ikuti tes online kepribadian dasar dan dapatkan pemahaman lebih tentang karakter dan bakatmu!",
  },
];

const dataFaq = [
  {
    question: "Perbedaan psikolog dan psikiater?",
    answer:
      "Psikolog itu seperti seorang pelatih pikiran. Mereka membantu kita mengatasi masalah sehari-hari dengan cara bicara. Psikiater itu seperti dokternya masalah pikiran yang lebih serius. Mereka bisa memberi obat dan terapi. Jadi, kalau kamu lagi sedih atau bingung, psikolog bisa bantu. Tapi kalau masalahnya lebih berat, psikiater yang lebih ahli.",
  },
  {
    question:
      "Apakah data yang diberikan pada terapis terjamin kerahasiaannya?",
    answer:
      "Terapis pada Psikologi Putra Tunggal sangat menghormati serta merahasiakan segala data dan informasi yang diterima dari pasien.",
  },
  {
    question: "Berapa kali saya harus melakukan konsultasi?",
    answer:
      "Tergantung dari kondisi anda, terapis akan melakukan observasi untuk melihat kondisi anda apakah memerlukan konsultasi intensif atau tidak. Contoh apabila anda membutuhkan pengawasan maka konsultasi bisa dilakukan 1-2x dalam satu minggu, apabila anda baik baik saja maka konsultasi bisa dilakukan saat anda sedang membutuhkan saja.",
  },
  {
    question: "Apakah saya perlu meminum obat?",
    answer:
      "Terapis tidak berhak memberikan obat, terapis hanya menyarankan dan memberikan rekomendasi untuk anda agar segera bertemu dengan psikiater apabila anda membutuhkannya, dapat dilihat dari hasil observasi konsultasi.",
  },
  {
    question: "Berapa biaya pelayanan di Psikologi Putra Tunggal?",
    answer:
      "Biaya konsultasi di Psikologi Putra Tunggal sangat fleksibel. Kami menawarkan berbagai paket layanan dengan harga mulai dari Rp 50.000,-. Harga dapat berbeda tergantung jenis tes, durasi sesi, dan jenis layanan yang Anda butuhkan. Untuk informasi lebih lanjut silahkan menuju halaman Layanan.",
  },
];

const biayaPelayanan = [
  {
    pelayanan: "Konsultasi",
    biaya: "Rp.125.000/Jam",
  },
  {
    pelayanan: "Tes Itelegensi (IQ) TK-SD-SMP-SMA",
    biaya: "Rp.200.000",
  },
  {
    pelayanan: "Tes Minat Bakat",
    biaya: "Rp.200.000",
  },
  {
    pelayanan:
      "Tes Lengkap TK-SD-SMP-SMA(Itelegensi,Minat Bakat, dan Kepribadian)",
    biaya: "Rp.300.000",
  },
  {
    pelayanan: "Tes Itelegensi kelompok TK-SMA (>15 anak)",
    biaya: "Rp.125.000/Jam",
  },
  {
    pelayanan: "Konsultasi",
    biaya: "Rp.50.000 - Rp.150.000",
  },
  {
    pelayanan: "Tes Psikotes untuk Industri dan Organisasi",
    biaya:
      "Rp.300.000 (1-20 Orang) / Rp.200.000-Rp.250.000 (21-50 Orang) / Rp.175.000-Rp.225.000 (51-100 orang)",
  },
  {
    pelayanan:
      "Tes Lengkap Psikotes dan Wawancara untuk Industri dan Oganisasi",
    biaya: "Rp.350.000 (Staff) / Rp.400.000 (SPV/Koor) / Rp.500.000 (Manager)",
  },
  {
    pelayanan: "Tes Calon Siswa LPK",
    biaya: "Rp.150.000",
  },
  {
    pelayanan: "Tes Calon Pekerja Migran Indonesia (CPMI) G TO G",
    biaya: "Rp.250.000",
  },
];

const carouselServices = [
  {
    image: art1IMG,
    desc: "Lakukan pencarian dokter atau pilih rekomendasi dokter terbaik, dan kirim permintaan untuk berbicara sesuai dengan kebutuhan dan keluhan kesehatanmu.",
  },
  {
    image: art2IMG,
    desc: "Tunggu dokter, Dokter akan menyetujui permintaan kamu",
  },
  {
    image: art3IMG,
    desc: "Bicara dengan dokter, Ketika kamu telah terhubung dengan dokter, silahkan jelaskan kondisi kamu dengan ternang dan jelas dengan  dokter.",
  },
];

const service = [
  {
    title: "Konsultasi dengan Dokter Ahli",
    desc: "Sekarang, kamu dapat berkonsultasi dengan psikolog secara online langsung dari website kami. Layanan kesehatan mental online kami menyediakan akses ke tim psikolog terkualifikasi yang siap membantu dengan berbagai aspek kesehatan mental Anda. Mulai dari konseling psikologis untuk keluhan emosional yang lebih ringan hingga layanan dari psikolog spesialis yang berpengalaman dalam kasus-kasus yang lebih kompleks. Tidak perlu menunggu hingga masalah mental memburuk, segera berkonsultasi dengan kami untuk mendapatkan bantuan profesional dan dukungan yang Anda butuhkan.",
  },
  {
    title: "Mengapa Pilih Konsultasi Dokter PsikoCare?",
    desc: "Sekarang, kamu dapat berkonsultasi dengan psikolog secara online langsung dari website kami. Layanan kesehatan mental online kami menyediakan akses ke tim psikolog terkualifikasi yang siap membantu dengan berbagai aspek kesehatan mental Anda. Mulai dari konseling psikologis untuk keluhan emosional yang lebih ringan hingga layanan dari psikolog spesialis yang berpengalaman dalam kasus-kasus yang lebih kompleks. Tidak perlu menunggu hingga masalah mental memburuk, segera berkonsultasi dengan kami untuk mendapatkan bantuan profesional dan dukungan yang Anda butuhkan.",
  },
];

const dataPsikolog = [
  {
    img: waraIMG,
    name: "Dr. Rr.Wara Setija Brawidjajani S.Psi.,Psikolog",
    job: "Psikiater Ahli",
    experience: 7,
    like: 100,
    cost: 50000,
  },
  {
    img: fathurakmanIMG,
    name: "Dr. Fathurokhman, S.Psi, M.I.Kom, M.Psi, Psikolog",
    job: "Psikolog Klinis",
    experience: 10,
    like: 100,
    cost: 60000,
  },
  {
    img: suwartiIMG,
    name: "Dr. Suwarti S.Psi.,M.Si.,Psikolog",
    job: "Psikolog Anak",
    experience: 5,
    like: 80,
    cost: 40000,
  },
  {
    img: kurniasihIMG,
    name: "Dr. Kurniasih Dwi Purwarti M.Psi.,Psikolog",
    job: "Psikoterapis",
    experience: 12,
    like: 100,
    cost: 55000,
  },
  {
    img: dewiIMG,
    name: "Dr. Dewi Rachmanningtyas, S.Psi.,Psikolog",
    job: "Konselor",
    experience: 8,
    like: 90,
    cost: 45000,
  },
  {
    img: rahmawatiIMG,
    name: "Dr. Rahmawati Wulan Sari M.Psi.,Psikolog",
    job: "Konselor",
    experience: 8,
    like: 90,
    cost: 45000,
  },
];

const dataTestmoni = [
  {
    review: "Sangat membantu! Saya merasa lebih tenang.",
    profile: alexanderIMG,
    name: "Alexander",
  },
  {
    review: "Konsultasi yang membuka wawasan. Terima kasih!",
    profile: bambangIMG,
    name: "Bambang",
  },
  {
    review: "Sesi yang penuh empati. Sangat bermanfaat!",
    profile: rusdianyahIMG,
    name: "Rusdiansyah",
  },
  {
    review: "Lebih percaya diri setelah berbicara di sini.",
    profile: angelIMG,
    name: "Angel",
  },
  {
    review: "Mendapat solusi praktis untuk kecemasan saya.",
    profile: malikIMG,
    name: "Malik",
  },
  {
    review: "Layanan yang profesional dan penuh perhatian.",
    profile: arlanIMG,
    name: "Arlan",
  },
  {
    review: "Sangat puas, perasaan saya lebih stabil.",
    profile: vikoIMG,
    name: "Viko",
  },
  {
    review: "Terasa ada perubahan positif setelah sesi.",
    profile: rispoIMG,
    name: "Rispo",
  },
];

const dataArticle1 = {
  title: "Pengertian Kesehatan Mental",
  desc: "Suatu konsep yang melampaui ranah emosi dan menjangkau aspek kejiwaan dan psikis individu, kini menjadi perhatian utama dalam ranah ilmiah. Para ahli kesehatan mental terus mengkaji hubungan kompleks antara peristiwa hidup dan dampaknya terhadap kesehatan mental. Penelitian menunjukkan bahwa peristiwa traumatis, seperti pelecehan, stres kronis, dan kekerasan, dapat meninggalkan jejak mendalam pada kepribadian dan perilaku individu. Dampak ini dapat bermanifestasi dalam bentuk gangguan kesehatan mental, yang ditandai dengan berbagai gejala dan perubahan pola pikir. Gangguan mental, seperti depresi, gangguan bipolar, kecemasan, PTSD, OCD, dan psikosis, tidak hanya memengaruhi kemampuan individu untuk menghadapi stres, berhubungan dengan orang lain, dan membuat keputusan, tetapi juga dapat memicu perilaku berbahaya, termasuk keinginan untuk menyakiti diri sendiri. Meskipun beberapa gangguan mental memiliki karakteristik umum, penting untuk diingat bahwa pengalaman setiap individu berbeda-beda. Gangguan mental tertentu, seperti postpartum depression, hanya menyerang kelompok tertentu, seperti ibu setelah melahirkan. Memahami kompleksitas kesehatan mental dan dampak peristiwa hidup merupakan langkah krusial dalam memajukan ilmu pengetahuan dan meningkatkan kualitas hidup. Penelitian lanjutan dan upaya edukasi perlu terus dilakukan untuk mendukung individu yang mengalami gangguan mental dan membangun masyarakat yang lebih suportif. Dengan menggabungkan pengetahuan ilmiah dan empati, kita dapat membantu individu untuk menjalani hidup yang lebih sehat dan bahagia.",
};

const dataArticle2 = {
  image: articleIMG,
  title:
    "Kata Psikolog, 3 Kebiasaan Pagi Ini Bisa Bikin Lebih Bahagia Setiap Hari",
  place: "Jakarta",
  date: "Kamis 19 September 2024",
  desc: "Suatu konsep yang melampaui ranah emosi dan menjangkau aspek kejiwaan dan psikis individu, kini menjadi perhatian utama dalam ranah ilmiah. Para ahli kesehatan mental terus mengkaji hubungan kompleks antara peristiwa hidup dan dampaknya terhadap kesehatan mental. Penelitian menunjukkan bahwa peristiwa traumatis, seperti pelecehan, stres kronis, dan kekerasan, dapat meninggalkan jejak mendalam pada kepribadian dan perilaku individu. Dampak ini dapat bermanifestasi dalam bentuk gangguan kesehatan mental, yang ditandai dengan berbagai gejala dan perubahan pola pikir. Gangguan mental, seperti depresi, gangguan bipolar, kecemasan, PTSD, OCD, dan psikosis, tidak hanya memengaruhi kemampuan individu untuk menghadapi stres, berhubungan dengan orang lain, dan membuat keputusan, tetapi juga dapat memicu perilaku berbahaya, termasuk keinginan untuk menyakiti diri sendiri. Meskipun beberapa gangguan mental memiliki karakteristik umum, penting untuk diingat bahwa pengalaman setiap individu berbeda-beda. Gangguan mental tertentu, seperti postpartum depression, hanya menyerang kelompok tertentu, seperti ibu setelah melahirkan. Memahami kompleksitas kesehatan mental dan dampak peristiwa hidup merupakan langkah krusial dalam memajukan ilmu pengetahuan dan meningkatkan kualitas hidup. Penelitian lanjutan dan upaya edukasi perlu terus dilakukan untuk mendukung individu yang mengalami gangguan mental dan membangun masyarakat yang lebih suportif. Dengan menggabungkan pengetahuan ilmiah dan empati, kita dapat membantu individu untuk menjalani hidup yang lebih sehat dan bahagia.",
};

const dataFaqArticle = [
  {
    question:
      "Apa saja tanda-tanda seseorang mengalami masalah kesehatan mental?",
    answer:
      "Tanda-tanda masalah kesehatan mental bisa bervariasi, tetapi beberapa yang umum meliputi: perubahan mood yang drastis, kesulitan berkonsentrasi, menarik diri dari sosial, perubahan pola tidur atau makan, perasaan cemas atau sedih yang berlebihan, serta pikiran untuk menyakiti diri sendiri.",
  },
  {
    question: "Bagaimana cara mengatasi gangguan kecemasan?",
    answer:
      "Berbicara dengan orang terdekat, Konsultasi dengan psikolog atau psikiater, Hubungi layanan kesehatan mental.",
  },
  {
    question:
      "Ke mana saya harus pergi jika saya merasa tidak baik secara mental?",
    answer:
      "Pengobatan gangguan kecemasan biasanya melibatkan kombinasi terapi dan obat-obatan. Terapi yang umum digunakan adalah terapi perilaku kognitif (CBT). Obat-obatan yang sering diresepkan adalah antidepresan dan obat penenang.",
  },
];

const dataRelatedArticle = [
  {
    img: relatedArticleIMG,
    title: "Mengapa Kita Bisa Tertawa Saat Merasa Takut? Ini Kata Sains",
    date: "30 Juni 2023",
  },
  {
    img: relatedArticleIMG,
    title: "Sampah Alun-alun Banyumas Capai Dua Dump Truk",
    date: "30 Juni 2023",
  },
  {
    img: relatedArticleIMG,
    title: "Apa Itu Flexing di Medsos? Pengertian dan Cara Menyikapinya",
    date: "30 Juni 2023",
  },
  {
    img: relatedArticleIMG,
    title: "Apa Itu Empati? Ini Perbedaannya dengan Simpati",
    date: "30 Juni 2023",
  },
  {
    img: relatedArticleIMG,
    title: "Mengapa Kita Bisa Tertawa Saat Merasa Takut? Ini Kata Sains",
    date: "30 Juni 2023",
  },
];

const dataHistoryChat = [
  {
    img: psikologIMG,
    name: "Dr. John Cena",
    chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  },
  {
    img: waraIMG,
    name: "Dr. Rr. Wara Setija Brawidjajani",
    chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  },
  {
    img: bambangIMG,
    name: "Dr. Ahmad Fadli",
    chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  },
  {
    img: vikoIMG,
    name: "Dra. Siti Nurjanah",
    chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  },
  {
    img: angelIMG,
    name: "Dr. Budi Santoso",
    chat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
  },
];

const dataHistoryInteraction = [
  {
    docterName: "Silvia Anastasi",
    service: "Online",
    date: "27 Oktober",
    time: "10",
  },
  {
    docterName: "Silvia Anastasi",
    service: "Offline",
    date: "27 Oktober",
    time: "10",
  },
];

export {
  dataBanner,
  dataServices,
  dataFaq,
  biayaPelayanan,
  carouselServices,
  service,
  dataPsikolog,
  dataTestmoni,
  dataArticle1,
  dataArticle2,
  dataFaqArticle,
  dataRelatedArticle,
  dataHistoryChat,
  dataHistoryInteraction,
};
