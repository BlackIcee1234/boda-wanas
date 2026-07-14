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
  icon: "church" | "party" | "camera" | "utensils" | "music" | "heart" | "wine";
  mapsUrl?: string;
}

export interface SiteSeo {
  siteName: string;
  shareTitle: string;
  shareDescription: string;
  shareImage: string;
}

export interface BankTransferGift {
  enabled: boolean;
  title: string;
  bank: string;
  accountName: string;
  clabe: string;
  concept: string;
}

export interface LiverpoolGift {
  enabled: boolean;
  title: string;
  eventNumber: string;
  url: string;
  description: string;
}

export interface CustomGift {
  enabled: boolean;
  title: string;
  description: string;
  url: string;
  reference: string;
}

export interface GiftsConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  bankTransfer: BankTransferGift;
  liverpool: LiverpoolGift;
  custom: CustomGift;
}

export interface FamilyPerson {
  names: string;
}

export interface Godparent {
  role: string;
  names: string;
}

export interface FamilyConfig {
  enabled: boolean;
  sectionTitle: string;
  sectionSubtitle: string;
  brideParents: FamilyPerson;
  groomParents: FamilyPerson;
  godparents: Godparent[];
}

export interface CustomPhrase {
  id: string;
  text: string;
  attribution?: string;
}

export interface PhrasesConfig {
  enabled: boolean;
  items: CustomPhrase[];
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
  gifts: GiftsConfig;
  family: FamilyConfig;
  phrases: PhrasesConfig;
  heroImage: string;
  galleryImages: GalleryImage[];
  envelope: {
    enabled: boolean;
    message: string;
  };
  timeline: TimelineEvent[];
  seo: SiteSeo;
}
