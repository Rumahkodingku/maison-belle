import type { Artist } from "@/types/domain";

export const artists: Artist[] = [
  {
    id: "artist-alya",
    name: "Alya Prameswari",
    role: "Hair Stylist",
    bio: "Alya menangani potongan, styling, dan perawatan rambut dengan pendekatan yang santai dan personal. Ia senang membantu klien menemukan bentuk rambut yang terasa mudah dirawat.",
    image: "/images/artists/alya-prameswari.jpg",
    specialties: ["Haircut", "Styling", "Hair spa"],
    isDemo: true,
  },
  {
    id: "artist-nadia",
    name: "Nadia Kusuma",
    role: "Nail Artist",
    bio: "Nadia bekerja dengan detail warna, bentuk kuku, dan nail art yang dibuat mengikuti karakter klien. Fokusnya adalah hasil rapi yang tetap nyaman untuk aktivitas sehari-hari.",
    image: "/images/artists/nadia-kusuma.jpg",
    specialties: ["Gel polish", "Nail art", "Nail extension"],
    isDemo: true,
  },
  {
    id: "artist-rania",
    name: "Rania Putri",
    role: "Makeup Artist",
    bio: "Rania merancang makeup untuk acara harian hingga momen spesial. Ia memulai setiap sesi dengan percakapan tentang referensi, kenyamanan, dan hasil akhir yang diinginkan.",
    image: "/images/artists/rania-putri.jpg",
    specialties: ["Soft glam", "Party makeup", "Bridal makeup"],
    isDemo: true,
  },
];
