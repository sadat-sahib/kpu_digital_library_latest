
import { Card, CardContent } from "../ui/card";

const CardSkeleton = () => (
    <Card className="shadow-lg w-full max-w-[250px] mx-auto animate-pulse">
      <div className="h-40 w-full bg-gray-200 rounded-t-md" />
      <CardContent className="p-3">
        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4 mx-auto" />
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <div className="h-8 bg-gray-200 rounded w-full md:w-24" />
          <div className="h-8 bg-gray-200 rounded w-full md:w-24" />
        </div>
      </CardContent>
    </Card>
  );
export default CardSkeleton;  