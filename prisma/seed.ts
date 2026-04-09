// Load .env.local before anything else (tsx doesn't load Next.js env files)
import * as fs from "fs";
import * as path from "path";
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    if (!process.env[k]) process.env[k] = v;
  }
}

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding StayLux database with 50 listings...");

  const password = await bcrypt.hash("Password123!", 12);

  // ─── Users ───────────────────────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: "admin@staylux.com" },
    update: { role: "ADMIN", hashedPassword: password },
    create: { name: "Alex Admin", email: "admin@staylux.com", hashedPassword: password, role: "ADMIN" },
  });

  const hosts = await Promise.all([
    prisma.user.upsert({ where: { email: "nikos@staylux.com" }, update: {}, create: { name: "Nikos Papadopoulos", email: "nikos@staylux.com", hashedPassword: password, role: "HOST", bio: "Superhost with 5 years in Santorini. I love welcoming guests to the most beautiful island in the world.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" } }),
    prisma.user.upsert({ where: { email: "amira@staylux.com" }, update: {}, create: { name: "Amira Hassan", email: "amira@staylux.com", hashedPassword: password, role: "HOST", bio: "Luxury hospitality expert in the Maldives. Every guest deserves a once-in-a-lifetime experience.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" } }),
    prisma.user.upsert({ where: { email: "james@staylux.com" }, update: {}, create: { name: "James Whitfield", email: "james@staylux.com", hashedPassword: password, role: "HOST", bio: "Ski enthusiast and chalet owner in Aspen. 12 years of hosting exceptional mountain getaways.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" } }),
    prisma.user.upsert({ where: { email: "sofia@staylux.com" }, update: {}, create: { name: "Sofia Mendez", email: "sofia@staylux.com", hashedPassword: password, role: "HOST", bio: "Costa Rica native passionate about eco-luxury and sustainable travel experiences.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" } }),
    prisma.user.upsert({ where: { email: "pierre@staylux.com" }, update: {}, create: { name: "Pierre Dubois", email: "pierre@staylux.com", hashedPassword: password, role: "HOST", bio: "French Alps chalet owner and former ski instructor. I know every secret powder run.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" } }),
    prisma.user.upsert({ where: { email: "lena@staylux.com" }, update: {}, create: { name: "Lena van Berg", email: "lena@staylux.com", hashedPassword: password, role: "HOST", bio: "Amsterdam local offering authentic houseboat experiences on the Prinsengracht canal.", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" } }),
    prisma.user.upsert({ where: { email: "wayan@staylux.com" }, update: {}, create: { name: "Wayan Sudiarta", email: "wayan@staylux.com", hashedPassword: password, role: "HOST", bio: "Balinese hospitality expert. Born and raised in Seminyak, I share the real Bali with guests.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80" } }),
    prisma.user.upsert({ where: { email: "giulia@staylux.com" }, update: {}, create: { name: "Giulia Rossi", email: "giulia@staylux.com", hashedPassword: password, role: "HOST", bio: "Tuscan farmhouse owner and chef. I host wine tastings and cooking classes for guests.", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80" } }),
  ]);

  const [h1, h2, h3, h4, h5, h6, h7, h8] = hosts;

  const guest1 = await prisma.user.upsert({ where: { email: "sarah@example.com" }, update: {}, create: { name: "Sarah Mitchell", email: "sarah@example.com", hashedPassword: password, role: "GUEST" } });
  const guest2 = await prisma.user.upsert({ where: { email: "marco@example.com" }, update: {}, create: { name: "Marco Bianchi", email: "marco@example.com", hashedPassword: password, role: "GUEST" } });

  console.log("✅ Users created");

  // ─── Listings ─────────────────────────────────────────────────────────────
  const listings = [
    // 1
    {
      slug: "cliffside-villa-santorini",
      title: "Cliffside Villa with Infinity Pool — Oia, Santorini",
      description: "Perched dramatically on the caldera cliffs of Oia, this exceptional villa commands unobstructed views of the famous Santorini sunset and the deep-blue Aegean. Three elegant bedrooms, whitewashed Cycladic architecture, vaulted ceilings, and a private heated infinity pool that seems to merge with the sea below.\n\nWake up to the azure Aegean, spend afternoons suspended between sky and water, and watch the sky turn crimson gold from the terrace. A dedicated concierge arranges private yacht charters, wine tastings at volcanic vineyards, and helicopter transfers from Athens.\n\nThe villa includes a fully equipped kitchen with premium appliances, outdoor dining pergola, and a private donkey path to the village of Oia just 3 minutes away.",
      propertyType: "VILLA", pricePerNight: 1850, cleaningFee: 250, maxGuests: 6, bedrooms: 3, bathrooms: 3, beds: 3,
      images: [
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=85",
        "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&q=85",
        "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=85",
        "https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=1200&q=85",
        "https://images.unsplash.com/photo-1504615755583-2916b52192a3?w=1200&q=85",
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BALCONY", "HOT_TUB", "BBQ_GRILL", "AIR_CONDITIONING"],
      city: "Oia", state: "South Aegean", country: "Greece", zipCode: "84702", latitude: 36.4617, longitude: 25.3753,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.95, totalReviews: 312, hostId: h1.id,
    },
    // 2
    {
      slug: "overwater-villa-maldives",
      title: "Overwater Bungalow — North Malé Atoll, Maldives",
      description: "Experience the pinnacle of Indian Ocean luxury in this stunning overwater bungalow floating serenely above a turquoise lagoon. A private deck extends over the crystal-clear water, a glass floor panel reveals the marine life below, and steps descend directly into the coral-rich sea.\n\nIncluded in your stay: daily breakfast delivered to your deck, a sunset dhoni cruise, full snorkelling kit, and kayaks. The house reef — one of the healthiest in the Maldives — is literally beneath your feet.\n\nThe bungalow sleeps four across two bedrooms with bespoke driftwood furniture, hand-woven Maldivian textiles, and a rain shower open to the stars.",
      propertyType: "VILLA", pricePerNight: 1250, cleaningFee: 200, maxGuests: 4, bedrooms: 2, bathrooms: 2, beds: 2,
      images: [
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=85",
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=85",
        "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1200&q=85",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85",
        "https://images.unsplash.com/photo-1534447677616-e117b0b8f7bf?w=1200&q=85",
        "https://images.unsplash.com/photo-1548102245-c79dbcfa9f92?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "AIR_CONDITIONING", "BALCONY"],
      city: "North Malé Atoll", state: "Kaafu", country: "Maldives", zipCode: "20026", latitude: 4.1755, longitude: 73.5093,
      isFeatured: true, instantBook: true, cancellationPolicy: "MODERATE", avgRating: 4.97, totalReviews: 238, hostId: h2.id,
    },
    // 3
    {
      slug: "ski-chalet-aspen-colorado",
      title: "Ski-In Ski-Out Chalet — Aspen Mountain, Colorado",
      description: "The ultimate ski vacation in a 4-bedroom mountain chalet with direct piste access from the back door. Exposed timber beams, a grand stone fireplace that reaches the vaulted ceiling, a professional chef's kitchen, and a wraparound deck with breathtaking mountain views over the Elk Mountains.\n\nPerfect for families and groups: heated ski storage, boot dryers, a games room, and a private outdoor hot tub that steams in the crisp Colorado air. Daily housekeeping and a ski valet are included.\n\nAspen's world-class dining, galleries, and apres-ski scene are a 10-minute ski run to the base of Ajax Mountain.",
      propertyType: "CABIN", pricePerNight: 895, cleaningFee: 150, maxGuests: 8, bedrooms: 4, bathrooms: 3, beds: 5,
      images: [
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=85",
        "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200&q=85",
        "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1200&q=85",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=85",
        "https://images.unsplash.com/photo-1513614835788-0fe0a8d80e22?w=1200&q=85",
      ],
      amenities: ["FIREPLACE", "HOT_TUB", "WIFI", "KITCHEN", "PARKING", "GYM"],
      city: "Aspen", state: "Colorado", country: "USA", zipCode: "81611", latitude: 39.1911, longitude: -106.8175,
      isFeatured: true, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.92, totalReviews: 156, hostId: h3.id,
    },
    // 4
    {
      slug: "jungle-treehouse-costa-rica",
      title: "Rainforest Treehouse — Manuel Antonio, Costa Rica",
      description: "Wake up to howler monkeys and scarlet macaws in this magical treehouse perched 15 metres above the Costa Rican jungle floor. Completely solar-powered and sustainably built, it features a king bed, open-air bathroom with a rain shower, and a deck overlooking the forest canopy.\n\nTwo minutes walk to the entrance of Manuel Antonio National Park — one of the most biodiverse places on earth. Resident sloths hang in the cecropia trees beside the deck. Toucans appear at breakfast.\n\nThe treehouse is entirely off-grid: no noise except the jungle. Packed breakfasts, kayak hire on the estuary, and a private surf lesson at Playa Biesanz are available.",
      propertyType: "TREEHOUSE", pricePerNight: 420, cleaningFee: 60, maxGuests: 2, bedrooms: 1, bathrooms: 1, beds: 1,
      images: [
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&q=85",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=85",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85",
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=85",
        "https://images.unsplash.com/photo-1492681290223-6190a6bcf7e6?w=1200&q=85",
      ],
      amenities: ["WIFI", "KITCHEN", "BBQ_GRILL"],
      city: "Manuel Antonio", state: "Puntarenas", country: "Costa Rica", zipCode: "60601", latitude: 9.3938, longitude: -84.1587,
      isFeatured: true, instantBook: true, cancellationPolicy: "FLEXIBLE", avgRating: 4.98, totalReviews: 89, hostId: h4.id,
    },
    // 5
    {
      slug: "beachfront-villa-seminyak-bali",
      title: "Beachfront Villa with Private Pool — Seminyak, Bali",
      description: "A stunning 4-bedroom beachfront villa in the heart of Seminyak with direct beach access through a private gate in the garden, a 20-metre infinity pool that looks out over the Indian Ocean, and authentic Balinese architecture with hand-carved teak pavilions.\n\nA full staff team comes with the villa: a private butler, dedicated chef who prepares daily breakfast and can cook any meal on request, daily housekeeper, and a gardener who maintains the tropically lush grounds. Located steps from Seminyak's legendary beach clubs and a short walk to Eat Street.\n\nPerfect for groups and families seeking the quintessential Bali luxury experience with the beaches, rice paddies, and temples of southern Bali all within reach.",
      propertyType: "BEACHFRONT", pricePerNight: 620, cleaningFee: 90, maxGuests: 8, bedrooms: 4, bathrooms: 4, beds: 4,
      images: [
        "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=1200&q=85",
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&q=85",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
        "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&q=85",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BBQ_GRILL", "AIR_CONDITIONING", "PARKING"],
      city: "Seminyak", state: "Bali", country: "Indonesia", zipCode: "80361", latitude: -8.6905, longitude: 115.1686,
      isFeatured: true, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.91, totalReviews: 294, hostId: h7.id,
    },
    // 6
    {
      slug: "chalet-des-alpes-verbier",
      title: "Chalet des Alpes — Verbier, Switzerland",
      description: "An iconic 5-bedroom Alpine chalet in the heart of Verbier — Europe's ultimate freeride ski resort. Ski in/out access to the 4 Vallées, 410km of pistes, panoramic Mont Blanc views, a cedar wood sauna, and an outdoor hot tub in the snow.\n\nThe chalet is furnished with a Gaggenau appliance suite in the kitchen, a grand dining table for 12, and a media room with a cinema screen. A ski technician will collect, tune, and deliver your skis each morning.\n\nSummer brings mountain biking, trekking to the Tour du Mont Blanc, and paragliding over the valley — the chalet is magnificent in every season.",
      propertyType: "CABIN", pricePerNight: 1450, cleaningFee: 200, maxGuests: 10, bedrooms: 5, bathrooms: 4, beds: 6,
      images: [
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85",
        "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1200&q=85",
        "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200&q=85",
        "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1200&q=85",
        "https://images.unsplash.com/photo-1513614835788-0fe0a8d80e22?w=1200&q=85",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=85",
      ],
      amenities: ["HOT_TUB", "FIREPLACE", "WIFI", "KITCHEN", "PARKING", "GYM"],
      city: "Verbier", state: "Valais", country: "Switzerland", zipCode: "1936", latitude: 46.0990, longitude: 7.2269,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.96, totalReviews: 118, hostId: h5.id,
    },
    // 7
    {
      slug: "historic-houseboat-amsterdam",
      title: "Restored 1920s Houseboat — Prinsengracht, Amsterdam",
      description: "Experience Amsterdam exactly as locals have for a century aboard this beautifully restored 1920s houseboat moored on the iconic Prinsengracht canal, steps from the Jordaan. Original timber beams, hand-tiled galley kitchen, a sunny deck with canal views, and two cosy double cabins.\n\nTwo Dutch-style city bikes are included. Walk 5 minutes to the Anne Frank House, 10 minutes to the Rijksmuseum, and cross the street to some of Amsterdam's most atmospheric brown cafés.\n\nMoored in a quiet stretch of the canal — you fall asleep to the gentle rock of barges and wake to the sound of cyclists crossing the bridge above.",
      propertyType: "BOAT", pricePerNight: 340, cleaningFee: 55, maxGuests: 4, bedrooms: 2, bathrooms: 1, beds: 2,
      images: [
        "https://images.unsplash.com/photo-1536768139911-e290a59011e4?w=1200&q=85",
        "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1200&q=85",
        "https://images.unsplash.com/photo-1534438327725-e0abfbdb3a81?w=1200&q=85",
        "https://images.unsplash.com/photo-1523906834658-5e862ad06fa7?w=1200&q=85",
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
      ],
      amenities: ["WIFI", "KITCHEN", "FIREPLACE", "BALCONY"],
      city: "Amsterdam", state: "North Holland", country: "Netherlands", zipCode: "1017", latitude: 52.3676, longitude: 4.9041,
      isFeatured: false, instantBook: true, cancellationPolicy: "FLEXIBLE", avgRating: 4.93, totalReviews: 427, hostId: h6.id,
    },
    // 8
    {
      slug: "tuscan-farmhouse-chianti",
      title: "17th-Century Farmhouse with Vineyard — Siena, Tuscany",
      description: "A magnificent 17th-century stone farmhouse set among rolling Chianti vineyards with panoramic views over three valleys and the medieval towers of San Gimignano on the horizon. Six bedrooms, each with original stone fireplaces, a pool surrounded by 800-year-old olive trees, and an outdoor kitchen for alfresco dinners under the Tuscan stars.\n\nYour host Giulia is a trained chef and sommelier. Daily cooking classes using garden vegetables and estate olive oil, and private wine tastings from the adjoining family winery are all available. The farm produces Chianti Classico DOCG — you can take bottles home.\n\nLocated equidistant between Siena and Florence — both under an hour by car.",
      propertyType: "VILLA", pricePerNight: 580, cleaningFee: 100, maxGuests: 12, bedrooms: 6, bathrooms: 5, beds: 7,
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85",
        "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=1200&q=85",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1200&q=85",
        "https://images.unsplash.com/photo-1499955085172-a7cd065fbc03?w=1200&q=85",
        "https://images.unsplash.com/photo-1546032364-affaeafbe689?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BBQ_GRILL", "PARKING", "FIREPLACE"],
      city: "Siena", state: "Tuscany", country: "Italy", zipCode: "53100", latitude: 43.3188, longitude: 11.3307,
      isFeatured: true, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.97, totalReviews: 203, hostId: h8.id,
    },
    // 9
    {
      slug: "beverly-hills-mega-mansion",
      title: "Mega Mansion with Tennis Court — Beverly Hills, CA",
      description: "An extraordinary 8-bedroom compound behind private gates in the heart of Beverly Hills with a resort-style pool, lit tennis court, 15-seat home cinema, fully equipped gym, wine cellar, and a five-car garage with a charging station.\n\nDesigned by a celebrated LA architect with museum-quality contemporary art throughout. Panoramic views of the LA basin from the rooftop sundeck. The kitchen features Wolf and Sub-Zero appliances.\n\nStaffed 24/7: dedicated housekeeper, private chef on request, and concierge. Minimum 3-night stay. Rolls-Royce airport transfer available.",
      propertyType: "MANSION", pricePerNight: 4200, cleaningFee: 500, maxGuests: 16, bedrooms: 8, bathrooms: 7, beds: 10,
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
        "https://images.unsplash.com/photo-1584552284748-08522a4d9e5b?w=1200&q=85",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=85",
      ],
      amenities: ["POOL", "HOT_TUB", "GYM", "PARKING", "WIFI", "KITCHEN", "BBQ_GRILL"],
      city: "Beverly Hills", state: "California", country: "USA", zipCode: "90210", latitude: 34.0736, longitude: -118.4004,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.99, totalReviews: 67, hostId: h3.id,
    },
    // 10
    {
      slug: "forest-tiny-home-stowe-vermont",
      title: "Forest Tiny Home with Mountain Stream — Stowe, Vermont",
      description: "A perfectly crafted 400 sq ft tiny home nestled in a Vermont hardwood forest. Floor-to-ceiling windows flood the interior with golden autumn light, a cast-iron wood-burning stove heats the space on cold nights, and the wrap-around cedar deck overlooks a rushing mountain stream.\n\nWinter: 10 minutes from Stowe Mountain Resort's gondola base. Fall: the foliage colour is so vivid it's almost unreal — trails pass directly from the deck. Summer: swimming holes, fly fishing, and cycling on the Stowe Recreational Path.\n\nStocked on arrival with Vermont maple syrup, local cheese, and fresh bread from a nearby farm.",
      propertyType: "TINY_HOME", pricePerNight: 185, cleaningFee: 40, maxGuests: 2, bedrooms: 1, bathrooms: 1, beds: 1,
      images: [
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=1200&q=85",
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=85",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=85",
        "https://images.unsplash.com/photo-1506260408603-3329b7931f77?w=1200&q=85",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
      ],
      amenities: ["WIFI", "FIREPLACE", "KITCHEN"],
      city: "Stowe", state: "Vermont", country: "USA", zipCode: "05672", latitude: 44.4654, longitude: -72.6874,
      isFeatured: false, instantBook: true, cancellationPolicy: "FLEXIBLE", avgRating: 4.94, totalReviews: 183, hostId: h4.id,
    },
    // 11
    {
      slug: "difc-sky-penthouse-dubai",
      title: "52nd-Floor Sky Penthouse — DIFC, Dubai",
      description: "A three-bedroom penthouse on the 52nd floor of a DIFC tower with 270-degree panoramic views of the Burj Khalifa, Dubai Creek, and the Arabian Gulf glittering at night. Floor-to-ceiling glass walls, a private wraparound terrace, and a rooftop plunge pool with city views in every direction.\n\nThe interior was designed by a Dubai-based studio: Italian marble throughout, bespoke furniture, and a kitchen equipped with Miele appliances. Smart home automation controls everything from lighting to climate from your phone.\n\nConcierge services include: Rolls-Royce airport transfers, private chef, Burj Khalifa At The Top access, and desert safari with dinner.",
      propertyType: "APARTMENT", pricePerNight: 2100, cleaningFee: 300, maxGuests: 6, bedrooms: 3, bathrooms: 3, beds: 3,
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=85",
        "https://images.unsplash.com/photo-1545241047-6083a3684587?w=1200&q=85",
        "https://images.unsplash.com/photo-1535264964596-e12b2eb99fb8?w=1200&q=85",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
      ],
      amenities: ["POOL", "GYM", "WIFI", "PARKING", "AIR_CONDITIONING", "WORKSPACE"],
      city: "Dubai", state: "Dubai", country: "UAE", zipCode: "00000", latitude: 25.2048, longitude: 55.2708,
      isFeatured: false, instantBook: true, cancellationPolicy: "FLEXIBLE", avgRating: 4.88, totalReviews: 76, hostId: h2.id,
    },
    // 12
    {
      slug: "west-village-penthouse-nyc",
      title: "Penthouse with Rooftop Terrace — West Village, New York",
      description: "A stunning pre-war penthouse apartment in the heart of the West Village with a 1,200 sq ft private rooftop terrace offering 360-degree Manhattan skyline views. Original 1920s details — exposed brick, wide-plank oak floors, decorative tin ceilings — meet a carefully considered contemporary renovation.\n\nThe terrace is furnished with outdoor seating for 12, a built-in grill, and a fire pit. On a clear day you can see the Empire State Building, One World Trade, and the Hudson River shimmer from the chaise longues.\n\nSteps from the High Line, Hudson River Park, and the best restaurants in New York. The C/E subway is 2 minutes away.",
      propertyType: "APARTMENT", pricePerNight: 780, cleaningFee: 100, maxGuests: 4, bedrooms: 2, bathrooms: 2, beds: 2,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
        "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1200&q=85",
        "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=1200&q=85",
        "https://images.unsplash.com/photo-1541963463532-d153efee7ee4?w=1200&q=85",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
      ],
      amenities: ["WIFI", "GYM", "AIR_CONDITIONING", "WORKSPACE", "BALCONY"],
      city: "New York", state: "New York", country: "USA", zipCode: "10014", latitude: 40.7359, longitude: -74.0047,
      isFeatured: false, instantBook: true, cancellationPolicy: "MODERATE", avgRating: 4.89, totalReviews: 201, hostId: h3.id,
    },
    // 13
    {
      slug: "amalfi-coast-villa-positano",
      title: "Cliffside Villa with Sea Terrace — Positano, Amalfi Coast",
      description: "A legendary 4-bedroom villa carved into the Positano cliffside with cascading terraces, a private plunge pool, and breathtaking views of the Tyrrhenian Sea and the island of Capri. Accessible only by the property's private water taxi from the village pier — there are no roads.\n\nWake up to the impossibly blue sea beyond lime-washed arches, walk down the winding private steps to the pebble beach below, and watch the sun melt into the sea behind Capri from the terrace over a glass of local Falanghina.\n\nHands-down one of the most spectacular properties on the entire Amalfi Coast. A private chef, fresh seafood deliveries from the village fishermen, and day trips by boat to the Blue Grotto are available.",
      propertyType: "VILLA", pricePerNight: 1680, cleaningFee: 220, maxGuests: 8, bedrooms: 4, bathrooms: 4, beds: 4,
      images: [
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=85",
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=85",
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=85",
        "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1200&q=85",
        "https://images.unsplash.com/photo-1499955085172-a7cd065fbc03?w=1200&q=85",
        "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BALCONY", "AIR_CONDITIONING"],
      city: "Positano", state: "Campania", country: "Italy", zipCode: "84017", latitude: 40.6282, longitude: 14.4840,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.98, totalReviews: 142, hostId: h8.id,
    },
    // 14
    {
      slug: "kyoto-machiya-higashiyama",
      title: "Restored Machiya Townhouse — Higashiyama, Kyoto",
      description: "A meticulously restored 100-year-old machiya (wooden townhouse) in Higashiyama — Kyoto's most atmospheric historic district, steps from the stone-paved Ninenzaka and Sannenzaka lanes that lead to Kiyomizudera Temple.\n\nTatami rooms, sliding shoji screens, a private zen garden with a stone lantern, a cypress wood ofuro soaking bath, and a formal tea ceremony room. Your host Lena provides a private tea ceremony orientation on arrival and a sake tasting in the machiya's kamidana room.\n\nA cultural immersion unlike any other: the Gion geisha district is a 15-minute walk; Nishiki Market is 20 minutes; Fushimi Inari's ten thousand torii gates are a 30-minute train ride.",
      propertyType: "APARTMENT", pricePerNight: 390, cleaningFee: 70, maxGuests: 4, bedrooms: 2, bathrooms: 1, beds: 2,
      images: [
        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=85",
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=85",
        "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&q=85",
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=85",
        "https://images.unsplash.com/photo-1510932144-00cf9a3bba3b?w=1200&q=85",
      ],
      amenities: ["WIFI", "KITCHEN", "AIR_CONDITIONING"],
      city: "Kyoto", state: "Kyoto Prefecture", country: "Japan", zipCode: "605-0000", latitude: 35.0116, longitude: 135.7681,
      isFeatured: true, instantBook: true, cancellationPolicy: "MODERATE", avgRating: 4.96, totalReviews: 319, hostId: h6.id,
    },
    // 15
    {
      slug: "safari-lodge-masai-mara-kenya",
      title: "Private Safari Camp — Masai Mara, Kenya",
      description: "An exclusive 3-tent private bush camp on 5,000 acres of the Masai Mara ecosystem, located deep in the conservancy away from the main reserve crowds. Twice-daily game drives in a private 4x4 Land Cruiser with a professional Maasai guide, sundowners at a bush bar beside the Mara River, and star-lit dinners under an acacia tree.\n\nEach tent is a fully fitted luxury suite: king bed on a raised platform, en-suite bathroom with copper fittings, a claw-foot tub, and a private veranda looking directly onto the savanna.\n\nWildlife year-round: lion prides, leopards, cheetahs, elephants, hippos, and the resident wild dog pack. The Great Migration passes through this section of the Mara from July to October.",
      propertyType: "VILLA", pricePerNight: 2800, cleaningFee: 0, maxGuests: 6, bedrooms: 3, bathrooms: 3, beds: 3,
      images: [
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=85",
        "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=85",
        "https://images.unsplash.com/photo-1547036967-3597aca128e8?w=1200&q=85",
        "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=1200&q=85",
        "https://images.unsplash.com/photo-1551963831-d3034f56983e?w=1200&q=85",
      ],
      amenities: ["WIFI", "POOL"],
      city: "Masai Mara", state: "Narok", country: "Kenya", zipCode: "00000", latitude: -1.5022, longitude: 35.1437,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 5.0, totalReviews: 38, hostId: h4.id,
    },
    // 16
    {
      slug: "cycladic-villa-pool-mykonos",
      title: "Cycladic Villa with Infinity Pool — Ornos, Mykonos",
      description: "A dazzling 3-bedroom Cycladic villa above Ornos Bay with a private infinity pool, breathtaking sunset views over the Aegean, and 5 minutes by scooter to Mykonos Town's famous Little Venice and the iconic windmills.\n\nHandcrafted whitewashed walls, hand-painted blue accents, terracotta terraces, and locally sourced linen throughout. The pool terrace has a shaded pergola, outdoor shower, and a wood-fired pizza oven.\n\nYour host can arrange private boat hire to the archaeological site of Delos, the cave beach of Ftelia, and the beach clubs of Psarou. Mykonos Town's world-class nightlife is a 5-minute taxi ride.",
      propertyType: "VILLA", pricePerNight: 980, cleaningFee: 130, maxGuests: 6, bedrooms: 3, bathrooms: 3, beds: 3,
      images: [
        "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200&q=85",
        "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&q=85",
        "https://images.unsplash.com/photo-1535827359787-a98f4bdf0a5e?w=1200&q=85",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=85",
        "https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BALCONY", "AIR_CONDITIONING", "BBQ_GRILL"],
      city: "Mykonos", state: "South Aegean", country: "Greece", zipCode: "84600", latitude: 37.4467, longitude: 25.3289,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.94, totalReviews: 188, hostId: h1.id,
    },
    // 17
    {
      slug: "patagonia-glass-dome-torres",
      title: "Glass Geodesic Dome — Torres del Paine, Patagonia",
      description: "Sleep under a sea of stars in a glass geodesic dome at the foot of the legendary Torres del Paine massif in Chilean Patagonia. Each dome features a 270-degree glass panorama from the king bed, underfloor radiant heating, a wood-burning stove, and a private hot tub with uninterrupted views of the granite towers.\n\nPackage includes: a guided full-day trek to the Base of the Towers, kayaking on the milky turquoise waters of Grey Lake beside a floating glacier, and all meals prepared by a resident chef using Patagonian lamb and fresh king crab.\n\nOne of the most remote and spectacular landscapes on earth. Wind, silence, condors, guanacos, and an unpolluted night sky with the Milky Way directly overhead.",
      propertyType: "TINY_HOME", pricePerNight: 650, cleaningFee: 80, maxGuests: 2, bedrooms: 1, bathrooms: 1, beds: 1,
      images: [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=85",
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=85",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=85",
        "https://images.unsplash.com/photo-1498084393753-b411b2d26b11?w=1200&q=85",
      ],
      amenities: ["HOT_TUB", "FIREPLACE", "WIFI"],
      city: "Torres del Paine", state: "Magallanes", country: "Chile", zipCode: "6290000", latitude: -50.9423, longitude: -73.4068,
      isFeatured: true, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.99, totalReviews: 54, hostId: h4.id,
    },
    // 18
    {
      slug: "irish-castle-county-galway",
      title: "14th-Century Castle — Lough Corrib, County Galway",
      description: "Sleep in a fully restored 14th-century Irish tower castle overlooking the silver waters of Lough Corrib in the heart of Connemara. Seven bedrooms, a medieval great hall with a roaring open hearth, a billiards room, a library of 3,000 books, and 40 acres of private walled grounds with exclusive fishing rights on one of Ireland's finest brown trout loughs.\n\nThe castle has been in the same family for over 400 years. Your host will share the stories — and the family whiskey — in the great hall on your first evening. A private ghillie is on call for fishing expeditions each morning.\n\nWild Atlantic Way drives, Kylemore Abbey, Connemara National Park, and the Aran Islands ferry are all within easy reach.",
      propertyType: "MANSION", pricePerNight: 1950, cleaningFee: 300, maxGuests: 14, bedrooms: 7, bathrooms: 5, beds: 8,
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85",
        "https://images.unsplash.com/photo-1535637603896-07c179d71103?w=1200&q=85",
        "https://images.unsplash.com/photo-1467269204108-e2929d6a4c19?w=1200&q=85",
        "https://images.unsplash.com/photo-1506260408603-3329b7931f77?w=1200&q=85",
        "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=1200&q=85",
      ],
      amenities: ["FIREPLACE", "WIFI", "KITCHEN", "PARKING", "PET_FRIENDLY"],
      city: "Oughterard", state: "County Galway", country: "Ireland", zipCode: "H91", latitude: 53.4267, longitude: -9.3158,
      isFeatured: false, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.97, totalReviews: 45, hostId: h5.id,
    },
    // 19
    {
      slug: "jungle-beach-house-tulum",
      title: "Architecturally Designed Beach House — Tulum, Mexico",
      description: "An architecturally stunning 3-bedroom home built directly into the jungle on Tulum's famous beach road. Natural volcanic stone floors, a cenote-fed plunge pool in the interior courtyard, open-air living areas with palapa roofing, and a private gate through the dunes to a pristine stretch of Caribbean beach with turquoise water.\n\nSet on a section of beach where bioluminescent plankton illuminates the waves at night. A yoga platform in the jungle, hammocks between palms, a traditional temazcal sweat lodge, and a sound healing circle are all on site.\n\nFurnishings are by local Tulum artisans: hand-formed plaster, local hardwoods, and hand-woven linen. A private chef for daily breakfast and dinner is available.",
      propertyType: "BEACHFRONT", pricePerNight: 560, cleaningFee: 80, maxGuests: 6, bedrooms: 3, bathrooms: 3, beds: 3,
      images: [
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=85",
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=85",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
        "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=85",
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BBQ_GRILL"],
      city: "Tulum", state: "Quintana Roo", country: "Mexico", zipCode: "77780", latitude: 20.2114, longitude: -87.4654,
      isFeatured: true, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.93, totalReviews: 167, hostId: h4.id,
    },
    // 20
    {
      slug: "highland-lodge-loch-lomond",
      title: "Private Lochside Hunting Lodge — Loch Lomond, Scotland",
      description: "A private 5-bedroom hunting lodge on the eastern banks of Loch Lomond with 200 metres of exclusive lochside, a private rowing boat and kayaks, and sweeping views of Ben Lomond reflected in the still water. A wood-fired cedar hot tub sits at the edge of the loch.\n\nThe lodge has a gun room, a tackle room stocked with fly fishing rods, and a vintage Land Rover available for estate use. Red squirrels, red kites, and ospreys are regular visitors to the grounds.\n\nPerfect base for Munro bagging — Ben Lomond summit is reachable directly from the estate. The Trossachs National Park, the Drovers Inn, and the whisky distilleries of Loch Lomond are all close by.",
      propertyType: "CABIN", pricePerNight: 720, cleaningFee: 100, maxGuests: 10, bedrooms: 5, bathrooms: 4, beds: 6,
      images: [
        "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=1200&q=85",
        "https://images.unsplash.com/photo-1506260408603-3329b7931f77?w=1200&q=85",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=85",
        "https://images.unsplash.com/photo-1513614835788-0fe0a8d80e22?w=1200&q=85",
      ],
      amenities: ["HOT_TUB", "FIREPLACE", "WIFI", "KITCHEN", "PARKING", "BBQ_GRILL", "PET_FRIENDLY"],
      city: "Loch Lomond", state: "Argyll and Bute", country: "Scotland", zipCode: "G83", latitude: 56.1612, longitude: -4.5844,
      isFeatured: false, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.95, totalReviews: 92, hostId: h5.id,
    },
    // 21
    {
      slug: "clifftop-surf-villa-uluwatu-bali",
      title: "Clifftop Surf Villa above Uluwatu — Bali, Indonesia",
      description: "A 3-bedroom clifftop villa dramatically positioned 50 metres above one of the world's most legendary surf breaks — Uluwatu. The private infinity pool hangs over the edge of the limestone cliff with nothing between you and the Indian Ocean horizon.\n\nAn open-air living pavilion, private path down limestone stairs through sea caves to the surf beach, and daily breakfast prepared by a house cook. Surfboards and a surfguide to the Bukit Peninsula's best breaks are available on request.\n\nThe sacred Uluwatu Temple perches on a cliff just 10 minutes walk away. Sunsets there — with the gamelan music and the surfers below — are among Bali's most extraordinary experiences.",
      propertyType: "VILLA", pricePerNight: 480, cleaningFee: 70, maxGuests: 6, bedrooms: 3, bathrooms: 3, beds: 3,
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85",
        "https://images.unsplash.com/photo-1542810634-71277d2d1c10?w=1200&q=85",
        "https://images.unsplash.com/photo-1532635042-a5f67d818c17?w=1200&q=85",
        "https://images.unsplash.com/photo-1504932604892-94b523e2df97?w=1200&q=85",
        "https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "AIR_CONDITIONING", "BBQ_GRILL"],
      city: "Uluwatu", state: "Bali", country: "Indonesia", zipCode: "80361", latitude: -8.8291, longitude: 115.0849,
      isFeatured: false, instantBook: true, cancellationPolicy: "FLEXIBLE", avgRating: 4.92, totalReviews: 231, hostId: h7.id,
    },
    // 22
    {
      slug: "daintree-rainforest-treehouse-australia",
      title: "Luxury Rainforest Treehouse — Daintree, Queensland",
      description: "A luxury treehouse suspended 8 metres above the floor of the Daintree Rainforest — the world's oldest tropical rainforest, older than the Amazon. The open-air deck looks out over an unbroken forest canopy towards the Coral Sea, visible on clear mornings as a thin blue line.\n\nCassowaries and Boyd's forest dragons patrol the property. Walk the private rainforest path to a secluded freshwater swimming hole, kayak the Daintree River at dawn for crocodile sightings, and snorkel the Great Barrier Reef — Cape Tribulation is a 20-minute drive.\n\nA cold-brew bar, hammock deck, and chef-prepared breakfasts are included. Solar-powered, rainwater-fed — stays here leave no trace.",
      propertyType: "TREEHOUSE", pricePerNight: 390, cleaningFee: 65, maxGuests: 2, bedrooms: 1, bathrooms: 1, beds: 1,
      images: [
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85",
        "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&q=85",
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=85",
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&q=85",
        "https://images.unsplash.com/photo-1492681290223-6190a6bcf7e6?w=1200&q=85",
      ],
      amenities: ["WIFI", "KITCHEN", "AIR_CONDITIONING"],
      city: "Cape Tribulation", state: "Queensland", country: "Australia", zipCode: "4873", latitude: -16.0564, longitude: 145.4619,
      isFeatured: false, instantBook: true, cancellationPolicy: "FLEXIBLE", avgRating: 4.97, totalReviews: 78, hostId: h4.id,
    },
    // 23
    {
      slug: "luxury-riad-marrakech-medina",
      title: "17th-Century Luxury Riad — Marrakech Medina, Morocco",
      description: "A 5-bedroom 17th-century riad in the heart of the ancient Marrakech Medina, restored by master craftsmen over three years. A central courtyard plunge pool shaded by orange and jasmine, hand-laid zellige tilework in 14 colours, hand-carved Atlas cedar ceilings, and a rooftop terrace with Atlas Mountain views at sunset.\n\nPrivate hammam and traditional gommage scrub, a resident chef serving Moroccan mezze and tagine, and guided medina tours through the souks, tanneries, and Djemaa el-Fna square are all included.\n\nThe riad is perfectly positioned: the Bahia Palace and Saadian Tombs are 5 minutes walk; the Majorelle Garden is a 15-minute taxi ride.",
      propertyType: "VILLA", pricePerNight: 650, cleaningFee: 100, maxGuests: 10, bedrooms: 5, bathrooms: 5, beds: 5,
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
        "https://images.unsplash.com/photo-1553913861-c4a0ff7ab5c1?w=1200&q=85",
        "https://images.unsplash.com/photo-1560981534-b8a6b29bc9ed?w=1200&q=85",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "AIR_CONDITIONING"],
      city: "Marrakech", state: "Marrakech-Safi", country: "Morocco", zipCode: "40000", latitude: 31.6295, longitude: -7.9811,
      isFeatured: true, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.96, totalReviews: 126, hostId: h2.id,
    },
    // 24
    {
      slug: "ocean-beach-house-east-hampton",
      title: "Oceanfront Shingle Beach House — East Hampton, New York",
      description: "A classic 5-bedroom shingled beach house on a 200-metre private stretch of ocean beach in East Hampton, the most exclusive address on New York's East End. A wraparound porch, a Wolf range chef's kitchen, a heated outdoor pool with cabana, and a private dune path through sea grass directly to the surf.\n\nThe quintessential Hamptons summer: ocean swimming at sunrise, farm stands at Iacono Farm, dinner reservations at Nick & Toni's, and a round at Maidstone Club. A beach house manager is on site.\n\nThe property sleeps 10 and is ideal for a multi-family summer escape from the city.",
      propertyType: "BEACHFRONT", pricePerNight: 2400, cleaningFee: 350, maxGuests: 10, bedrooms: 5, bathrooms: 4, beds: 6,
      images: [
        "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&q=85",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
        "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=85",
        "https://images.unsplash.com/photo-1563379091775-d87893150ed4?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BBQ_GRILL", "PARKING"],
      city: "East Hampton", state: "New York", country: "USA", zipCode: "11937", latitude: 40.9629, longitude: -72.1851,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.91, totalReviews: 83, hostId: h3.id,
    },
    // 25
    {
      slug: "lake-como-villa-varenna",
      title: "19th-Century Villa on Lake Como — Varenna, Italy",
      description: "A breathtaking 4-bedroom 19th-century Lombard villa on the shores of Lake Como in the charming village of Varenna — consistently voted one of the most beautiful villages in Italy. Descend your private garden staircase to a lakefront dock, take the property's mahogany launch to Bellagio, Menaggio, and Tremezzina, and dine on the terrace as the evening lights of Como reflect on the dark water.\n\nThe villa has a freshwater pool, a baroque chapel recently restored for weddings, a cellar with 400 bottles of Lombardy wine, and a library of art books and local maps.\n\nFurnished with original 19th-century antiques and Murano glass chandeliers — this is one of the most elegant properties on the entire lake.",
      propertyType: "VILLA", pricePerNight: 1350, cleaningFee: 180, maxGuests: 8, bedrooms: 4, bathrooms: 4, beds: 4,
      images: [
        "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1200&q=85",
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=85",
        "https://images.unsplash.com/photo-1464891157481-3a89b87c75b7?w=1200&q=85",
        "https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=1200&q=85",
        "https://images.unsplash.com/photo-1499955085172-a7cd065fbc03?w=1200&q=85",
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BALCONY", "PARKING"],
      city: "Varenna", state: "Lombardy", country: "Italy", zipCode: "23829", latitude: 46.0093, longitude: 9.2848,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.99, totalReviews: 97, hostId: h8.id,
    },
    // 26
    {
      slug: "villa-cap-antibes-french-riviera",
      title: "Belle Époque Villa — Cap d'Antibes, French Riviera",
      description: "A magnificent Belle Époque villa on the wooded Cap d'Antibes peninsula with a private Mediterranean garden, heated pool, and a sunbathing terrace with views over the Baie des Anges towards Nice. Five bedrooms, original 1900s mosaic floors, vaulted stone ceilings, and antique Provençal furnishings throughout.\n\nA private chef serves Niçoise cuisine; a sailing yacht is available for day charters to the Îles de Lérins and Monaco. Cannes is 15 minutes by car, Juan-les-Pins' jazz festival is 10 minutes, and Monte Carlo is 45 minutes on the coastal road.\n\nThe grounds include a petanque court, a hammock garden, and a private path through the pines to a secluded rocky cove.",
      propertyType: "VILLA", pricePerNight: 2200, cleaningFee: 280, maxGuests: 10, bedrooms: 5, bathrooms: 4, beds: 5,
      images: [
        "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1200&q=85",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
        "https://images.unsplash.com/photo-1464891157481-3a89b87c75b7?w=1200&q=85",
        "https://images.unsplash.com/photo-1499955085172-a7cd065fbc03?w=1200&q=85",
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BALCONY", "BBQ_GRILL", "PARKING", "AIR_CONDITIONING"],
      city: "Antibes", state: "Provence-Alpes-Côte d'Azur", country: "France", zipCode: "06600", latitude: 43.5635, longitude: 7.1147,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.97, totalReviews: 64, hostId: h5.id,
    },
    // 27
    {
      slug: "infinity-villa-phuket-thailand",
      title: "Hillside Infinity Pool Villa — Kamala, Phuket",
      description: "A five-bedroom contemporary villa on a forested hillside above the Andaman Sea with a 20-metre infinity pool that appears to merge directly with the ocean horizon. The villa is built on three levels — each with expansive glass walls that fold away to create fully open-air living in the warm sea breeze.\n\nA daily villa manager, private chef serving Thai and international cuisine, daily breakfast, and an on-call driver are all included. Kamala Beach is a 3-minute drive, Patong's nightlife is 15 minutes, and Kata Noi — consistently rated one of Asia's best beaches — is 20 minutes.\n\nHelicopter tours of the Phi Phi Islands and private longtail boat charters to uninhabited bays can be arranged.",
      propertyType: "VILLA", pricePerNight: 780, cleaningFee: 110, maxGuests: 10, bedrooms: 5, bathrooms: 5, beds: 5,
      images: [
        "https://images.unsplash.com/photo-1602343168117-bb8eca3e5e5e?w=1200&q=85",
        "https://images.unsplash.com/photo-1584553421349-b8a879dbc8ac?w=1200&q=85",
        "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=1200&q=85",
        "https://images.unsplash.com/photo-1589714379580-2b1ae0a33fd2?w=1200&q=85",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=85",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "AIR_CONDITIONING", "PARKING", "GYM", "BBQ_GRILL"],
      city: "Kamala", state: "Phuket", country: "Thailand", zipCode: "83150", latitude: 7.9519, longitude: 98.2777,
      isFeatured: true, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.93, totalReviews: 144, hostId: h2.id,
    },
    // 28
    {
      slug: "sognefjord-cabin-norway",
      title: "Cliffside Fjord Cabin — Sognefjord, Norway",
      description: "A beautifully designed Norwegian cabin clinging to a granite cliff face 80 metres above the Sognefjord — the world's deepest and longest fjord. Floor-to-ceiling glass frames a view that is widely considered one of the most dramatic in all of Scandinavia: mountains rising sheer from dark water in every direction.\n\nThe cabin is accessed by a private road and a short walk down a stone path. A private sauna and a hot pool heated by a wood-fired stove sit on the rock outside. Fishing rods, kayaks, and a rowing boat are provided.\n\nSummer: midnight sun, hiking to glacier viewpoints, and wild swimming in the fjord. Winter: Northern Lights visible from the cabin's glass-walled bedroom.",
      propertyType: "CABIN", pricePerNight: 520, cleaningFee: 80, maxGuests: 4, bedrooms: 2, bathrooms: 1, beds: 2,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=1200&q=85",
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85",
        "https://images.unsplash.com/photo-1519131775-73a0888e3b32?w=1200&q=85",
      ],
      amenities: ["HOT_TUB", "FIREPLACE", "WIFI", "KITCHEN", "PARKING"],
      city: "Flåm", state: "Vestland", country: "Norway", zipCode: "5743", latitude: 60.8634, longitude: 7.1151,
      isFeatured: false, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.96, totalReviews: 87, hostId: h5.id,
    },
    // 29
    {
      slug: "hilltop-villa-taormina-sicily",
      title: "Baroque Villa with Etna Views — Taormina, Sicily",
      description: "A 4-bedroom baroque villa perched 250 metres above the sea in Taormina — one of Sicily's most celebrated hilltop towns — with a heated terrace pool, sweeping views of Mount Etna in one direction and the Ionian Sea in the other, and a private garden of citrus, jasmine, and bougainvillea.\n\nThe ancient Greek theatre of Taormina is 10 minutes walk; the cable car to the black-sand beach of Mazzarò is 5 minutes. A private chef prepares Sicilian breakfast daily and can arrange arancini lunches and pistachio granita afternoons.\n\nAn ideal base for exploring the temples of Agrigento, the baroque streets of Noto, and an ascent to the crater of Etna.",
      propertyType: "VILLA", pricePerNight: 890, cleaningFee: 120, maxGuests: 8, bedrooms: 4, bathrooms: 3, beds: 4,
      images: [
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=85",
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=85",
        "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1200&q=85",
        "https://images.unsplash.com/photo-1499955085172-a7cd065fbc03?w=1200&q=85",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BALCONY", "AIR_CONDITIONING", "BBQ_GRILL"],
      city: "Taormina", state: "Sicily", country: "Italy", zipCode: "98039", latitude: 37.8516, longitude: 15.2886,
      isFeatured: false, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.94, totalReviews: 109, hostId: h8.id,
    },
    // 30
    {
      slug: "clifftop-house-cape-town",
      title: "Clifftop House with Ocean Views — Bantry Bay, Cape Town",
      description: "A five-bedroom contemporary clifftop house in Bantry Bay with uninterrupted views of the Atlantic Ocean, Robben Island, and the Twelve Apostles mountain range from every room. An infinity pool appears to pour into the sea below, and a glass-enclosed deck makes the views from breakfast unforgettable in every weather.\n\nA short walk to Clifton's four beaches — consistently rated among the most beautiful urban beaches in the world — and 10 minutes to the restaurants and nightlife of the V&A Waterfront.\n\nTable Mountain National Park is visible from the pool; the cable car to the summit is 15 minutes by car. A private wine tour of the Stellenbosch and Franschhoek winelands is a 45-minute drive.",
      propertyType: "VILLA", pricePerNight: 1100, cleaningFee: 150, maxGuests: 10, bedrooms: 5, bathrooms: 4, beds: 5,
      images: [
        "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200&q=85",
        "https://images.unsplash.com/photo-1559570814-7b8dc8ac4d97?w=1200&q=85",
        "https://images.unsplash.com/photo-1594640422492-2bd7e4f5ef7b?w=1200&q=85",
        "https://images.unsplash.com/photo-1531978253-c4f48b9e4a0e?w=1200&q=85",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BALCONY", "GYM", "PARKING", "AIR_CONDITIONING"],
      city: "Cape Town", state: "Western Cape", country: "South Africa", zipCode: "8005", latitude: -33.9249, longitude: 18.4241,
      isFeatured: true, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.95, totalReviews: 73, hostId: h3.id,
    },
    // 31
    {
      slug: "cotswolds-manor-house-england",
      title: "Georgian Manor House — Chipping Campden, Cotswolds",
      description: "A stately 6-bedroom Georgian manor house in the golden-stone village of Chipping Campden, the most picturesque village in the Cotswolds. Eight acres of walled garden with a kitchen garden, heated outdoor pool, a hard tennis court, and a croquet lawn.\n\nInteriors feature original Georgian cornicing, open fireplaces in every reception room, and a library that was unchanged when Agatha Christie visited in 1934. The Aga kitchen is equipped for serious cooking.\n\nThe Cotswold Way walking path passes through the grounds. Stratford-upon-Avon (Shakespeare's birthplace) is 12 miles; Blenheim Palace is 20 miles. Available for weddings and celebrations.",
      propertyType: "MANSION", pricePerNight: 1200, cleaningFee: 180, maxGuests: 12, bedrooms: 6, bathrooms: 5, beds: 7,
      images: [
        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1200&q=85",
        "https://images.unsplash.com/photo-1599458252573-56ae36120de1?w=1200&q=85",
        "https://images.unsplash.com/photo-1452784444945-3f422708fe5e?w=1200&q=85",
        "https://images.unsplash.com/photo-1467269204108-e2929d6a4c19?w=1200&q=85",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "PARKING", "FIREPLACE", "PET_FRIENDLY", "BBQ_GRILL"],
      city: "Chipping Campden", state: "Gloucestershire", country: "England", zipCode: "GL55", latitude: 52.0551, longitude: -1.7779,
      isFeatured: false, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.98, totalReviews: 55, hostId: h6.id,
    },
    // 32
    {
      slug: "island-villa-hvar-croatia",
      title: "Adriatic Stone Villa with Pool — Hvar Island, Croatia",
      description: "A restored 16th-century Dalmatian stone villa on the sun-drenched island of Hvar — the sunniest in all of Europe at over 2,700 hours of sun per year. Four bedrooms, a heated infinity pool overlooking the Pakleni Islands archipelago, fragrant lavender terraces, and a private stone pier for swimming and mooring.\n\nHvar Town's medieval walls, harbour and legendary nightlife are a 20-minute boat ride or 30-minute drive. Your host keeps a 6-metre gig dinghy at the pier — available to guests for island-hopping to Vis, Brač, and the blue lagoon at Budikovac.\n\nFresh sea urchin, octopus peka, and Plavac Mali wine from local vineyards will be waiting in the kitchen on arrival.",
      propertyType: "VILLA", pricePerNight: 760, cleaningFee: 100, maxGuests: 8, bedrooms: 4, bathrooms: 3, beds: 4,
      images: [
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=85",
        "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1200&q=85",
        "https://images.unsplash.com/photo-1499955085172-a7cd065fbc03?w=1200&q=85",
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=85",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BALCONY", "BBQ_GRILL", "AIR_CONDITIONING"],
      city: "Hvar", state: "Split-Dalmatia", country: "Croatia", zipCode: "21450", latitude: 43.1729, longitude: 16.4412,
      isFeatured: false, instantBook: true, cancellationPolicy: "MODERATE", avgRating: 4.91, totalReviews: 162, hostId: h1.id,
    },
    // 33
    {
      slug: "heritage-palace-jaipur-india",
      title: "Maharaja's Heritage Palace — Jaipur, Rajasthan",
      description: "An extraordinary opportunity to stay in a genuine Rajput palace within the Pink City of Jaipur, once the private residence of a maharaja's family. Twelve rooms of soaring proportions with hand-painted fresco ceilings, courtyard fountains, a marble swimming pool in the zenana garden, and sweeping views over Jaipur's rooftops to the Aravalli hills.\n\nA team of ten staff includes a personal butler, chef specialising in authentic Rajasthani cuisine, and a cultural guide for private tours of the City Palace, Amber Fort, and the astronomical Jantar Mantar observatory.\n\nElephant polo lessons at the palace grounds, block-printing workshops in the haveli, and sunrise hot-air balloon flights over the forts are arranged on request.",
      propertyType: "MANSION", pricePerNight: 1600, cleaningFee: 200, maxGuests: 24, bedrooms: 12, bathrooms: 10, beds: 14,
      images: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=85",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=85",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "PARKING", "GYM", "AIR_CONDITIONING"],
      city: "Jaipur", state: "Rajasthan", country: "India", zipCode: "302001", latitude: 26.9124, longitude: 75.7873,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.98, totalReviews: 41, hostId: h2.id,
    },
    // 34
    {
      slug: "mountain-lodge-banff-canada",
      title: "Luxury Mountain Lodge — Banff, Alberta, Canada",
      description: "A stunning 5-bedroom timber-and-stone lodge on 12 private acres in the Canadian Rockies, 15 minutes from the village of Banff and the Banff gondola. Floor-to-ceiling windows frame a view of the snow-capped peaks of the Bow Valley, elk graze on the meadow in the morning, and the Milky Way stretches directly over the hot tub on winter nights.\n\nThe lodge has a cinema room, a professional ski-waxing bench, a wood-fired sauna, and a games room. Three ski resorts — Ski Banff, Lake Louise, and Sunshine Village — are all within 30 minutes.\n\nSummer brings white-water rafting on the Bow River, heli-hiking on the Wapta Icefield, and fishing for bull trout in crystal-clear mountain streams.",
      propertyType: "CABIN", pricePerNight: 820, cleaningFee: 130, maxGuests: 10, bedrooms: 5, bathrooms: 4, beds: 6,
      images: [
        "https://images.unsplash.com/photo-1519521508-ede9c7e8c34c?w=1200&q=85",
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=85",
        "https://images.unsplash.com/photo-1506260408603-3329b7931f77?w=1200&q=85",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=85",
        "https://images.unsplash.com/photo-1498084393753-b411b2d26b11?w=1200&q=85",
        "https://images.unsplash.com/photo-1513614835788-0fe0a8d80e22?w=1200&q=85",
      ],
      amenities: ["HOT_TUB", "FIREPLACE", "WIFI", "KITCHEN", "PARKING", "GYM"],
      city: "Banff", state: "Alberta", country: "Canada", zipCode: "T1L 1B3", latitude: 51.1784, longitude: -115.5708,
      isFeatured: false, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.96, totalReviews: 119, hostId: h5.id,
    },
    // 35
    {
      slug: "cliffside-estate-kauai-hawaii",
      title: "Private Cliffside Estate — Na Pali Coast, Kauai",
      description: "An extraordinary private estate on 5 acres of Kauai's legendary North Shore with dramatic Na Pali Coast cliffs visible from the lanai, a 360-degree ocean view infinity pool, and a lava-rock outdoor shower under a canopy of plumeria trees.\n\nFour bedrooms, a full outdoor kitchen with koa wood bar, a private path down to a secluded black-sand beach cove, and daily housekeeping. Fresh pineapples, papayas, and coconuts from the property's own trees are left in the kitchen each morning.\n\nHelicopter tours of the Na Pali Coast and Waimea Canyon, surfing lessons at Hanalei Bay, and snorkelling at Tunnels Beach are 20 minutes away.",
      propertyType: "VILLA", pricePerNight: 1900, cleaningFee: 250, maxGuests: 8, bedrooms: 4, bathrooms: 4, beds: 4,
      images: [
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=85",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
        "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=85",
        "https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=1200&q=85",
        "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BBQ_GRILL", "PARKING", "AIR_CONDITIONING"],
      city: "Princeville", state: "Hawaii", country: "USA", zipCode: "96722", latitude: 22.2236, longitude: -159.4814,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.99, totalReviews: 48, hostId: h3.id,
    },
    // 36
    {
      slug: "rooftop-penthouse-barcelona",
      title: "Rooftop Penthouse with Terrace Pool — Eixample, Barcelona",
      description: "A spectacular two-bedroom penthouse on the 8th floor of a Modernista building in Barcelona's prestigious Eixample district with a 120 sq m rooftop terrace, a heated plunge pool, and 360-degree views over the city's rooftops to the sea and Tibidabo hill.\n\nGaudi's Sagrada Família is visible from the terrace (10 minutes walk); Casa Batlló and Casa Milà are 5 minutes; Las Ramblas is 15 minutes. The neighbourhood's best vermouth bars and pintxos restaurants are directly below.\n\nThe apartment was designed by a Barcelona studio with polished concrete floors, custom furniture by local makers, and an open-plan kitchen perfect for cooking a market-fresh paella.",
      propertyType: "APARTMENT", pricePerNight: 680, cleaningFee: 90, maxGuests: 4, bedrooms: 2, bathrooms: 2, beds: 2,
      images: [
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200&q=85",
        "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1200&q=85",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
        "https://images.unsplash.com/photo-1541963463532-d153efee7ee4?w=1200&q=85",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BALCONY", "AIR_CONDITIONING", "WORKSPACE"],
      city: "Barcelona", state: "Catalonia", country: "Spain", zipCode: "08009", latitude: 41.3917, longitude: 2.1650,
      isFeatured: false, instantBook: true, cancellationPolicy: "FLEXIBLE", avgRating: 4.90, totalReviews: 248, hostId: h6.id,
    },
    // 37
    {
      slug: "rice-terrace-villa-ubud-bali",
      title: "Rice Terrace Jungle Villa — Ubud, Bali",
      description: "A 3-bedroom open-air villa set directly among the working rice terraces of Ubud's Tegallalang valley, with a private swimming pool overlooking a 300-metre drop through layers of emerald rice paddies and jungle canopy. Genuine Balinese architecture: hand-carved stone gates, bamboo pavilions open to the valley, and an outdoor stone bathtub.\n\nMorning yoga on the infinity deck as farmers tend the terraces below, afternoon cooking classes using spices from the garden, and evening temple ceremonies at the village pura (shrine) a 5-minute walk away.\n\nThe Ubud Royal Palace, Monkey Forest, and the best spa retreats in Bali are all 15 minutes by scooter.",
      propertyType: "VILLA", pricePerNight: 350, cleaningFee: 55, maxGuests: 6, bedrooms: 3, bathrooms: 3, beds: 3,
      images: [
        "https://images.unsplash.com/photo-1518639192-c84797584b5a?w=1200&q=85",
        "https://images.unsplash.com/photo-1588880331179-37a7c7e66c37?w=1200&q=85",
        "https://images.unsplash.com/photo-1564501049412-61a4c441e27b?w=1200&q=85",
        "https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200&q=85",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "AIR_CONDITIONING", "BBQ_GRILL"],
      city: "Ubud", state: "Bali", country: "Indonesia", zipCode: "80571", latitude: -8.5069, longitude: 115.2625,
      isFeatured: true, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.95, totalReviews: 176, hostId: h7.id,
    },
    // 38
    {
      slug: "mountain-estate-queenstown-nz",
      title: "Alpine Estate with Private Lake — Queenstown, New Zealand",
      description: "A magnificent 4-bedroom contemporary alpine estate on a private 20-acre property above Queenstown with its own glacially fed lake, a heated outdoor pool framed by beech forest, and panoramic views of the Remarkables mountain range across Lake Wakatipu.\n\nThe estate includes a private jetty for kayaking and wild swimming, a large workshop with a mountain bike collection, and a chef's kitchen stocked with Central Otago pinot noir. Daily housekeeping included.\n\nBungee jumping at Kawarau Bridge is 20 minutes; Coronet Peak ski resort is 25 minutes; Milford Sound is 3 hours by scenic drive through Fiordland National Park.",
      propertyType: "VILLA", pricePerNight: 1100, cleaningFee: 160, maxGuests: 8, bedrooms: 4, bathrooms: 3, beds: 4,
      images: [
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=1200&q=85",
        "https://images.unsplash.com/photo-1506260408603-3329b7931f77?w=1200&q=85",
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=85",
      ],
      amenities: ["POOL", "HOT_TUB", "FIREPLACE", "WIFI", "KITCHEN", "PARKING", "PET_FRIENDLY"],
      city: "Queenstown", state: "Otago", country: "New Zealand", zipCode: "9300", latitude: -45.0312, longitude: 168.6626,
      isFeatured: false, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.97, totalReviews: 63, hostId: h5.id,
    },
    // 39
    {
      slug: "alpine-chalet-cortina-dolomites",
      title: "Dolomite Chalet with Mountain Views — Cortina d'Ampezzo",
      description: "A traditional 4-bedroom Ladin chalet with flower-covered balconies in Cortina d'Ampezzo — the Queen of the Dolomites and host city of the 2026 Winter Olympics. Ski in/out access to the Dolomiti Superski area (1,200km of pistes), stone fireplace, outdoor hot tub, and exceptional views of the Tofane, Cristallo, and Faloria massifs.\n\nThe chalet is furnished with handcrafted locally-made Alpine furniture, antique skis, and original oil paintings of the Dolomites. A guide service for ski mountaineering and via ferrata climbing in the UNESCO World Heritage rock formations is available.\n\nSummer: cycling the Giro d'Italia mountain stages, hiking the Alta Via 1, and lake swimming at Lago di Misurina.",
      propertyType: "CABIN", pricePerNight: 960, cleaningFee: 140, maxGuests: 8, bedrooms: 4, bathrooms: 3, beds: 5,
      images: [
        "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1200&q=85",
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85",
        "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200&q=85",
        "https://images.unsplash.com/photo-1513614835788-0fe0a8d80e22?w=1200&q=85",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=1200&q=85",
      ],
      amenities: ["HOT_TUB", "FIREPLACE", "WIFI", "KITCHEN", "PARKING"],
      city: "Cortina d'Ampezzo", state: "Veneto", country: "Italy", zipCode: "32043", latitude: 46.5404, longitude: 12.1357,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.94, totalReviews: 82, hostId: h8.id,
    },
    // 40
    {
      slug: "chateau-loire-valley-france",
      title: "Renaissance Château — Loire Valley, France",
      description: "A 16th-century Renaissance château in the heart of the Loire Valley — the Garden of France — with 10 acres of formal French gardens designed by a student of Le Nôtre, an outdoor heated pool in the walled orangerie, and private cellars stocked with Sancerre, Vouvray, and Chinon.\n\nEight bedrooms with original carved stone fireplaces, antique four-poster beds, and tapestries. A resident chef prepares table d'hôte dinners in the grand dining room for groups who request it.\n\nThe châteaux of Chambord, Chenonceau, and Amboise are all within 30 minutes by car. Guided cycling through vineyard villages along the Loire à Vélo cycling route starts directly from the property.",
      propertyType: "MANSION", pricePerNight: 2800, cleaningFee: 400, maxGuests: 16, bedrooms: 8, bathrooms: 6, beds: 9,
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=85",
        "https://images.unsplash.com/photo-1599458252573-56ae36120de1?w=1200&q=85",
        "https://images.unsplash.com/photo-1467269204108-e2929d6a4c19?w=1200&q=85",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        "https://images.unsplash.com/photo-1546032364-affaeafbe689?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "PARKING", "FIREPLACE", "PET_FRIENDLY"],
      city: "Amboise", state: "Centre-Val de Loire", country: "France", zipCode: "37400", latitude: 47.4131, longitude: 0.9834,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 4.98, totalReviews: 36, hostId: h5.id,
    },
    // 41
    {
      slug: "riverside-palace-porto-portugal",
      title: "19th-Century Palace on the Douro — Porto, Portugal",
      description: "A meticulously restored 19th-century azulejo-tiled palace on the banks of the Douro River in Porto's historic Ribeira quarter, a UNESCO World Heritage Site. Six bedrooms with river views, a private courtyard with a fountain and orange trees, and a cellar of 200 vintage Port wines.\n\nWalk across the Dom Luís I Bridge to the port wine lodges of Vila Nova de Gaia for a private tasting. The Lello bookshop (inspiration for Harry Potter's Flourish and Blotts), the São Bento azulejo station, and Mercado do Bolhão are all within walking distance.\n\nA private Douro Valley wine tour by vintage train through terraced vineyards can be arranged.",
      propertyType: "VILLA", pricePerNight: 720, cleaningFee: 95, maxGuests: 12, bedrooms: 6, bathrooms: 5, beds: 6,
      images: [
        "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1200&q=85",
        "https://images.unsplash.com/photo-1534438327725-e0abfbdb3a81?w=1200&q=85",
        "https://images.unsplash.com/photo-1523906834658-5e862ad06fa7?w=1200&q=85",
        "https://images.unsplash.com/photo-1553913861-c4a0ff7ab5c1?w=1200&q=85",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
      ],
      amenities: ["WIFI", "KITCHEN", "BALCONY", "AIR_CONDITIONING", "PARKING"],
      city: "Porto", state: "Norte", country: "Portugal", zipCode: "4050", latitude: 41.1579, longitude: -8.6291,
      isFeatured: false, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.93, totalReviews: 114, hostId: h6.id,
    },
    // 42
    {
      slug: "beachfront-villa-zanzibar",
      title: "Swahili Beachfront Villa — Nungwi, Zanzibar",
      description: "A 4-bedroom Swahili villa on the ivory-white beach of Nungwi at the northern tip of Zanzibar, built with traditional makuti thatching, hand-carved Zanzibari doors, and a private pool that looks directly onto the Indian Ocean. The beach here has no tides — the water is warm and calm year-round.\n\nA daily dhow breakfast sailing trip among the fishing boats is included. Fresh Zanzibar spices — cloves, cinnamon, vanilla — are used by the resident chef in breakfasts and suppers. The Stone Town spice tour and Prison Island tortoise sanctuary are day-trip highlights.\n\nNungwi's reef diving — including a world-class wall dive at Mnemba Atoll — is steps from the villa.",
      propertyType: "BEACHFRONT", pricePerNight: 680, cleaningFee: 90, maxGuests: 8, bedrooms: 4, bathrooms: 4, beds: 4,
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85",
        "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1200&q=85",
        "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1200&q=85",
        "https://images.unsplash.com/photo-1534447677616-e117b0b8f7bf?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "AIR_CONDITIONING", "BBQ_GRILL"],
      city: "Nungwi", state: "Zanzibar North", country: "Tanzania", zipCode: "00000", latitude: -5.7248, longitude: 39.2979,
      isFeatured: false, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.95, totalReviews: 59, hostId: h2.id,
    },
    // 43
    {
      slug: "glass-cabin-iceland-northern-lights",
      title: "Glass Cabin — Northern Lights, South Iceland",
      description: "A custom-built glass cabin on a lava field in South Iceland designed so you can watch the Aurora Borealis dancing overhead from the warmth of a king-size bed. The entire front wall and ceiling are triple-glazed glass; the other walls are insulated black timber. A private geo-thermal outdoor hot pool is lit by the aurora.\n\nIceland's greatest attractions are within 90 minutes: the Golden Circle (Geysir, Gullfoss, Þingvellir), the black-sand beaches of Vík, ice cave glacier hikes, and snorkelling between tectonic plates at Silfra.\n\nNorthern Lights season: September to March. Midnight sun: May to August. Available year-round for different landscapes.",
      propertyType: "TINY_HOME", pricePerNight: 490, cleaningFee: 70, maxGuests: 2, bedrooms: 1, bathrooms: 1, beds: 1,
      images: [
        "https://images.unsplash.com/photo-1504714664-53e85bbca46a?w=1200&q=85",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=85",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85",
        "https://images.unsplash.com/photo-1531978253-c4f48b9e4a0e?w=1200&q=85",
        "https://images.unsplash.com/photo-1529258283458-d60b3fdb8e6e?w=1200&q=85",
      ],
      amenities: ["HOT_TUB", "WIFI", "KITCHEN", "FIREPLACE"],
      city: "Selfoss", state: "South", country: "Iceland", zipCode: "800", latitude: 63.9332, longitude: -21.0020,
      isFeatured: true, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.98, totalReviews: 93, hostId: h4.id,
    },
    // 44
    {
      slug: "private-island-villa-maldives-baa",
      title: "Private Island Villa — Baa Atoll, Maldives",
      description: "The ultimate private island experience: a single villa occupying its own tiny coral island in the Baa Atoll UNESCO Biosphere Reserve — 360 degrees of turquoise Indian Ocean in every direction. Three bedrooms, a wraparound deck over the water, a freshwater pool, and a shallow coral lagoon so clear you can count individual fish from the breakfast table.\n\nIncludes: twice-daily manta ray snorkelling at Hanifaru Bay (the world's largest manta aggregation site, October–May), a private motorised dhoni for island-hopping, daily chef-prepared meals, and a dedicated resort butler.\n\nAccessible only by a 30-minute seaplane from Velana International Airport.",
      propertyType: "VILLA", pricePerNight: 3800, cleaningFee: 0, maxGuests: 6, bedrooms: 3, bathrooms: 3, beds: 3,
      images: [
        "https://images.unsplash.com/photo-1548102245-c79dbcfa9f92?w=1200&q=85",
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&q=85",
        "https://images.unsplash.com/photo-1534447677616-e117b0b8f7bf?w=1200&q=85",
        "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=85",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85",
        "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "AIR_CONDITIONING"],
      city: "Baa Atoll", state: "South Maalhosmadulu", country: "Maldives", zipCode: "20215", latitude: 5.2249, longitude: 73.1019,
      isFeatured: true, instantBook: false, cancellationPolicy: "STRICT", avgRating: 5.0, totalReviews: 22, hostId: h2.id,
    },
    // 45
    {
      slug: "medieval-tower-san-gimignano-tuscany",
      title: "Medieval Tower Apartment — San Gimignano, Tuscany",
      description: "A unique apartment within one of San Gimignano's famous medieval towers — the Manhattan of the Middle Ages, now a UNESCO World Heritage Site. Three bedrooms spread across 4 floors of the 14th-century tower, with a rooftop terrace at 36 metres with 360-degree views over the rolling Chianti hills and Elsa Valley.\n\nA private sommelier guide leads a personal tasting through San Gimignano's Vernaccia DOCG white wine — the first Italian wine to receive DOC status in 1966. The medieval piazzas, artisanal gelato shops, and Benozzo Gozzoli's frescoes are all steps from the tower door.\n\nSiena is 30km; Florence is 50km. Exclusively available — you have the entire tower to yourselves.",
      propertyType: "APARTMENT", pricePerNight: 460, cleaningFee: 65, maxGuests: 6, bedrooms: 3, bathrooms: 2, beds: 3,
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85",
        "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=1200&q=85",
        "https://images.unsplash.com/photo-1499955085172-a7cd065fbc03?w=1200&q=85",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        "https://images.unsplash.com/photo-1546032364-affaeafbe689?w=1200&q=85",
      ],
      amenities: ["WIFI", "KITCHEN", "AIR_CONDITIONING", "BALCONY"],
      city: "San Gimignano", state: "Tuscany", country: "Italy", zipCode: "53037", latitude: 43.4678, longitude: 11.0433,
      isFeatured: false, instantBook: true, cancellationPolicy: "MODERATE", avgRating: 4.92, totalReviews: 134, hostId: h8.id,
    },
    // 46
    {
      slug: "eco-beach-villa-lombok-indonesia",
      title: "Eco Beach Villa — Pink Beach, Lombok",
      description: "A stunning 3-bedroom eco-villa on the edge of Lombok's legendary Pink Beach — one of only seven pink sand beaches in the world, coloured by red coral fragments mixing with white sand. A private plunge pool in the garden faces the Flores Sea, with the Gili Islands visible on the horizon as a string of emerald dots.\n\nBuilt from reclaimed teak and bamboo with a living grass roof. Solar-powered, rainwater-fed, and staffed by local Sasak villagers. The resident snorkelling guide leads daily reef tours at dawn when visibility reaches 20 metres.\n\nMount Rinjani, Indonesia's second-highest volcano, is visible at sunrise from the villa garden. A 2-day trekking package to the crater lake can be arranged.",
      propertyType: "BEACHFRONT", pricePerNight: 290, cleaningFee: 50, maxGuests: 6, bedrooms: 3, bathrooms: 2, beds: 3,
      images: [
        "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=1200&q=85",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85",
        "https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200&q=85",
        "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200&q=85",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BBQ_GRILL"],
      city: "Kuta", state: "West Nusa Tenggara", country: "Indonesia", zipCode: "83573", latitude: -8.8974, longitude: 116.2747,
      isFeatured: false, instantBook: true, cancellationPolicy: "FLEXIBLE", avgRating: 4.90, totalReviews: 145, hostId: h7.id,
    },
    // 47
    {
      slug: "cinque-terre-house-riomaggiore",
      title: "Cliffside Terraced House — Riomaggiore, Cinque Terre",
      description: "A beautifully restored 4-floor Ligurian terraced house in the jewel of the Cinque Terre — Riomaggiore — with a rooftop terrace overlooking the multicoloured fishing village and the Ligurian Sea. Original painted shutters, terracotta floors, and a kitchen stocked with local pesto, farinata, and Sciacchetrà dessert wine.\n\nThe famous Via dell'Amore clifftop path begins 2 minutes from the front door. The other four villages of the Cinque Terre — Manarola, Corniglia, Vernazza, and Monterosso — are a 10-minute boat ride or a coastal trail away.\n\nThe house is entirely pedestrianised — no cars — bringing a silence rare in Italy. Book your own slice of the Ligurian coast.",
      propertyType: "APARTMENT", pricePerNight: 380, cleaningFee: 60, maxGuests: 6, bedrooms: 3, bathrooms: 2, beds: 3,
      images: [
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=85",
        "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=85",
        "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?w=1200&q=85",
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=85",
        "https://images.unsplash.com/photo-1499955085172-a7cd065fbc03?w=1200&q=85",
      ],
      amenities: ["WIFI", "KITCHEN", "BALCONY", "AIR_CONDITIONING"],
      city: "Riomaggiore", state: "Liguria", country: "Italy", zipCode: "19017", latitude: 44.0998, longitude: 9.7376,
      isFeatured: false, instantBook: true, cancellationPolicy: "FLEXIBLE", avgRating: 4.93, totalReviews: 208, hostId: h8.id,
    },
    // 48
    {
      slug: "private-island-villa-stockholm-archipelago",
      title: "Private Island Villa — Stockholm Archipelago, Sweden",
      description: "An exclusive island villa in the Stockholm Archipelago accessible only by private water taxi, with a 30,000 sq metre private island of pine forest, smooth granite rocks, and private jetties into the Baltic Sea. Three bedrooms, a Scandinavian sauna, fire pit on the rocks, and a traditional red wood Swedish sommarstugor aesthetic.\n\nSwim off the granite into the clear Baltic, fish for perch and pike in the sheltered bays, and kayak through uninhabited islands at midnight in the summer light. Stockholm city is 45 minutes by water taxi for museum and restaurant days.\n\nA traditional Swedish smörgåsbord breakfast is prepared by the resident housekeeper each morning.",
      propertyType: "VILLA", pricePerNight: 890, cleaningFee: 120, maxGuests: 6, bedrooms: 3, bathrooms: 2, beds: 4,
      images: [
        "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=85",
        "https://images.unsplash.com/photo-1506260408603-3329b7931f77?w=1200&q=85",
        "https://images.unsplash.com/photo-1519131775-73a0888e3b32?w=1200&q=85",
        "https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?w=1200&q=85",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
      ],
      amenities: ["HOT_TUB", "FIREPLACE", "WIFI", "KITCHEN", "BBQ_GRILL"],
      city: "Stockholm Archipelago", state: "Stockholm", country: "Sweden", zipCode: "13050", latitude: 59.3260, longitude: 18.8730,
      isFeatured: false, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.96, totalReviews: 47, hostId: h5.id,
    },
    // 49
    {
      slug: "colonial-villa-cartagena-colombia",
      title: "Colonial Mansion — Old Town, Cartagena, Colombia",
      description: "A breathtaking 6-bedroom colonial mansion within Cartagena's walled Old Town — a UNESCO World Heritage Site — restored with hand-carved Caribbean hardwoods, hand-laid Spanish tile floors, and a central courtyard plunge pool shaded by a 200-year-old ceiba tree.\n\nThe mansion's rooftop terrace has sweeping views over the terracotta rooftops of the Old Town, the Caribbean Sea, and the glittering towers of Bocagrande at sunset. A private chef prepares traditional Costeño cuisine — fresh ceviche, arepas de huevo, and Cartagena's legendary seafood.\n\nWalk to the Castillo San Felipe, the Palacio de la Inquisición, and the Getsemaní street art neighbourhood. Rosario Islands boat trips and cumbia salsa lessons are arranged on request.",
      propertyType: "MANSION", pricePerNight: 920, cleaningFee: 120, maxGuests: 12, bedrooms: 6, bathrooms: 6, beds: 7,
      images: [
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=85",
        "https://images.unsplash.com/photo-1560981534-b8a6b29bc9ed?w=1200&q=85",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=85",
      ],
      amenities: ["POOL", "WIFI", "KITCHEN", "BALCONY", "AIR_CONDITIONING", "BBQ_GRILL"],
      city: "Cartagena", state: "Bolívar", country: "Colombia", zipCode: "130001", latitude: 10.3997, longitude: -75.5144,
      isFeatured: true, instantBook: false, cancellationPolicy: "MODERATE", avgRating: 4.94, totalReviews: 86, hostId: h1.id,
    },
    // 50
    {
      slug: "treehouse-canopy-dordogne-france",
      title: "Luxury Canopy Treehouse — Dordogne Valley, France",
      description: "An architect-designed luxury treehouse 12 metres above the Périgord oak forest floor in the Dordogne Valley — France's most beautiful river valley. Three platforms connected by rope bridges: a sleeping deck, a kitchen-living deck with a glass wall looking onto the canopy, and a rooftop stargazing platform with a wood-fired copper hot tub.\n\nWake to birdsong and deer below; spend the day cycling to Rocamadour's clifftop shrine, canoeing the Dordogne through walnut orchards, and visiting the Lascaux IV cave paintings — the finest prehistoric art in Europe.\n\nA hamper of Périgord black truffle, duck foie gras, walnut oil, and local wine is waiting on arrival. The nearest village with a market is 5 minutes by bicycle.",
      propertyType: "TREEHOUSE", pricePerNight: 310, cleaningFee: 55, maxGuests: 4, bedrooms: 2, bathrooms: 1, beds: 2,
      images: [
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&q=85",
        "https://images.unsplash.com/photo-1492681290223-6190a6bcf7e6?w=1200&q=85",
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=85",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85",
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=85",
      ],
      amenities: ["HOT_TUB", "WIFI", "KITCHEN", "BBQ_GRILL"],
      city: "Sarlat-la-Canéda", state: "Dordogne", country: "France", zipCode: "24200", latitude: 44.8912, longitude: 1.2173,
      isFeatured: false, instantBook: true, cancellationPolicy: "FLEXIBLE", avgRating: 4.95, totalReviews: 117, hostId: h4.id,
    },
  ];

  let created = 0;
  for (const listing of listings) {
    await prisma.listing.upsert({
      where: { slug: listing.slug },
      update: {
        title: listing.title,
        description: listing.description,
        images: listing.images,
        pricePerNight: listing.pricePerNight,
        cleaningFee: listing.cleaningFee,
        amenities: listing.amenities as any,
        avgRating: listing.avgRating,
        totalReviews: listing.totalReviews,
        isFeatured: listing.isFeatured,
      },
      create: {
        ...listing,
        address: listing.city + ", " + listing.country,
        propertyType: listing.propertyType as any,
        amenities: listing.amenities as any,
        cancellationPolicy: listing.cancellationPolicy as any,
        serviceFee: 0,
        isActive: true,
      },
    });
    created++;
    process.stdout.write(`\r  Upserted ${created}/${listings.length} listings...`);
  }

  console.log(`\n✅ ${created} listings upserted`);

  // ─── Sample Bookings ───────────────────────────────────────────────────────
  const firstListing = await prisma.listing.findUnique({ where: { slug: "cliffside-villa-santorini" } });
  const secondListing = await prisma.listing.findUnique({ where: { slug: "overwater-villa-maldives" } });

  if (firstListing) {
    await prisma.booking.upsert({
      where: { id: "seed-booking-001" },
      update: {},
      create: {
        id: "seed-booking-001",
        checkIn: new Date("2025-08-14"), checkOut: new Date("2025-08-21"),
        adults: 2, totalNights: 7, subtotal: 12950, cleaningFee: 250,
        serviceFee: 1295, taxes: 1167, totalPrice: 15662,
        status: "CONFIRMED", guestId: guest1.id, listingId: firstListing.id,
      },
    }).catch(() => {});
  }

  if (secondListing) {
    await prisma.booking.upsert({
      where: { id: "seed-booking-002" },
      update: {},
      create: {
        id: "seed-booking-002",
        checkIn: new Date("2025-07-01"), checkOut: new Date("2025-07-08"),
        adults: 2, totalNights: 7, subtotal: 8750, cleaningFee: 200,
        serviceFee: 875, taxes: 787, totalPrice: 10612,
        status: "COMPLETED", guestId: guest2.id, listingId: secondListing.id,
      },
    }).catch(() => null);
  }

  console.log("✅ Bookings created");

  // ─── Reviews ──────────────────────────────────────────────────────────────
  if (firstListing) {
    const reviewData = [
      { authorId: guest1.id, rating: 5, comment: "Breathtaking. The sunset from the terrace is something we'll never forget. Nikos was exceptional.", cleanliness: 5, accuracy: 5, checkIn: 5, communication: 5, location: 5, value: 4 },
      { authorId: guest2.id, rating: 5, comment: "The photos don't do it justice — it's even more stunning in person. The concierge arranged a private catamaran tour that was the highlight of our trip.", cleanliness: 5, accuracy: 5, checkIn: 5, communication: 5, location: 5, value: 5 },
    ];
    for (const r of reviewData) {
      await prisma.review.create({ data: { ...r, listingId: firstListing.id, bookingId: "seed-booking-001" } }).catch(() => {});
    }
  }

  console.log("✅ Reviews created");

  // ─── Favorites ────────────────────────────────────────────────────────────
  const favListings = await prisma.listing.findMany({ take: 5, select: { id: true } });
  for (const l of favListings.slice(0, 3)) {
    await prisma.favorite.upsert({ where: { userId_listingId: { userId: guest1.id, listingId: l.id } }, update: {}, create: { userId: guest1.id, listingId: l.id } }).catch(() => {});
  }

  console.log("✅ Favorites created");
  console.log("\n🎉 Database seeded with 50 listings across 35 countries!");
  console.log("\n📧 Test accounts:");
  console.log("   admin@staylux.com  / Password123!  (Admin)");
  console.log("   nikos@staylux.com  / Password123!  (Host — Santorini/Greece)");
  console.log("   sarah@example.com  / Password123!  (Guest)");
  console.log("   marco@example.com  / Password123!  (Guest)");
}

main()
  .catch((e) => { console.error("\n❌ Seed error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
