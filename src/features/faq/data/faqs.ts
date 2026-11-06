import type { FaqItem } from "@/types/domain";

export const faqs: FaqItem[] = [
  {
    id: "faq-01",
    question: "Bagaimana cara meminta appointment?",
    answer:
      "Pilih layanan, tanggal dan waktu preferensi, lalu isi data diri. Setelah ringkasan diperiksa, kamu akan diarahkan ke WhatsApp dengan pesan yang sudah terisi. Tim Maison Belle akan mengonfirmasi ketersediaan melalui WhatsApp.",
  },
  {
    id: "faq-02",
    question: "Apakah tanggal dan waktu yang saya pilih sudah pasti?",
    answer:
      "Belum. Tanggal dan waktu yang kamu pilih adalah preferensi. Ketersediaan baru dikonfirmasi oleh tim studio melalui WhatsApp.",
  },
  {
    id: "faq-03",
    question: "Bagaimana harga final ditentukan?",
    answer:
      "Layanan dengan label “Mulai dari” memiliki harga awal yang dapat berubah sesuai detail treatment. Harga final akan dikonfirmasi oleh studio sebelum appointment.",
    isPolicyDemo: true,
  },
  {
    id: "faq-04",
    question: "Apakah saya bisa memilih artist?",
    answer:
      "Untuk MVP ini, permintaan appointment belum memilih artist tertentu. Kamu dapat menyampaikan preferensi artist pada catatan, dan tim akan membantu menyesuaikannya.",
  },
  {
    id: "faq-05",
    question: "Apa yang perlu saya siapkan sebelum treatment?",
    answer:
      "Datang dengan waktu yang cukup, bawa referensi jika ada, dan sampaikan kondisi kulit, rambut, atau kuku yang perlu diketahui artist. Jika kamu memiliki alergi atau sensitivitas, tuliskan pada catatan.",
  },
  {
    id: "faq-06",
    question: "Bagaimana kebijakan pembatalan?",
    answer:
      "Kebijakan pembatalan belum ditetapkan untuk brand demo ini. Untuk kebutuhan nyata, hubungi studio melalui WhatsApp sesegera mungkin agar tim dapat membantu.",
    isPolicyDemo: true,
  },
  {
    id: "faq-07",
    question: "Di mana lokasi studio?",
    answer:
      "Alamat yang tampil di website ini adalah alamat contoh untuk showcase. Lokasi final akan diinformasikan oleh tim melalui WhatsApp.",
    isPolicyDemo: true,
  },
  {
    id: "faq-08",
    question: "Apakah pembayaran dilakukan online?",
    answer:
      "Tidak. Website ini hanya membantu menyusun permintaan appointment. Pembayaran dan detail transaksi dibicarakan langsung dengan studio.",
    isPolicyDemo: true,
  },
];
