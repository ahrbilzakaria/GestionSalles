import {
  deleteChargeHoraire,
  updateChargeHoraire,
} from "@/app/api/chargeHoraire";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Edit, Plus, RefreshCcw, Spline, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export function ChargeHoraireCard({ title, charge, id, setIsDeleted }) {
  const { toast } = useToast();
  const [matiere, setMatiere] = useState({
    courseHours: charge.courseHours,
    tpHours: charge.tpHours,
    tdHours: charge.tdHours,
  });

  const handleDelete = async (id) => {
    try {
      const result = await deleteChargeHoraire(id);
      toast({
        title: "Done!",
        description: "Matiere deleted successfully!",
        variant: "",
      });
      setIsDeleted(true);
    } catch (error) {
      toast({
        title: "Error!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };
  const [chargeHoraire, setChargeHoraire] = useState();
  const updateCharge = async () => {
    if (!matiere.courseHours || !matiere.tpHours || !matiere.tdHours) {
      toast({
        title: "Validation Error!",
        description: "Please fill all fields.",
        variant: "destructive",
      });
      return;
    }
    const payload = {
      heuresCours: matiere.courseHours,
      heuresTP: matiere.tpHours,
      heuresTD: matiere.tdHours,
    };

    try {
      const chargeData = await updateChargeHoraire(id, payload);
      setChargeHoraire(chargeData); // Set the fetched filieres to the state
      toast({
        title: "Done!",
        description: "Charge updated successfully!",
        variant: "",
      });
      setIsDeleted(true);
      setMatiere({
        courseHours: "",
        tpHours: "",
        tdHours: "",
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    setMatiere({
      courseHours: charge.heuresCours,
      tpHours: charge.heuresTP,
      tdHours: charge.heuresTD,
    });
  }, [charge]);
  return (
    <Card className="flex justify-center md:min-w-[19rem] items-center flex-col h-fit  w-full md:w-auto">
      <CardHeader className=" bg-primary text-secondary p-2 w-full text-center mb-4">
        <p className="font-semibold ">{title}</p>
      </CardHeader>
      <CardContent className="flex  gap-2 items-center">
        <div className="flex gap-2 items-center">
          Cours:{" "}
          <span className="px-2 py-1 border bg-muted text-primary font-medium">
            {charge.heuresCours}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          Tp:{" "}
          <span className="px-2 py-1 border bg-muted text-primary font-medium">
            {charge.heuresTP}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          Td:{" "}
          <span className="px-2 py-1 border bg-muted text-primary font-medium">
            {charge.heuresTD}
          </span>
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-center">
        <div className="flex gap-2 ">
          <Sheet>
            <SheetTrigger className="w-fit" asChild>
              <Button variant="secondary" className="">
                <Edit></Edit> Edit
              </Button>
            </SheetTrigger>
            <SheetContent side={"top"}>
              <SheetHeader>
                <SheetTitle>Update Charge Horaire de {title}:</SheetTitle>
                <SheetDescription>
                  Click update when you are done.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Course hours
                  </Label>
                  <Input
                    className="max-w-[8rem]"
                    id="courseHours"
                    type="number"
                    value={matiere.courseHours}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only positive integers or empty string
                      if (/^\d*$/.test(value)) {
                        setMatiere({ ...matiere, courseHours: value });
                      }
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Tp hours
                  </Label>
                  <Input
                    className="max-w-[8rem]"
                    id="tpHours"
                    type="number"
                    value={matiere.tpHours}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setMatiere({ ...matiere, tpHours: value });
                      }
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Td hours
                  </Label>
                  <Input
                    className="max-w-[8rem]"
                    id="tdHours"
                    type="number"
                    value={matiere.tdHours}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setMatiere({ ...matiere, tdHours: value });
                      }
                    }}
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    onClick={() => {
                      updateCharge();
                    }}
                    type="submit"
                  >
                    <RefreshCcw /> Update
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="" variant="destructive">
                <Trash /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-destructive">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive"
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
