import { useState } from "react";
import { Star, X, Send } from "lucide-react";
import { giveRatingReview } from "../../apis/rating.review";

interface RatingReviewPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RatingReviewPopup({ isOpen, onClose }: RatingReviewPopupProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
const [user,setUser]=useState<any>(localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')||""):null);
const [currentLocation,setCurrentLocation]=useState<string>(localStorage.getItem('locationName')||"Unknown");
  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);

    try {
        console.log("user-->",user)
           const ratingreview=await giveRatingReview({
        reviewText: review,
        rating: rating,
        userName: user?.displayName || "Anonymous",
        userProfileImage: user?.photoURL || undefined,
        location: currentLocation || "Unknown",
   })
 console.log(" Rating Review Response:", ratingreview);
    } catch (error) {
        
    }
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    setTimeout(() => {
      setRating(0);
      setReview("");
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 animate-slide-in-left">
        <div className="bg-gradient-to-br from-white to-primary/5 rounded-r-2xl shadow-2xl border-r-4 border-primary w-96 max-h-[600px] overflow-hidden">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                      Rate Your Experience
                    </h3>
                    <p className="text-primary-foreground/90 text-sm">
                      Help us improve MedLinkr
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-all hover:rotate-90 duration-300"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Star Rating */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground block">
                    How would you rate us?
                  </label>
                  <div className="flex gap-2 justify-center py-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-all duration-200 hover:scale-125 active:scale-110"
                      >
                        <Star
                          className={`h-10 w-10 transition-all duration-200 ${
                            star <= (hoveredRating || rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-center text-sm font-medium text-primary animate-fade-in">
                      {rating === 5 && "Excellent! 🎉"}
                      {rating === 4 && "Great! 😊"}
                      {rating === 3 && "Good! 👍"}
                      {rating === 2 && "Okay 😐"}
                      {rating === 1 && "We'll do better 🙏"}
                    </p>
                  )}
                </div>

                {/* Review Text */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground block">
                    Share your feedback (Optional)
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us what you think..."
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-border bg-background rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Help us improve our service</span>
                    <span>{review.length}/500</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={rating === 0 || isSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Review
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="p-12 text-center space-y-4 animate-scale-in">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-success to-success/70 rounded-full flex items-center justify-center animate-pulse">
                <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Thank You!</h3>
              <p className="text-muted-foreground">
                Your feedback helps us improve MedLinkr
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Custom animation */}
      <style>{`
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translate(-100%, -50%);
          }
          to {
            opacity: 1;
            transform: translate(0, -50%);
          }
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </>
  );
}
