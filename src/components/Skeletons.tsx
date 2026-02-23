export function AdminProductSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-16 bg-white/5 rounded shrink-0 border border-luxury-border"></div>
          <div>
            <div className="h-4 bg-white/10 rounded w-32 mb-2"></div>
            <div className="h-3 bg-white/5 rounded w-24"></div>
          </div>
        </div>
      </td>
      <td className="px-4 py-5">
        <div className="h-4 bg-white/10 rounded w-16"></div>
      </td>
      <td className="px-4 py-5">
        <div className="h-4 bg-white/10 rounded w-20"></div>
      </td>
      <td className="px-4 py-5">
        <div className="h-6 bg-white/10 rounded-full w-16"></div>
      </td>
      <td className="px-4 py-5">
        <div className="flex gap-1">
          <div className="h-5 w-12 bg-white/10 rounded-full"></div>
          <div className="h-5 w-12 bg-white/10 rounded-full"></div>
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="flex justify-end gap-2">
          <div className="h-8 w-8 bg-white/10 rounded-lg"></div>
          <div className="h-8 w-8 bg-white/10 rounded-lg"></div>
          <div className="h-8 w-8 bg-white/10 rounded-lg"></div>
        </div>
      </td>
    </tr>
  );
}

export function AdminProductGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <AdminProductSkeleton key={i} />
      ))}
    </>
  );
}
