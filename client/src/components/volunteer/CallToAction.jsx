import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const CallToAction = () => {
  const navigate = useNavigate()
  return (
    <div className="mt-20 text-center bg-gradient-to-r from-teal-600/10 via-emerald-600/10 to-blue-600/10 rounded-3xl p-12">
      <h2 className="text-3xl font-bold text-slate-800 mb-4">
        Can't find the right opportunity?
      </h2>
      <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
        We're always looking for passionate volunteers. Share your skills and
        interests with us.
      </p>
      <button onClick={()=> navigate("/contact_us")} className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
        Contact Us
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CallToAction;
