# Propose Page (고백하기 페이지)

A data-driven confession page that displays compatibility information between two people.

## Features

- **Radial gradient background** with animated heart
- **Profile cards** with circular images, names, and MBTI types
- **Compatibility score** display
- **Detailed compatibility information** for heart rate, temperature, and MBTI
- **Accept/Reject buttons** with hover effects
- **Fade-in animations** for smooth entrance
- **Heartbeat animation** for background element
- **Navigation flow**: Accept button navigates to `/propose-success` page

## Usage

### As a Route (Standalone)

Navigate to `/propose` to see the page with default example data:

```typescript
navigate('/propose');
```

### With Location State

Pass data through React Router's location state:

```typescript
navigate('/propose', {
  state: {
    proposerName: '김철수',
    proposerMbti: 'ENFP',
    proposerImage: 'https://example.com/image1.jpg',
    receiverName: '이영희',
    receiverMbti: 'INFJ',
    receiverImage: 'https://example.com/image2.jpg',
    compatibilityScore: 95,
    heartRateCompatibility: 92,
    temperatureCompatibility: 88,
  },
});
```

### With Props

Use as a component with custom props:

```typescript
import Propose from '@/page/propose';

<Propose
  proposerName="김철수"
  proposerMbti="ENFP"
  proposerImage="https://example.com/image1.jpg"
  receiverName="이영희"
  receiverMbti="INFJ"
  receiverImage="https://example.com/image2.jpg"
  compatibilityScore={95}
  heartRateCompatibility={92}
  temperatureCompatibility={88}
  onAccept={() => console.log('Accepted!')}
  onReject={() => console.log('Rejected!')}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `proposerName` | `string` | `'이원희'` | Name of the person making the confession |
| `proposerMbti` | `string` | `'ISFP'` | MBTI type of the proposer |
| `proposerImage` | `string` | `normalProfile` | Profile image URL of the proposer |
| `receiverName` | `string` | `'이원희'` | Name of the person receiving the confession |
| `receiverMbti` | `string` | `'ISFP'` | MBTI type of the receiver |
| `receiverImage` | `string` | `normalProfile` | Profile image URL of the receiver |
| `compatibilityScore` | `number` | `99` | Overall compatibility score (0-100) |
| `heartRateCompatibility` | `number` | `99` | Heart rate compatibility percentage |
| `temperatureCompatibility` | `number` | `88` | Temperature compatibility percentage |
| `onAccept` | `() => void` | Default handler | Callback when accept button is clicked |
| `onReject` | `() => void` | Default handler | Callback when reject button is clicked |

## Design Implementation

This component follows the project's MCP rules:

- ✅ **Styled-Components** for all styling (no inline styles)
- ✅ **TypeScript** with strict typing (no `any` types)
- ✅ **MCP spacing scale** (8px, 12px, 16px, 20px, etc.)
- ✅ **Unified hover effects** using `filter: brightness(0.9)`
- ✅ **Keyframe animations** for fade-in and heartbeat effects
- ✅ **Theme colors** from the design system

## Animations

1. **Fade-in**: Content wrapper fades in from bottom with 0.6s duration
2. **Heartbeat**: Background heart pulses with 3s infinite loop
3. **Hover effects**: Buttons use brightness filter on hover

## File Structure

```
src/page/propose/
├── index.tsx          # Main component with logic
├── style.ts           # Styled-components definitions
└── README.md          # This documentation
```
