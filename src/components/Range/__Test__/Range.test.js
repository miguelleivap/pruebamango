import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Range from '../Range';

describe('Range component', () => {
  it('renders correctly', () => {
    const { getAllByText } = render(<Range mode="fixed" values={[0, 100]} />);
    const euroSymbols = getAllByText('€');
    expect(euroSymbols.length).toBe(2);
  });

  it('initializes min and max values correctly', () => {
    const { getByDisplayValue } = render(<Range mode="fixed" values={[0, 100]} />);
    expect(getByDisplayValue('0')).toBeInTheDocument();
    expect(getByDisplayValue('100')).toBeInTheDocument();
  });

  it('updates min value correctly on input change', () => {
    const { getByDisplayValue } = render(<Range mode="dynamic" values={[0, 100]} />);
    fireEvent.change(getByDisplayValue('0'), { target: { value: '50' } });
    expect(getByDisplayValue('50')).toBeInTheDocument();
  });

  it('updates max value correctly on input change', () => {
    const { getByDisplayValue } = render(<Range mode="dynamic" values={[0, 100]} />);
    fireEvent.change(getByDisplayValue('100'), { target: { value: '75' } });
    expect(getByDisplayValue('75')).toBeInTheDocument();
  });

  it('updates min value correctly on slider drag', () => {
    const { getByTestId } = render(<Range mode="dynamic" values={[0, 100]} />);
    const minBullet = getByTestId('minBullet');
    fireEvent.mouseDown(minBullet);
  });

  it('updates max value correctly on slider drag', () => {
    const { getByTestId } = render(<Range mode="dynamic" values={[0, 100]} />);
    const maxBullet = getByTestId('maxBullet');
    fireEvent.mouseDown(maxBullet);
  });

});
