'use client'
import { useState, useEffect } from 'react';
import Range from "../../components/Range/Range";
import api from '../../service/api';
export default function page() {
  const [values, setMinMaxValues] = useState([0]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data =  await api.fetchRangeMinMaxValues()
      if(data.values){
        setMinMaxValues(data.values)
        setIsLoading(false);
      }
    }
    fetchData()
  }, []);

  return (
    <div>
      <h1>Exercise 2</h1>
      {!isLoading && (
        <Range mode="fixed" values={values} />
      )}
    </div>
  );
}
