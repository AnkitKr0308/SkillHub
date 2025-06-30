import React from "react";

import { Link } from "react-router-dom";

function SkillHubHome() {
  
 

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to SkillHub
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Learn practical skills in 5-minute micro lessons. Anytime. Anywhere.
          For Free.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/login"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-100 transition"
          >
            Explore Courses
          </Link>

          <Link
            to="/signup"
            className="bg-indigo-500 text-white px-6 py-3 rounded-full hover:bg-indigo-600 transition"
          >
            Join SkillHub
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Skill Tracks
        </h2>
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {[
            {
              title: "JavaScript Basics",
              description: "Grasp key JS concepts in 5-minute lessons.",
            },
            {
              title: "Git & GitHub",
              description: "Master version control and collaboration.",
            },
            {
              title: "HTML + CSS",
              description: "Build responsive UIs from scratch.",
            },
            {
              title: "React Essentials",
              description: "Kickstart modern web development.",
            },
            {
              title: "SQL for Beginners",
              description: "Query and manage databases like a pro.",
            },
            {
              title: "Interview Prep",
              description: "Short, sharp tips to crack coding interviews.",
            },
          ].map((skill, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6">Hear from our Learners</h3>
          <blockquote className="text-gray-700 italic">
            “SkillHub has made learning so easy and fun. I complete one lesson
            over coffee every day!”
          </blockquote>
          <p className="text-sm text-gray-500 mt-4">
            – Ayesha, Software Engineer
          </p>
        </div>
      </section>

      <footer className="bg-indigo-700 text-white py-10 text-center">
        <p className="text-lg mb-4 font-medium">
          Ready to upgrade your skills in minutes?
        </p>
        <Link
          to="/signup"
          className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </footer>
    </div>
  );
}

export default SkillHubHome;
