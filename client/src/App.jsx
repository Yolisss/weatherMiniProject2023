import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListFavoriteCity from "./components/ListFavoriteCity";

function App() {
  return (
    <div className="App">
      <MyNavBar />
      <ListFavoriteCity />
    </div>
  );
}

export default App;
