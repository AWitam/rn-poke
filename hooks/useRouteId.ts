import { useGlobalSearchParams } from "expo-router";

export const useRouteId = () => {
  const { id } = useGlobalSearchParams();
  
  return typeof id === 'string' ? parseInt(id, 10) : null;
};
