import axios from "axios";

export async function fetchMST() {
  const response = await axios.get("http://localhost:4000/mst");
  return response.data;
}
