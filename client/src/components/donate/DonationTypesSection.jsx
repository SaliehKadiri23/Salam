import React from "react";
import { Heart, Users } from "lucide-react";
import { TbBuildingMosque } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const iconMap = {
  Heart: <Heart className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  TbBuildingMosque: <TbBuildingMosque className="w-6 h-6" />,
};

const DonationCard = ({ donation, index }) => {
  const navigate = useNavigate();

  const handleDonateClick = (donationType) => {
    navigate(`/donate_form?type=${donationType}`);
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-emerald-200"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative overflow-hidden">
          <img
            src={donation.image}
            alt={donation.title}
            className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent pointer-events-none"></div>
        </div>

        <div className="md:w-2/3 p-8 flex flex-col relative z-10 justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
                {iconMap[donation.icon]}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {donation.title}
                </h3>
                <p className="text-emerald-600 font-medium">
                  {donation.impact}
                </p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {donation.description}
            </p>
          </div>

          <button
            onClick={() => handleDonateClick(donation.id)}
            className="bg-gradient-to-r from-emerald-500  to-green-600 hover:scale-105  text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 "
          >
            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Donate Now
          </button>
        </div>
      </div>
    </div>
  );
};

const DonationTypesSection = () => {
  const donationTypes = useSelector((state) => state.donate.donationTypes);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Donation Options
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose how you'd like to contribute to our mission of serving Muslim
            communities worldwide
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
          {donationTypes.map((donation, index) => (
            <DonationCard
              key={donation.id}
              donation={donation}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationTypesSection;