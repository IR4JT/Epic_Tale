import { useContext } from 'react';
import { RelationshipContext } from '../contexts/RelationshipContext';
import '../styles/RelationshipButton.css';

export default function RelationshipButton({ mediaId, isSelected, onTwoSelected }) {
  const { toggleMediaSelection, selectedMediaIds } = useContext(RelationshipContext);

  function handleClick() {
    toggleMediaSelection(mediaId);

    // Check if two media are now selected
    if (selectedMediaIds.includes(mediaId)) {
      // Will be true after toggle
      setTimeout(() => {
        if (selectedMediaIds.length === 1) {
          onTwoSelected?.();
        }
      }, 0);
    }
  }

  return (
    <button
      className={`relationship-button ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      title={isSelected ? 'Deselect media' : 'Select media to create relationship'}
    >
      <span className="icon">🔗</span>
      <span className="label">{isSelected ? 'Selected' : 'Relate'}</span>
    </button>
  );
}
