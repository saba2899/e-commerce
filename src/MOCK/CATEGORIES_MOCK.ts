export type CategoryItem = {
  label: string;
  href: string;
  hasChildren?: boolean;
};

export const CATEGORIES_MOCK: CategoryItem[] = [
  { label: "Woman's Fashion", href: "#", hasChildren: true },
  { label: "Man's Fashion", href: "#", hasChildren: true },
  { label: "Electronics", href: "#" },
  { label: "Home & Lifestyle", href: "#" },
  { label: "Medicine", href: "#" },
  { label: "Sports & Outdoor", href: "#" },
  { label: "Baby's & Toys", href: "#" },
  { label: "Groceries & Pets", href: "#" },
  { label: "Health & Beauty", href: "#" },
];
