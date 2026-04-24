# Media Relationship System - Implementation Guide

## Overview
A complete relationship system for linking media together based on different relationship types.

## Features Implemented

### 1. **Relationship Selection**
- Click the "Relate" button (🔗) next to any media in the home list
- Button turns green and shows "Selected" when clicked
- Select two media to create a relationship

### 2. **Relationship Level Modal**
- After selecting two media, a modal appears with three relationship type options:
  - **Level 0**: Same Media Type & Series
  - **Level 1**: Different Type, Same Series  
  - **Level 2**: Same Creator
- Click a level and confirm to create the relationship

### 3. **Relationship Storage**
- Relationships are saved to the Supabase `relationships` table
- Stored bidirectionally (each direction is a separate record for easier querying)
- Format: `media_id_1`, `media_id_2`, `level`

### 4. **Relationship Display**
- Below each media item on the home page, related media are shown
- Format: `Media Name (Type) [Relationship Type]`
- Click on any related media to navigate to its detail page

### 5. **Media Detail Page**
- Shows all relationships for a specific media item
- Each relationship links to the related media

## File Structure

```
src/
├── components/
│   ├── RelationshipButton.jsx       # Click to select media
│   ├── RelationshipLevelModal.jsx   # Choose relationship type
│   └── RelationshipDisplay.jsx      # Show relationships
├── contexts/
│   └── RelationshipContext.jsx      # Global state management
├── styles/
│   ├── RelationshipButton.css
│   ├── RelationshipLevelModal.css
│   └── RelationshipDisplay.css
├── pages/
│   ├── Home.jsx                     # Updated with relationship UI
│   ├── MediaDetail.jsx              # Updated to show relationships
│   └── AddMedia.jsx
└── App.jsx                          # Now wrapped with RelationshipProvider
```

## Usage Flow

### Creating Relationships
1. Go to Home page
2. Click the "Relate" (🔗) button on a media item → button turns green
3. Click the "Relate" button on another media item
4. A modal appears asking for relationship level
5. Select level and click "Create Relationship"
6. Relationship appears under both media items immediately

### Viewing Relationships
- **On Home Page**: See related media listed below each media item
- **On Detail Page**: View all relationships for the current media
- **Navigation**: Click on any relationship to go to that media

### Editing Relationships
- Currently not implemented (can be added: delete old, create new)
- Each media can have unlimited relationships

## Database Schema Used

```sql
CREATE TABLE relationships (
  id bigint PRIMARY KEY,
  media_id_1 bigint REFERENCES media(id),
  media_id_2 bigint REFERENCES media(id),
  level bigint -- 0, 1, or 2
);
```

## Technical Details

- **State Management**: RelationshipContext provides global state for selected media
- **API Calls**: All relationship operations use Supabase client
- **Bidirectional**: Relationships are stored both ways for easier querying
- **Real-time Updates**: Relationships reload after creation

## Future Enhancements

1. Delete relationships
2. Edit relationship types
3. Show relationship indicator separately from media
4. Search/filter by relationships
5. Relationship count badge on media
6. Visual graph of relationships
