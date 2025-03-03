type MatchCondition = { condition: string; value: string | number | boolean };

export const checkMatch = (cell: any, matchConditions: MatchCondition[]) => {

    const cellValue = cell.getValue();
  if (!matchConditions || matchConditions.length === 0 || !cellValue) return false;


  return matchConditions.every(({ condition, value }) => {
    if (cell.column.columnDef.meta?.dataType === "string") {
      const stringCellValue = String(cellValue).toLowerCase();
      const stringMatchValue = String(value).toLowerCase();

      switch (condition) {
        case "contains":
          return stringCellValue.includes(stringMatchValue);
        case "equals":
          return stringCellValue === stringMatchValue;
        case "startsWith":
          return stringCellValue.startsWith(stringMatchValue);
        case "endsWith":
          return stringCellValue.endsWith(stringMatchValue);
        case "notContains":
          return !stringCellValue.includes(stringMatchValue);
        case "notEquals":
          return stringCellValue !== stringMatchValue;
        default:
          return true;
      }
    }

    if (cell.column.columnDef.meta?.dataType === "number") {
      const numberCellValue = Number(cellValue);
      const numberMatchValue = Number(value);

      switch (condition) {
        case "greaterThan":
          return numberCellValue > numberMatchValue;
        case "lessThan":
          return numberCellValue < numberMatchValue;
        case "equals":
          return numberCellValue === numberMatchValue;
        case "notEquals":
          return numberCellValue !== numberMatchValue;
        default:
          return false;
      }
    }

    if (cell.column.columnDef.meta?.dataType === "boolean") {
      return cellValue === value;
    }

    return false;
  });
};
