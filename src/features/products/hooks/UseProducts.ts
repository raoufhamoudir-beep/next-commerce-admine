import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export const UseProducts = () => {
  return useQuery({
    queryKey: ['products'], // المخزن باسم "items"
    queryFn: async () => {
      const { data } = await api.get('/products');
      return data;
    },
  });
};