import Header from "@/components/Header";
import {
  BookOpen,
  Users,
  Baby,
  Download,
  Play,
  FileText,
  Award,
} from "lucide-react";

export default function DiscipleshipHub() {
  const resourceCategories = [
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Bible Study Guides",
      description:
        "In-depth studies designed for small groups and personal spiritual growth",
      count: "45+",
      resources: ["Old Testament Studies", "New Testament Studies", "Topical Studies"],
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Leadership Training",
      description:
        "Materials for developing church leaders and community activists",
      count: "32+",
      resources: [
        "Servant Leadership",
        "Discipleship Training",
        "Ministry Skills",
      ],
    },
    {
      icon: <Baby className="w-10 h-10" />,
      title: "Youth & Young Adult",
      description: "Engaging materials for spiritual formation and purpose",
      count: "28+",
      resources: ["Youth Devotions", "Life Purpose", "Character Building"],
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Children's Ministry",
      description: "Creative resources for spiritual education and fun learning",
      count: "35+",
      resources: ["Bible Stories", "Memory Work", "Activity Books"],
    },
  ];

  const resources = [
    {
      title: "The Gospel of John Study Guide",
      category: "Bible Study",
      type: "PDF",
      target: "All Ages",
      description: "8-week in-depth study of John's Gospel with discussion questions",
    },
    {
      title: "Becoming a Disciple-Maker",
      category: "Leadership Training",
      type: "Video Series",
      target: "Leaders",
      description:
        "5-session video course on intentional discipleship and mentoring",
    },
    {
      title: "Youth Devotional Guide",
      category: "Youth Resources",
      type: "PDF",
      target: "Youth (13-25)",
      description: "Daily devotionals addressing real-life challenges for young people",
    },
    {
      title: "Children's Bible Stories",
      category: "Children's Ministry",
      type: "Activity Book",
      target: "Children (5-12)",
      description:
        "Illustrated Bible stories with activities and memory work",
    },
    {
      title: "Small Group Discussion Kit",
      category: "Bible Study",
      type: "PDF + Guide",
      target: "Small Groups",
      description: "Complete facilitation guide with discussion questions and prayer prompts",
    },
    {
      title: "Holistic Ministry Training",
      category: "Leadership Training",
      type: "Course",
      target: "Leaders",
      description:
        "Comprehensive training on addressing spiritual, physical, and social needs",
    },
    {
      title: "Daily Prayer Guide",
      category: "Spiritual Growth",
      type: "PDF",
      target: "All Ages",
      description:
        "30-day prayer guide focusing on ESCZ's ministry and community needs",
    },
    {
      title: "Character Development Series",
      category: "Youth & Children",
      type: "Video + Workbook",
      target: "Youth & Children",
      description:
        "Teaching integrity, honesty, and servant leadership to young generations",
    },
  ];

  const testimonials = [
    {
      name: "Pastor Chizoba",
      role: "Church Leader",
      quote:
        "The Bible study guides have transformed our small group meetings. We've seen deeper spiritual growth and stronger community bonds.",
    },
    {
      name: "Simone Kaponda",
      role: "Youth Leader",
      quote:
        "The youth materials are relatable and engaging. Young people are more invested in their faith journey.",
    },
    {
      name: "Margaret Chikoti",
      role: "Children's Ministry",
      quote:
        "The children's resources make teaching biblical truths fun and memorable for young learners.",
    },
  ];

  return (
    <div className="min-h-screen bg-escz-navy">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden pt-8">
        <div className="absolute inset-0 bg-gradient-to-br from-escz-orange/10 via-escz-navy to-escz-navy z-0" />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-escz-cream mb-6">
            Discipleship Hub
          </h1>
          <p className="text-xl text-escz-cream/90 max-w-2xl mx-auto">
            Access curated resources for spiritual growth, Bible study, leadership
            development, and discipleship across all age groups.
          </p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Resource Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-escz-navy/50 to-escz-navy/30 border border-escz-gray/20 rounded-2xl p-10 backdrop-blur-sm hover:border-escz-orange/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="text-escz-orange group-hover:text-escz-gold transition-colors">
                    {category.icon}
                  </div>
                  <span className="text-3xl font-bold text-escz-gold">
                    {category.count}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-escz-cream mb-3">
                  {category.title}
                </h3>
                <p className="text-escz-cream/70 mb-6 leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-2">
                  {category.resources.map((resource, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-escz-gold rounded-full" />
                      <span className="text-escz-cream/80 text-sm">
                        {resource}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy/80 border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Featured Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-escz-cream mb-2">
                      {resource.title}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      <span className="inline-block px-3 py-1 bg-escz-orange/20 rounded-full text-xs text-escz-orange font-semibold">
                        {resource.category}
                      </span>
                      <span className="inline-block px-3 py-1 bg-escz-gold/20 rounded-full text-xs text-escz-gold font-semibold">
                        {resource.type}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-escz-cream/80 mb-4">{resource.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-escz-gray/20">
                  <span className="text-sm text-escz-cream/60">
                    For: {resource.target}
                  </span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-escz-orange/20 hover:bg-escz-orange/30 text-escz-orange rounded-lg font-semibold transition-colors duration-300">
                    <Download className="w-4 h-4" />
                    Get Resource
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Hear From Users
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-escz-navy/50 border border-escz-gold/30 rounded-2xl p-10 backdrop-blur-sm"
              >
                <p className="text-xl text-escz-cream/90 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-escz-gray/20 pt-6">
                  <p className="font-bold text-escz-cream">{testimonial.name}</p>
                  <p className="text-escz-orange text-sm font-semibold">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy/80 border-t border-escz-gray/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Getting Started
          </h2>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Browse Resources",
                description:
                  "Explore our resource categories to find materials suited to your needs and age group.",
              },
              {
                step: "2",
                title: "Download or Access",
                description:
                  "PDFs can be downloaded immediately. Video resources are available for streaming online.",
              },
              {
                step: "3",
                title: "Use in Your Setting",
                description:
                  "Adapt materials for personal study, small groups, church classes, or community gatherings.",
              },
              {
                step: "4",
                title: "Share Your Feedback",
                description:
                  "Let us know how the resources are impacting your spiritual journey and community.",
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-8">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-escz-orange text-escz-navy rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-escz-cream mb-2">
                    {item.title}
                  </h3>
                  <p className="text-escz-cream/70 text-lg">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-escz-cream mb-6">
            Start Your Discipleship Journey
          </h2>
          <p className="text-xl text-escz-cream/80 mb-10 max-w-2xl mx-auto">
            Whether you're beginning your faith journey or deepening your
            discipleship, our resources are here to help you grow.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-escz-orange to-escz-gold text-escz-navy font-bold rounded-lg hover:shadow-2xl transition-shadow duration-300">
            Explore All Resources
          </button>
        </div>
      </section>
    </div>
  );
}
