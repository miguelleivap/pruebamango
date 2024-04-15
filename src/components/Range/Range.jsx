'use client'

import { useState, useEffect } from 'react';
import './Range.scss';

/**
 * @typedef {Object} RangeProps
 * @property {string} mode - The mode of the range component.
 * @property {number[]} values - An array of values representing the range.
 */
export default function Range ({ mode, values }) {
  const [min, setMin] = useState(values[0]);
  const [max, setMax] = useState(values[values.length - 1]);
  const [dragging, setDragging] = useState(null);

  useEffect(() => {
    const handleMouseUp = () => {
      setDragging(null);
    };
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleMouseDown = (e, bullet) => {
    e.preventDefault();
    setDragging(bullet);
  };

  const handleMouseMove = (e) => {
    if (dragging === 'min' || dragging === 'max') {
      const rect = e.currentTarget.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let offsetX = clientX - rect.left;
      offsetX = Math.max(0, Math.min(offsetX, rect.width));
      const percentage = offsetX / rect.width;

      if (mode === 'fixed') {
        const newIndex = Math.round((values.length - 1) * percentage);
        const newValue = values[newIndex];
        if (dragging === 'min') {
          if (newValue < max) {
            setMin(newValue);
          } else {
            const maxIndex = values.findIndex(val => val === max);
            setMin(values[maxIndex - 1]); 
          }
        } else if (dragging === 'max') {
            if (newValue > min) {
              setMax(newValue);
            } else {
              const minIndex = values.findIndex(val => val === min);
              setMax(values[minIndex + 1]);
            }
        }
      } else {
        const newValue = values[0] + (percentage * (values[values.length - 1] - values[0]));
        if (dragging === 'min') {
          setMin(Math.round(Math.min(newValue, max - 1)));
        } else if (dragging === 'max') {
          setMax(Math.round(Math.max(newValue, min + 1)));
        }
      }
    }
  };

  const handleMinInputChange = (e) => {
    const newMin = parseInt(e.target.value);
    if (!isNaN(newMin) && mode !== 'fixed') {
      const clampedMin = Math.max(values[0], Math.min(newMin, max - 1));
      setMin(clampedMin);
    }
  };
  
  const handleMaxInputChange = (e) => {
    const newMax = parseInt(e.target.value);
    if (!isNaN(newMax) && mode !== 'fixed') {
      const clampedMax = Math.min(values[values.length - 1], Math.max(newMax, min + 1));
      setMax(clampedMax);
    }
  };

  return (
    <div className='range'>
      <div className='input-container'>
        <input className='input-right' type="number" value={min} onChange={handleMinInputChange} />
        <span className='input-symbol'>&euro;</span>
      </div>
      <div className='line-container' onMouseMove={handleMouseMove} onTouchMove={handleMouseMove}>
        <div className='line' />
        <div className='bullet' data-testid="minBullet" style={{ left: `${(min - values[0]) / (values[values.length - 1] - values[0]) * 100}%` }} onMouseDown={(e) => handleMouseDown(e, 'min')} onTouchStart={(e) => handleMouseDown(e, 'min')} />
        <div className='bullet' data-testid="maxBullet" style={{ left: `${(max - values[0]) / (values[values.length - 1] - values[0]) * 100}%` }} onMouseDown={(e) => handleMouseDown(e, 'max')} onTouchStart={(e) => handleMouseDown(e, 'max')}/>
      </div>
      <div className='input-container'>
        <input className='input-left' type="number" value={max} onChange={handleMaxInputChange} />
        <span className='input-symbol'>&euro;</span>
      </div>
    </div>
  );
};

