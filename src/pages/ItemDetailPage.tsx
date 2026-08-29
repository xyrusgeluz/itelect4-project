// src/pages/ItemDetailPage.tsx
// Session 7: useQuery keyed by the item id from the URL.

import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import type { ApiItem } from "../types/index";
import ItemCard from "../components/ItemCard";
import { fetchItemById } from "../api/client";

function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // The id from the URL goes INTO the key, so /items/1 and /items/2
  // get one cache entry each instead of sharing one.
  const { data, isPending, isError, error } = useQuery<ApiItem>({
    queryKey: ["items", id],
    queryFn: () => fetchItemById(id!),
    enabled: id !== undefined,
  });

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-500">Loading item...</div>;
  }

  // A bad id makes fetchItemById throw, and the throw lands here.
  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {data.title}
      </h2>

      <div className="max-w-sm">
        <ItemCard item={data} variant="default" />
      </div>

      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        Date reported: {data.dateReported}
      </p>

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
