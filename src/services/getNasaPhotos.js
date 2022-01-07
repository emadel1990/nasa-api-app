import axios from "axios";

export const getNasaPhotos = async (selected, page, sol) => {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selected}/photos?api_key=${process.env.REACT_APP_NASA_API}&sol=${sol}&page=${page}`;
  const res = await axios.get(url);
  return res.data;
};
