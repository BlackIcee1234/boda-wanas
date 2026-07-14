import type { SiteConfig } from "@/types/site-config";

export const DEFAULT_SITE_CONFIG: SiteConfig = {
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
      colors: [
        { hex: "#5C6B73", name: "Azul pizarra" },
        { hex: "#A8B5A0", name: "Verde salvia" },
        { hex: "#7A8450", name: "Verde oliva" },
        { hex: "#B8838B", name: "Rosa polvo" },
        { hex: "#7A2E3D", name: "Borgoña" },
        { hex: "#3D1C24", name: "Granate" },
        { hex: "#1A1A1A", name: "Negro" },
      ],
    },
    gentlemen: {
      label: "Caballeros",
      description: "Traje y corbata",
      tip: "Evento al aire libre. Recomendamos llevar abrigo ligero para la noche.",
      colors: [
        { hex: "#1B2A4A", name: "Azul marino" },
        { hex: "#4A4A4A", name: "Gris carbón" },
        { hex: "#1A1A1A", name: "Negro" },
        { hex: "#C9B08C", name: "Beige" },
      ],
    },
  },
  gifts: {
    sectionTitle: "Mesa de Regalos",
    sectionSubtitle:
      "Tu presencia es nuestro mejor regalo. Si deseas obsequiarnos algo, aquí tienes nuestra información:",
    bankTransfer: {
      enabled: true,
      title: "Transferencia bancaria",
      bank: "Santander",
      accountName: "Oswaldo Aguayo Muñoz",
      clabe: "014320568163438905",
      concept: "Regalo de boda",
    },
    liverpool: {
      enabled: false,
      title: "Liverpool",
      eventNumber: "",
      url: "https://www.liverpool.com.mx",
      description: "Mesa de regalos en Liverpool",
    },
    custom: {
      enabled: false,
      title: "Otra mesa de regalos",
      description: "También contamos con mesa de regalos en otra tienda.",
      url: "",
      reference: "",
    },
  },
  family: {
    enabled: true,
    sectionTitle: "Con la bendición de",
    sectionSubtitle: "Nuestros padres y padrinos",
    brideParents: {
      names: "",
    },
    groomParents: {
      names: "",
    },
    godparents: [
      { role: "Padrinos de velación", names: "" },
    ],
  },
  phrases: {
    enabled: true,
    items: [
      {
        id: "phrase-1",
        text: "Hoy unimos dos caminos para caminar juntos el resto de la vida.",
      },
      {
        id: "phrase-2",
        text: "El amor no se mira, se siente; y aún más se siente cuando se mira juntos.",
      },
    ],
  },
  heroImage: "/boda/optimized/hero.jpg",
  galleryImages: [
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
  ],
  envelope: {
    enabled: true,
    message: "Estás invitado a nuestra boda",
  },
  seo: {
    siteName: "Boda A&O",
    shareTitle: "Ailyn & Oswaldo — Invitación de Boda",
    shareDescription:
      "¡Llegó el gran día! Acompáñanos a celebrar el inicio de nuestra nueva historia. 27 de Noviembre, 2026.",
    shareImage: "/boda/optimized/hero.jpg",
  },
  timeline: [
    {
      id: "ceremony",
      time: "4:45 PM",
      title: "Ceremonia Religiosa",
      description: "Templo Nuestra Señora de Montserrat",
      icon: "church",
      mapsUrl: "https://maps.app.goo.gl/ZSZ3R5EgQ8rnH7iN6",
    },
    {
      id: "cocktail",
      time: "6:30 – 7:30 PM",
      title: "Cóctel",
      description: "Bienvenida y brindis en Somabela Jardín de Eventos",
      icon: "wine",
      mapsUrl: "https://maps.app.goo.gl/kvb7ABFBEFLanXzQ9",
    },
    {
      id: "dinner",
      time: "8:00 PM",
      title: "Cena",
      description: "Banquete y brindis en honor a los novios",
      icon: "utensils",
    },
    {
      id: "dance",
      time: "9:30 PM",
      title: "Baile y Fiesta",
      description: "¡A celebrar juntos toda la noche!",
      icon: "music",
    },
  ],
};

export const NAV_SECTIONS = [
  { id: "inicio", label: "Inicio" },
  { id: "cuenta-regresiva", label: "Cuenta Regresiva" },
  { id: "familia", label: "Familia" },
  { id: "timeline", label: "Itinerario" },
  { id: "evento", label: "Evento" },
  { id: "regalos", label: "Regalos" },
  { id: "rsvp", label: "RSVP" },
  { id: "galeria", label: "Galería" },
] as const;
