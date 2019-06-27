import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl } from 'react-native';

export const useRefreshControl = (refreshHandler: () => Promise<any>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = useCallback(() => setIsRefreshing(true), []);

  useEffect(() => {
    if (isRefreshing) {
      refreshHandler().finally(() => {
        console.log('finished refreshing');
        setIsRefreshing(false);
      });
    }
  }, [isRefreshing, refreshHandler]);

  return <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />;
};
