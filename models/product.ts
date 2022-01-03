export type baseProduct = {
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  pushToken?: string;
};

export type Product = baseProduct & {
  id: string;
  ownerId: string;
};

export type aggregatedProduct = Product & { quantity: number };
