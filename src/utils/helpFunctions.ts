import {OrderItem} from "../types";

export function countItemsInOrder (items: OrderItem[]) {
    let count = 0;
    items.map(item => {count += item.count})
    return count;
}

module.exports = countItemsInOrder;
