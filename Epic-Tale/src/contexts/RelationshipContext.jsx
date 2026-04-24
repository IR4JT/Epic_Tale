import { createContext, useState, useCallback } from 'react';

export const RelationshipContext = createContext();

export function RelationshipProvider({ children }) {
  const [selectedMediaIds, setSelectedMediaIds] = useState([]);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [relationships, setRelationships] = useState({});
  const [relationshipMode, setRelationshipMode] = useState(false);

  const toggleMediaSelection = useCallback((mediaId) => {
    setSelectedMediaIds((prev) => {
      if (prev.includes(mediaId)) {
        return prev.filter((id) => id !== mediaId);
      }
      if (prev.length < 2) {
        return [...prev, mediaId];
      }
      return prev;
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedMediaIds([]);
  }, []);

  const toggleRelationshipMode = useCallback(() => {
    setRelationshipMode((prev) => !prev);
    clearSelection();
  }, [clearSelection]);

  const getRelationshipsForMedia = (mediaId) => {
    return relationships[mediaId] || [];
  };

  const addRelationship = useCallback((mediaId, relatedMediaId, level, relatedMediaInfo) => {
    setRelationships((prev) => ({
      ...prev,
      [mediaId]: [
        ...(prev[mediaId] || []),
        { mediaId: relatedMediaId, level, ...relatedMediaInfo },
      ],
    }));
  }, []);

  return (
    <RelationshipContext.Provider
      value={{
        selectedMediaIds,
        toggleMediaSelection,
        clearSelection,
        showLevelModal,
        setShowLevelModal,
        relationships,
        getRelationshipsForMedia,
        addRelationship,
        relationshipMode,
        toggleRelationshipMode,
      }}
    >
      {children}
    </RelationshipContext.Provider>
  );
}
