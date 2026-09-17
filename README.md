# @creuto/react-native-adaptive-ui

> *Either we build it exceptional, or we don't.* — [**Creuto**](https://creuto.com)

`@creuto/react-native-adaptive-ui` is a lightweight, zero-dependency layout toolkit designed for React Native. It solves one specific problem that breaks many mobile applications: **unpredictable layouts when users increase their system accessibility font size.**

Instead of hiding behind `allowFontScaling={false}` and breaking accessibility for users with vision preferences, this package helps your UI gracefully adjust line heights, stack rows into columns, and preserve spatial hierarchy regardless of device text scaling.

Handcrafted with strict engineering discipline by the team at [**Creuto**](https://creuto.com).

---

## The Problem

When a user turns up the font scale in iOS (Dynamic Type) or Android accessibility settings, fixed layout assumptions collapse:

- Text lines collide vertically because `lineHeight` doesn't scale with `fontSize`.
- Horizontal rows with labels and buttons overflow off the screen edge.
- Text gets clipped inside fixed-height containers.

```tsx
// Standard React Native Text & Row at fontScale >= 1.5x
// Result: Text clips, button gets pushed off-screen, lines overlap.
<View style={{ flexDirection: 'row', height: 48, alignItems: 'center' }}>
  <Text style={{ fontSize: 16 }} numberOfLines={1}>
    Johnathan Alexander Doermann
  </Text>
  <TouchableOpacity style={styles.button}>
    <Text>Follow</Text>
  </TouchableOpacity>
</View>
```

---

## The Solution

```tsx
// Adaptive layout with @creuto/react-native-adaptive-ui
// Result: Line height scales proportionally, row seamlessly transforms to stack when text grows.
import { AdaptiveRow, AdaptiveText } from '@creuto/react-native-adaptive-ui';

<AdaptiveRow spacing={12} stackAtFontScale={1.4}>
  <AdaptiveText size={16} maxLines={2}>
    Johnathan Alexander Doermann
  </AdaptiveText>
  <TouchableOpacity style={styles.button}>
    <Text>Follow</Text>
  </TouchableOpacity>
</AdaptiveRow>
```

---

## Installation

```bash
npm install @creuto/react-native-adaptive-ui
```

```bash
# yarn
yarn add @creuto/react-native-adaptive-ui

# pnpm
pnpm add @creuto/react-native-adaptive-ui
```

---

## Core Components & Hooks

### `<AdaptiveText>`

Accessible `Text` replacement. Respects user system scaling while computing relative line height (`baseFontSize * 1.35`) to prevent vertical text clipping.

```tsx
import { AdaptiveText } from '@creuto/react-native-adaptive-ui';

<AdaptiveText size={18} maxLines={2} style={{ color: '#111827' }}>
  Account Overview & Security Settings
</AdaptiveText>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `number` | `16` | Base font size in dp before scaling. |
| `maxLines` | `number` | `undefined` | Alias for `numberOfLines`. |
| `allowFontScaling` | `boolean` | `true` | Respects user font settings. |
| *TextProps* | `TextProps` | — | Supports all standard React Native `Text` props. |

---

### `<AdaptiveRow>`

Horizontal container that wraps items or automatically transforms into a vertical column when system text scale crosses a threshold.

```tsx
import { AdaptiveRow, AdaptiveText } from '@creuto/react-native-adaptive-ui';

<AdaptiveRow spacing={12} stackAtFontScale={1.5} wrap={true}>
  <AdaptiveText size={14}>Subscription Status: Active</AdaptiveText>
  <Button title="Upgrade Plan" onPress={handleUpgrade} />
</AdaptiveRow>
```

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `wrap` | `boolean` | `true` | Enables flex wrapping in row mode. |
| `stackAtFontScale` | `number \| null` | `1.5` | Font scale threshold to switch to vertical stack. Set `null` to disable. |
| `spacing` | `number` | `8` | Gap spacing between elements in dp. |
| *ViewProps* | `ViewProps` | — | Supports all standard React Native `View` props. |

---

### `<AdaptiveStack>`

Predictable vertical container for consistent layout spacing.

```tsx
import { AdaptiveStack, AdaptiveText } from '@creuto/react-native-adaptive-ui';

<AdaptiveStack spacing={16} alignItems="stretch">
  <AdaptiveText size={20}>Security Policy</AdaptiveText>
  <AdaptiveText size={14}>Two-factor authentication is required for all admin actions.</AdaptiveText>
</AdaptiveStack>
```

---

### `useFontScale()`

Hook that monitors device accessibility settings and reactively updates state.

```tsx
import { useFontScale } from '@creuto/react-native-adaptive-ui';

const Component = () => {
  const { fontScale, isLarge, isExtraLarge } = useFontScale();

  return (
    <View>
      {/* Hide non-essential decorations at extra large font scale */}
      {!isExtraLarge && <BadgeIcon />}
      <AdaptiveText>Current Scale: {fontScale}x</AdaptiveText>
    </View>
  );
};
```

- `fontScale`: Current scale factor (`1.0`, `1.5`, etc.).
- `isLarge`: `true` when `fontScale >= 1.3`.
- `isExtraLarge`: `true` when `fontScale >= 1.7`.

---

### `useAdaptiveLayout()`

Hook providing screen dimension metrics and orientation/font-scale responsiveness.

```tsx
import { useAdaptiveLayout } from '@creuto/react-native-adaptive-ui';

const Dashboard = () => {
  const { width, isSmallScreen, isTablet, isLargeText } = useAdaptiveLayout();

  return (
    <View style={{ padding: isSmallScreen ? 12 : 24 }}>
      <AdaptiveText size={isTablet ? 24 : 16}>
        Dashboard Container ({width}dp)
      </AdaptiveText>
    </View>
  );
};
```

---

### Helper Utilities

```tsx
import { clamp, responsiveSize } from '@creuto/react-native-adaptive-ui';

// Restrict numeric dimension within bounds
const fontSize = clamp(customSize, 12, 32);

// Scale spacing with maximum safety cap
const padding = responsiveSize(16, fontScale, 2.0);
```

---

## Design Principles

1. **Accessibility First**: We never force `allowFontScaling={false}`. Accessibility takes priority over rigid visual compactness.
2. **Zero Runtime Dependencies**: Keep your bundle clean and lightweight (< 3 KB gzipped).
3. **No Magic Scaling**: Layouts adapt through responsive wrapping, dynamic stacking, and sensible constraints—not blind linear scaling of every pixel.

---

## About Creuto

[**Creuto**](https://creuto.com) is a leading product engineering firm. We architect and build enterprise-grade software systems, custom mobile applications, and AI-driven digital platforms.

- **Website**: [creuto.com](https://creuto.com)
- **Mobile App Engineering**: [creuto.com/services/mobile-apps-development](https://creuto.com/services/mobile-apps-development)
- **Creuto AI Systems**: [creuto.com/ai](https://creuto.com/ai)
- **Custom Software Services**: [creuto.com/services/custom-software-development](https://creuto.com/services/custom-software-development)
- **MVP Product Engineering**: [creuto.com/services/mvp-development](https://creuto.com/services/mvp-development)
- **Case Studies**: [creuto.com/case-studies](https://creuto.com/case-studies)
- **Technical Engineering Blog**: [creuto.com/blog](https://creuto.com/blog)

### Global Footprint
- **India**: O-Hub, Infocity, Bhubaneswar, Odisha
- **Australia**: Sydney Startup Hub, Sydney, NSW
- **Vietnam**: Đinh Nghệ, Sơn Trà, Đà Nẵng
- **Dubai**: AIDP Business Tower, Dubai Marina
- **New Zealand**: Beauchamp Street, Wellington

---

## License

[MIT](./LICENSE) © [Creuto](https://creuto.com)
