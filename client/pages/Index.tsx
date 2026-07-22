import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { ArrowRight, Heart, Users, BookOpen, Image, Play } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-escz-navy">
      <Header />

      {/* Hero Section with Background */}
      <section className="relative min-h-[600px] sm:min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Video with Fallback */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            controls
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{
              backgroundImage:
                'url("https://cdn.builder.io/api/v1/image/assets%2F591e73d7e70642a48766b5a2d29d9ae7%2Fe4e0f9c9208d4afeaf7437942c9f1f77?format=webp&width=1200")',
            }}
          >
            <source src="https://cdn.builder.io/o/assets%2F591e73d7e70642a48766b5a2d29d9ae7%2F8629586c50f1409bb87262bc198ea7f0?alt=media&token=3ce94202-87ad-4608-9130-02b16c95f3ca&apiKey=591e73d7e70642a48766b5a2d29d9ae7" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-escz-navy/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-escz-cream mb-6 leading-tight">
            Transforming Lives
            <span className="block bg-gradient-to-r from-escz-orange via-escz-gold to-escz-orange bg-clip-text text-transparent">
              Holistically
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-escz-cream/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            The Evangelical Synod Church in Zambia is dedicated to spreading the gospel and serving communities through education, healthcare, agriculture, and spiritual discipleship.
          </p>

          <Link
            to="/partner-with-us"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-escz-orange to-escz-gold text-escz-navy font-bold rounded-lg hover:shadow-2xl transition-all duration-300 text-lg group"
          >
            Partner with the Mission
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-escz-cream/60">
            <span className="text-sm">Scroll to explore</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream text-center mb-16">
            Our Impact Across Zambia
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Metric 1 */}
            <div className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm hover:border-escz-orange/30 transition-colors duration-300">
              <div className="text-escz-orange text-5xl font-bold mb-4">45+</div>
              <h3 className="text-escz-cream text-xl font-semibold mb-3">
                Churches Planted
              </h3>
              <p className="text-escz-cream/70">
                Spreading the Gospel across communities in Zambia
              </p>
            </div>

            {/* Metric 2 */}
            <div className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm hover:border-escz-gold/30 transition-colors duration-300">
              <div className="text-escz-gold text-5xl font-bold mb-4">2,500+</div>
              <h3 className="text-escz-cream text-xl font-semibold mb-3">
                Students Reached
              </h3>
              <p className="text-escz-cream/70">
                Through education and discipleship programs
              </p>
            </div>

            {/* Metric 3 */}
            <div className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm hover:border-escz-orange/30 transition-colors duration-300">
              <div className="text-escz-orange text-5xl font-bold mb-4">8</div>
              <h3 className="text-escz-cream text-xl font-semibold mb-3">
                Community Projects
              </h3>
              <p className="text-escz-cream/70">
                From carpentry training to agricultural initiatives
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections Preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy/80 border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream text-center mb-16">
            Explore Our Ministry
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Who We Are */}
            <Link
              to="/who-we-are"
              className="group bg-gradient-to-br from-escz-navy/50 to-escz-navy/30 border border-escz-gray/20 rounded-2xl p-8 hover:border-escz-orange/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-escz-orange/20 to-escz-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-escz-orange/40 group-hover:to-escz-gold/40 transition-all duration-300">
                <Users className="w-6 h-6 text-escz-orange" />
              </div>
              <h3 className="text-2xl font-bold text-escz-cream mb-3 group-hover:text-escz-orange transition-colors">
                Who We Are
              </h3>
              <p className="text-escz-cream/70 mb-4">
                Learn about our mission, vision, and the leadership guiding ESCZ
              </p>
              <div className="flex items-center gap-2 text-escz-orange font-semibold group-hover:translate-x-2 transition-transform">
                Discover More
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Our Beliefs */}
            <Link
              to="/our-beliefs"
              className="group bg-gradient-to-br from-escz-navy/50 to-escz-navy/30 border border-escz-gray/20 rounded-2xl p-8 hover:border-escz-gold/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-escz-gold/20 to-escz-orange/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-escz-gold/40 group-hover:to-escz-orange/40 transition-all duration-300">
                <BookOpen className="w-6 h-6 text-escz-gold" />
              </div>
              <h3 className="text-2xl font-bold text-escz-cream mb-3 group-hover:text-escz-gold transition-colors">
                Our Beliefs
              </h3>
              <p className="text-escz-cream/70 mb-4">
                Explore the doctrinal foundations of the ESCZ
              </p>
              <div className="flex items-center gap-2 text-escz-gold font-semibold group-hover:translate-x-2 transition-transform">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Ministries */}
            <Link
              to="/ministries"
              className="group bg-gradient-to-br from-escz-navy/50 to-escz-navy/30 border border-escz-gray/20 rounded-2xl p-8 hover:border-escz-orange/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-escz-orange/20 to-escz-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-escz-orange/40 group-hover:to-escz-gold/40 transition-all duration-300">
                <Heart className="w-6 h-6 text-escz-orange" />
              </div>
              <h3 className="text-2xl font-bold text-escz-cream mb-3 group-hover:text-escz-orange transition-colors">
                Ministries
              </h3>
              <p className="text-escz-cream/70 mb-4">
                Discover our key ministries serving different groups
              </p>
              <div className="flex items-center gap-2 text-escz-orange font-semibold group-hover:translate-x-2 transition-transform">
                View All
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Gallery */}
            <Link
              to="/gallery"
              className="group bg-gradient-to-br from-escz-navy/50 to-escz-navy/30 border border-escz-gray/20 rounded-2xl p-8 hover:border-escz-orange/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-escz-orange/20 to-escz-gold/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-escz-orange/40 group-hover:to-escz-gold/40 transition-all duration-300">
                <Image className="w-6 h-6 text-escz-orange" />
              </div>
              <h3 className="text-2xl font-bold text-escz-cream mb-3 group-hover:text-escz-orange transition-colors">
                Gallery
              </h3>
              <p className="text-escz-cream/70 mb-4">
                Visual stories of transformation and ministry across communities
              </p>
              <div className="flex items-center gap-2 text-escz-orange font-semibold group-hover:translate-x-2 transition-transform">
                View Gallery
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Videos */}
            <Link
              to="/videos"
              className="group bg-gradient-to-br from-escz-navy/50 to-escz-navy/30 border border-escz-gray/20 rounded-2xl p-8 hover:border-escz-gold/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-escz-gold/20 to-escz-orange/20 rounded-lg flex items-center justify-center mb-4 group-hover:from-escz-gold/40 group-hover:to-escz-orange/40 transition-all duration-300">
                <Play className="w-6 h-6 text-escz-gold" />
              </div>
              <h3 className="text-2xl font-bold text-escz-cream mb-3 group-hover:text-escz-gold transition-colors">
                Videos
              </h3>
              <p className="text-escz-cream/70 mb-4">
                Watch inspiring stories and testimonies of lives transformed
              </p>
              <div className="flex items-center gap-2 text-escz-gold font-semibold group-hover:translate-x-2 transition-transform">
                Watch Videos
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-escz-navy via-escz-navy/90 to-escz-navy border-t border-escz-gray/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-escz-cream mb-6">
            Join Us in Transforming Lives
          </h2>
          <p className="text-xl text-escz-cream/80 mb-10">
            Whether through prayer, partnership, or resources, you can be part of our holistic mission across Zambia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/partner-with-us"
              className="px-8 py-4 bg-gradient-to-r from-escz-orange to-escz-gold text-escz-navy font-bold rounded-lg hover:shadow-2xl transition-shadow duration-300"
            >
              Partner With Us
            </Link>
            <Link
              to="/gallery"
              className="px-8 py-4 bg-escz-navy/80 border border-escz-gold/50 text-escz-cream font-bold rounded-lg hover:border-escz-gold transition-colors duration-300"
            >
              Explore Media
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-escz-navy/50 border-t border-escz-gray/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-escz-cream font-bold mb-4">ESCZ</h4>
              <p className="text-escz-cream/60 text-sm">
                Transforming lives holistically across Zambia
              </p>
            </div>
            <div>
              <h5 className="text-escz-cream font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm text-escz-cream/60">
                <li>
                  <Link to="/" className="hover:text-escz-orange transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/who-we-are"
                    className="hover:text-escz-orange transition-colors"
                  >
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ministries"
                    className="hover:text-escz-orange transition-colors"
                  >
                    Ministries
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-escz-cream font-semibold mb-4">Ministry</h5>
              <ul className="space-y-2 text-sm text-escz-cream/60">
                <li>
                  <Link
                    to="/gallery"
                    className="hover:text-escz-orange transition-colors"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/videos"
                    className="hover:text-escz-orange transition-colors"
                  >
                    Videos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/our-beliefs"
                    className="hover:text-escz-orange transition-colors"
                  >
                    Our Beliefs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-escz-cream font-semibold mb-4">Connect</h5>
              <ul className="space-y-2 text-sm text-escz-cream/60">
                <li>
                  <a
                    href="mailto:info@escz.org"
                    className="hover:text-escz-orange transition-colors"
                  >
                    info@escz.org
                  </a>
                </li>
                <li>
                  <Link
                    to="/partner-with-us"
                    className="hover:text-escz-orange transition-colors"
                  >
                    Partnership Inquiries
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-escz-gray/20 pt-8 text-center text-escz-cream/60 text-sm">
            <p>
              &copy; 2024 Evangelical Synod Church in Zambia. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
