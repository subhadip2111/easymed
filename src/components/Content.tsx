import { Calendar, User, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";

interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
}

const articles: Article[] = [
  {
    id: "1",
    category: "Medicine Safety",
    title: "Understanding Medicine Expiry Dates",
    excerpt: "Learn why expiry dates matter and how to properly store your medicines to maintain their effectiveness and safety.",
    content: "Medicine expiry dates are not arbitrary - they represent the period during which the manufacturer guarantees full potency and safety. After expiration, medications may lose effectiveness or, in rare cases, become harmful.\n\nAlways store medicines in cool, dry places away from direct sunlight. Check expiry dates regularly and dispose of expired medications properly at pharmacies or designated collection sites.\n\nProper storage is crucial: avoid bathroom cabinets due to humidity, keep medicines in their original containers, and ensure they're out of reach of children and pets.",
    date: "October 15, 2025",
    readTime: "3 min",
    author: "Dr. Sarah Mitchell"
  },
  {
    id: "2",
    category: "Health Tips",
    title: "Generic vs Brand: The Truth",
    excerpt: "Generic medicines contain the same active ingredients as brand-name drugs but cost up to 80% less. Here's what you need to know.",
    content: "Generic medicines are bioequivalent to brand-name drugs, meaning they contain the same active ingredients in the same amounts and work identically in your body.\n\nThe FDA requires generics to meet the same strict quality standards. The price difference exists because generic manufacturers don't bear the costs of initial research and marketing.\n\nSwitching to generics can save you thousands annually without compromising quality. Always consult your doctor or pharmacist when considering a switch to ensure it's appropriate for your specific condition.",
    date: "October 12, 2025",
    readTime: "4 min",
    author: "Dr. James Chen"
  },
  {
    id: "3",
    category: "Patient Stories",
    title: "How I Saved 60% on Monthly Medication",
    excerpt: "A patient shares their experience finding affordable alternatives for diabetes medication through smart price comparison.",
    content: "I've been managing diabetes for 5 years, and medication costs were always a struggle. Finding affordable alternatives seemed impossible until I discovered the power of price comparison.\n\nBy exploring generic alternatives I never knew existed, I now save over ₹3,000 monthly. The process was seamless, and my doctor confirmed the generics work just as well.\n\nThis experience taught me the importance of asking questions and exploring options. Don't be afraid to discuss costs with your healthcare provider - there are often alternatives available.",
    author: "Rajesh Kumar",
    date: "October 10, 2025",
    readTime: "2 min",
  },
  {
    id: "4",
    category: "Technology",
    title: "AI-Powered Prescription Analysis",
    excerpt: "How modern technology uses advanced OCR and medical databases to help patients understand their prescriptions better.",
    content: "Modern prescription analysis combines optical character recognition (OCR) with natural language processing to read both handwritten and printed prescriptions accurately.\n\nThe technology cross-references medicine names against comprehensive pharmaceutical databases, identifies generic alternatives, and compares prices across trusted suppliers.\n\nMachine learning continuously improves accuracy based on millions of prescriptions processed. This technology empowers patients to make informed decisions about their healthcare while ensuring they understand exactly what they're taking.",
    date: "October 8, 2025",
    readTime: "5 min",
    author: "Tech Team"
  },
  {
    id: "5",
    category: "Medicine Safety",
    title: "Avoiding Medicine Interactions",
    excerpt: "Essential guidelines for safely combining medications and when to consult your doctor about potential interactions.",
    content: "Drug interactions can reduce effectiveness or cause harmful side effects. Understanding how to safely combine medications is crucial for your health.\n\nAlways inform your doctor about all medications, supplements, and herbal products you're taking. Use a single pharmacy when possible - pharmacists can check for interactions across all your prescriptions.\n\nNever mix medications without professional guidance. Some foods and drinks can also interact with medicines, so read labels carefully and don't hesitate to ask questions about anything unclear.",
    date: "October 5, 2025",
    readTime: "4 min",
    author: "Dr. Priya Sharma"
  },
  {
    id: "6",
    category: "Health Tips",
    title: "The Bioequivalence Standard Explained",
    excerpt: "Generic medicines must prove they work exactly like brand-name drugs through rigorous testing. Here's how it works.",
    content: "Bioequivalence testing ensures generic drugs perform identically to brand-name versions. This rigorous process is essential for patient safety and treatment effectiveness.\n\nRegulatory agencies require generics to deliver the same amount of active ingredient into the bloodstream at the same rate. Studies must show that generics fall within 90-111% of the brand's bioavailability.\n\nThis range has been clinically proven to have no significant difference in treatment outcomes. The stringent testing process guarantees that when you switch to a generic, you're getting the same therapeutic benefit as the original brand.",
    date: "October 2, 2025",
    readTime: "4 min",
    author: "Dr. Michael Brown"
  }
];

