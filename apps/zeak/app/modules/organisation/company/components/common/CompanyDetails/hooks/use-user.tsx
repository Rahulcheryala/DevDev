// app/hooks/useUser.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useUser(userId: string) {
  const fetchUser = async (): Promise<any> => {
    const response = await axios.get(`/api/user/${userId}`);
    return response.data.user[0];
  };

  return useQuery({
    queryKey: ['user', userId],
    queryFn: fetchUser,
    enabled: !!userId,
  });
}