import {
  Apple, Baby, Banknote, Bed, Bike, Bird, BookOpen, BriefcaseBusiness, Bus, Car, Carrot, Cat, Church, Circle,
  CirclePlay, Cloud, CloudLightning, CloudRain, Coffee, CookingPot, DoorOpen, Dog, Droplets, Drumstick, Ear, Egg,
  Eye, Fish, Flower2, Footprints, GlassWater, Glasses, GraduationCap, Hand, Heart, HeartPulse, Home, Hospital,
  ImageOff, KeyRound, Laptop, Landmark, Milk, Moon, Mountain, PersonStanding, Phone, Plane, RectangleHorizontal,
  Salad, School, Ship, Shirt, ShoppingBag, Soup, Square, Star, Store, Sun, Table2, TrafficCone, TrainFront,
  TreePine, Triangle, User, UsersRound, Utensils, UtensilsCrossed, Watch, Waves, Wind, Wine, Pencil, Headphones,
  MessageCircle, Armchair, Beef, Citrus, Banana, Rainbow
} from "lucide-react";
import { getIcon } from "../../data/iconLibrary";
import { assetPath } from "../../utils/assetPath";

const art = {
  bread: CookingPot, fish: Fish, chicken: Drumstick, egg: Egg, banana: Banana, apple: Apple, orange: Citrus,
  water: Droplets, coffee: Coffee, tea: Coffee, milk: Milk, meat: Beef, soup: Soup, juice: Wine, carrot: Carrot,
  lettuce: Salad, dog: Dog, cat: Cat, bird: Bird, baby: Baby, man: User, woman: User, child: User, father: User,
  mother: User, friend: UsersRound, teacher: GraduationCap, student: GraduationCap, house: Home, home: Home,
  chair: Armchair, table: Table2, bed: Bed, door: DoorOpen, window: Square, phone: Phone, laptop: Laptop,
  book: BookOpen, pen: Pencil, cup: GlassWater, plate: Circle, spoon: Utensils, knife: Utensils, bag: ShoppingBag,
  key: KeyRound, shirt: Shirt, glasses: Glasses, watch: Watch, necklace: Circle, jacket: Shirt, car: Car, bus: Bus,
  bicycle: Bike, truck: Car, train: TrainFront, airplane: Plane, boat: Ship, taxi: Car, "traffic-light": TrafficCone,
  school: School, hospital: Hospital, market: Store, shop: Store, restaurant: UtensilsCrossed, bank: Landmark,
  church: Church, farm: Home, mountain: Mountain, sun: Sun, cloud: Cloud, rain: CloudRain, storm: CloudLightning,
  rainbow: Rainbow, tree: TreePine, flower: Flower2, river: Waves, moon: Moon, wind: Wind, eat: Utensils,
  drink: GlassWater, read: BookOpen, write: Pencil, walk: Footprints, run: Footprints, sleep: Bed,
  listen: Headphones, speak: MessageCircle, play: CirclePlay, cook: CookingPot, sit: Armchair, stand: PersonStanding,
  work: BriefcaseBusiness, study: GraduationCap, drive: Car, head: User, eye: Eye, ear: Ear, nose: User, mouth: User,
  hand: Hand, foot: Footprints, heart: HeartPulse, circle: Circle, square: Square, triangle: Triangle,
  rectangle: RectangleHorizontal, star: Star, "heart-shape": Heart
};

const swatches = { red: "#EF4444", blue: "#3B82F6", green: "#22C55E", yellow: "#F6C445", "orange-colour": "#F28C28", purple: "#8B5CF6", pink: "#EC4899", brown: "#92400E", black: "#171717", white: "#FFFFFF" };
const emojiArt = {
  bread: "🍞", rice: "🍚", fish: "🐟", chicken: "🍗", egg: "🥚", banana: "🍌", apple: "🍎", orange: "🍊", water: "💧", coffee: "☕", tea: "🍵", milk: "🥛", meat: "🥩", soup: "🍲", juice: "🧃",
  tomato: "🍅", carrot: "🥕", onion: "🧅", pepper: "🫑", lettuce: "🥬", mango: "🥭", pineapple: "🍍", plantain: "🍌", yam: "🍠", cassava: "🌱", maize: "🌽",
  dog: "🐕", cat: "🐈", cow: "🐄", goat: "🐐", bird: "🐦", lion: "🦁", elephant: "🐘", monkey: "🐒", sheep: "🐑", pig: "🐖", horse: "🐎", snake: "🐍", spider: "🕷️", duck: "🦆",
  school: "🏫", hospital: "🏥", market: "🛒", shop: "🏪", restaurant: "🍽️", bank: "🏦", church: "⛪", mosque: "🕌", beach: "🏖️", farm: "🚜", mountain: "⛰️", park: "🌳", home: "🏠"
};

export default function ConceptIcon({ iconId, className = "", label, showPlaceholderLabel = false }) {
  const concept = getIcon(iconId);
  const Icon = art[iconId];
  const accessibleLabel = label || concept?.label || "Missing concept image";
  if (swatches[iconId]) return <span role="img" aria-label={accessibleLabel} className={`block rounded-full border-2 border-black/10 shadow-inner ${className}`} style={{ backgroundColor: swatches[iconId] }} />;
  if (emojiArt[iconId]) return <span role="img" aria-label={accessibleLabel} className={`grid place-items-center rounded-2xl bg-gradient-to-br from-[#F6C445]/20 via-white/40 to-[#53B98A]/15 text-[clamp(2.5rem,7vw,5rem)] shadow-inner ${className}`}><span aria-hidden="true">{emojiArt[iconId]}</span></span>;
  if (concept?.asset?.startsWith("/")) return <span role="img" aria-label={accessibleLabel} className={`grid place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#F6C445]/15 to-[#F28C28]/10 ${className}`}><img src={assetPath(concept.asset)} alt="" className="h-[88%] w-[88%] object-contain drop-shadow-sm" loading="lazy" /></span>;
  if (!concept || concept.status !== "ready" || !Icon) return <span role="img" aria-label={`${accessibleLabel}; artwork pending`} className={`grid place-items-center rounded-2xl border-2 border-dashed border-current/15 bg-current/[0.035] ${className}`}><ImageOff className="opacity-25" />{showPlaceholderLabel && <span className="mt-1 px-1 text-center text-[9px] font-black uppercase opacity-35">Artwork pending</span>}</span>;
  return <span role="img" aria-label={accessibleLabel} className={`grid place-items-center rounded-2xl bg-gradient-to-br from-[#F6C445]/20 to-[#F28C28]/10 text-[#24745B] ${className}`}><Icon className="h-[58%] w-[58%]" strokeWidth={2.25} /></span>;
}
