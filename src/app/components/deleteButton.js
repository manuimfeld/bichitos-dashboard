import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const DeleteAlertDialogContent = ({ sale }) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          ¿Estás seguro que quieres eliminar esta venta?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Si haces click en eliminar se eliminará para siempre
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction>
          <Button
            variant="destructive"
            onClick={() =>
              alert(
                "La venta ID: " + sale.sale_id + " fue eliminada correctamente"
              )
            }
          >
            Eliminar
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
