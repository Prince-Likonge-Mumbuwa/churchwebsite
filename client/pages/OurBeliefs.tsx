import Header from "@/components/Header";
import { BookOpen, Zap, Heart, Shield, Globe } from "lucide-react";

export default function OurBeliefs() {
  const beliefs = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "The Authority of the Bible",
      description:
        "We believe the Bible is the infallible Word of God, divinely inspired and our ultimate authority for faith and practice.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Salvation Through Faith",
      description:
        "Salvation comes through faith in Jesus Christ alone. His death and resurrection provide redemption for all humanity.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "The Lordship of Christ",
      description:
        "Jesus Christ is Lord and Savior. We are called to surrender our lives to His lordship and follow Him as disciples.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "The Holy Spirit",
      description:
        "The Holy Spirit empowers believers for holy living, service, and witness. We believe in the fullness and gifts of the Spirit.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "The Great Commission",
      description:
        "We are called to proclaim the Gospel to all nations and make disciples, impacting every sphere of society.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Holistic Transformation",
      description:
        "God desires whole-person restoration: spiritual, emotional, physical, social, and economic transformation in Christ.",
    },
  ];

  const doctrines = [
    {
      title: "God",
      points: [
        "One eternal God existing in three persons: Father, Son, and Holy Spirit",
        "Creator and sustainer of all things",
        "Perfect in holiness, justice, and love",
      ],
    },
    {
      title: "Humanity",
      points: [
        "Created in the image of God with inherent dignity and value",
        "Fallen into sin, separated from God's fellowship",
        "Capable of redemption through Christ",
      ],
    },
    {
      title: "Jesus Christ",
      points: [
        "The Son of God, fully divine and fully human",
        "Died on the cross as payment for sin",
        "Rose from the dead, conquering death and enabling new life",
      ],
    },
    {
      title: "Redemption",
      points: [
        "Freely offered to all through faith in Jesus Christ",
        "Not earned by works, but received as God's grace",
        "Brings forgiveness, restoration, and eternal life",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-escz-navy">
      <Header />

      {/* Hero Section with Bible Image */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden pt-8">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url("https://cdn.builder.io/api/v1/image/assets%2F591e73d7e70642a48766b5a2d29d9ae7%2F84723272bc014fe9877d736d5ef20793?format=webp&width=1200")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-escz-navy/70" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-escz-cream mb-6">
            Our Beliefs
          </h1>
          <p className="text-xl text-escz-cream/90 max-w-2xl mx-auto">
            Grounded in Scripture and evangelical truth, our beliefs shape how we
            live, serve, and transform communities.
          </p>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Six Core Beliefs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {beliefs.map((belief, index) => (
              <div
                key={index}
                className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl p-8 backdrop-blur-sm hover:border-escz-orange/30 transition-all duration-300 group"
              >
                <div className="text-escz-orange mb-4 group-hover:text-escz-gold transition-colors">
                  {belief.icon}
                </div>
                <h3 className="text-xl font-bold text-escz-cream mb-3">
                  {belief.title}
                </h3>
                <p className="text-escz-cream/70 leading-relaxed">
                  {belief.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctrinal Statements */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy/80 border-t border-escz-gray/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-escz-cream mb-16 text-center">
            Doctrinal Foundation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctrines.map((doctrine, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-escz-navy/50 to-escz-navy/30 border border-escz-gray/20 rounded-2xl p-10 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold text-escz-orange mb-6">
                  {doctrine.title}
                </h3>
                <ul className="space-y-4">
                  {doctrine.points.map((point, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="text-escz-gold font-bold flex-shrink-0">
                        •
                      </span>
                      <span className="text-escz-cream/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Foundation */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-escz-cream mb-12">
            Our Biblical Foundation
          </h2>

          <div className="bg-escz-navy/50 border border-escz-gold/30 rounded-2xl p-12 backdrop-blur-sm">
            <p className="text-2xl text-escz-cream/90 mb-8 italic font-semibold">
              "For to me, to live is Christ and to die is gain."
            </p>
            <p className="text-escz-gold font-semibold mb-8">
              Philippians 1:21
            </p>

            <p className="text-lg text-escz-cream/80 max-w-2xl mx-auto leading-relaxed mb-8">
              This verse encapsulates our mission: Christ is central to
              everything we do. We believe in transformation through the power
              of the Gospel, the centrality of the Bible, and the empowerment of
              the Holy Spirit to impact communities holistically.
            </p>

            <div className="border-t border-escz-gray/20 pt-8">
              <h3 className="text-xl font-bold text-escz-orange mb-6">
                We Also Stand On
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-escz-cream mb-2">
                    Matthew 28:19-20
                  </p>
                  <p className="text-escz-cream/70">The Great Commission</p>
                </div>
                <div>
                  <p className="font-semibold text-escz-cream mb-2">
                    2 Corinthians 5:17
                  </p>
                  <p className="text-escz-cream/70">New Creation in Christ</p>
                </div>
                <div>
                  <p className="font-semibold text-escz-cream mb-2">
                    John 10:10
                  </p>
                  <p className="text-escz-cream/70">Abundant Life</p>
                </div>
                <div>
                  <p className="font-semibold text-escz-cream mb-2">
                    1 John 3:8
                  </p>
                  <p className="text-escz-cream/70">Destroy the Works of Evil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
