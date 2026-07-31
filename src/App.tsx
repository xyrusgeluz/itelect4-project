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
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [showDetails, toggleDetails] = useToggle(false);
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
    return <p>Loading items...</p>;
  }

  return (
    <div className="app">
      <input
        ref={searchInputRef}
        value={searchTerm}
        type="text"
        placeholder="Search items..."
        onChange={handleSearchChange}
      />

      {previousSearch !== undefined && previousSearch !== searchTerm && (
        <p>Previous search: "{previousSearch}"</p>
      )}

      <UserCard user={student} onSelect={setSelectedUser} />
      {selectedUser && <p>Selected: {selectedUser.name}</p>}

      <button onClick={toggleDetails}>
        {showDetails ? "Hide" : "Show"} Details
      </button>

      {filteredItems.map((i) => (
        <div key={i.id}>
          <ItemCard item={i} />
          {showDetails && <p>Reported on: {i.dateReported.toDateString()}</p>}
        </div>
      ))}
    </div>
  );
}

export default App;