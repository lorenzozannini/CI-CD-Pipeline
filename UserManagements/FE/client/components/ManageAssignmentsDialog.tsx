import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RoleBadge, Role } from "./RoleBadge";
import { RoleDropdown } from "./RoleDropdown";
import { ScopeDropdown } from "./ScopeDropdown";
import { X, Loader2 } from "lucide-react"; 
import { useState } from "react";
import { toast } from "sonner";

interface Assignment {
  id?: string;
  role: Role;
  scope: string;
}

interface ManageAssignmentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  currentAssignments: Assignment[];
}

export function ManageAssignmentsDialog({
  open,
  onOpenChange,
  userName,
  currentAssignments,
}: ManageAssignmentsDialogProps) {
  const [assignments, setAssignments] = useState<Assignment[]>(currentAssignments);
  const [newRole, setNewRole] = useState<Role>("Viewer");
  const [newScope, setNewScope] = useState("System");
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const removeAssignment = async (index: number, assignment: Assignment) => {
    try {
      setIsDeleting(index);

      const response = await fetch(`/removerole`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: assignment.id,
          role: assignment.role, 
          scope: assignment.scope
        }),
      });

      if (!response.ok) {
        throw new Error("Errore durante la cancellazione");
      }

      setAssignments((prev) => prev.filter((_, i) => i !== index));

    } catch (error) {
      console.error("Errore API:", error);
      toast.error("Impossibile eliminare")
    } finally {
      setIsDeleting(null);
    }
  };

  const addAssignment = () => {
    setAssignments([...assignments, { role: newRole, scope: newScope }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[689px] max-h-[90vh] overflow-y-auto rounded-[15px] border border-black p-8">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none"
        >
          <X className="h-6 w-6 text-[#1D1B20]" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-inter text-black">
              Manage Assignments
            </h2>
            <p className="text-sm font-inter text-[#7B7B7B]">
              Assign roles at system, project area, or specific project
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[15px] font-inter text-black">
              Current Assigments
            </h3>

            <div className="flex flex-col gap-[15px]">
              {assignments.map((assignment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-[5px] border border-[#8C8989] px-[5px] py-2.5"
                >
                  <div className="flex items-center gap-5">
                    <RoleBadge role={assignment.role} />
                    <div className="text-sm font-inter text-black">
                      {assignment.scope}
                    </div>
                  </div>
                  
                  {/* MODIFICA: Bottone di rimozione con stato di loading */}
                  <button 
                    onClick={() => removeAssignment(index, assignment)}
                    disabled={isDeleting === index} // Disabilita se sta caricando
                    className="disabled:opacity-50"
                  >
                    {isDeleting === index ? (
                      <Loader2 className="h-6 w-6 animate-spin text-[#1D1B20]" />
                    ) : (
                      <X className="h-6 w-6 text-[#1D1B20]" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>  
          <div className="flex flex-col gap-4">
            <h3 className="text-[15px] font-inter text-black">
              Add New Assigment
            </h3>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <RoleDropdown value={newRole} onChange={setNewRole} />
              <ScopeDropdown value={newScope} onChange={setNewScope} />
            </div>

            <button
              onClick={addAssignment}
              className="flex items-center justify-center gap-2.5 rounded-lg border border-black py-2.5 hover:bg-gray-50 transition-colors"
            >
              <span className="text-base font-inter text-black">
                Add Assigment
              </span>
            </button>
          </div>

          <div className="flex items-center justify-end gap-[18px] mt-8">
            <button
              onClick={() => onOpenChange(false)}
              className="px-6 py-2.5 rounded-lg border border-black hover:bg-gray-50 transition-colors"
            >
              <span className="text-base font-inter text-black">Cancel</span>
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="px-6 py-2.5 rounded-lg bg-black hover:bg-gray-800 transition-colors"
            >
              <span className="text-base font-inter text-white">
                Save Changes
              </span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}