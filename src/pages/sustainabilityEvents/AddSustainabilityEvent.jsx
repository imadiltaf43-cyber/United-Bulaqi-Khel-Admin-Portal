import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import SustainabilityEventForm from "../../components/sustainabilityEvents/SustainabilityEventForm";
import { createSustainabilityEvent } from "../../services/sustainabilityEventService";
import { toast } from "../../utils/toast";

export default function AddSustainabilityEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submit = async (data) => { try { setLoading(true); await createSustainabilityEvent(data); toast.success("Event created successfully."); navigate("/sustainability-events"); } catch (error) { toast.error(error.response?.data?.message || "Failed to create event."); } finally { setLoading(false); } };
  return <AdminLayout><h2 className="mb-4">Add Sustainability Event</h2><SustainabilityEventForm onSubmit={submit} loading={loading} /></AdminLayout>;
}
