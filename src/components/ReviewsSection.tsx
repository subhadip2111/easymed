import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export const ReviewsSection = () => {
  const reviews: Review[] = [
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Great service! Found the exact medicine I needed at the best price. The comparison feature is really helpful.",
      date: "2 days ago",
    },
    {
      name: "Rahul Kumar",
      rating: 5,
      comment: "The prescription upload feature saved me so much time. Highly recommended!",
      date: "1 week ago",
    },
    {
      name: "Anjali Mehta",
      rating: 4,
      comment: "Easy to use and reliable. Found similar medicines with the same composition at lower prices.",
      date: "2 weeks ago",
    },
  ];

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Customer Reviews</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(Number(averageRating))
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-foreground">{averageRating}</span>
          </div>
          <p className="text-muted-foreground">Based on {reviews.length} reviews</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="shadow-medium">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">{review.comment}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">{review.name}</span>
                  <span className="text-muted-foreground">{review.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
