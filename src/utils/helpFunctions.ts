import {OrderItem} from "../types";

export function countItemsInOrder (items: OrderItem[]) {
    return items.reduce((acc, item) => acc + item.count, 0);
}

export default countItemsInOrder;
