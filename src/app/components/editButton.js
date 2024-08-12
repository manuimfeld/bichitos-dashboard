import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";

export const EditDialogContent = ({ sale }) => {
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Editar venta</DialogTitle>
      <DialogDescription>Cambie los valores de la venta</DialogDescription>
      <div className="grid gap-4 py-4 text-black">
        <form className="h-fit flex-col">
          <div className="grid grid-cols-4 items-center gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pago" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Efectivo</SelectItem>
                <SelectItem value="2">Transferencia</SelectItem>
                <SelectItem value="3">Débito</SelectItem>
                <SelectItem value="4">Crédito</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="payment_type">
              Monto
              <Input
                id="amount"
                type="number"
                defaultValue={Math.floor(sale.amount)}
              />
            </Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Turno" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Mañana</SelectItem>
                <SelectItem value="2">Tarde</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <input type="submit" value="Guardar" />
        </form>
      </div>
    </DialogHeader>
  </DialogContent>;
};
