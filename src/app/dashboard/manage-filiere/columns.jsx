"use client";
import { deleteFiliere } from "@/app/api/filieres";
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
import { useRouter } from "next/navigation";

const ActionsCell = ({ filiere }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleEdit = () => {
    router.push(
      `/dashboard/manage-filiere/edit?name=${encodeURIComponent(
        filiere.name
      )}&capacity=${filiere.capacity}&id=${filiere.id}`
    );
  };

  const handleDelete = async () => {
    try {
      await deleteFiliere(filiere.id); // Call the delete API function
      toast({
        title: "Done!",
        description: "Filiere deleted successfully!",
      });
      location.reload();
    } catch (error) {
      console.error("Error deleting filiere:", error);
      toast({
        title: "Error!",
        description: "Couldn't delete filiere! Please try again later.",
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
              filiere.
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
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Filière Name",
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell filiere={row.original} />,
  },
];
