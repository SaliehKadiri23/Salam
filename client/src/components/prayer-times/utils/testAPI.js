import { getPrayerTimesByAddress } from '../services/prayerTimesService';

// Test the prayer times API
export const testPrayerTimesAPI = async () => {
  try {
    console.log('Testing prayer times API...');
    
    // Test with a known location
    const result = await getPrayerTimesByAddress('London, UK');
    
    if (result.success) {
      console.log('API Test Successful:', result);
      return result;
    } else {
      console.error('API Test Failed:', result.error);
      return null;
    }
  } catch (error) {
    console.error('API Test Error:', error);
    return null;
  }
};