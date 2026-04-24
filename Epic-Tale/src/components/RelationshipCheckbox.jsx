import { useContext } from 'react';
import { RelationshipContext } from '../contexts/RelationshipContext';
import '../styles/RelationshipCheckbox.css';

export default function RelationshipCheckbox({ mediaId }) {
  const { selectedMediaIds, toggleMediaSelection } = useContext(RelationshipContext);
  const isSelected = selectedMediaIds.includes(mediaId);

  return (
    <button
      className={`relationship-checkbox ${isSelected ? 'selected' : ''}`}
      onClick={() => toggleMediaSelection(mediaId)}
      title={isSelected ? 'Deselect' : 'Select'}
    >
      {isSelected && <span className="checkmark">✓</span>}
    </button>
  );
}
