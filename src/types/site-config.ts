export interface ColorSwatch {
  hex: string;
  name: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: "church" | "party" | "camera" | "utensils" | "music" | "heart";
  mapsUrl?: string;
}

export interface SiteConfig {
  couple: {
    bride: string;
    groom: string;
    display: string;
  };
  date: string;
  dateDisplay: string;
  welcomeMessage: string;
  ceremony: {
    name: string;
    time: string;
    address: string;
    mapsUrl: string;
  };
  reception: {
    name: string;
    time: string;
    address: string;
    mapsUrl: string;
  };
  dressCode: {
    title: string;
    ladies: {
      label: string;
      description: string;
      tip: string;
      colors: ColorSwatch[];
    };
    gentlemen: {
      label: string;
      description: string;
      tip: string;
      colors: ColorSwatch[];
    };
  };
  gifts: {
    title: string;
    subtitle: string;
    bank: string;
    accountName: string;
    clabe: string;
    concept: string;
  };
  heroImage: string;
  galleryImages: GalleryImage[];
  music: {
    enabled: boolean;
    url: string;
  };
  envelope: {
    enabled: boolean;
    message: string;
  };
  timeline: TimelineEvent[];
}
