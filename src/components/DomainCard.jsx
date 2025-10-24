// components/DomainCard.jsx
export default function DomainCard({ domain, onEdit }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{domain.name}</h3>
      <p style={styles.info}>Código: {domain.code}</p>
      {/* <p style={styles.info}>ID: {domain.id}</p> */}
      
      <button 
        onClick={() => onEdit(domain)} 
        style={styles.editButton}
      >
        ✏️ Editar
      </button>
    </div>
  );
}

const styles = {
  card: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    position: "relative"
  },
  name: {
    margin: "0 0 10px 0",
    color: "#333"
  },
  info: {
    margin: "5px 0",
    color: "#666",
    fontSize: "14px"
  },
  editButton: {
    marginTop: "10px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  }
};