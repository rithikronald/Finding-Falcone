import { Header } from "./components/Header";
import { SelectionPage } from "./pages/SelectionPage";

function App() {
  return (
    <div className="flex flex-col flex-1 h-[100vh]">
      <Header />
      <SelectionPage />
    </div>
  );
}

export default App;
