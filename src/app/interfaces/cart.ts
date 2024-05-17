import { Product } from "./product";
import { User } from "./user";

export interface Cart {
    id?:number;
    userEmail?: string | null;
    product?: Array<Product>;
    date?:Date;
}
