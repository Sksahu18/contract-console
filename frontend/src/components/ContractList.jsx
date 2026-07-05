import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function ContractList({ refresh, onSelect }) {
const [contracts, setContracts] = useState([]);
const [loading, setLoading] = useState(false);

// ✅ New states
const [search, setSearch] = useState("");
const [status, setStatus] = useState("");

const fetchContracts = async () => {
try {
setLoading(true);
  // ✅ Build query params
  let query = `?`;
  if (search) query += `search=${search}&`;
  if (status) query += `status=${status}&`;

  const res = await api.get(`/contracts${query}`);
  setContracts(res.data);
} catch (e) {
  console.error(e.response?.data || e.message);
  alert("Failed to load contracts");
} finally {
  setLoading(false);
}

};

useEffect(() => {
fetchContracts();
}, [refresh]);

const updateStatus = async (id, newStatus) => {
try {
await api.post(`/contracts/${id}/status`, {
status: newStatus,
});
fetchContracts();
} catch (e) {
alert(e.response?.data?.error || "Status update failed");
}
};

return ( <div> <h2>Contracts</h2>
  {/* ✅ Search + Filter UI */}
  <div style={{ marginBottom: "10px" }}>
    <input
      placeholder="Search client..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      style={{ marginLeft: "10px" }}
    >
      <option value="">All</option>
      <option value="DRAFT">DRAFT</option>
      <option value="FINALIZED">FINALIZED</option>
      <option value="ARCHIVED">ARCHIVED</option>
    </select>

    <button onClick={fetchContracts} style={{ marginLeft: "10px" }}>
      Apply
    </button>
  </div>

  {loading && <p>Loading...</p>}

  {!loading && contracts.length === 0 && <p>No contracts found</p>}

  {contracts.map((c) => (
    <div
      key={c.id}
      onClick={() => onSelect(c.id)}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      <p><strong>Client:</strong> {c.client_name}</p>
      <p><strong>PO:</strong> {c.po_ref_no}</p>
      <p><strong>Status:</strong> {c.status}</p>

      {/* ✅ Status buttons */}
      {c.status === "DRAFT" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            updateStatus(c.id, "FINALIZED");
          }}
        >
          Finalize
        </button>
      )}

      {c.status === "FINALIZED" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            updateStatus(c.id, "ARCHIVED");
          }}
        >
          Archive
        </button>
      )}
    </div>
  ))}
</div>

);
}
