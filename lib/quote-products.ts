import { PRODUCT_CATEGORIES, RETAIL_PRODUCTS } from "@/lib/constants";

export type QuoteProductOption = {
  id: string;
  label: string;
};

export type QuoteProductGroup = {
  label: string;
  options: QuoteProductOption[];
};

function retailLabel(item: (typeof RETAIL_PRODUCTS)[number]): string {
  return "subtitle" in item && item.subtitle
    ? `${item.title} — ${item.subtitle}`
    : item.title;
}

/** Core Products + Retail Assortment for the Get a Quote selector. */
export const QUOTE_PRODUCT_GROUPS: QuoteProductGroup[] = [
  {
    label: "Core Products",
    options: PRODUCT_CATEGORIES.map((cat) => ({
      id: `core:${cat.id}`,
      label: cat.title,
    })),
  },
  {
    label: "Retail Assortment",
    options: RETAIL_PRODUCTS.map((item) => ({
      id: `retail:${item.id}`,
      label: retailLabel(item),
    })),
  },
];

export const QUOTE_PRODUCT_LABELS: Record<string, string> = Object.fromEntries(
  QUOTE_PRODUCT_GROUPS.flatMap((group) =>
    group.options.map((opt) => [opt.id, opt.label]),
  ),
);
