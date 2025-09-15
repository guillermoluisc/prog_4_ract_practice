import DomainCard from "./DomainCard";

export default function DomainList({ domains }) {
  if (!domains || domains.length === 0) {
    return <p>No se encontraron dominios</p>;
  }

  return (
    <div style={{ display: "grid", gap: "15px" }}>
      {domains.map(domain => <DomainCard key={domain.id} domain={domain} />)}
    </div>
  );
}