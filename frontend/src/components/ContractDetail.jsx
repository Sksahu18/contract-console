import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function ContractDetail({ contractId, onBack }) {
const [contract, setContract] = useState(null);
const [events, setEvents] = useState([]);

const fetchData = async () => {
try {
const res = await api.get(`/contracts/${contractId}`);
setContract(res.data);
  const ev = await api.get(`/contracts/${contractId}/events`);
  setEvents(ev.data);
} catch (e) {
  console.error(e.response?.data || e.message);
  alert("Failed to load contract details");
}

};

useEffect(() => {
fetchData();
}, [contractId]);

if (!contract) return <p>Loading...</p>;

return ( <div> <button onClick={onBack}>⬅ Back</button>
  <h2>Contract Detail</h2>

  <p><strong>Client:</strong> {contract.client_name}</p>
  <p><strong>Status:</strong> {contract.status}</p>

  <h3>Full Data</h3>
  <pre style={{ background: "#f5f5f5", padding: "10px" }}>
    {JSON.stringify(contract.field_data, null, 2)}
  </pre>

  <h3>Audit Trail</h3>

  {events.length === 0 && <p>No events</p>}

  {events.map((e) => (
    <div key={e.id} style={{ borderBottom: "1px solid #ccc" }}>
      <p><strong>{e.event_type}</strong></p>
      <p>{new Date(e.created_at).toLocaleString()}</p>
    </div>
  ))}
</div>

);
}
