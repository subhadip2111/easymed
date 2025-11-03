import { Pill, Search, TrendingUp } from "lucide-react";

export const MedicineSearchSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      {/* Header Section with Animation */}
      <div className="mb-12 animate-slide-up">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-500/10 rounded-full p-2">
              <Search className="h-5 w-5 text-blue-600 animate-pulse-glow" />
            </div>
            <div className="h-6 bg-blue-200 rounded-lg w-48 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-blue-100 rounded w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
            <div className="h-4 bg-blue-100 rounded w-3/4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ animationDelay: "0.2s" }} />
            </div>
          </div>
        </div>

        {/* Streaming Status Bar */}
        <div className="bg-white border-2 border-primary/20 rounded-xl p-4 mb-6 shadow-sm animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Pill className="h-5 w-5 text-primary animate-pulse-glow" />
                <div className="absolute inset-0 blur-md bg-primary/30 rounded-full animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                  <div className="h-3 bg-muted/50 rounded w-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500 animate-pulse" />
              <div className="h-3 bg-green-100 rounded w-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary Skeleton */}
      <div className="mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 opacity-60" />
          <div className="relative bg-white/80 backdrop-blur-sm border-2 border-blue-300/50 rounded-3xl p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
            
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-3 shadow-lg">
                  <svg className="h-7 w-7 text-white animate-pulse-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-blue-400 rounded-2xl animate-ping opacity-20" />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-6 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg w-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                  </div>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  {[100, 95, 80, 90, 70].map((width, idx) => (
                    <div 
                      key={idx} 
                      className="h-4 bg-gray-200 rounded relative overflow-hidden"
                      style={{ width: `${width}%`, animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" style={{ animationDelay: `${idx * 0.15}s` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Medicine Card Skeleton */}
      <div className="mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <div className="mb-6">
          <div className="h-8 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg w-64 mb-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
        </div>
        <MedicineCardSkeleton isPrimary />
      </div>

      {/* Similar Medicines Section */}
      <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <div className="mb-8">
          <div className="h-8 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg w-56 mb-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
          <div className="h-5 bg-muted/50 rounded w-96 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div style={{ animationDelay: "0.5s" }} className="animate-slide-up">
            <MedicineCardSkeleton />
          </div>
          <div style={{ animationDelay: "0.6s" }} className="animate-slide-up">
            <MedicineCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

const MedicineCardSkeleton = ({ isPrimary = false }: { isPrimary?: boolean }) => {
  return (
    <div className={`bg-white rounded-2xl border-2 ${isPrimary ? 'border-primary/40 shadow-2xl shadow-primary/10' : 'border-border'} overflow-hidden relative group`}>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Header */}
      <div className={`p-6 border-b ${isPrimary ? 'bg-gradient-to-r from-primary/5 to-secondary/5' : 'bg-muted/30'}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 space-y-3">
            <div className="h-7 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg w-3/4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
            </div>
            <div className="h-4 bg-muted rounded w-1/2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ animationDelay: "0.2s" }} />
            </div>
          </div>
          {isPrimary && (
            <div className="bg-primary/10 rounded-full px-3 py-1 h-8 w-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer" />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          {[100, 90, 85].map((width, idx) => (
            <div 
              key={idx}
              className="h-3 bg-muted/70 rounded relative overflow-hidden"
              style={{ width: `${width}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ animationDelay: `${idx * 0.1}s` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Composition & Side Effects */}
      <div className="p-6 space-y-6">
        <div>
          <div className="h-5 bg-primary/20 rounded-lg w-32 mb-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[60, 70, 55, 65].map((width, idx) => (
              <div 
                key={idx}
                className="h-8 bg-primary/10 rounded-lg relative overflow-hidden"
                style={{ width: `${width}px` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer" style={{ animationDelay: `${idx * 0.15}s` }} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="h-5 bg-destructive/20 rounded-lg w-28 mb-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>
          <div className="space-y-2">
            {[95, 85, 90].map((width, idx) => (
              <div 
                key={idx}
                className="h-3 bg-muted/70 rounded relative overflow-hidden"
                style={{ width: `${width}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ animationDelay: `${idx * 0.1}s` }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buy Links */}
      <div className="p-6 bg-muted/20 border-t">
        <div className="h-5 bg-primary/20 rounded-lg w-40 mb-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="bg-white border-2 border-border rounded-xl p-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <div className="flex items-center justify-between">
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gradient-to-r from-primary/30 to-secondary/30 rounded w-32 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" style={{ animationDelay: `${idx * 0.1}s` }} />
                  </div>
                  <div className="h-3 bg-muted/70 rounded w-48 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ animationDelay: `${idx * 0.15}s` }} />
                  </div>
                </div>
                <div className="h-9 bg-primary/10 rounded-lg w-24 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer" style={{ animationDelay: `${idx * 0.2}s` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternatives */}
      <div className="p-6 border-t">
        <div className="h-5 bg-secondary/20 rounded-lg w-36 mb-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
        </div>
        <div className="flex flex-wrap gap-2">
          {[80, 70, 90, 75, 85].map((width, idx) => (
            <div 
              key={idx}
              className="h-8 bg-secondary/10 rounded-lg relative overflow-hidden"
              style={{ width: `${width}px` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/20 to-transparent animate-shimmer" style={{ animationDelay: `${idx * 0.15}s` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
