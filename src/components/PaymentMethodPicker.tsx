import { createSelectInputQueryString } from '@/helpers/createQueryString';
import { validatePaymentMethod } from '@/helpers/validateSearchParams';
import { formatPaymentMethod } from '@/utils/caption';
import { useSearchParams } from 'next/navigation';
import { BadgeDollarSign } from 'lucide-react';
import { paymentMethods } from '@/lib/schemas';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const PaymentMethodPicker = () => {
  const searchParams = useSearchParams();
  const paymentMethod = validatePaymentMethod(searchParams.get('payment'), 'CARD');

  return (
    <div className='flex w-full flex-col gap-2'>
      <Select
        onValueChange={(paymentOption) =>
          createSelectInputQueryString({ inputKey: 'payment', selectInput: paymentOption, searchParams })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder='Método de Pagamento' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {paymentMethods.map((paymentOption) => {
              return (
                <SelectItem key={paymentOption} value={paymentOption}>
                  {paymentOption === paymentMethod ? (
                    <div className='flex gap-2'>
                      <BadgeDollarSign className='size-5' />
                      {formatPaymentMethod(paymentOption)}
                    </div>
                  ) : (
                    formatPaymentMethod(paymentOption)
                  )}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
