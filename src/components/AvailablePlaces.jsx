import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import PageError from "./PageError.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
        const places = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        });
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (error) {
    return <PageError title="An error occured!" message={error.message} />;
  }

  return (
    <>
      <Places
        title="Available Places"
        places={availablePlaces}
        isLoading={isLoading}
        loadingText="Fetching place data..."
        fallbackText="No places available."
        onSelectPlace={onSelectPlace}
      />
    </>
  );
}
