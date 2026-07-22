import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-escz-navy">
      <Header />

      <section className="py-32 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <p className="text-8xl font-bold text-escz-orange mb-4">404</p>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-escz-cream mb-6">
            Page Not Found
          </h1>

          <p className="text-lg text-escz-cream/70 mb-12 max-w-md mx-auto">
            We couldn't find the page you're looking for. It may have been moved
            or doesn't exist yet.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-escz-orange to-escz-gold text-escz-navy font-bold rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            <HomeIcon className="w-5 h-5" />
            Return to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
