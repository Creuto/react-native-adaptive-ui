import React from 'react';
import { render } from '@testing-library/react-native';
import { AdaptiveText } from '../src/components/AdaptiveText';

describe('AdaptiveText', () => {
  it('renders children text correctly', () => {
    const { getByText } = render(<AdaptiveText>Hello World</AdaptiveText>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('applies default size (16) and proportional line height', () => {
    const { getByText } = render(<AdaptiveText>Default Size</AdaptiveText>);
    const textNode = getByText('Default Size');

    expect(textNode.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: 16,
          lineHeight: Math.round(16 * 1.35),
        }),
      ]),
    );
  });

  it('applies custom size prop', () => {
    const { getByText } = render(<AdaptiveText size={20}>Large Title</AdaptiveText>);
    const textNode = getByText('Large Title');

    expect(textNode.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: 20,
          lineHeight: Math.round(20 * 1.35),
        }),
      ]),
    );
  });

  it('uses maxLines as an alias for numberOfLines', () => {
    const { getByText } = render(
      <AdaptiveText maxLines={2}>Truncated multi-line content</AdaptiveText>,
    );
    const textNode = getByText('Truncated multi-line content');
    expect(textNode.props.numberOfLines).toBe(2);
  });

  it('forwards ellipsizeMode, allowFontScaling, testID, and custom styles', () => {
    const { getByTestId } = render(
      <AdaptiveText
        testID="custom-text"
        ellipsizeMode="middle"
        allowFontScaling={true}
        style={{ color: 'red', fontWeight: 'bold' }}
      >
        Custom Text
      </AdaptiveText>,
    );
    const textNode = getByTestId('custom-text');

    expect(textNode.props.allowFontScaling).toBe(true);
    expect(textNode.props.ellipsizeMode).toBe('middle');
    expect(textNode.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 'red', fontWeight: 'bold' })]),
    );
  });
});
