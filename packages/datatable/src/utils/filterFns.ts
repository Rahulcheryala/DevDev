
import { FilterFn, RowData } from "@tanstack/react-table";
import { isSameDay, isBefore, isAfter, isWithinInterval, isValid } from "date-fns";
export const textFilter =
  <TData extends RowData>(): FilterFn<TData> =>
  (row, columnId, filterObject) => {
    const value = row.getValue(columnId);
    const { filterType, filterValue } = filterObject;
    const stringValue = String(value).toLowerCase();
    const filterStr = String(filterValue).toLowerCase();

    switch (filterType) {
      case "contains":
        return stringValue.includes(filterStr);
      case "notContains":
        return !stringValue.includes(filterStr);
      case "equals":
        return stringValue === filterStr;
      case "notEquals":
        return stringValue !== filterStr;
      case "blank":
        return stringValue.length === 0;
      case "notBlank":
        return stringValue.length > 0;
      case "startsWith":
        return stringValue.startsWith(filterStr);
      case "endsWith":
        return stringValue.endsWith(filterStr);
      case "regex":
        return new RegExp(filterStr).test(stringValue);
      default:
        return stringValue.includes(filterStr);
    }
  };

textFilter.autoRemove = (val: any) => !val;
textFilter.resolveFilterValue = (val: any) =>
  val.filterValue.toString().toLowerCase().trim();
export const numberFilter = <TData extends RowData>(): FilterFn<TData> => {
  return (row, columnId, filterObject) => {
    const value = Number(row.getValue(columnId));
    const { filterType, filterValue, optionalValue } = filterObject;

    switch (filterType) {
      case "equals":
        return value === Number(filterValue);
      case "notEquals":
        return value !== Number(filterValue);
      case "greaterThan":
        return value > Number(filterValue);
      case "greaterThanOrEqual":
        return value >= Number(filterValue);
      case "lessThan":
        return value < Number(filterValue);
      case "lessThanOrEqual":
        return value <= Number(filterValue);
      case "between": {
        
        return value >= Number(filterValue) && value <= Number(optionalValue);
      }
      case "notBetween": {
        return value < Number(filterValue) || value > Number(optionalValue);
      }
      case "blank":
        return value === null || value === undefined || isNaN(value);
      case "notBlank":
        return value !== null && value !== undefined && !isNaN(value);
      case "regex":
        return new RegExp(filterValue).test(String(value));
      default:
        return true;
    }
  };
};

numberFilter.autoRemove = (val: any) => !val;
numberFilter.resolveFilterValue = (val: any) =>
Number(val.filterValue)


export const dateFilter = <TData extends RowData>(): FilterFn<TData> => {
  return (row, columnId, filterObject) => {
    const value = row.getValue(columnId) as Date;
    const { filterType, filterValue, optionalValue } = filterObject;

    switch (filterType) {
      case "equals":
        return isSameDay(value, new Date(filterValue));
      case "before":
        return isBefore(value, new Date(filterValue));
      case "after":
        return isAfter(value, new Date(filterValue)); 
      case "between": {
        const start = new Date(filterValue);
        const end = new Date(optionalValue);
        return isWithinInterval(value, { start, end });
      }
      case "notBetween": {
        const start = new Date(filterValue);
        const end = new Date(optionalValue);
        return !isWithinInterval(value, { start, end });
      }
      case "isEmpty":
        return value === null || value === undefined
      case "isNotEmpty":
        return value !== null && value !== undefined
      default:
        return true;
    }
  };
};

dateFilter.autoRemove = (val: any) => !val;
dateFilter.resolveFilterValue = (val: any) => new Date(val.filterValue);



export const booleanFilter = <TData extends RowData>(): FilterFn<TData> => {
  return (row, columnId, filterObject) => {
    const value = row.getValue(columnId) as boolean;
    const { filterType } = filterObject;

    switch (filterType) {
      case "true":
        return value === true;
      case "false": 
        return value === false;
      case "isEmpty":
        return value === null || value === undefined;
      case "isNotEmpty":
        return value !== null && value !== undefined;
      default:
        return true;
    }
  };
};

booleanFilter.autoRemove = (val: any) => !val;
booleanFilter.resolveFilterValue = (val: any) => val.filterValue;
