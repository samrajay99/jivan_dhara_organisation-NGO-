import prisma from "./prisma";

export interface SiteSettingsMap {
  ngo_name: string;
  ngo_short_name: string;
  founded_year: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  upi_id: string;
  upi_number: string;
  membership_fee: string;
  mission: string;
  vision: string;
  governing_body: string;
  stat_members: string;
  stat_people_helped: string;
  stat_events: string;
  stat_volunteers: string;
  stat_years: string;
  facebook: string;
  instagram: string;
  youtube: string;
  [key: string]: string;
}

export const defaultSettings: SiteSettingsMap = {
  ngo_name: "Jivan Dhara Organisation",
  ngo_short_name: "JDO (NGO)",
  founded_year: "2008",
  tagline: "Dedicated Sewa Trust Serving Humanity Across Urban & Rural Bengal",
  address: "12, Raicharan Sadhukhan Road, Bridge, Near Gajnavi, Kolkata, West Bengal - 700037",
  phone: "+91 9211420420",
  whatsapp: "+919211420420",
  email: "kumarpradip0303@gmail.com",
  upi_id: "jivandhara@upi",
  upi_number: "9211420420",
  membership_fee: "50",
  mission: "Our mission is the creation of such a society where nobody is deprived of the main current of development. We are determined for the establishment of that society in which everybody possesses 'Human rights' with dignity.",
  vision: "We aim to create a development revolution for the marginalized and socio-economically weaker sections of society through sustainable community action, education, healthcare, and empowerment.",
  governing_body: "A democratically elected Governing Committee of 9 persons elected every five years by the General Body, headed by the Secretary.",
  stat_members: "1250+",
  stat_people_helped: "35000+",
  stat_events: "240+",
  stat_volunteers: "320+",
  stat_years: "18",
  facebook: "https://facebook.com/jivandharaorg",
  instagram: "https://instagram.com/jivandharaorg",
  youtube: "https://youtube.com/@jivandharaorg",
};

export async function getSiteSettings(): Promise<SiteSettingsMap> {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = { ...defaultSettings };
    for (const s of settings) {
      map[s.key] = s.value;
    }
    return map as SiteSettingsMap;
  } catch (e) {
    console.error("Error loading site settings:", e);
    return defaultSettings;
  }
}
