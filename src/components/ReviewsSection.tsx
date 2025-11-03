import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Found my prescription at 30% cheaper! Amazing service.",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" // Diverse female portrait [web:21]
  },
  {
    name: "Michael Chen",
    rating: 5,
    comment: "The prescription upload feature saved me so much time.",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" // Asian male portrait [web:21]
  },
  {
    name: "Emily Rodriguez",
    rating: 4,
    comment: "Great alternative suggestions. Very helpful platform!",
    location: "Miami, FL",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" // Hispanic female portrait [web:21]
  }
];

export function ReviewsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 id="reviews-heading" className="text-4xl font-bold text-foreground mb-4">
            Trusted by <span className="text-primary">Thousands</span>
          </h3>
          <p className="text-muted-foreground text-lg">See what our users have to say</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <article 
              key={idx} 
              className="bg-white p-6 rounded-2xl shadow-md border border-border hover:border-primary/30 focus-within:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group"
              role="article"
              aria-label={`${review.name}'s review`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/50">
                  <img
                    src={review.avatar}
                    alt={`Avatar of ${review.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 transition-colors ${i < review.rating ? 'fill-warning text-warning' : 'text-muted-foreground'}`}
                        aria-label={`${i < review.rating ? 'filled' : 'empty'} star`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-foreground font-medium leading-relaxed italic text-balance">"{review.comment}"</blockquote>
                </div>
              </div>
              <footer className="border-t border-border pt-4 mt-auto">
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.location}</p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
