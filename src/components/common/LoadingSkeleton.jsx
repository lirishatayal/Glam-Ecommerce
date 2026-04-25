export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
      <div className="skeleton aspect-square w-full" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-3 w-20 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-16 rounded mt-1" />
        <div className="flex gap-2 mt-2">
          <div className="skeleton h-5 w-16 rounded" />
          <div className="skeleton h-4 w-12 rounded" />
        </div>
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10 animate-fade-in">
      <div className="space-y-4">
        <div className="skeleton aspect-square rounded-2xl w-full" />
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton aspect-square rounded-xl" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="skeleton h-6 w-24 rounded" />
        <div className="skeleton h-8 w-full rounded" />
        <div className="skeleton h-8 w-3/4 rounded" />
        <div className="skeleton h-5 w-32 rounded" />
        <div className="flex gap-3">
          <div className="skeleton h-7 w-20 rounded" />
          <div className="skeleton h-7 w-24 rounded" />
        </div>
        <div className="skeleton h-28 w-full rounded-xl" />
        <div className="flex gap-3">
          <div className="skeleton h-12 w-full rounded-full" />
          <div className="skeleton h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="skeleton w-full h-[320px] sm:h-[440px] lg:h-[540px] rounded-none" />
  )
}
