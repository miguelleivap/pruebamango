'use client'
import { useState, useEffect } from 'react';
import Range from '../../components/Range/Range';
import api from '../../service/api';
export default function page() {
  const [minMaxValues, setMinMaxValues] = useState({ min: 0, max: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data =  await api.fetchMinMaxValues();
      if(data){
        setMinMaxValues({
          min: data.min,
          max: data.max
        });
        setIsLoading(false);
      }
    }
    fetchData()
  }, []);

  return (
    <div>
      <h1>Exercise 1</h1>
      {!isLoading && (
        <Range mode="normal" values={[minMaxValues.min, minMaxValues.max]} />
      )}
    </div>
  );
}