import { Card, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export default function SkeletonLoader() {
  return (
    <>
      {Array(3)
        .fill("")
        .map((_v, i) => (
          <Card key={i} className="my-3">
            <CardContent className="p-4">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="mt-4 h-5 w-1/2" />
              <Skeleton className="my-2 h-5 w-1/2" />
              <Skeleton className="h-5 w-1/2" />
            </CardContent>
          </Card>
        ))}
    </>
  );
}
