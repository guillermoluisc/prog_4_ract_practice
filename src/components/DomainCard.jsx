export default function DomainCard({ domain }) {
  return (
    <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h3>{domain.name}</h3>
      <p>Código: {domain.code}</p>
      <p>ID: {domain.id}</p>
    </div>
  );
}
