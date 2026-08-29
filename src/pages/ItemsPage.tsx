// src/pages/ItemsPage.tsx
// Shows all lost & found items in a searchable grid.
// Session 7: useQuery replaces the manual useState/useEffect fetch.

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import type { ApiItem } from "../types/index";
import ItemCard from "../components/ItemCard";
import usePrevious from "../hooks/usePrevious";
import useUiStore from "../store/uiStore";
import { fetchItems } from "../api/client";

function ItemsPage() {
  // These four lines replace ALL of Session 6's fetching state
  const { data, isPending, isError, error } = useQuery<ApiItem[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
  });

  // The search box now reads and writes the store, not local state
  const searchTerm = useUiStore((state) => state.searchTerm);
  const setSearchTerm = useUiStore((state) => state.setSearchTerm);
  const previousSearch = usePrevious(searchTerm);

  if (isPending) {
    return <div className="animate-pulse p-6 text-gray-500">Loading items...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        {error.message} — is json-server running on port 3001?
      </div>
    );
  }

  const filteredItems = data.filter(
    (i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Items
      </h2>

      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search items..."
        className="w-full rounded border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      />

      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p className="mt-1 text-sm text-gray-500">
          Previous search: &quot;{previousSearch}&quot;
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((i) => (
          <Link key={i.id} to={`/items/${i.id}`}>
            <ItemCard item={i} variant="default" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ItemsPage;
