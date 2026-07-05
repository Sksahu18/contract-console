export default function OrgSelector({ setOrg }) {
  return (
    <select onChange={(e) => setOrg(e.target.value)}>
      <option value="org-1">Org One</option>
      <option value="org-2">Org Two</option>
    </select>
  );
}