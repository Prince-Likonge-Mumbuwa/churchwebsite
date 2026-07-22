import Header from "@/components/Header";
import {
  Users,
  Heart,
  BookOpen,
  Baby,
  TrendingUp,
  Zap,
  Gift,
  Music,
} from "lucide-react";

export default function Ministries() {
  const ministries = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "Evangelism & Discipleship",
      description:
        "Our primary ministry focused on proclaiming Christ and developing mature disciples who transform their communities.",
      focus: ["Outreach", "Spiritual Growth", "Leadership Training"],
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Women's Fellowship",
      description:
        "Empowering women through spiritual development, skill training, and community impact initiatives.",
      focus: ["Mentorship", "Skills Training", "Community Service"],
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Youth Development",
      description:
        "Equipping young people with spiritual wisdom and practical skills for meaningful Christian living.",
      focus: ["Leadership", "Education", "Career Guidance"],
    },
    {
      icon: <Baby className="w-10 h-10" />,
      title: "Children's Ministry",
      description:
        "Creating a nurturing environment where children encounter Christ and grow in faith and character.",
      focus: ["Biblical Education", "Character Building", "Safe Community"],
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Education & Training",
      description:
        "Providing quality biblical education and vocational training for sustainable community development.",
      focus: ["Bible Schools", "Vocational Training", "Scholarships"],
    },
    {
      icon: <Gift className="w-10 h-10" />,
      title: "Community Development",
      description:
        "Holistic programs addressing health, agriculture, and economic empowerment of communities.",
      focus: ["Healthcare", "Agriculture", "Economic Projects"],
    },
  ];

  const programs = [
    {
      title: "Carpentry Training Program",
      category: "Skills Development",
      participants: "200+",
      description:
        "Equipping individuals with carpentry skills for employment and business ventures.",
    },
    {
      title: "Agricultural Initiatives",
      category: "Community Impact",
      participants: "500+",
      description:
        "Promoting sustainable farming practices and food security in rural communities.",
    },
    {
      title: "Healthcare Clinics",
      category: "Health & Wellness",
      participants: "1000+",
      description:
        "Providing accessible basic health services and health education programs.",
    },
    {
      title: "Bible Study Groups",
      category: "Spiritual Growth",
      participants: "1500+",
      description:
        "Small group discipleship fostering deep biblical understanding and community.",
    },
    {
      title: "School Feeding Program",
      category: "Education",
      participants: "800+",
      description:
        "Ensuring children receive nutritious meals while attending school.",
    },
    {
      title: "Women's Income Groups",
      category: "Economic Empowerment",
      participants: "300+",
      description:
        "Supporting women entrepreneurs through cooperative ventures and microfinance.",
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
            Our Ministries
          </h1>
          <p className="text-xl text-escz-cream/90 max-w-2xl mx-auto">
            Serving across diverse ministries to reach, teach, and transform
            lives through the Gospel and practical service.
          </p>
        </div>
      </section>

      {/* Core Ministries */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Key Ministry Areas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministries.map((ministry, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-escz-navy/50 to-escz-navy/30 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm hover:border-escz-orange/50 transition-all duration-300 group"
              >
                <div className="text-escz-orange mb-4 group-hover:text-escz-gold transition-colors">
                  {ministry.icon}
                </div>
                <h3 className="text-2xl font-bold text-escz-cream mb-3">
                  {ministry.title}
                </h3>
                <p className="text-escz-cream/70 mb-6 leading-relaxed">
                  {ministry.description}
                </p>
                <div className="border-t border-escz-gray/20 pt-4">
                  <p className="text-sm font-semibold text-escz-gold mb-3">
                    Focus Areas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ministry.focus.map((area, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-3 py-1 bg-escz-navy/50 border border-escz-orange/30 rounded-full text-xs text-escz-cream/80"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Programs */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy/80 border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Active Programs & Initiatives
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-escz-cream mb-1">
                      {program.title}
                    </h3>
                    <p className="text-escz-orange font-semibold text-sm">
                      {program.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-escz-gold font-bold text-lg">
                      {program.participants}
                    </p>
                    <p className="text-escz-cream/60 text-xs">Participants</p>
                  </div>
                </div>
                <p className="text-escz-cream/70 leading-relaxed">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Involved */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-escz-cream mb-8">
            Get Involved
          </h2>
          <p className="text-xl text-escz-cream/80 mb-12 max-w-2xl mx-auto">
            Whether you're looking to serve, lead, or support our ministries,
            there are many ways to be part of transforming lives in Zambia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Volunteer",
                description:
                  "Offer your time and talents to support our ministry activities.",
              },
              {
                title: "Partner",
                description:
                  "Join us through financial support or resource contribution.",
              },
              {
                title: "Lead",
                description:
                  "Take on leadership roles in discipleship and community projects.",
              },
            ].map((way, index) => (
              <div
                key={index}
                className="bg-escz-navy/50 border border-escz-gold/30 rounded-2xl p-8 backdrop-blur-sm"
              >
                <Music className="w-8 h-8 text-escz-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold text-escz-cream mb-3">
                  {way.title}
                </h3>
                <p className="text-escz-cream/70">{way.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
