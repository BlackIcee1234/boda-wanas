export const WEDDING = {
  couple: {
    bride: "Ailyn",
    groom: "Oswaldo",
    display: "Ailyn & Oswaldo",
  },
  date: "2026-11-27T16:45:00-06:00",
  dateDisplay: "27 de Noviembre, 2026",
  welcomeMessage:
    "¡Llegó el gran día! Acompáñanos a celebrar el inicio de nuestra nueva historia.",
  ceremony: {
    name: "Templo Nuestra Señora de Montserrat",
    time: "4:45 PM",
    address: "s/n, colonia Pablo Casals, Las Cañadas, Jal.",
    mapsUrl: "https://maps.app.goo.gl/ZSZ3R5EgQ8rnH7iN6",
  },
  reception: {
    name: "Somabela Jardín de Eventos",
    time: "6:30 PM",
    address: "Carr. a Saltillo km 11, La Corpeña, 45189 Zapopan, Jal.",
    mapsUrl: "https://maps.app.goo.gl/kvb7ABFBEFLanXzQ9",
  },
  dressCode: {
    title: "Código de Vestimenta: Formal",
    ladies: {
      label: "Damas",
      description: "Vestido largo o midi elegante",
      tip: "Evento al aire libre. Recomendamos llevar abrigo ligero para la noche y evitar tacones de aguja.",
    },
    gentlemen: {
      label: "Caballeros",
      description: "Traje y corbata",
      tip: "Evento al aire libre. Recomendamos llevar abrigo ligero para la noche.",
    },
  },
  gifts: {
    title: "Mesa de Regalos",
    subtitle: "Tu presencia es nuestro mejor regalo. Si deseas obsequiarnos algo, aquí tienes nuestra información:",
    bank: "Santander",
    accountName: "Oswaldo Aguayo Muñoz",
    clabe: "014320568163438905",
    concept: "Regalo de boda",
  },
} as const;

export const WEDDING_IMAGES = {
  hero: "/boda/optimized/hero.jpg",
} as const;

export const GALLERY_IMAGES = [
  { id: 1, src: "/boda/optimized/gallery-1.jpg", alt: "Ailyn y Oswaldo" },
  { id: 2, src: "/boda/optimized/gallery-2.jpg", alt: "Momentos juntos" },
  { id: 3, src: "/boda/optimized/gallery-3.jpg", alt: "Nuestra historia" },
  { id: 4, src: "/boda/optimized/gallery-4.jpg", alt: "El compromiso" },
  { id: 5, src: "/boda/optimized/gallery-5.jpg", alt: "Celebrando el amor" },
  { id: 6, src: "/boda/optimized/gallery-6.jpg", alt: "Juntos para siempre" },
  { id: 7, src: "/boda/optimized/gallery-7.jpg", alt: "Nuestro camino" },
  { id: 8, src: "/boda/optimized/gallery-8.jpg", alt: "Recuerdos especiales" },
  { id: 9, src: "/boda/optimized/gallery-9.jpg", alt: "Amor eterno" },
  { id: 10, src: "/boda/optimized/gallery-10.jpg", alt: "Momentos únicos" },
  { id: 11, src: "/boda/optimized/gallery-11.jpg", alt: "Nuestra aventura" },
  { id: 12, src: "/boda/optimized/gallery-12.jpg", alt: "Para siempre" },
] as const;

export const GALLERY_PLACEHOLDERS = GALLERY_IMAGES;

export const NAV_SECTIONS = [
  { id: "inicio", label: "Inicio" },
  { id: "cuenta-regresiva", label: "Cuenta Regresiva" },
  { id: "evento", label: "Evento" },
  { id: "galeria", label: "Galería" },
  { id: "rsvp", label: "RSVP" },
  { id: "regalos", label: "Regalos" },
] as const;
