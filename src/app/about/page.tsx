import Image from "next/image";

const teamMembers = [
  {
    name: "John Smith",
    role: "Head Chef",
    image: "/team/chef1.jpg",
    bio: "With over 15 years of experience in fine dining, John brings creativity and passion to every dish."
  },
  {
    name: "Sarah Johnson",
    role: "Sous Chef",
    image: "/team/chef2.jpg",
    bio: "Specializing in Mediterranean cuisine, Sarah ensures every plate is a work of art."
  },
  {
    name: "Michael Brown",
    role: "Pastry Chef",
    image: "/team/chef3.jpg",
    bio: "Michael&apos;s desserts are the perfect ending to any meal, combining traditional techniques with modern flair."
  }
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-hero.jpg"
            alt="Restaurant interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl">A journey of culinary excellence</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Philosophy</h2>
            <p className="text-gray-600 mb-6">
              Our chefs are passionate about creating memorable dining experiences. We&apos;re committed to using the finest ingredients and traditional cooking methods.
            </p>
            <p className="text-gray-600 text-lg">
              Our commitment to quality and innovation has earned us recognition as one of the city&apos;s premier dining destinations.
            </p>
          </div>

          {/* Team Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 