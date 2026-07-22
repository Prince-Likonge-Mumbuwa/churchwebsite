import Header from "@/components/Header";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PagePlaceholderProps {
  title: string;
  description: string;
}

const PagePlaceholder = ({ title, description }: PagePlaceholderProps) => {
  return (
    <div className="min-h-screen bg-escz-navy">
      <Header />

      <section className="py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 w-16 h-16 bg-gradient-to-br from-escz-orange/20 to-escz-gold/20 rounded-2xl flex items-center justify-center mx-auto">
            <div className="w-8 h-8 bg-gradient-to-br from-escz-orange to-escz-gold rounded-lg flex items-center justify-center">
              <span className="text-escz-navy font-bold">E</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-escz-cream mb-6">
            {title}
          </h1>

          <p className="text-lg text-escz-cream/70 mb-12">
            {description}
          </p>

          <div className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm mb-8">
            <p className="text-escz-cream/60 mb-6">
              This page is being developed to bring you meaningful content about
              our ministry. Continue chatting with the builder to customize this
              page with the content you'd like to feature.
            </p>
            <div className="inline-flex items-center gap-2 text-escz-orange font-semibold">
              <span>Ready to build this page?</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-escz-orange to-escz-gold text-escz-navy font-semibold rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            Return to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PagePlaceholder;
