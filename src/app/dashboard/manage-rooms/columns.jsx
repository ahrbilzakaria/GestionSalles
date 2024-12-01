"use client";

import { deleteSalle } from "@/app/api/rooms";
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
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ActionsCell = ({ salle }) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleEdit = () => {
    router.push(`/dashboard/manage-rooms/edit?id=${salle.id}`);
  };

  const handleDelete = async () => {
    try {
      console.log(salle);
      await deleteSalle(salle.id); // Call the delete API function
      toast({
        title: "Done!",
        description: "Salle deleted successfully!",
      });

      location.reload();
    } catch (error) {
      console.error("Error deleting salle:", error);
      toast({
        title: "Error!",
        description: "Couldn't delete salle! Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-2 w-[100px] mr-2">
      <Button className="" variant="secondary" size="sm" onClick={handleEdit}>
        <Edit /> Edit
      </Button>
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
              salle.
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
      {/* <Button className="" variant="" size="sm" onClick={handleView}>
        <Eye></Eye>
      </Button> */}
    </div>
  );
};

export const columns = [
  {
    accessorKey: "name",
    header: "Room Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "numberOfSeats",
    header: "Number of Seats",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell salle={row.original} />,
  },
];
