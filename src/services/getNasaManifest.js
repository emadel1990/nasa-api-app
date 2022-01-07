import axios from "axios";

export const getNasaManifest = async (rover) => {
  const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?api_key=${process.env.REACT_APP_NASA_API}`;
  const res = await axios.get(url);
  return res.data;
};