export default function NewsletterBlog() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="border-b-2 py-8" style={{borderColor: '#1E88E5'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-2" style={{fontFamily: 'Georgia, serif', color: '#1E88E5'}}>
            The Medicine Journal
          </h1>
          <p className="text-gray-600 text-sm">Your trusted source for health insights and medicine guidance</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
            <span>October 2025 Edition</span>
            <span>•</span>
            <span>Volume 12</span>
          </div>
        </div>
      </header> */}

      <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Things you should know about medicines and health
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with expert insights, helpful tips, and inspiring stories from our community
          </p>
        </div>

      {/* Featured Article */}
      {articles[0] && (
        <section className="border-b border-gray-300 py-12">
          <div className="max-w-4xl mx-auto px-6">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Featured Article
            </span>
            <h2 
              className="text-4xl font-bold text-gray-900 mt-4 mb-4 leading-tight cursor-pointer hover:text-gray-700 transition-colors"
              style={{fontFamily: 'Georgia, serif'}}
              onClick={() => setSelectedArticle(articles[0])}
            >
              {articles[0].title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {articles[0].excerpt}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{articles[0].author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{articles[0].date}</span>
              </div>
              <span>{articles[0].readTime} read</span>
            </div>
            <button
              onClick={() => setSelectedArticle(articles[0])}
              className="font-semibold text-sm hover:underline inline-flex items-center gap-2"
              style={{color: '#1E88E5'}}
            >
              Read Full Article
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">
            {articles.slice(1).map((article, index) => (
              <article 
                key={article.id} 
                className={`${index !== articles.length - 2 ? 'border-b border-gray-200 pb-12' : ''}`}
              >
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {article.category}
                </span>
                <h3 
                  className="text-3xl font-bold text-gray-900 mt-3 mb-3 leading-tight cursor-pointer hover:text-gray-700 transition-colors"
                  style={{fontFamily: 'Georgia, serif'}}
                  onClick={() => setSelectedArticle(article)}
                >
                  {article.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <span>{article.readTime} read</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="font-semibold text-sm hover:underline inline-flex items-center gap-2"
                  style={{color: '#1E88E5'}}
                >
                  Continue Reading
                  <ArrowRight className="h-4 w-4" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="border-t-2 py-12" style={{borderColor: '#1E88E5', background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)'}}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Mail className="h-12 w-12 mx-auto mb-4" style={{color: '#1E88E5'}} />
          <h3 className="text-2xl font-bold mb-3" style={{fontFamily: 'Georgia, serif', color: '#1E88E5'}}>
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Get the latest health insights, medicine tips, and patient stories delivered to your inbox every week.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border-2 rounded focus:outline-none"
              style={{borderColor: '#1E88E5'}}
            />
            <button className="px-6 py-3 text-white font-semibold rounded transition-colors" style={{backgroundColor: '#1E88E5'}}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Article Header */}
            <div className="border-b-2 border-gray-900 px-8 py-8 sticky top-0 bg-white z-10">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {selectedArticle.category}
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900 mt-3 leading-tight" style={{fontFamily: 'Georgia, serif'}}>
                    {selectedArticle.title}
                  </h2>
                  <div className="flex items-center gap-6 text-sm text-gray-600 mt-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{selectedArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedArticle.date}</span>
                    </div>
                    <span>{selectedArticle.readTime} read</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-4xl text-gray-600 hover:text-gray-900 leading-none ml-4"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="px-8 py-8">
              <div className="prose prose-lg max-w-none" style={{fontFamily: 'Georgia, serif'}}>
                <p className="text-xl text-gray-800 leading-relaxed mb-6">
                  {selectedArticle.excerpt}
                </p>
                <div className="text-gray-800 leading-relaxed space-y-4">
                  {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Article Footer */}
            <div className="border-t border-gray-300 px-8 py-6 bg-gray-50">
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full py-3 bg-gray-900 text-white font-semibold rounded hover:bg-gray-800 transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-300 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-gray-600">
          <p>© 2025 The Medicine Journal. All rights reserved.</p>
          <p className="mt-2">Published with care for your health and wellbeing.</p>
        </div>
      </footer>
    </div>
  );
}