import type { Metadata } from "next";
import { HoverLink } from "@/components/motion/hover-link";
import { Reveal } from "@/components/motion/reveal";
import { getCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...getCanonical("/privacy"),
  title: "Kebijakan Privasi",
  description:
    "Penjelasan sederhana tentang data yang digunakan untuk menyusun permintaan appointment Maison Belle.",
};

export default function PrivacyPage() {
  return (
    <div className="pb-24 pt-14 sm:pt-20">
      <div className="container-editorial">
        <Reveal className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">Privasi</p>
          </div>
          <h1 className="mt-5 text-5xl text-ink sm:text-6xl">
            Kebijakan privasi.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            Halaman ini menjelaskan bagaimana data yang kamu isi pada alur
            booking digunakan. Maison Belle adalah brand fiktif untuk showcase,
            sehingga teks ini bukan dokumen hukum final.
          </p>

          <div className="prose-editorial mt-10">
            <h2>Data yang kamu isi</h2>
            <p>
              Saat meminta appointment, kamu mengisi nama, nomor WhatsApp, dan
              catatan opsional. Kami tidak meminta alamat rumah, nomor
              identitas, data pembayaran, atau informasi sensitif lain yang
              tidak diperlukan.
            </p>

            <h2>Tujuan penggunaan</h2>
            <p>
              Data tersebut hanya digunakan untuk menyusun pesan permintaan
              appointment yang akan kamu kirim sendiri melalui WhatsApp. Website
              tidak menyimpan data booking ke server, database, atau akun
              pengguna.
            </p>

            <h2>Handoff WhatsApp</h2>
            <p>
              Setelah memeriksa ringkasan, kamu dapat membuka WhatsApp dengan
              pesan yang sudah terisi. Pesan tidak terkirim otomatis. Kamu tetap
              memegang kendali untuk menekan tombol kirim di WhatsApp, dan
              studio akan mengonfirmasi ketersediaan secara manual.
            </p>

            <h2>Analytics dan log</h2>
            <p>
              Website ini tidak menambahkan analytics pihak ketiga. Kami tidak
              mengirim nama, nomor WhatsApp, catatan, atau isi pesan booking ke
              analytics. Data pribadi juga tidak ditempatkan pada URL.
            </p>

            <h2>Penyimpanan di browser</h2>
            <p>
              Data booking disimpan sementara di memori browser selama alur
              berlangsung. Data tidak disimpan ke localStorage, sessionStorage,
              atau cookie. Jika halaman dimuat ulang, data dapat hilang.
            </p>

            <h2>Pertanyaan</h2>
            <p>
              Untuk pertanyaan tentang data atau permintaan appointment, buka{" "}
              <HoverLink
                href="/contact"
                className="underline underline-offset-4"
              >
                halaman kontak
              </HoverLink>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
