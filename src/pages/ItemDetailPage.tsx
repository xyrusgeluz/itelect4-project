// src/pages/ItemDetailPage.tsx
// Reads the item id out of the URL with useParams and shows a detail view.
// useNavigate() powers the Back button — called from inside an event handler.

import { useParams, useNavigate } from "react-router";
import ItemCard from "../components/ItemCard";
import { allItems } from "../data/mockData";

function ItemDetailPage() {
  // Reads whatever is in the :id slot of the URL — always string | undefined
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Convert the URL string to a number to look up in the array
  const item = allItems.find((i) => i.id === Number(id));

  // The URL is user input — they can type /items/banana. Handle it.
  if (item === undefined) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        No item found with id &quot;{id}&quot;.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {item.title}
      </h2>

      <div className="max-w-sm">
        <ItemCard item={item} variant="default" />
      </div>

      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Date reported: {item.dateReported.toDateString()}
      </p>

      {/* useNavigate: called inside a handler, never in the component body */}
      <button
        onClick={() => navigate("/items")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        ← Back to Items
      </button>
    </div>
  );
}

export default ItemDetailPage;
