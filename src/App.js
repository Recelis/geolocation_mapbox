import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {
	const geolocationAPI = navigator.geolocation;
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(undefined);
	const [lat, setLat] = useState(undefined);
	const [zoom, setZoom] = useState(9);

	// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
	// https://www.mapbox.com/mapbox-gljs
	useEffect(() => {
		geolocationAPI.getCurrentPosition((gelocation) => {
			console.log(gelocation);
			setLng(gelocation.coords.longitude);
			setLat(gelocation.coords.latitude);
		});
	}, [geolocationAPI]);

	useEffect(() => {
		// initialize map only once once after gps has been initialised
		if (map.current || lng === undefined || lat === undefined) return;
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [lng, lat],
			zoom: zoom,
		});
	});

	useEffect(() => {
		// wait for map to initialize and GPS to have been initialised
		if (!map.current || lng === undefined || lat === undefined) return;
		map.current.on("move", () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
		});
	});
	return (
		<div className="App">
			{lat && lng && (
				<>
					<div className="sidebar">
						Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
					</div>
					<div ref={mapContainer} className="map-container" />
				</>
			)}
		</div>
	);
}

export default App;
