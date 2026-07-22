import Header from "@/components/Header";
import { Heart, Eye, Compass, Users } from "lucide-react";

export default function WhoWeAre() {
  const leaders = [
    {
      name: "Rev. Dr. Samuel Mwale",
      role: "General Overseer",
      description:
        "With over 25 years in pastoral ministry, Rev. Dr. Mwale leads ESCZ's vision for transforming communities through the Gospel.",
    },
    {
      name: "Rev. Peter Banda",
      role: "Secretary General",
      description:
        "Overseeing operations and coordination across all ESCZ churches and ministries throughout Zambia.",
    },
    {
      name: "Dr. Grace Mulonda",
      role: "Ministry Director",
      description:
        "Directing community impact initiatives and holistic ministry programs across agriculture, health, and education sectors.",
    },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Spiritual Transformation",
      description:
        "We are committed to life-changing discipleship and spiritual growth rooted in biblical truth.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Care",
      description:
        "Holistic ministry addressing spiritual, physical, and social needs of our communities.",
    },
    {
      icon: <Compass className="w-8 h-8" />,
      title: "Integrity",
      description:
        "Operating with transparency, honesty, and accountability in all our endeavors.",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Excellence",
      description:
        "Pursuing the highest standards in our ministry and service to honor God.",
    },
  ];

  return (
    <div className="min-h-screen bg-escz-navy">
      <Header />

      {/* Hero Section with Church Image */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden pt-8">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url("https://cdn.builder.io/api/v1/image/assets%2F591e73d7e70642a48766b5a2d29d9ae7%2F84d008892eb5436b954ccdf60c703e9b?format=webp&width=1200")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-escz-navy/70" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-escz-cream mb-6">
            Who We Are
          </h1>
          <p className="text-xl text-escz-cream/90 max-w-2xl mx-auto">
            The Evangelical Synod Church in Zambia, a community committed to
            spiritual transformation and holistic community development.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Mission */}
            <div className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-10 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-escz-orange mb-4">
                Our Mission
              </h2>
              <p className="text-escz-cream/80 text-lg leading-relaxed">
                To proclaim the Gospel of Jesus Christ and develop disciples who
                impact their communities holistically—spiritually, socially,
                economically, and physically. We are committed to reaching the
                lost, strengthening believers, and transforming society through
                the power of God's Word.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-10 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-escz-gold mb-4">
                Our Vision
              </h2>
              <p className="text-escz-cream/80 text-lg leading-relaxed">
                A vibrant, growing Evangelical Synod in Zambia where every
                believer is empowered to fulfill the Great Commission, every
                community experiences wholeness in Christ, and the Gospel
                transforms generations through discipleship, education, health,
                and economic development.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-escz-cream mb-12 text-center">
              Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm hover:border-escz-orange/30 transition-colors duration-300"
                >
                  <div className="text-escz-orange mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-escz-cream mb-3">
                    {value.title}
                  </h3>
                  <p className="text-escz-cream/70">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div>
            <h2 className="text-4xl font-bold text-escz-cream mb-12 text-center">
              Leadership Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leaders.map((leader, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-escz-navy/50 to-escz-navy/30 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm hover:border-escz-gold/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-escz-orange/20 to-escz-gold/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Users className="w-8 h-8 text-escz-orange" />
                  </div>
                  <h3 className="text-2xl font-bold text-escz-cream mb-1 text-center">
                    {leader.name}
                  </h3>
                  <p className="text-escz-orange font-semibold text-center mb-4">
                    {leader.role}
                  </p>
                  <p className="text-escz-cream/70 text-center text-sm leading-relaxed">
                    {leader.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy/80 border-t border-escz-gray/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Our Journey
          </h2>

          <div className="space-y-8">
            {[
              {
                year: "1985",
                title: "Foundation",
                description:
                  "ESCZ established with a vision to spread the Gospel across Zambia",
              },
              {
                year: "1995",
                title: "Growth & Expansion",
                description:
                  "Established churches in 15 communities and launched first educational programs",
              },
              {
                year: "2005",
                title: "Community Impact",
                description:
                  "Launched comprehensive community development initiatives including health and agriculture projects",
              },
              {
                year: "2015",
                title: "Digital Ministry",
                description:
                  "Expanded reach through digital platforms and international partnerships",
              },
              {
                year: "2024",
                title: "Present Day",
                description:
                  "45+ churches, 2,500+ students reached, 8 major community projects transforming lives holistically",
              },
            ].map((milestone, index) => (
              <div key={index} className="flex gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 bg-escz-orange rounded-full border-4 border-escz-navy"></div>
                  {index < 4 && (
                    <div className="w-1 h-20 bg-gradient-to-b from-escz-orange to-escz-gold/30 my-2"></div>
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-2xl font-bold text-escz-orange mb-2">
                    {milestone.year}
                  </h3>
                  <h4 className="text-xl font-semibold text-escz-cream mb-2">
                    {milestone.title}
                  </h4>
                  <p className="text-escz-cream/70">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
