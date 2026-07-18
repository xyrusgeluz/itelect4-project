import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimBadge from "./components/ClaimBadge";
import type { User, Item, Claim } from "./types/index";

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

const claim: Claim = {
  id: 1,
  itemId: item.id,
  claimedBy: student.id,
  submittedAt: new Date(),
  score: 95,
};

function App() {
  return (
    <div className="app">
      <UserCard user={student} onSelect={(u) => console.log(u)} />
      <ItemCard item={item} />
      <ClaimBadge claim={claim}>
        <p>Verified by admin</p>
      </ClaimBadge>
    </div>
  );
}

export default App;