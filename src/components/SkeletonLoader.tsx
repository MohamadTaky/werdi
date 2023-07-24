export default function SkeletonLoader() {
  return (
    <ul>
      {Array(9)
        .fill("")
        .map((_v, i) => (
          <li key={i} className="mx-auto flex max-w-md items-center gap-6 border-b p-3">
            <div className="flex-1 space-y-2">
              <div className="h-4 w-full rounded-lg bg-gray-200" />
              <div className="h-4 w-3/4 rounded-lg bg-gray-200" />
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-200" />
          </li>
        ))}
    </ul>
  );
}
