# Architecture

## Project Structure

```
src/
├── components/              # React UI components
│   ├── TacticalBoard.tsx   # Main canvas component for pitch visualization
│   ├── FormationSelector.tsx # Formation selection dropdown
│   ├── ControlPanel.tsx     # Play/pause/reset controls
│   └── TeamCard.tsx         # Team information display
├── engines/                 # Core business logic
│   └── renderer.ts          # Canvas rendering utilities
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
│   └── index.ts             # Main type definitions
├── utils/                   # Utility functions
│   ├── canvas.ts            # Canvas coordinate conversions
│   ├── formations.ts        # Formation presets and utilities
│   ├── player.ts            # Player creation and manipulation
│   ├── match.ts             # Match state management
│   └── __tests__/           # Unit tests
├── App.tsx                  # Main application component
├── main.tsx                 # React entry point
└── index.css                # Global styles
```

## Architecture Principles

### 1. Separation of Concerns
- **Components**: Handle UI rendering and user interaction
- **Engines**: Contain core business logic (rendering, physics, AI)
- **Utilities**: Pure functions for data transformation
- **Types**: Centralized type definitions

### 2. Immutability
- All state updates create new objects rather than mutating existing ones
- Players, Teams, and MatchState are immutable
- Utility functions return new objects

### 3. Pure Functions
- Utility functions have no side effects
- Same input always produces same output
- Easier to test and reason about

### 4. Component Design
- React components are functional with hooks
- Props are immutable
- State changes trigger re-renders

## Data Flow

1. **User Interaction** → Component Event Handlers
2. **State Update** → useState callback updates MatchState
3. **Re-render** → React re-renders components with new state
4. **Canvas Render** → Canvas component renders pitch, players, ball

## Type System

Core types defined in `types/index.ts`:
- `Position`: x, y coordinates (0-1 normalized)
- `Player`: Individual player with position, state
- `Team`: Collection of players with formation
- `MatchState`: Current match configuration and state
- `FormationPreset`: Predefined player positions

## Canvas Rendering

The `TacticalBoard` component uses HTML5 Canvas for rendering:
- Pitch background and markings
- Player circles with numbers
- Ball
- UI overlays (team names, pause indicator)

Coordinate System:
- Normalized coordinates (0-1) for data storage
- Canvas coordinates for rendering
- Conversion utilities in `canvas.ts`

## State Management

State is managed at the App level using React's `useState`:
- `matchState`: MatchState containing both teams and ball position
- Callbacks passed to children for state updates
- Immutable updates using functional patterns

## Future Enhancements

- **Physics Engine**: Ball trajectory, player movement physics
- **AI Engine**: Tactical AI for automatic player movement
- **Analytics**: Performance metrics and heat maps
- **Persistence**: Save/load formations and tactics
- **Multiplayer**: Real-time collaboration features
