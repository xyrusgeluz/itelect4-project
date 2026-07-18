import type { Item } from "../types/index";

interface ItemCardProps {
  item: Item;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="item-card">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p>Category: {item.category}</p>
      <p>Status: {item.status}</p>
    </div>
  );
}

export default ItemCard;