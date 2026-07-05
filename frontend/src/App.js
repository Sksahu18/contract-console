import { useState, useEffect } from "react";
import OrgSelector from "./components/OrgSelector";
import ContractList from "./components/ContractList";
import UploadForm from "./components/UploadForm";
import ContractDetail from "./components/ContractDetail";
import { setOrg } from "./api/client";

function App() {
const [refresh, setRefresh] = useState(0);
const [selectedId, setSelectedId] = useState(null);

const handleOrg = (orgId) => {
setOrg(orgId);
setRefresh((r) => r + 1);
};

useEffect(() => {
handleOrg("org-1");
}, []);

return ( <div> <h1>Contract Console</h1>
  <OrgSelector setOrg={handleOrg} />

  {!selectedId ? (
    <>
      <UploadForm onSuccess={() => setRefresh((r) => r + 1)} />

      <ContractList
        refresh={refresh}
        onSelect={(id) => setSelectedId(id)}
      />
    </>
  ) : (
    <ContractDetail
      contractId={selectedId}
      onBack={() => setSelectedId(null)}
    />
  )}
</div>

);
}

export default App;
