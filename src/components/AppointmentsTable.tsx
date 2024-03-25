'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate, formatDateGetDay, formatDateGetHour } from '@/utils/date';
import { formatPaymentMethodCaption } from '@/utils/caption';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { FormattedAppointmentData } from '@/lib/schemas';
import { formatToCurrency } from '@/utils/number';
import { Button } from '@/components/ui/button';
import { Session } from '@/helpers/getSession';
import { Input } from '@/components/ui/input';
import { Fragment, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export const columns: ColumnDef<FormattedAppointmentData>[] = [
  { accessorKey: 'appointmentId' },

  {
    accessorKey: 'haircutName',
    header: 'Corte',
    cell: ({ row }) => <div>{row.getValue('haircutName')}</div>,
  },

  {
    accessorKey: 'haircutPrice',
    header: () => <div>Preço</div>,
    cell: ({ row }) => <div className='font-medium'>{formatToCurrency(row.getValue('haircutPrice'))}</div>,
  },

  {
    accessorKey: 'appointmentDate',
    header: ({ column }) => {
      return (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Data
          <ArrowUpDown className='ml-2 h-4 w-4 min-w-4' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Fragment>
        <div className='max-lg:hidden'>{formatDate(row.getValue('appointmentDate'))}h</div>
        <div className='lg:hidden'>
          {formatDateGetDay(row.getValue('appointmentDate'))} às{' '}
          {formatDateGetHour(row.getValue('appointmentDate'))}h
        </div>
      </Fragment>
    ),
  },

  {
    accessorKey: 'paymentMethod',
    header: () => <div>Método de Pagamento</div>,
    cell: ({ row }) => {
      return <div className='font-medium'>{formatPaymentMethodCaption(row.getValue('paymentMethod'))}</div>;
    },
  },

  {
    accessorKey: 'appointmentStatus',
    header: () => <div>Status</div>,
    cell: ({ row }) => <div className='font-medium'>{row.getValue('appointmentStatus')}</div>,
  },

  {
    accessorKey: 'clientName',
    header: () => <div className='text-right'>Cliente</div>,
    cell: ({ row }) => <div className='text-right font-medium'>{row.getValue('clientName')}</div>,
  },

  {
    accessorKey: 'employeeName',
    header: () => <div className='text-right'>Profissional</div>,
    cell: ({ row }) => <div className='text-right font-medium'>{row.getValue('employeeName')}</div>,
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const { appointmentId } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Abrir Menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(appointmentId)}
              className='cursor-pointer'
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer'>Cancelar</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>Confirmar</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer'>Reagendar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const AppointmentsTable = <TData, TValue>({
  session,
  tableData: { data, columns },
}: {
  session: Session;
  tableData: DataTableProps<TData, TValue>;
}) => {
  const isUserAuthorized = session?.accountType === 'ADMIN' || session?.accountType === 'EMPLOYEE';
  const columnsVisibility = {
    appointmentId: false,
    actions: isUserAuthorized,
    clientName: isUserAuthorized,
    employeeName: !isUserAuthorized,
  };

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(columnsVisibility);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  return (
    <div className='flex w-full flex-col items-center gap-8'>
      <div className='flex w-full justify-between max-[865px]:flex-col max-[865px]:gap-3'>
        {isUserAuthorized && (
          <Input
            placeholder='Busque pelo nome do cliente...'
            value={(table.getColumn('clientName')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('clientName')?.setFilterValue(event.target.value)}
            className='max-w-sm max-[865px]:max-w-full'
          />
        )}
        {!isUserAuthorized && (
          <Input
            placeholder='Busque pelo nome do profissional...'
            value={(table.getColumn('employeeName')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('employeeName')?.setFilterValue(event.target.value)}
            className='max-w-sm max-[865px]:max-w-full'
          />
        )}
        <Input
          placeholder='Busque pelo status do agendamento...'
          value={(table.getColumn('appointmentStatus')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('appointmentStatus')?.setFilterValue(event.target.value)}
          className='max-w-sm max-[865px]:max-w-full'
        />
      </div>
      <div className='flex w-full flex-col gap-4'>
        <div className='flex items-center justify-end gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
        <div className='w-full rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className='whitespace-nowrap max-[865px]:text-xs'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`whitespace-nowrap max-[865px]:text-xs ${!isUserAuthorized && 'py-3.5'}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-[500px] text-center'>
                    Nenhum Resultado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
