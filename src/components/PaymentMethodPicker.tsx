import { createSelectInputQueryString } from '@/helpers/createQueryString';
import { validatePaymentMethod } from '@/helpers/validateSearchParams';
import { formatPaymentMethod } from '@/utils/caption';
import { useSearchParams } from 'next/navigation';
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
                  {paymentOption === paymentMethod
                    ? `Método de Pagamento Selecionado: ${formatPaymentMethod(paymentOption)}`
                    : formatPaymentMethod(paymentOption)}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
