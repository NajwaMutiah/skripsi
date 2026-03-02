import axios from "axios";

const API_URL = "http://localhost:5000/api/destinations";

export const fetchDestinations = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const fetchFeaturedDestinations = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};