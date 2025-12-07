# Propose Fail Page (고백 거절 페이지)

A page displayed when a confession is rejected, showing the rejection message with profile information.

## Features

- **Radial gradient background** with animated heart (consistent with other propose pages)
- **Profile cards** showing both people with compatibility score
- **Rejection message** clearly stating the confession was not accepted
- **Go back button** to return to home
- **Fade-in animations** for smooth entrance
- **Heartbeat animation** for background element

## Usage

### Via Navigation (from Propose page)

The Propose page automatically navigates here when the user clicks "거절하기" (Reject):

```typescript
// From Propose page
navigate('/propose-fail', {
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

Navigate to `/propose-fail` to see the page with default example data:

```typescript
navigate('/propose-fail');
```

### With Props

Use as a component with custom props and callbacks:

```typescript
import ProposeFail from '@/page/proposeFail';

<ProposeFail
  proposerName="김철수"
  proposerMbti="ENFP"
  proposerImage="https://example.com/image1.jpg"
  receiverName="이영희"
  receiverMbti="INFJ"
  receiverImage="https://example.com/image2.jpg"
  compatibilityScore={95}
  onGoBack={() => console.log('Going back')}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `proposerName` | `string` | `'이원희'` | Name of the person who made the confession |
| `proposerMbti` | `string` | `'ISFP'` | MBTI type of the proposer |
| `proposerImage` | `string` | `normalProfile` | Profile image URL of the proposer |
| `receiverName` | `string` | `'이원희'` | Name of the person who rejected |
| `receiverMbti` | `string` | `'ISFP'` | MBTI type of the receiver |
| `receiverImage` | `string` | `normalProfile` | Profile image URL of the receiver |
| `compatibilityScore` | `number` | `99` | Overall compatibility score (0-100) |
| `onGoBack` | `() => void` | Default handler | Callback when go back button is clicked |

## User Flow

1. User receives confession on `/propose` page
2. User clicks "거절하기" (Reject) button
3. Navigates to `/propose-fail` with user data
4. Message displays: "{receiverName} 님은 {proposerName} 님의 고백을 수락하지 않았습니다..."
5. User clicks "돌아가기" (Go back) button → Returns to home

## Design Implementation

This component follows the project's MCP rules:

- ✅ **Styled-Components** for all styling (no inline styles)
- ✅ **TypeScript** with strict typing (no `any` types)
- ✅ **MCP spacing scale** (20px, 32px, 50px, 102px)
- ✅ **Unified hover effects** using `filter: brightness(0.9)`
- ✅ **Keyframe animations** for fade-in and heartbeat effects
- ✅ **Theme colors** from the design system

## Animations

1. **Fade-in**: Content wrapper fades in from bottom with 0.6s duration
2. **Heartbeat**: Background heart pulses with 3s infinite loop
3. **Hover effect**: Go back button uses brightness filter on hover

## File Structure

```
src/page/proposeFail/
├── index.tsx          # Main component with navigation logic
├── style.ts           # Styled-components definitions
└── README.md          # This documentation
```

## Integration with Propose Page

The Propose page (`/propose`) automatically navigates to this page when the user rejects a confession. All user data is passed through React Router's location state.

```typescript
// In Propose page (src/page/propose/index.tsx:60)
navigate('/propose-fail', {
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

## Comparison with Other Propose Pages

| Feature | Propose | Propose Success | Propose Fail |
|---------|---------|-----------------|--------------|
| Profile Cards | ✅ | ✅ | ✅ |
| Compatibility Score | ✅ | ✅ | ✅ |
| Info Box | ✅ | ❌ | ❌ |
| Form Inputs | ❌ | ✅ | ❌ |
| Action Buttons | Accept/Reject | Submit/Skip | Go Back |
| Message Type | Confession | Acceptance | Rejection |
