import React from 'react';
import { render } from '@testing-library/react-native';
import { Dimensions, Text } from 'react-native';
import { AdaptiveRow } from '../src/components/AdaptiveRow';

describe('AdaptiveRow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 375,
      height: 812,
      scale: 2,
      fontScale: 1.0,
    } as any);
  });

  it('renders in row layout by default at normal font scale', () => {
    const { getByTestId } = render(
      <AdaptiveRow testID="row-container">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </AdaptiveRow>,
    );

    const container = getByTestId('row-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        }),
      ]),
    );
  });

  it('automatically stacks vertically when fontScale >= stackAtFontScale (1.5)', () => {
    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 375,
      height: 812,
      scale: 2,
      fontScale: 1.6,
    } as any);

    const { getByTestId } = render(
      <AdaptiveRow testID="row-container">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </AdaptiveRow>,
    );

    const container = getByTestId('row-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flexDirection: 'column',
          alignItems: 'stretch',
        }),
      ]),
    );
  });

  it('respects stackAtFontScale={null} to remain in row mode regardless of font scale', () => {
    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 375,
      height: 812,
      scale: 2,
      fontScale: 2.0,
    } as any);

    const { getByTestId } = render(
      <AdaptiveRow testID="row-container" stackAtFontScale={null}>
        <Text>Item 1</Text>
      </AdaptiveRow>,
    );

    const container = getByTestId('row-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flexDirection: 'row',
        }),
      ]),
    );
  });

  it('respects wrap={false}', () => {
    const { getByTestId } = render(
      <AdaptiveRow testID="row-container" wrap={false}>
        <Text>Item 1</Text>
      </AdaptiveRow>,
    );

    const container = getByTestId('row-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flexWrap: 'nowrap',
        }),
      ]),
    );
  });
});
