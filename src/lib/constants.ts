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

export const GALLERY_PLACEHOLDERS = [
  { id: 1, alt: "Foto de los novios 1", label: "Nuestra historia" },
  { id: 2, alt: "Foto de los novios 2", label: "Juntos" },
  { id: 3, alt: "Foto de los novios 3", label: "El compromiso" },
  { id: 4, alt: "Foto de los novios 4", label: "Amor eterno" },
  { id: 5, alt: "Foto de los novios 5", label: "Nuestro camino" },
  { id: 6, alt: "Foto de los novios 6", label: "Para siempre" },
] as const;

export const NAV_SECTIONS = [
  { id: "inicio", label: "Inicio" },
  { id: "cuenta-regresiva", label: "Cuenta Regresiva" },
  { id: "evento", label: "Evento" },
  { id: "galeria", label: "Galería" },
  { id: "rsvp", label: "RSVP" },
  { id: "regalos", label: "Regalos" },
] as const;
