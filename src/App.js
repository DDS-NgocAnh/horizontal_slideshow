import "./App.css";
import HorizontalSlideshow from "./components/HorizontalSlideshow";

function App() {
	return (
		<div className="App">
			<HorizontalSlideshow data={MOCK_DATA} title="Slideshow" />
		</div>
	);
}

const MOCK_DATA = [
	{ url: "images/S01.png", id: 1, name: "Shoes L24" },
	{ url: "images/S02.png", id: 2, name: "Shoes D03" },
	{ url: "images/S03.png", id: 3, name: "Shoes M16" },
	{ url: "images/S04.png", id: 4, name: "Shoes G90" },
	{ url: "images/S05.png", id: 5, name: "Shoes X09" },
	{ url: "images/S06.png", id: 6, name: "Shoes K06" },
];

export default App;
