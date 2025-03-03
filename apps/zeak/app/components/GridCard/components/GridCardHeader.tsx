import { HStack } from "@zeak/react";
import { Filter } from "../../Table/components/Filter";
import Sort from "../../Table/components/Sort";

type GridCardHeaderProps = {
  columnAccessors: Record<string, string>;
  withFilters: boolean;
};

const GridCardHeader = ({
  columnAccessors,
  withFilters,
}: GridCardHeaderProps) => {
  return (
    <HStack className="px-4 py-1.5 justify-between bg-background border-b border-border w-full">
      <HStack></HStack>
      <HStack>
        {withFilters && (
          <>
            <Filter columnAccessors={columnAccessors} />
            <Sort columnAccessors={columnAccessors} />
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default GridCardHeader;
