import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminLayout from "../../layouts/AdminLayout";
import { deleteSustainabilityEvent, getSustainabilityEvents } from "../../services/sustainabilityEventService";
import { toast } from "../../utils/toast";

export default function SustainabilityEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try { setLoading(true); setEvents(await getSustainabilityEvents()); }
    catch (error) { toast.error(error.response?.data?.message || "Failed to load sustainability events."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase()) && (active === "" || String(event.isActive) === active)
  ), [events, search, active]);

  const remove = async (id) => {
    const result = await Swal.fire({ title: "Delete event?", text: "This action cannot be undone.", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33" });
    if (!result.isConfirmed) return;
    try { await deleteSustainabilityEvent(id); toast.success("Event deleted successfully."); load(); }
    catch (error) { toast.error(error.response?.data?.message || "Delete failed."); }
  };

  return <AdminLayout>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div><h2>Sustainability Events</h2><p>Manage events and social campaigns shown on the sustainability page.</p></div>
      <button className="btn btn-warning" onClick={() => navigate("/sustainability-events/add")}>+ Add Event</button>
    </div>
    <div className="row g-2 mb-3">
      <div className="col-md-7"><input className="form-control" placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
      <div className="col-md-3"><select className="form-select" value={active} onChange={(e) => setActive(e.target.value)}><option value="">All statuses</option><option value="true">Active</option><option value="false">Hidden</option></select></div>
    </div>
    <div className="table-responsive bg-white rounded shadow-sm"><table className="table align-middle mb-0"><thead><tr><th>Event</th><th>Type</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>
      {loading ? <tr><td colSpan="5">Loading...</td></tr> : filtered.length === 0 ? <tr><td colSpan="5">No sustainability events found.</td></tr> : filtered.map((event) => <tr key={event._id}>
        <td><div className="d-flex align-items-center gap-2">{event.image && <img src={event.image} alt="" width="52" height="40" style={{ objectFit: "cover" }} />}<span>{event.title}</span></div></td><td>{event.type}</td><td>{new Date(event.date).toLocaleDateString()}</td><td><span className={`badge ${event.isActive ? "bg-success" : "bg-secondary"}`}>{event.isActive ? "Active" : "Hidden"}</span></td><td><button className="btn btn-sm btn-outline-primary me-2" onClick={() => navigate(`/sustainability-events/edit/${event._id}`)}>Edit</button><button className="btn btn-sm btn-outline-danger" onClick={() => remove(event._id)}>Delete</button></td>
      </tr>)}
    </tbody></table></div>
  </AdminLayout>;
}
