import Header from "@/components/Header";
import {
  Leaf,
  Hammer,
  BookOpen,
  Heart,
  Users,
  TrendingUp,
  Award,
  Globe,
} from "lucide-react";

export default function CommunityImpact() {
  const projects = [
    {
      icon: <Leaf className="w-10 h-10" />,
      title: "Agricultural Development",
      locations: "12 communities",
      impact: "500+ farmers",
      description:
        "Implementing sustainable farming practices, providing seeds and training to increase food security and income.",
      outcomes: [
        "45% increase in crop yields",
        "Improved soil health",
        "Market linkages established",
      ],
    },
    {
      icon: <Hammer className="w-10 h-10" />,
      title: "Carpentry Training",
      locations: "5 centers",
      impact: "200+ trainees",
      description:
        "Vocational training in carpentry and woodwork, creating employment opportunities for youth.",
      outcomes: [
        "85% employment rate post-training",
        "Small businesses launched",
        "Community infrastructure improved",
      ],
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Education Programs",
      locations: "8 schools",
      impact: "2,500+ students",
      description:
        "Quality education with scholarships for disadvantaged children and teacher training initiatives.",
      outcomes: [
        "95% school attendance",
        "Improved academic performance",
        "Leadership development",
      ],
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Healthcare Services",
      locations: "6 clinics",
      impact: "1,000+ served/month",
      description:
        "Mobile and fixed clinics providing preventive care, maternal health, and health education.",
      outcomes: [
        "Reduced maternal mortality",
        "Disease prevention awareness",
        "Access to basic medications",
      ],
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Women Empowerment",
      locations: "15 groups",
      impact: "450+ women",
      description:
        "Skills training, income generation projects, and leadership development for women.",
      outcomes: [
        "Increased household income",
        "Women in leadership roles",
        "Family stability improved",
      ],
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Community Infrastructure",
      locations: "Multiple sites",
      impact: "10,000+ beneficiaries",
      description:
        "Building water points, establishing community centers, and improving village facilities.",
      outcomes: [
        "Access to clean water",
        "Community gathering spaces",
        "Improved quality of life",
      ],
    },
  ];

  const stories = [
    {
      name: "John Mwale",
      title: "Carpentry Business Owner",
      story:
        "Through ESCZ carpentry training, I learned skills that transformed my life. Today, I own a successful carpentry business and employ 5 young people from my community.",
      community: "Livingstone",
    },
    {
      name: "Grace Banda",
      title: "Farmer & Community Leader",
      story:
        "The agricultural program taught me modern farming techniques. My yields doubled, and now I mentor other farmers. Our entire village is experiencing food security.",
      community: "Copperbelt",
    },
    {
      name: "David Musonda",
      title: "Educational Scholarship Recipient",
      story:
        "ESCZ gave me a scholarship to complete secondary school. Today I'm a teacher in one of our community schools, giving back to students like myself.",
      community: "Lusaka Province",
    },
    {
      name: "Miriam Kapila",
      title: "Women's Group Leader",
      story:
        "Our women's group has grown from 5 to 45 members. Through income-generation projects, we now support our families and have taken leadership roles in our church.",
      community: "Southern Province",
    },
  ];

  const impact_stats = [
    {
      number: "45+",
      label: "Churches Planted",
      icon: <Award className="w-8 h-8" />,
    },
    {
      number: "2,500+",
      label: "Students Reached",
      icon: <BookOpen className="w-8 h-8" />,
    },
    {
      number: "500+",
      label: "Farmers Trained",
      icon: <Leaf className="w-8 h-8" />,
    },
    {
      number: "1,200+",
      label: "Lives Transformed",
      icon: <Heart className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-escz-navy">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden pt-8">
        <div className="absolute inset-0 bg-gradient-to-br from-escz-gold/10 via-escz-navy to-escz-navy z-0" />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-escz-cream mb-6">
            Community Impact
          </h1>
          <p className="text-xl text-escz-cream/90 max-w-2xl mx-auto">
            Real transformation happening in real communities across Zambia
            through holistic, Christ-centered development.
          </p>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impact_stats.map((stat, index) => (
              <div
                key={index}
                className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm text-center hover:border-escz-orange/30 transition-colors"
              >
                <div className="text-escz-orange mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold text-escz-gold mb-2">
                  {stat.number}
                </p>
                <p className="text-escz-cream/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy/80 border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Our Major Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-escz-navy/50 to-escz-navy/30 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm hover:border-escz-gold/50 transition-all duration-300"
              >
                <div className="text-escz-orange mb-4">{project.icon}</div>
                <h3 className="text-2xl font-bold text-escz-cream mb-2">
                  {project.title}
                </h3>

                <div className="flex gap-4 mb-4 text-sm">
                  <span className="text-escz-gold font-semibold">
                    {project.locations}
                  </span>
                  <span className="text-escz-orange font-semibold">
                    {project.impact}
                  </span>
                </div>

                <p className="text-escz-cream/70 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="border-t border-escz-gray/20 pt-6">
                  <p className="text-sm font-semibold text-escz-gold mb-3">
                    Outcomes
                  </p>
                  <ul className="space-y-2">
                    {project.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-escz-orange flex-shrink-0 mt-0.5" />
                        <span className="text-escz-cream/70">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Stories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Stories of Transformation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story, index) => (
              <div
                key={index}
                className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-10 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-escz-orange/20 to-escz-gold/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-escz-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-escz-cream">
                      {story.name}
                    </h3>
                    <p className="text-escz-orange font-semibold text-sm">
                      {story.title}
                    </p>
                  </div>
                </div>

                <p className="text-escz-cream/80 leading-relaxed mb-6 italic">
                  "{story.story}"
                </p>

                <p className="text-escz-gold font-semibold text-sm">
                  {story.community}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy/80 border-t border-escz-gray/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-escz-cream mb-6">
            Be Part of the Impact
          </h2>
          <p className="text-xl text-escz-cream/80 mb-12 max-w-2xl mx-auto">
            Your support enables us to continue transforming lives across
            communities. Whether through prayer, partnerships, or resources, you
            can make a difference.
          </p>

          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a
              href="/partner-with-us"
              className="px-8 py-4 bg-gradient-to-r from-escz-orange to-escz-gold text-escz-navy font-bold rounded-lg hover:shadow-2xl transition-shadow duration-300"
            >
              Support Our Work
            </a>
            <a
              href="/who-we-are"
              className="px-8 py-4 bg-escz-navy/80 border border-escz-gold/50 text-escz-cream font-bold rounded-lg hover:border-escz-gold transition-colors duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
