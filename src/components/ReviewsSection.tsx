import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Found my prescription at 30% cheaper! Amazing service.",
    location: "New York, NY"
  },
  {
    name: "Michael Chen",
    rating: 5,
    comment: "The prescription upload feature saved me so much time.",
    location: "San Francisco, CA"
  },
  {
    name: "Emily Rodriguez",
    rating: 4,
    comment: "Great alternative suggestions. Very helpful platform!",
    location: "Miami, FL"
  }
];

export function ReviewsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-foreground mb-4">
            Trusted by <span className="text-primary">Thousands</span>
          </h3>
          <p className="text-muted-foreground text-lg">See what our users have to say</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-border hover:border-primary/20 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < review.rating ? 'fill-warning text-warning' : 'text-muted'}`}
                  />
                ))}
              </div>
              <p className="text-foreground mb-4 font-medium leading-relaxed">"{review.comment}"</p>
              <div className="border-t border-border pt-4">
                <p className="font-bold text-foreground">{review.name}</p>
                <p className="text-sm text-muted-foreground">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
