import { useState } from 'react';
import { supabase } from '../../utils/supabase';
import '../styles/RelationshipLevelModal.css';

const RELATIONSHIP_LEVELS = [
  { id: 0, label: 'Same Media Type & Series', description: 'Both are the same type and in the same series' },
  { id: 1, label: 'Different Type, Same Series', description: 'Different media types but in the same series' },
  { id: 2, label: 'Same Creator', description: 'Created by the same person/studio' },
];

export default function RelationshipLevelModal({ media1, media2, onClose, onSuccess }) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCreateRelationship() {
    if (selectedLevel === null) return;

    setIsLoading(true);
    setError('');

    try {
      // Insert relationship in both directions
      const { error: error1 } = await supabase
        .from('relationships')
        .insert([
          {
            media_id_1: media1.id,
            media_id_2: media2.id,
            level: selectedLevel,
          },
        ]);

      const { error: error2 } = await supabase
        .from('relationships')
        .insert([
          {
            media_id_1: media2.id,
            media_id_2: media1.id,
            level: selectedLevel,
          },
        ]);

      if (error1 || error2) {
        setError(error1?.message || error2?.message || 'Failed to create relationship');
        setIsLoading(false);
        return;
      }

      onSuccess?.();
      onClose?.();
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create Relationship</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <p className="modal-subtitle">
            Creating relationship between <strong>{media1?.name}</strong> and <strong>{media2?.name}</strong>
          </p>

          <div className="relationship-levels">
            {RELATIONSHIP_LEVELS.map((level) => (
              <button
                key={level.id}
                className={`level-option ${selectedLevel === level.id ? 'selected' : ''}`}
                onClick={() => setSelectedLevel(level.id)}
              >
                <div className="level-radio">{selectedLevel === level.id && '✓'}</div>
                <div className="level-info">
                  <div className="level-label">{level.label}</div>
                  <div className="level-description">{level.description}</div>
                </div>
              </button>
            ))}
          </div>

          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button
            className="btn-confirm"
            onClick={handleCreateRelationship}
            disabled={selectedLevel === null || isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Relationship'}
          </button>
        </div>
      </div>
    </div>
  );
}
