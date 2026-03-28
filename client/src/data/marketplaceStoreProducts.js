/**
 * Static catalog — each `image` is imported from `src/images/`
 * (copies of assets from `client/images/` with stable filenames).
 */

import jerseyUniform from "../images/jersey-uniform.png";
import trainingJerseyTee from "../images/training-jersey-tee.png";
import siliconeBangles from "../images/silicone-bangles.png";
import stationerySet from "../images/stationery-set.png";
import baseballCap from "../images/baseball-cap.png";
import waterBottle from "../images/water-bottle.png";
import playerIdCard from "../images/player-id-card.png";
import sportsDuffelBag from "../images/sports-duffel-bag.png";

export const MARKETPLACE_STORE_PRODUCTS = [
  {
    id: "1",
    name: "Uni Sport Hub Match Jersey (#9)",
    price: 8900,
    description:
      "Official-style match jersey — front and back views with number 9, V-neck, and Uni Sport Hub crest. Moisture-wicking fabric for league and training.",
    image: jerseyUniform,
    category: "Jerseys",
    sport: "Multi-sport",
  },
  {
    id: "2",
    name: "Uni Sport Hub Performance Training Tee",
    price: 6500,
    description:
      "Short-sleeve crew training jersey with dynamic green graphics and centre logo. Lightweight, breathable polyester for gym and pitch sessions.",
    image: trainingJerseyTee,
    category: "Jerseys",
    sport: "Training",
  },
  {
    id: "3",
    name: "Team Spirit Silicone Bangles (Set of 3)",
    price: 1200,
    description:
      "Stacked silicone wristbands: Uni Sport Hub branding, Play • Perform • Progress, and repeating logo pattern. Durable and sweat-friendly.",
    image: siliconeBangles,
    category: "Bangles",
    sport: "Fan / all sports",
  },
  {
    id: "4",
    name: "Uni Sport Hub Stationery & Training Pack",
    price: 1850,
    description:
      "Spiral notebook, lined notepad, branded pens, zip pencil case, and clips — matching Uni Sport Hub green and lime branding.",
    image: stationerySet,
    category: "Stationary",
    sport: "All teams",
  },
  {
    id: "5",
    name: "Official Uni Sport Hub Baseball Cap",
    price: 2500,
    description:
      "Forest green six-panel cap with curved brim, embroidered crest and Uni Sport Hub wordmark. Adjustable fit for everyday and match day.",
    image: baseballCap,
    category: "Accessories",
    sport: "All sports",
  },
  {
    id: "6",
    name: "Insulated Uni Sport Hub Water Bottle",
    price: 3200,
    description:
      "Matte green stainless bottle with screw lid and carry loop. Powder-coated finish; keeps drinks cool during training and travel.",
    image: waterBottle,
    category: "Sports Gear",
    sport: "All sports",
  },
  {
    id: "7",
    name: "Player ID Card with Lanyard & Sleeve",
    price: 1800,
    description:
      "Custom-style player pass with photo, role bar, ID number, QR code, and dark green lanyard — as shown in campus kit mock-up.",
    image: playerIdCard,
    category: "Accessories",
    sport: "All sports",
  },
  {
    id: "8",
    name: "Uni Sport Hub Sports Duffel Bag",
    price: 7500,
    description:
      "Large forest green duffel with front pocket, side zips, top handles, and shoulder strap. Bold front logo for gear and away trips.",
    image: sportsDuffelBag,
    category: "Sports Gear",
    sport: "All sports",
  },
];
