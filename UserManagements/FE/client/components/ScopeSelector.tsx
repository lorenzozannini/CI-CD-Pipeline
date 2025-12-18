import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchableDropdown, SearchOption } from "./SearchableDropdown";

// --- DATI DI ESEMPIO ---
const MOCK_AREAS: SearchOption[] = [
  { id: 1, name: "Area Marketing" },
  { id: 2, name: "Area IT" },
  { id: 3, name: "Area HR" },
  { id: 4, name: "Area Finance" },
  { id: 5, name: "Area Legal" },
];

const MOCK_PROJECTS = [
  { id: 101, name: "Campagna Social 2024", areaId: 1 },
  { id: 102, name: "Rebranding Sito", areaId: 1 },
  { id: 103, name: "Migrazione Cloud", areaId: 2 },
  { id: 104, name: "App Dipendenti", areaId: 2 },
  { id: 105, name: "Nuove Assunzioni", areaId: 3 },
];

export interface ScopeResult {
  id: number | null;
  name: string;
  type: "SYSTEM" | "PROJECT" | "AREA";
}

interface ScopeSelectorProps {
  onChange: (result: ScopeResult) => void;
  roleSlot?: React.ReactNode; // <--- NUOVA PROP: Qui inseriremo il dropdown del ruolo
}

export function ScopeSelector({ onChange, roleSlot }: ScopeSelectorProps) {
  const [scopeType, setScopeType] = useState<"SYSTEM" | "AREA" | "PROJECT">("SYSTEM");
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Filtro Progetti
  const filteredProjects: SearchOption[] = (selectedAreaId && selectedAreaId !== "all")
    ? MOCK_PROJECTS.filter((p) => p.areaId === parseInt(selectedAreaId))
    : MOCK_PROJECTS;

  useEffect(() => {
    let result: ScopeResult = { id: null, name: "System", type: "SYSTEM" };

    if (scopeType === "SYSTEM") {
      result = { id: null, name: "System", type: "SYSTEM" };
    } 
    else if (scopeType === "AREA") {
      const area = MOCK_AREAS.find(a => a.id.toString() === selectedAreaId);
      if (area) result = { id: Number(area.id), name: area.name, type: "AREA" };
      else result = { id: null, name: "", type: "AREA" };
    } 
    else if (scopeType === "PROJECT") {
      const project = MOCK_PROJECTS.find(p => p.id.toString() === selectedProjectId);
      if (project) result = { id: project.id, name: project.name, type: "PROJECT" };
      else result = { id: null, name: "", type: "PROJECT" };
    }

    onChange(result);
  }, [scopeType, selectedAreaId, selectedProjectId]);

  const handleTypeChange = (val: "SYSTEM" | "AREA" | "PROJECT") => {
    setScopeType(val);
    setSelectedAreaId(null);
    setSelectedProjectId(null);
  };

  const handleAreaFilterChange = (val: string) => {
    setSelectedAreaId(val);
    setSelectedProjectId(null);
  };

  const areaFilterOptions: SearchOption[] = [
    { id: "all", name: "All Areas" },
    ...MOCK_AREAS
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      
      {/* RIGA 1: RUOLO (50%) + TIPO SCOPE (50%) */}
      <div className="flex flex-row gap-4 w-full">
        
        {/* SLOT PER IL RUOLO */}
        <div className="flex-1 w-1/2">
             {roleSlot}
        </div>

        {/* SELEZIONE TIPO */}
        <div className="flex-1 w-1/2 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Scope Type</label>
            <Select value={scopeType} onValueChange={(v: any) => handleTypeChange(v)}>
            <SelectTrigger className="border-gray-300 w-full">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="SYSTEM">System (Global)</SelectItem>
                <SelectItem value="AREA">Specific Area</SelectItem>
                <SelectItem value="PROJECT">Specific Project</SelectItem>
            </SelectContent>
            </Select>
        </div>
      </div>

      {/* RIGA 2: RICERCA (100% WIDTH) */}
      
      {scopeType === "AREA" && (
        <div className="flex flex-col gap-2 animate-in fade-in zoom-in duration-300 w-full">
          <label className="text-sm font-medium text-gray-700">Select Area</label>
          <SearchableDropdown
            options={MOCK_AREAS}
            value={selectedAreaId}
            onChange={setSelectedAreaId}
            placeholder="Search & Select Area..."
          />
        </div>
      )}

      {scopeType === "PROJECT" && (
        <div className="flex flex-col gap-3 p-3 bg-gray-50 rounded-md border border-gray-200 animate-in fade-in zoom-in duration-300 w-full">
          
          {/* Filtro Area */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-gray-500 uppercase">
              Filter by Area (Optional)
            </label>
            <SearchableDropdown
               options={areaFilterOptions}
               value={selectedAreaId || "all"}
               onChange={handleAreaFilterChange}
               placeholder="Filter by Area..."
            />
          </div>

          {/* Selezione Progetto */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-gray-700">Select Project</label>
            <SearchableDropdown
              options={filteredProjects}
              value={selectedProjectId}
              onChange={setSelectedProjectId}
              placeholder="Search & Select Project..."
              disabled={filteredProjects.length === 0}
            />
            {filteredProjects.length === 0 && (
              <span className="text-xs text-red-500">No projects found.</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}