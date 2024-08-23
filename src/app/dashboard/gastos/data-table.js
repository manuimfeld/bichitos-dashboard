"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ReloadSvg from "@/app/components/ventas/reloadSvg";
import SelectDate from "@/app/components/selectDate";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]); // Inicializar con un array vacío
  const [columnFilters, setColumnFilters] = useState([]); // Inicializar con un array vacío

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting, // Corregido de onSortingChange
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="mt-4 lg:mt-0 shadow-lg border border-[#E0E0E0] order-3 lg:order-2 rounded-md w-full bg-white p-4">
      <SelectDate params="gastos" />
      <div className="flex items-center">
        <Input
          placeholder="Filtar por proveedor..."
          value={table.getColumn("provider")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("provider")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <ReloadSvg onClick={() => console.log("GASTOS RELOAD")} />
      </div>
      <Table className="text-xs">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay ventas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
