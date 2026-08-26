import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import SustainabilityEventForm from "../../components/sustainabilityEvents/SustainabilityEventForm";
import { getSustainabilityEvent, updateSustainabilityEvent } from "../../services/sustainabilityEventService";
import { toast } from "../../utils/toast";

export default function EditSustainabilityEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => { getSustainabilityEvent(id).then(setEvent).catch((error) => toast.error(error.response?.data?.message || "Failed to load event.")); }, [id]);
  const submit = async (data) => { try { setLoading(true); await updateSustainabilityEvent(id, data); toast.success("Event updated successfully."); navigate("/sustainability-events"); } catch (error) { toast.error(error.response?.data?.message || "Failed to update event."); } finally { setLoading(false); } };
  return <AdminLayout><h2 className="mb-4">Edit Sustainability Event</h2>{event ? <SustainabilityEventForm initialData={event} onSubmit={submit} loading={loading} /> : <p>Loading...</p>}</AdminLayout>;
}
