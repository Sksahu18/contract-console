import { useState } from "react";
import { api } from "../api/client";

export default function UploadForm({ onSuccess }) {
const [json, setJson] = useState(`{
  "client_name": "ABC Pvt Ltd",
  "po_ref_no": "PO-123",
  "po_date": "2024-01-10",
  "items": [
    {
      "description": "Laptop",
      "quantity": 2,
      "unit_price": 50000
    }
  ]
}`);

const submit = async () => {
try {
const parsed = JSON.parse(json);
await api.post("/contracts", parsed);
alert("Uploaded!");
onSuccess();
} catch (e) {
console.log(e.response?.data);
alert(JSON.stringify(e.response?.data || "Invalid JSON"));
}
};

return ( <div> <h3>Upload Contract JSON</h3>
<textarea
rows={12}
cols={60}
value={json}
onChange={(e) => setJson(e.target.value)}
/> <br /> <button onClick={submit}>Submit</button> </div>
);
}
