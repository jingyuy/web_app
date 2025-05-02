import Constants from 'expo-constants';
import { Platform } from 'react-native';

const ENV = {
  development: {
    backendUrl: Platform.OS === 'web' ? 'http://localhost:8000' : 'http://10.0.2.2:8000',
  },
  production: {
    backendUrl: 'https://your-production-backend.com',
  },
};

const getEnvVars = () => {
  const releaseChannel = Constants.expoConfig?.releaseChannel || Constants.manifest?.releaseChannel;

  if (!releaseChannel || releaseChannel === 'default') {
    return ENV.development; // Default to development
  }

  return ENV.production;
};

export default getEnvVars();
