import madhubani from "@/assets/art/madhubani_art.jpg";
import tikuli from "@/assets/art/tikuli_art.jpeg";
import wood from "@/assets/art/wood_art.jpeg";
import glass from "@/assets/art/glass_art.png";
import { ProductCategory } from "@/types/product";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: ProductCategory;
}

export const products: Product[] = [
  // Madhubani Paintings
  {
    id: "1",
    name: "Madhubani Painting - Krishna Leela",
    price: 2999,
    images: [madhubani.src],
    category: "madhubani",
  },
  {
    id: "2",
    name: "Madhubani Painting - Radha Krishna",
    price: 3499,
    images: [madhubani.src],
    category: "madhubani",
  },
  {
    id: "3",
    name: "Madhubani Painting - Village Life",
    price: 1999,
    images: [madhubani.src],
    category: "madhubani",
  },
  {
    id: "4",
    name: "Madhubani Painting - Wedding Scene",
    price: 4999,
    images: [madhubani.src],
    category: "madhubani",
  },
  {
    id: "5",
    name: "Madhubani Painting - Peacock Dance",
    price: 2499,
    images: [madhubani.src],
    category: "madhubani",
  },
  // Tikuli Art
  {
    id: "6",
    name: "Tikuli Art - Peacock Design",
    price: 1499,
    images: [tikuli.src],
    category: "tikuli",
  },
  {
    id: "7",
    name: "Tikuli Art - Festival Scene",
    price: 1299,
    images: [tikuli.src],
    category: "tikuli",
  },
  {
    id: "8",
    name: "Tikuli Art - Traditional Motifs",
    price: 999,
    images: [tikuli.src],
    category: "tikuli",
  },
  {
    id: "9",
    name: "Tikuli Art - Wedding Collection",
    price: 1799,
    images: [tikuli.src],
    category: "tikuli",
  },
  {
    id: "10",
    name: "Tikuli Art - Modern Abstract",
    price: 1599,
    images: [tikuli.src],
    category: "tikuli",
  },
  // Wooden Handicrafts
  {
    id: "11",
    name: "Wooden Handicraft - Elephant Family",
    price: 3999,
    images: [wood.src],
    category: "wood",
  },
  {
    id: "12",
    name: "Wooden Handicraft - Decorative Box",
    price: 2499,
    images: [wood.src],
    category: "wood",
  },
  {
    id: "13",
    name: "Wooden Handicraft - Wall Panel",
    price: 5999,
    images: [wood.src],
    category: "wood",
  },
  {
    id: "14",
    name: "Wooden Handicraft - Photo Frame",
    price: 1499,
    images: [wood.src],
    category: "wood",
  },
  {
    id: "15",
    name: "Wooden Handicraft - Jewelry Box",
    price: 1999,
    images: [wood.src],
    category: "wood",
  },
  // Glass Art
  {
    id: "16",
    name: "Glass Art - Traditional Vase",
    price: 1299,
    images: [glass.src],
    category: "glass",
  },
  {
    id: "17",
    name: "Glass Art - Wind Chimes",
    price: 899,
    images: [glass.src],
    category: "glass",
  },
  {
    id: "18",
    name: "Glass Art - Table Decor",
    price: 1599,
    images: [glass.src],
    category: "glass",
  },
  {
    id: "19",
    name: "Glass Art - Wall Hanging",
    price: 2499,
    images: [glass.src],
    category: "glass",
  },
  {
    id: "20",
    name: "Glass Art - Decorative Bowl",
    price: 1799,
    images: [glass.src],
    category: "glass",
  },
  {
    id: "21",
    name: "Madhubani Painting - Tree of Life",
    price: 2799,
    images: [madhubani.src],
    category: "madhubani",
  },
  {
    id: "22",
    name: "Madhubani Painting - Fish Motif",
    price: 1999,
    images: [madhubani.src],
    category: "madhubani",
  },
  {
    id: "23",
    name: "Madhubani Painting - Sun God",
    price: 3299,
    images: [madhubani.src],
    category: "madhubani",
  },
  {
    id: "24",
    name: "Madhubani Painting - Floral Festival",
    price: 1899,
    images: [madhubani.src],
    category: "madhubani",
  },
  {
    id: "25",
    name: "Madhubani Painting - Mythical Creatures",
    price: 3599,
    images: [madhubani.src],
    category: "madhubani",
  },

  // Tikuli Art
  {
    id: "26",
    name: "Tikuli Art - Floral Circle",
    price: 1099,
    images: [tikuli.src],
    category: "tikuli",
  },
  {
    id: "27",
    name: "Tikuli Art - Tribal Women",
    price: 1399,
    images: [tikuli.src],
    category: "tikuli",
  },
  {
    id: "28",
    name: "Tikuli Art - Harmony Dance",
    price: 1199,
    images: [tikuli.src],
    category: "tikuli",
  },
  {
    id: "29",
    name: "Tikuli Art - Traditional Rangoli",
    price: 999,
    images: [tikuli.src],
    category: "tikuli",
  },
  {
    id: "30",
    name: "Tikuli Art - Village Fair",
    price: 1499,
    images: [tikuli.src],
    category: "tikuli",
  },

  // Wooden Handicrafts
  {
    id: "31",
    name: "Wooden Handicraft - Miniature Cart",
    price: 2999,
    images: [wood.src],
    category: "wood",
  },
  {
    id: "32",
    name: "Wooden Handicraft - Temple Carving",
    price: 4499,
    images: [wood.src],
    category: "wood",
  },
  {
    id: "33",
    name: "Wooden Handicraft - Candle Holder",
    price: 1199,
    images: [wood.src],
    category: "wood",
  },
  {
    id: "34",
    name: "Wooden Handicraft - Pen Stand",
    price: 799,
    images: [wood.src],
    category: "wood",
  },
  {
    id: "35",
    name: "Wooden Handicraft - Hanging Shelf",
    price: 3499,
    images: [wood.src],
    category: "wood",
  },

  // Glass Art
  {
    id: "36",
    name: "Glass Art - Mosaic Lantern",
    price: 1899,
    images: [glass.src],
    category: "glass",
  },
  {
    id: "37",
    name: "Glass Art - Abstract Panel",
    price: 2199,
    images: [glass.src],
    category: "glass",
  },
  {
    id: "38",
    name: "Glass Art - Leaf Motif Frame",
    price: 1399,
    images: [glass.src],
    category: "glass",
  },
  {
    id: "39",
    name: "Glass Art - Festival Bowl",
    price: 1699,
    images: [glass.src],
    category: "glass",
  },
  {
    id: "40",
    name: "Glass Art - Garden Light",
    price: 1999,
    images: [glass.src],
    category: "glass",
  },
];
