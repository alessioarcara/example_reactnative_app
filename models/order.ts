import { aggregatedProduct } from "./product";

type Order = {
    id: string;
    items: aggregatedProduct[];
    totalAmount: number;
    date: string
}

export default Order;