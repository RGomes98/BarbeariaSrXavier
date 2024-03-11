import { createSelectInputQueryString } from '@/helpers/createQueryString';
import { validatePaymentMethod } from '@/helpers/validateSearchParams';
import { formatPaymentMethod } from '@/utils/caption';
import { useSearchParams } from 'next/navigation';
import { PaymentMethod } from '@/mock/users';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const PaymentMethodPicker = ({ paymentMethods }: { paymentMethods: PaymentMethod[] }) => {
  const searchParams = useSearchParams();
  const paymentMethod = validatePaymentMethod(searchParams.get('payment'), 'CARD');

  return (
    <div className='flex w-[180px] flex-col gap-2 max-[1350px]:w-[33%] max-md:w-full'>
      <span>Método de Pagamento</span>
      <Select
        onValueChange={(paymentOption) =>
          createSelectInputQueryString({ inputKey: 'payment', selectInput: paymentOption, searchParams })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder={formatPaymentMethod(paymentMethod)} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {paymentMethods.map((paymentOption) => {
              return (
                <SelectItem key={paymentOption} value={paymentOption}>
                  {formatPaymentMethod(paymentOption)}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
