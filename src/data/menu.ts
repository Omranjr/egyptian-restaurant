export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
};

export type Category = {
  id: string;
  name: string;
};

export const categories: Category[] = [
  { id: "koshari", name: "Koshari" },
  { id: "grills", name: "Grills" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
];

export const dishes: Dish[] = [
  {
    id: "koshari-classic",
    name: "Classic Koshari",
    description: "Lentils, rice, pasta, chickpeas, crispy onions, tomato sauce.",
    price: 8.5,
    image: "/dishes/koshari-classic.jpg",
    category: "koshari",
  },
  {
    id: "koshari-spicy",
    name: "Spicy Koshari",
    description: "Classic koshari with extra hot sauce and garlic vinegar.",
    price: 9.0,
    image: "/dishes/koshari-spicy.jpg",
    category: "koshari",
  },
  {
    id: "mix-grill",
    name: "Mixed Grill",
    description: "Kebab, kofta, shish tawook served with rice and salad.",
    price: 19.99,
    image: "/dishes/mix-grill.jpg",
    category: "grills",
  },
  {
    id: "kofta",
    name: "Beef Kofta",
    description: "Charcoal-grilled minced beef skewers with tahini.",
    price: 14.99,
    image: "/dishes/kofta.jpg",
    category: "grills",
  },
  {
    id: "om-ali",
    name: "Om Ali",
    description: "Egyptian bread pudding with nuts and raisins.",
    price: 6.0,
    image: "/dishes/om-ali.jpg",
    category: "desserts",
  },
  {
    id: "basbousa",
    name: "Basbousa",
    description: "Semolina cake soaked in orange blossom syrup.",
    price: 5.5,
    image: "/dishes/basbousa.jpg",
    category: "desserts",
  },
  {
    id: "karkadeh",
    name: "Karkadeh",
    description: "Refreshing hibiscus iced tea.",
    price: 3.5,
    image: "/dishes/karkadeh.jpg",
    category: "drinks",
  },
];



