import {useState, useEffect, useRef} from "react";
import type { User, Item } from "./types/index";
import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const item: Item = {
  id: 1,
  title: "Black Umbrella",
  description: "Found near the library entrance, black with a wooden handle.",
  category: "accessories",
  status: "found",
  postedBy: student.id,
  dateReported: new Date(),
};

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  useEffect(() => {
    setTimeout(() => {
      // Reusing our mock item as the "fetched" result
      setItems([item]);
      setIsLoading(false);
    }, 500);
  }, []);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => { setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((i) =>
    i.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
  return (
    <div className="animate-pulse p-6 text-gray-500">
      Loading items...
    </div>
  );
}

  if (isError) {
  return (
    <div className="m-6 rounded-lg bg-red-50 p-4 text-red-700">
      Could not load items. Please try again.
    </div>
  );
}

  return (
  <div className={isDarkMode ? "dark" : ""}>
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <button
        onClick={toggleDarkMode}
        className="rounded bg-gray-800 px-3 py-1.5 text-sm text-white dark:bg-gray-200 dark:text-gray-900"
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <button
  onClick={() => setIsError(true)}
  className="ml-2 rounded bg-red-100 px-2 py-1 text-xs text-red-700"
      >
      Simulate Error
      </button>

      <input
        ref={searchInputRef}
        value={searchTerm}
        type="text"
        placeholder="Search items..."
        onChange={handleSearchChange}
      />

      <button onClick={focusSearch}>Focus search</button>

      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p>Previous search: "{previousSearch}"</p>
      )}

      <button onClick={toggleDetails}>
        {showDetails ? "Hide" : "Show"} Details
      </button>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UserCard user={student} onSelect={setSelectedUser} />
        {selectedUser && <p>Selected: {selectedUser.name}</p>}

        {filteredItems.map((i) => (
          <div key={i.id}>
            <ItemCard item={i} variant="compact" />
            {showDetails && <p>Reported on: {i.dateReported.toDateString()}</p>}
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default App;