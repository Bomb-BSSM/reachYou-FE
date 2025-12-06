# Propose Success Page (고백 수락 페이지)

A form page displayed after accepting a confession, allowing users to create a couple name and description.

## Features

- **Radial gradient background** with animated heart (same as Propose page)
- **Profile cards** showing both people with compatibility score
- **Two input fields**:
  - Couple name (required)
  - One-line description (optional)
- **Submit button** to register the couple
- **Skip link** to return without registering
- **Fade-in animations** for smooth entrance
- **Form validation** ensuring couple name is provided

## Usage

### Via Navigation (from Propose page)

The Propose page automatically navigates here when the user clicks "수락하기" (Accept):

```typescript
// From Propose page
navigate('/propose-success', {
  state: {
    proposerName: '김철수',
    proposerMbti: 'ENFP',
    proposerImage: 'https://example.com/image1.jpg',
    receiverName: '이영희',
    receiverMbti: 'INFJ',
    receiverImage: 'https://example.com/image2.jpg',
    compatibilityScore: 95,
  },
});
```

### Direct Navigation

Navigate to `/propose-success` to see the page with default example data:

```typescript
navigate('/propose-success');
```

### With Props

Use as a component with custom props and callbacks:

```typescript
import ProposeSuccess from '@/page/proposeSuccess';

<ProposeSuccess
  proposerName="김철수"
  proposerMbti="ENFP"
  proposerImage="https://example.com/image1.jpg"
  receiverName="이영희"
  receiverMbti="INFJ"
  receiverImage="https://example.com/image2.jpg"
  compatibilityScore={95}
  onSubmit={(coupleName, description) => {
    console.log('Couple Name:', coupleName);
    console.log('Description:', description);
  }}
  onSkip={() => console.log('Skipped registration')}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `proposerName` | `string` | `'이원희'` | Name of the person who made the confession |
| `proposerMbti` | `string` | `'ISFP'` | MBTI type of the proposer |
| `proposerImage` | `string` | `normalProfile` | Profile image URL of the proposer |
| `receiverName` | `string` | `'이원희'` | Name of the person who accepted |
| `receiverMbti` | `string` | `'ISFP'` | MBTI type of the receiver |
| `receiverImage` | `string` | `normalProfile` | Profile image URL of the receiver |
| `compatibilityScore` | `number` | `99` | Overall compatibility score (0-100) |
| `onSubmit` | `(coupleName: string, description: string) => void` | Default handler | Callback when submit button is clicked |
| `onSkip` | `() => void` | Default handler | Callback when skip link is clicked |

## Form Fields

### Couple Name (Required)

- Input field for entering a unique couple name
- Validation: Cannot be empty
- Placeholder: "우리만의 특별한 커플명을 작성해주세요!"

### Description (Optional)

- Input field for a one-line couple description
- No validation
- Placeholder: "ex) 부산소마고 역대 최강의 레전드 커플"

## User Flow

1. User receives confession on `/propose` page
2. User clicks "수락하기" (Accept) button
3. Navigates to `/propose-success` with user data
4. User fills in couple name (required) and description (optional)
5. User either:
   - Clicks "등록하기" (Submit) → Registers couple and navigates home
   - Clicks "등록하지 않고 돌아가기" (Skip) → Returns home without registering

## Design Implementation

This component follows the project's MCP rules:

- ✅ **Styled-Components** for all styling (no inline styles)
- ✅ **TypeScript** with strict typing (no `any` types)
- ✅ **MCP spacing scale** (2px, 10px, 14px, 20px, 32px, 50px)
- ✅ **Unified hover effects** using `filter: brightness(0.9)`
- ✅ **Keyframe animations** for fade-in and heartbeat effects
- ✅ **Theme colors** from the design system
- ✅ **Form validation** for required fields

## Animations

1. **Fade-in**: Content wrapper fades in from bottom with 0.6s duration
2. **Heartbeat**: Background heart pulses with 3s infinite loop
3. **Hover effects**: Button and skip link use brightness filter on hover
4. **Input focus**: Border color transitions to primary color

## File Structure

```
src/page/proposeSuccess/
├── index.tsx          # Main component with form logic
├── style.ts           # Styled-components definitions
└── README.md          # This documentation
```

## Integration with Propose Page

The Propose page (`/propose`) automatically navigates to this page when the user accepts a confession. All user data is passed through React Router's location state.

```typescript
// In Propose page (src/page/propose/index.tsx:42)
navigate('/propose-success', {
  state: {
    proposerName,
    proposerMbti,
    proposerImage,
    receiverName,
    receiverMbti,
    receiverImage,
    compatibilityScore,
  },
});
```
