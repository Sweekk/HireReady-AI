import React from "react";

import { useContext } from "react";
//import { AuthContext } from '../../context/AuthContext'
import Navbar_imp from "./Navbar/page";
import HeroSection from "./hero section/page";
import ResumeCompLRight from "./rightImgcomp/page";
import ResumeCompLeft from "./leftImgComp/page";
import ArticleSection from "./Articlepage/page";


import {
  heroData,
  resumeGPTHeroData,
  atsCheckerHeroData,
  jobTrackerHeroData,
} from "./data/heroData";


export default function DashboardPage() {
  //const { user } = useContext(AuthContext)

  return (
    <div>
      <Navbar_imp />
      <HeroSection />
      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            <span className="relative inline-block">
              <span className="relative z-10">AI Resumes</span>
              <span className="absolute inset-0 bg-yellow-100 -rotate-1 rounded"></span>
            </span>{" "}
            to Land Your Dream Job
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Navigate from resume creation to job offer with simple, smart tools
            to bring you closer to hearing “You’re hired”.
          </p>
        </div>
      </section>

      <ResumeCompLRight {...heroData} />
      <ResumeCompLeft {...atsCheckerHeroData} />
      <ResumeCompLRight {...resumeGPTHeroData} />
      <ResumeCompLeft {...jobTrackerHeroData} />
      <ArticleSection/>
    </div>
  );
}
