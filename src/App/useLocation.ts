import { useState, useEffect } from 'react';
import {
  askAsync as askPermissions,
  PermissionStatus,
  LOCATION,
} from 'expo-permissions';
import {
  getCurrentPositionAsync as getCurrentPosition,
  LocationData,
} from 'expo-location';

export const useLocation = (): LocationData | undefined => {
  const [location, setLocation] = useState<LocationData>();

  useEffect(() => {
    async function getLocation() {
      const { status } = await askPermissions(LOCATION);
      if (status === PermissionStatus.DENIED) {
        throw new Error(
          'You need to grant location permissions to use this app.'
        );
      }

      const newLocation = await getCurrentPosition({});
      setLocation(newLocation);
    }

    getLocation();
  }, []);

  return location;
};
