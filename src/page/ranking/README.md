# Ranking Page (랭킹 페이지)

A page displaying couple rankings with profile images, scores, star ratings, and creation dates.

## Features

- **Ranking list** showing top couples
- **Rank badges** with special styling for top 3 (gold, silver, bronze medals)
- **Profile images** for both people in each couple
- **Couple names** (optional display)
- **Compatibility scores** prominently displayed
- **Star ratings** (1-5 stars) for each couple
- **Creation dates** with smart formatting (오늘, 어제, N일 전, etc.)
- **Hover effects** with elevation and border color change
- **Animations**: fade-in and slide-in effects
- **Responsive design** following existing page patterns

## Usage

### As a Route (Standalone)

Navigate to `/ranking` to see the page with default example data:

```typescript
navigate('/ranking');
```

### With Custom Data

Pass rankings as props:

```typescript
import Ranking from '@/page/ranking';

const rankings = [
  {
    rank: 1,
    couple: {
      person1: { name: '김민수', image: 'https://example.com/image1.jpg' },
      person2: { name: '이지은', image: 'https://example.com/image2.jpg' },
    },
    score: 99,
    rating: 5,
    createdAt: '2024-03-15',
    coupleName: '민지 커플',
  },
  // ... more rankings
];

<Ranking rankings={rankings} />
```

## Data Structure

### CoupleRanking Interface

```typescript
interface CoupleRanking {
  rank: number;                    // Ranking position (1, 2, 3, ...)
  couple: {
    person1: {
      name: string;                // First person's name
      image: string;               // First person's profile image URL
    };
    person2: {
      name: string;                // Second person's name
      image: string;               // Second person's profile image URL
    };
  };
  score: number;                   // Compatibility score (0-100)
  rating: number;                  // Star rating (0-5)
  createdAt: string;               // Creation date (ISO format or YYYY-MM-DD)
  coupleName?: string;             // Optional couple nickname
}
```

## Visual Elements

### 1. Rank Badges

- **1st place**: Gold gradient background
- **2nd place**: Silver gradient background
- **3rd place**: Bronze gradient background
- **4th+ place**: Gray background

### 2. Profile Images

- Circular images (60px × 60px)
- Pink border matching theme
- Centered below each person's name

### 3. Heart Icon

- Animated pulse effect between the two profiles
- Pink color (#FF69B4)

### 4. Star Rating

- Gold stars (★) for filled
- Gray stars (☆) for empty
- Hover scale effect (1.2x)
- Supports decimal ratings (e.g., 4.5 shows 4 full stars)

### 5. Score Display

- Large pink number
- "궁합도" label above
- Prominent display in info section

### 6. Creation Date

- Smart formatting:
  - "오늘" for today
  - "어제" for yesterday
  - "N일 전" for less than a week
  - "N주 전" for less than a month
  - Full date for older entries

## Design Implementation

This component follows the project's MCP rules:

- ✅ **Styled-Components** for all styling (no inline styles)
- ✅ **TypeScript** with strict typing (no `any` types)
- ✅ **MCP spacing scale** (4px, 8px, 16px, 20px, 24px, 50px)
- ✅ **Unified hover effects** using `filter: brightness(0.9)` and transform
- ✅ **Keyframe animations** for fade-in, slide-in, and pulse effects
- ✅ **Theme colors** from the design system
- ✅ **Consistent with existing pages** (Header structure matches Result/DestinyFinderList)

## Animations

1. **Fade-in**: Content wrapper fades in with 0.6s duration
2. **Slide-in**: Each ranking item slides from left with 0.4s duration
3. **Pulse**: Heart icon pulses with 1.5s infinite loop
4. **Hover effects**:
   - Ranking items lift up 4px on hover
   - Border changes to pink
   - Box shadow appears
   - Stars scale up 1.2x

## Styling Features

### Card Hover State

When hovering over a ranking item:
- Border color changes from gray (#D9D9D9) to pink (#F97A9F)
- Card elevates 4px upward
- Pink shadow appears underneath
- Smooth 0.3s transition

### Responsive Design

- Max width: 900px
- Centered layout
- Padding adjusts for smaller screens
- All elements maintain spacing ratios

## File Structure

```
src/page/ranking/
├── index.tsx          # Main component with ranking logic
├── style.ts           # Styled-components definitions
└── README.md          # This documentation
```

## Integration Points

### API Integration (Future)

The component is ready to receive data from an API:

```typescript
// Example API call
const { data: rankings } = useQuery('rankings', fetchRankings);

<Ranking rankings={rankings} />
```

### Navigation

Currently integrated routes:
- From anywhere: Navigate to `/ranking`
- Back button: Returns to home (`/`)

### Default Data

If no rankings are provided, displays 3 example couples with:
- Sample Korean names
- Default profile images
- Sample scores (99, 95, 92)
- Sample ratings (5, 4.5, 4)
- Recent dates

## Customization

### Adding More Rankings

Simply add more items to the rankings array:

```typescript
const myRankings = [...Array(10)].map((_, i) => ({
  rank: i + 1,
  couple: {
    person1: { name: `Person ${i * 2 + 1}`, image: normalProfile },
    person2: { name: `Person ${i * 2 + 2}`, image: normalProfile },
  },
  score: 100 - i * 5,
  rating: 5 - i * 0.5,
  createdAt: new Date().toISOString(),
}));
```

### Styling the Rank Badge

The rank badge automatically styles based on rank:
- Top 3 get special gradient colors
- Others get gray theme color
- All have consistent circular shape and size

## Performance Considerations

- Images lazy load naturally through React
- Animations use CSS transforms (GPU accelerated)
- No heavy computations in render
- Date formatting memoizable if needed

## Accessibility

- Semantic HTML structure
- Alt text on all images
- Keyboard navigable
- Screen reader friendly text hierarchy
