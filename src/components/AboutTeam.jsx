import men1 from "../assets/2.png";

const teamMembers = [
  {
    name: "Nguyễn Minh giang",
    role: "Chief Executing Officer (CEO)",
    image: men1,
  },
  {
    name: "Đồng Nhật Linh",
    role: "Chief Marketing Officer (CMO)",
    image: men1,
  },
  {
    name: "Vương Chí Nhật",
    role: "Chief Financial Officer (CFO)",
    image: men1,
  },
  {
    name: "Phan Hải Đăng",
    role: "Chief Operating Officer (COO)",
    image: men1,
  },
  {
    name: "Nguyễn Đình Anh Đức",
    role: "Chief Technology Officer (CTO)",
    image: men1,
  },
  {
    name: "Vũ Linh Trang",
    role: "Chief Product Officer (CPO)",
    image: men1,
  },
];

const AboutTeam = () => {
  return (
    <div className="py-16 bg-white text-center text-black">
      <h2 className="text-3xl font-bold mb-12">Gặp Gỡ Team Ribbon Box</h2>

      <div className="flex justify-center">
        <div className="w-16 h-1 bg-black mb-12"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-[320px] object-cover"
            />
            <div className="py-4">
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTeam;
