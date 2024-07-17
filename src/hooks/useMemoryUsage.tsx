import { useState, useEffect } from 'react';
import { NativeModules } from 'react-native';

const { MemoryUsage } = NativeModules;
console.log({MemoryUsage})

const useMemoryUsage = () => {
  const [usageInfo, setUsageInfo] = useState(null);
  const [error, setError] = useState(null);
    
  const fetchUsageInfo = async () => {
    try {
      const result = await MemoryUsage.getMemoryUsage();
      console.log("passed data from the rn bridge", result);
      const processedResult = {
        ...result,
        cpu_usage: result.cpu_usage || 0
      };
      console.log("processed result:", processedResult);
      setUsageInfo(processedResult);
    } catch (err) {
      setError(err);
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUsageInfo();
    const interval = setInterval(fetchUsageInfo, 5000); 
    return () => clearInterval(interval);
  }, []);

  return { usageInfo, error };
};

export default useMemoryUsage;