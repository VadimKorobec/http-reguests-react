const path = "http://localhost:3000";

export const fetchAvailablePlaces = async () => {
  const response = await fetch(`${path}/places`);
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  const resData = await response.json();
  return resData.places;
};

export const updateUserPlaces = async (places) => {
  const response = await fetch(`${path}/user-places`, {
    method: "PUT",
      body: JSON.stringify({ places:places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("failed to update user data");
  }

  const resData = await response.json();

  return resData.message;
};
