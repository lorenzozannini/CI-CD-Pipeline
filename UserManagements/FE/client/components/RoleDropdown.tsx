import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// DEFINIZIONE STATICA DEI RUOLI
// ATTENZIONE: Controlla che questi ID corrispondano alla tua tabella 'roles' nel DB
export const AVAILABLE_ROLES = [
  { id: 1, name: "Administrator" },
  { id: 2, name: "Project Manager" },
  { id: 3, name: "Developer" },
  { id: 4, name: "Viewer" }
];

interface RoleDropdownProps {
  valueId: number | null; // Usiamo l'ID per selezionare il valore, è più sicuro
  onChange: (id: number, name: string) => void;
}

export function RoleDropdown({ valueId, onChange }: RoleDropdownProps) {
  
  // Trova il ruolo corrente basandosi sull'ID
  const currentRole = AVAILABLE_ROLES.find(r => r.id === valueId);

  const handleValueChange = (stringId: string) => {
    const id = parseInt(stringId);
    const role = AVAILABLE_ROLES.find((r) => r.id === id);
    if (role) {
      onChange(role.id, role.name);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-gray-700">Role</label>
      <Select
        value={valueId?.toString()} 
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-full border-black">
          <SelectValue placeholder="Select a role">
            {currentRole ? currentRole.name : "Select Role"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_ROLES.map((role) => (
            <SelectItem key={role.id} value={role.id.toString()}>
              {role.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}