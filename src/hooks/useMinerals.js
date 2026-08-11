import { useEffect, useState } from "react";
import { getMinerals } from "../services/mineralService";

export default function useMinerals() {
  const [minerals, setMinerals] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMinerals = async () => {
    try {
      setLoading(true);

      const response = await getMinerals();

      if (Array.isArray(response)) {
        setMinerals(response);
      } else if (response.minerals) {
        setMinerals(response.minerals);
      } else if (response.data) {
        setMinerals(response.data);
      } else {
        setMinerals([]);
      }
    } catch (error) {
      console.error("Error fetching minerals:", error);
      setMinerals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMinerals();
  }, []);

  return {
    minerals,
    loading,
    total: minerals.length,
    refresh: loadMinerals,
  };
}