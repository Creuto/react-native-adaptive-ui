import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { AdaptiveStack } from '../src/components/AdaptiveStack';

describe('AdaptiveStack', () => {
  it('renders in vertical column layout with spacing', () => {
    const { getByTestId } = render(
      <AdaptiveStack testID="stack-container" spacing={12}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </AdaptiveStack>,
    );

    const container = getByTestId('stack-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          gap: 12,
        }),
      ]),
    );
  });

  it('allows custom alignItems and justifyContent props', () => {
    const { getByTestId } = render(
      <AdaptiveStack
        testID="stack-container"
        spacing={16}
        alignItems="center"
        justifyContent="space-between"
      >
        <Text>Item A</Text>
      </AdaptiveStack>,
    );

    const container = getByTestId('stack-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }),
      ]),
    );
  });
});
