import { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState();

  useEffect(() => {
    async function getLocation() {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === Permissions.PermissionStatus.DENIED) {
        throw new Error(
          'You need to grant location permissions to use this app.'
        );
      }

      const newLocation = await Location.getCurrentPositionAsync({});
      setLocation(newLocation);
    }

    getLocation();
  }, []);

  return location;
};
