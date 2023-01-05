import { createContext } from "react";

interface UnitsContextType {
  unitType: string | null;
  setUnitType: React.Dispatch<React.SetStateAction<string | null>>
}

const iUnits = {
  unitType: null,
  setUnitType: () => {}
}

const UnitsContext = createContext<UnitsContextType>(iUnits);

export default UnitsContext;
