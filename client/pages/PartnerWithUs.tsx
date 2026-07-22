import Header from "@/components/Header";
import {
  Heart,
  Handshake,
  Gift,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function PartnerWithUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const partnershipTypes = [
    {
      icon: <Gift className="w-10 h-10" />,
      title: "Financial Partners",
      description:
        "Support our programs through donations that directly impact communities.",
      ways: [
        "One-time donations",
        "Monthly recurring support",
        "Project-specific funding",
        "Year-end giving",
      ],
    },
    {
      icon: <Handshake className="w-10 h-10" />,
      title: "Strategic Partners",
      description:
        "Collaborate with us in implementing long-term community development.",
      ways: [
        "Government partnerships",
        "NGO collaborations",
        "Corporate sponsorship",
        "Supply partnerships",
      ],
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Prayer Partners",
      description: "Intercede for our ministry and the transformation of lives.",
      ways: [
        "Monthly prayer guides",
        "Prayer group participation",
        "Specialized intercession",
        "Community prayer events",
      ],
    },
  ];

  const impactLevels = [
    {
      amount: "$50",
      impact: "Provides educational materials for 10 students for a month",
    },
    {
      amount: "$100",
      impact: "Supplies farming seeds and tools for 2 farmers",
    },
    {
      amount: "$250",
      impact: "Funds carpentry training for 1 young person",
    },
    {
      amount: "$500",
      impact: "Supports a health clinic for 1 month",
    },
    {
      amount: "$1,000",
      impact: "Trains 5 community health workers",
    },
    {
      amount: "$5,000",
      impact: "Establishes a new income-generation project",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-escz-navy">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden pt-8">
        <div className="absolute inset-0 bg-gradient-to-br from-escz-orange/10 via-escz-navy to-escz-navy z-0" />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-escz-cream mb-6">
            Partner With Us
          </h1>
          <p className="text-xl text-escz-cream/90 max-w-2xl mx-auto">
            Join our mission to transform lives holistically across Zambia through
            partnership, prayer, and resources.
          </p>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Ways to Partner
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-escz-navy/50 to-escz-navy/30 border border-escz-gray/20 rounded-2xl p-10 backdrop-blur-sm hover:border-escz-gold/50 transition-all duration-300"
              >
                <div className="text-escz-orange mb-6">{type.icon}</div>
                <h3 className="text-2xl font-bold text-escz-cream mb-3">
                  {type.title}
                </h3>
                <p className="text-escz-cream/70 mb-6 leading-relaxed">
                  {type.description}
                </p>

                <ul className="space-y-3">
                  {type.ways.map((way, idx) => (
                    <li key={idx} className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-escz-gold flex-shrink-0 mt-0.5" />
                      <span className="text-escz-cream/80">{way}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact of Giving */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy/80 border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Your Impact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {impactLevels.map((level, index) => (
              <div
                key={index}
                className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm hover:border-escz-orange/30 transition-colors"
              >
                <p className="text-4xl font-bold text-escz-gold mb-4">
                  {level.amount}
                </p>
                <p className="text-escz-cream/80 text-lg">{level.impact}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-escz-navy/50 border border-escz-gold/30 rounded-2xl p-10 backdrop-blur-sm text-center">
            <p className="text-xl text-escz-cream/90 mb-4">
              Every gift, no matter the size, makes a difference in transforming
              lives.
            </p>
            <p className="text-escz-orange font-semibold">
              100% of donations go directly to our programs
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Support Form */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-escz-cream mb-8">
                Contact Information
              </h3>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-escz-orange flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-escz-cream mb-1">Email</h4>
                    <a
                      href="mailto:partner@escz.org"
                      className="text-escz-cream/70 hover:text-escz-orange transition-colors"
                    >
                      partner@escz.org
                    </a>
                    <p className="text-sm text-escz-cream/60 mt-1">
                      For partnership inquiries
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-escz-gold flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-escz-cream mb-1">Phone</h4>
                    <a
                      href="tel:+260123456789"
                      className="text-escz-cream/70 hover:text-escz-gold transition-colors"
                    >
                      +260 (123) 456-789
                    </a>
                    <p className="text-sm text-escz-cream/60 mt-1">
                      Monday - Friday, 9AM - 5PM (SAST)
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-escz-orange flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-escz-cream mb-1">Office</h4>
                    <p className="text-escz-cream/70">
                      Evangelical Synod Church in Zambia
                      <br />
                      Plot 123, Church Road
                      <br />
                      Lusaka, Zambia
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 bg-escz-navy/50 border border-escz-gold/30 rounded-2xl p-8 backdrop-blur-sm">
                <h4 className="text-lg font-bold text-escz-cream mb-4">
                  Tax Information
                </h4>
                <p className="text-escz-cream/70 text-sm mb-3">
                  ESCZ is registered as a non-profit organization. In many
                  countries, donations may be tax-deductible. Please consult with
                  your tax advisor.
                </p>
                <p className="text-escz-orange font-semibold text-sm">
                  Tax ID: ZM-NPO-2024-001
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold text-escz-cream mb-8">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-escz-cream font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-escz-navy/50 border border-escz-gray/20 rounded-lg text-escz-cream placeholder-escz-cream/40 focus:border-escz-orange focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-escz-cream font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-escz-navy/50 border border-escz-gray/20 rounded-lg text-escz-cream placeholder-escz-cream/40 focus:border-escz-orange focus:outline-none transition-colors"
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label className="block text-escz-cream font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-3 bg-escz-navy/50 border border-escz-gray/20 rounded-lg text-escz-cream placeholder-escz-cream/40 focus:border-escz-orange focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your partnership interest or prayer request..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-escz-orange to-escz-gold text-escz-navy font-bold rounded-lg hover:shadow-2xl transition-shadow duration-300 flex items-center justify-center gap-2"
                >
                  Send Message
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy/80 border-t border-escz-gray/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "How are funds used?",
                a: "All donations go directly to our programs: 85% to community projects, 10% to administration, 5% to fundraising. We maintain full transparency through annual reports.",
              },
              {
                q: "Can I designate my giving to a specific project?",
                a: "Yes! You can support a specific ministry area. Contact our partnership team to discuss your giving preferences.",
              },
              {
                q: "How do I receive updates on my giving?",
                a: "We send quarterly impact reports to all partners. You'll receive stories, statistics, and updates on the lives changed through your support.",
              },
              {
                q: "Do you accept in-kind donations?",
                a: "Yes! We accept equipment, materials, and services. Contact us to discuss your contribution.",
              },
              {
                q: "How can I get involved beyond giving?",
                a: "You can volunteer, become a prayer partner, join our board, or help with professional services like accounting or legal support.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold text-escz-orange mb-4">
                  {faq.q}
                </h3>
                <p className="text-escz-cream/80 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-escz-cream mb-6">
            Thank You for Your Heart
          </h2>
          <p className="text-xl text-escz-cream/80 max-w-2xl mx-auto mb-8">
            Whether through prayer, partnership, or resources, your contribution
            helps us fulfill the Great Commission and transform lives across
            Zambia. God bless your generosity.
          </p>
          <p className="text-escz-gold font-semibold text-lg">
            "It is more blessed to give than to receive." - Acts 20:35
          </p>
        </div>
      </section>
    </div>
  );
}
