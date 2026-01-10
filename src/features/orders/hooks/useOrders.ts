import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export const useOrders = (status?: string) => {
  return useQuery({
    queryKey: ['orders', status], // هذا المفتاح هو "اسم المخزن"
    queryFn: async () => {
      // السيرفر يعرف من هو المستخدم من الكوكيز، لا نحتاج لإرسال ID
      const { data } = await api.get('/orders', { params: { status } });
      return data;
    },
  });
};