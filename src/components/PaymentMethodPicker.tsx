import { createSelectInputQueryString } from '@/helpers/createQueryString';
import { validatePaymentMethod } from '@/helpers/validateSearchParams';
import { Banknote, CreditCard, QrCode } from 'lucide-react';
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
  const paymentMethodIcons = {
    PIX: <QrCode className='size-5' />,
    CASH: <Banknote className='size-5' />,
    CARD: <CreditCard className='size-5' />,
  };

  const searchParams = useSearchParams();
  const selectedPaymentMethod = validatePaymentMethod(searchParams.get('payment'), 'CARD');

  const paymentMethodPlaceholder = searchParams.get('payment') ? (
    <div className='flex gap-2'>
      {paymentMethodIcons[selectedPaymentMethod]}
      {formatPaymentMethod(selectedPaymentMethod)}
    </div>
  ) : (
    'Método de Pagamento'
  );

  return (
    <div className='flex w-full flex-col gap-2'>
      <Select
        onValueChange={(paymentOption) =>
          createSelectInputQueryString({ inputKey: 'payment', selectInput: paymentOption, searchParams })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder={paymentMethodPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {paymentMethods.map((paymentOption) => {
              return (
                <SelectItem key={paymentOption} value={paymentOption}>
                  <div className='flex gap-2'>
                    {paymentMethodIcons[paymentOption]}
                    {formatPaymentMethod(paymentOption)}
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
