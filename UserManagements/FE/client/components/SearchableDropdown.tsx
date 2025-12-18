import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Modifica: ID può essere numero o stringa (per gestire "all" o UUID)
export interface SearchOption {
  id: number | string;
  name: string;
}

interface SearchableDropdownProps {
  options: SearchOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
}

export function SearchableDropdown({
  options = [], // Default array vuoto
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  disabled = false
}: SearchableDropdownProps) {
  const [open, setOpen] = React.useState(false)

  // SICUREZZA ANTI-PAGINA BIANCA:
  if (!options) {
    return <Button variant="outline" disabled>Loading...</Button>;
  }

  // Trova l'etichetta selezionata in modo sicuro
  const selectedLabel = value
    ? options.find((opt) => opt.id.toString() === value)?.name
    : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-black font-normal text-left"
          disabled={disabled}
        >
          <span className="truncate">
             {selectedLabel || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
  className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList> 
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  // FIX KEY ERROR: Usiamo un prefisso per essere sicuri che sia unica
                  key={`opt-${option.id}`} 
                  value={option.name} 
                  onSelect={() => {
                    onChange(option.id.toString())
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.id.toString() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}