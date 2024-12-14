"use client";
import { deleteReservation } from "@/app/api/reservations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"; // Import your button component
import { useToast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";

const ActionsCell = ({ filiere }) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteReservation(filiere.id); // Call the delete API function
      toast({
        title: "Done!",
        description: "Reservation deleted successfully!",
      });
      location.reload();
    } catch (error) {
      toast({
        title: "Error!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2 w-[100px] mr-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="" variant="destructive" size="sm">
            <Trash /> Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              reservation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export const columns = [
  {
    accessorKey: "jour",
    header: "Day",
  },
  {
    accessorKey: "week",
    header: "Week Number",
  },
  {
    accessorKey: "seance",
    header: "Seance",
  },
  {
    accessorKey: "salle.name",
    header: "Salle",
  },
  {
    accessorKey: "reservationStatus",
    header: "Status",
  },
  {
    accessorKey: "filiere.name",
    header: "Filliere",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell filiere={row.original} />,
  },
];
