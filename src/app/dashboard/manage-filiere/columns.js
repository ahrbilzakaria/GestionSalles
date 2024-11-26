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

export const columns = [
  {
    accessorKey: "id", // Column for the ID of the filiere
    header: "ID",
  },
  {
    accessorKey: "name", // Column for the name of the filiere
    header: "Filière Name",
  },
  {
    accessorKey: "capacity", // Column for the capacity of the filiere
    header: "Capacity",
  },
  {
    id: "actions", // Column for action buttons
    header: "Actions",
    cell: ({ row }) => {
      // Extract the current filiere from the row
      const filiere = row.original;
      const router = useRouter();
      const { toast } = useToast(); // Import your toast hook

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
            variant: "",
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
          <Button
            className=""
            variant="secondary"
            size="sm"
            onClick={handleEdit}
          >
            <Edit></Edit> Edit
          </Button>

          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="" variant="destructive" size="sm">
                <Trash></Trash>Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-destructive">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  filiere .
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDelete();
                  }}
                  className="bg-destructive "
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
