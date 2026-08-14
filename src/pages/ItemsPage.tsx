// src/pages/ItemsPage.tsx
// Shows all lost & found items in a searchable grid.
// Each card is wrapped in a <Link> so clicking navigates to /items/:id.

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import type { Item } from "../types/index";
import ItemCard from "../components/ItemCard";
import usePrevious from "../hooks/usePrevious";
import { allItems } from "../data/mockData";

function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious(searchTerm);

  // Simulate an async fetch with a half-second delay
  useEffect(() => {
    setTimeout(() => {
      setItems(allItems);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setSearchTerm(e.target.value);

  // Filter by title OR category — typing "acc" should find accessories
  const filteredItems = items.filter(
    (i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="animate-pulse p-6 text-gray-500">Loading items...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load items. Please try again.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Items
      </h2>

      <button
        onClick={() => setIsError(true)}
        className="mb-2 rounded bg-red-100 px-2 py-1 text-xs text-red-700"
      >
        Simulate Error
      </button>

      <input
        ref={searchInputRef}
        value={searchTerm}
        onChange={handleSearchChange}
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
          // Link wraps the whole card — clicking anywhere on it navigates
          <Link key={i.id} to={`/items/${i.id}`}>
            <ItemCard item={i} variant="default" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ItemsPage;
