import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import ListWeather from "./components/ListWeather";

function App() {
  return (
    <div className="App">
      <MyNavBar />
      <ListWeather />
    </div>
  );
}

export default App;
