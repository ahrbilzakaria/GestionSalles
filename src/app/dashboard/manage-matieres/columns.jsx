"use client";
import { deleteFiliere } from "@/app/api/filieres";
import { deleteMatiere } from "@/app/api/matieres";
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
import { Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ActionsCell = ({ filiere }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleEdit = () => {
    router.push(`/dashboard/manage-matieres/edit?id=${filiere.id}`);
  };
  const handleView = () => {
    router.push(`/dashboard/manage-matieres/view?id=${filiere.id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteMatiere(filiere.id); // Call the delete API function
      toast({
        title: "Done!",
        description: "Matiere deleted successfully!",
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
              matiere.
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
    header: "Filière Name",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell filiere={row.original} />,
  },
];
