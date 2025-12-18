import { Dialog, DialogContent } from "@/components/ui/dialog";
import { RoleBadge, Role } from "./RoleBadge";
import { RoleDropdown, AVAILABLE_ROLES } from "./RoleDropdown";
import { ScopeSelector, ScopeResult } from "./ScopeSelector";
import { X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

// --- INTERFACCE ---
export interface Assignment {
  id: number;
  userId: number;
  roleId: number;
  roleName: string;
  projectId: number | null;
  areaId: number | null;
  scopeName: string;
  scopeType: "SYSTEM" | "PROJECT" | "AREA";
}

interface DropdownSelection {
  id: number | null;
  name: string;
  type: "ROLE";
}

interface ManageAssignmentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: number;
  currentAssignments: Assignment[];
}

export function ManageAssignmentsDialog({
  open,
  onOpenChange,
  userId,
  currentAssignments,
}: ManageAssignmentsDialogProps) {
  // 1. Inizializzazione sicura dello stato
  const [assignments, setAssignments] = useState<Assignment[]>(currentAssignments || []);

  useEffect(() => {
    if (currentAssignments) {
      setAssignments(currentAssignments);
    }
  }, [currentAssignments]);

  // 2. Default sicuri
  const defaultRole = (AVAILABLE_ROLES && AVAILABLE_ROLES.length > 0)
    ? (AVAILABLE_ROLES.find(r => r.name === "Viewer") || AVAILABLE_ROLES[0])
    : { id: 0, name: "Loading..." };

  const [selectedRole, setSelectedRole] = useState<DropdownSelection>({ 
    id: defaultRole.id, name: defaultRole.name, type: "ROLE" 
  });
  const [selectedScope, setSelectedScope] = useState<ScopeResult>({ 
    id: null, name: "System", type: "SYSTEM" 
  });

  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // --- DELETE LOGIC ---
  const removeAssignment = async (assignmentId: number) => {
    try {
      setIsDeletingId(assignmentId);
      const response = await fetch(`/api/user-roles/${assignmentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error("Errore delete");
      setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
    } catch (error) {
      console.error("Errore cancellazione:", error);
    } finally {
      setIsDeletingId(null);
    }
  };

  // --- ADD LOGIC ---
  const addAssignment = async () => {
    if (!selectedRole.id) return;
    if (selectedScope.type !== "SYSTEM" && !selectedScope.id) return;

    try {
      setIsAdding(true);
      const payload = {
        userId: userId,
        roleId: selectedRole.id,
        projectId: selectedScope.type === "PROJECT" ? selectedScope.id : null,
        areaId: selectedScope.type === "AREA" ? selectedScope.id : null,
      };

      const response = await fetch(`/api/user-roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Errore salvataggio");

      const savedAssignment = await response.json();
      const newAssignmentLocal: Assignment = {
        id: savedAssignment.id,
        userId: userId,
        roleId: selectedRole.id!,
        roleName: selectedRole.name,
        projectId: payload.projectId,
        areaId: payload.areaId,
        scopeName: selectedScope.name,
        scopeType: selectedScope.type as "SYSTEM" | "PROJECT" | "AREA"
      };

      setAssignments([...assignments, newAssignmentLocal]);
    } catch (error) {
      console.error("Errore salvataggio:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="p-6">
          
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Manage Assignments
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Assign roles at system, project area, or specific project
              </p>
            </div>
            {/* NOTA: Ho rimosso il <button><X/></button> qui.
                Shadcn UI aggiunge automaticamente la X di chiusura in alto a destra 
                tramite il componente DialogContent.
            */}
          </div>

          {/* Current Assignments List */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Current Assignments</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {(!assignments || assignments.length === 0) && (
                <p className="text-sm text-gray-500 italic">No assignments yet.</p>
              )}
              {assignments && assignments.map((assignment, index) => (
                <div
                  key={assignment.id ? `id-${assignment.id}` : `idx-${index}`}
                  className="flex items-center justify-between rounded-md border border-gray-300 bg-white p-3 shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <RoleBadge role={(assignment.roleName || "Viewer") as Role} />
                    <span className="text-sm text-gray-900 font-medium">
                      {assignment.scopeName || "Unknown Scope"}
                    </span>
                  </div>
                  <button
                    onClick={() => removeAssignment(assignment.id)}
                    disabled={isDeletingId === assignment.id}
                    className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none disabled:opacity-50"
                  >
                    {isDeletingId === assignment.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <X className="h-5 w-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Assignment Form */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Add New Assignment</h3>
            
            {/* LAYOUT A SLOT: 
                Inseriamo il RoleDropdown dentro lo ScopeSelector 
                per avere la prima riga divisa 50/50 e la seconda a 100% 
            */}
            <ScopeSelector
                onChange={(result) => setSelectedScope(result)}
                roleSlot={
                    <RoleDropdown
                        valueId={selectedRole.id}
                        onChange={(id, name) => setSelectedRole({ id, name, type: "ROLE" })}
                    />
                }
            />

            <button
              onClick={addAssignment}
              disabled={isAdding || (selectedScope.type !== "SYSTEM" && !selectedScope.id)}
              className="mt-6 w-full flex items-center justify-center rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isAdding ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
              Add Assignment
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-100">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}