import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductPagingInfoProps {
  startIndex: number;
  pageSize: number;
  totalProducts: number;
  onPageSizeChange: (size: number) => void;
}

export function ProductPagingInfo({
  startIndex,
  pageSize,
  totalProducts,
  onPageSizeChange,
}: Readonly<ProductPagingInfoProps>) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-sm text-muted-foreground">
        Showing {startIndex + 1}-
        {Math.min(startIndex + pageSize, totalProducts)} of {totalProducts}{" "}
        products
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Show</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">per page</span>
      </div>
    </div>
  );
}
