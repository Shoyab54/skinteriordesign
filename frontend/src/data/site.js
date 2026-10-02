import galleryMeta from "../gallery-meta.json";

export const phone = { display: "+91 90824 43145", raw: "+919082443145" };

export const whatsapp =
  "https://wa.me/919082443145?text=Hello%20SK%20Interior%20Design%2C%20I%27d%20like%20to%20discuss%20a%20project.";

export const address =
  "Sakinaka Kharani Road, Andheri East, Mumbai, Maharashtra, India – 400072";

export const socials = {
  facebook: "https://www.facebook.com/share/17fx1skHgy/",
  instagram:
    "https://www.instagram.com/sk.interior_desing?utm_source=qr&stkn=MTh6MW4zNnprODNneg==",
  youtube: "https://www.youtube.com/@Skinterrior",
};

const mapsQuery =
  "Sakinaka Kharani Road, Andheri East, Mumbai, Maharashtra 400072, India";
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`;
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

export const CATEGORY_LABELS = {
  living: "Living",
  dining: "Dining",
  bedroom: "Bedroom",
  kitchen: "Kitchen",
  details: "Details",
};

const CATEGORIES = {
  "001": "details", "002": "dining", "003": "details", "004": "living", "005": "details",
  "006": "bedroom", "007": "details", "008": "living", "009": "dining", "010": "details",
  "011": "living", "012": "living", "013": "dining", "014": "details", "015": "living",
  "016": "dining", "017": "details", "018": "details", "019": "bedroom", "020": "living",
  "021": "dining", "022": "details", "023": "dining", "024": "bedroom", "025": "details",
  "026": "bedroom", "027": "kitchen", "028": "living", "029": "details", "030": "details",
  "031": "bedroom", "032": "bedroom", "033": "bedroom", "034": "bedroom", "035": "living",
  "036": "living", "037": "details", "038": "details", "039": "bedroom", "040": "bedroom",
  "041": "bedroom", "042": "bedroom", "043": "bedroom", "044": "bedroom", "045": "bedroom",
  "046": "bedroom", "047": "living", "048": "details", "049": "living", "050": "living",
  "051": "living", "052": "living", "053": "living", "054": "living", "055": "living",
  "056": "dining", "057": "dining", "058": "living", "059": "bedroom", "060": "bedroom",
  "061": "kitchen", "062": "kitchen", "063": "living", "064": "living", "065": "living",
  "066": "living", "067": "living", "068": "living", "069": "kitchen", "070": "details",
  "071": "details", "072": "details", "073": "kitchen", "074": "living", "075": "kitchen",
  "076": "dining", "077": "living", "078": "details", "079": "kitchen", "080": "kitchen",
  "081": "bedroom", "082": "living", "083": "living", "084": "bedroom", "085": "kitchen",
};

export const galleryImages = Object.keys(galleryMeta)
  .sort()
  .map((file) => {
    const id = file.replace("gallery-", "").replace(".jpeg", "");
    const category = CATEGORIES[id] || "details";
    return {
      id,
      src: `/gallery/${file}`,
      w: galleryMeta[file].w,
      h: galleryMeta[file].h,
      category,
      alt: `${CATEGORY_LABELS[category]} interior by SK Interior Design — frame ${id}`,
    };
  });

const byId = Object.fromEntries(galleryImages.map((g) => [g.id, g]));
const pick = (ids) => ids.map((id) => byId[id]);

export const heroImage = byId["015"].src;
export const contactImage = byId["054"].src;
export const teaserImages = pick(["023", "016", "045", "054", "076", "006", "036", "043"]);

export const services = [
  ["01", "Residential Interiors", "Thoughtful, tactile homes shaped around how you live, gather and rest."],
  ["02", "Commercial Spaces", "Distinctive environments that turn every brand touchpoint into an experience."],
  ["03", "Turnkey Solutions", "From first sketch to final styling, one considered vision carried through."],
  ["04", "Custom Furniture", "Quietly expressive pieces made to belong to your architecture."],
];

export const projects = [
  {
    slug: "the-obsidian-house",
    name: "The Obsidian House",
    type: "Residential / Andheri",
    number: "01",
    year: "2024",
    size: "4,200 sq ft",
    image: byId["020"].src,
    story:
      "A private retreat built around contrast — cool stone, warm timber and the slow rhythm of natural light. The Obsidian House is designed as a sequence of intimate moments, where every threshold reveals a new texture.",
    materials: ["Pietra Grey marble", "Smoked oak", "Hand-finished plaster", "Brushed bronze"],
    rooms: ["Entry court", "Living salon", "Dining room", "Primary suite"],
    gallery: pick(["020", "001", "003", "010", "005", "014", "030"]),
  },
  {
    slug: "aureum-residence",
    name: "Auréum Residence",
    type: "Luxury Living / Bandra",
    number: "02",
    year: "2023",
    size: "6,800 sq ft",
    image: byId["012"].src,
    story:
      "A study in soft grandeur for a family who wanted their home to feel collected, never decorated. Curved joinery, luminous fabrics and quiet champagne tones give the residence its gentle sense of ceremony.",
    materials: ["Travertine", "Champagne linen", "Walnut veneer", "Antique brass"],
    rooms: ["Gallery hall", "Formal lounge", "Family kitchen", "Guest wing"],
    gallery: pick(["012", "004", "008", "015", "028", "011", "035"]),
  },
  {
    slug: "the-quiet-form",
    name: "The Quiet Form",
    type: "Hospitality / Juhu",
    number: "03",
    year: "2024",
    size: "12,400 sq ft",
    image: byId["050"].src,
    story:
      "Created for a boutique hospitality concept in the heart of Juhu, The Quiet Form lets proportion do the talking. Sculptural furniture floats inside a calm, tactile envelope of sand, shadow and greenery.",
    materials: ["Terrazzo", "Bouclé wool", "Rattan weave", "Limestone"],
    rooms: ["Arrival lounge", "Dining salon", "Library bar", "Private dining"],
    gallery: pick(["050", "051", "047", "049", "052", "056", "057"]),
  },
  {
    slug: "verde-house",
    name: "Verde House",
    type: "Residential / Powai",
    number: "04",
    year: "2023",
    size: "3,600 sq ft",
    image: byId["065"].src,
    story:
      "Verde House is composed in light and stone — veined marble floors, sculptural ceiling coves and joinery that glows after dusk. A home that feels open, restorative and quietly precise.",
    materials: ["Green onyx", "Pale oak", "Limewash", "Natural linen"],
    rooms: ["Garden room", "Open kitchen", "Primary retreat", "Courtyard"],
    gallery: pick(["065", "075", "085", "082", "076", "061", "074"]),
  },
];
