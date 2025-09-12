import React from "react";
import Navbar from "components/Navbar";
import Icon from "components/Icon";
import Footer from "components/Footer";

// Minimal Integration Card
const IntegrationCard = ({ icon, name, description }) => (
  <div className="flex-shrink-0 bg-white rounded-lg border border-gray-200 p-6 w-72 hover:bg-gray-50 transition">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

function Home({ user, setUser }) {
  return (
    <>
      {/* Import Inter Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex flex-col items-center justify-center font-inter"
        style={{
          background: "white",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.1) 1px, transparent 1px),
           radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
          `,
          backgroundSize: "58px 58px, 58px 58px, 100% 100%",
        }}
      >
        <Navbar user={user} setUser={setUser} />

        <div className="max-w-60xl text-center mt-16">
         <h1
  className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900"
  style={{ fontFamily: "'Indie Flower', cursive" }}
>
  SmartSummary
</h1>


          <h4 className="italic mt-6 text-xl text-gray-700">
            "Turn Conversations into Actions"
          </h4>

          <p className="mt-6 text-lg text-gray-600">
            Get your meeting notes, YouTube recaps, and audio summaries{" "}
            <span className="relative curved-underline">in just one click</span>.
            <br /> Works seamlessly across all platforms.
          </p>

          <a
            className="inline-flex mt-10 px-6 py-3 text-base font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition"
            href="/landing.html"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="download" />
            &nbsp;Download Chrome Extension
          </a>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="py-20 bg-gray-50 font-inter">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Works with your favorite tools
          </h2>
          <p className="text-lg text-gray-600">
            Seamlessly integrate with the platforms you already use
          </p>
        </div>

        {/* Scrolling integrations */}
        <div className="overflow-hidden">
          <div className="integration-scroll flex flex-col space-y-6">
            {/* Row 1 */}
            <div className="flex space-x-6 animate-scroll-right whitespace-nowrap">
              <IntegrationCard icon="🎥" name="Zoom" description="Auto-join and transcribe Zoom meetings" />
              <IntegrationCard icon="📹" name="Google Meet" description="Seamless Google Meet integration" />
              <IntegrationCard icon="💼" name="Microsoft Teams" description="Meeting notes in Teams" />
              <IntegrationCard icon="📺" name="YouTube" description="Summarize YouTube instantly" />
            </div>

            {/* Row 2 */}
            <div className="flex space-x-6 animate-scroll-left whitespace-nowrap">
              <IntegrationCard icon="📅" name="Google Calendar" description="Schedule AI meeting agent automatically" />
              <IntegrationCard icon="📝" name="Google Docs" description="Sync transcriptions for collaboration" />
              <IntegrationCard icon="💬" name="Slack" description="Share transcripts instantly" />
              <IntegrationCard icon="✅" name="Asana" description="Turn notes into tasks" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="sticky top-0 h-[80vh] flex items-center justify-between bg-white border-t border-gray-200 font-inter">
        <div className="w-full sm:w-1/2 p-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Never miss a thing with SmartSummary
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Transcribe interviews, podcasts, and meetings. <br />
            Empower collaboration with easy sharing and search. <br />
            Get AI-generated notes and highlights saved automatically.
          </p>
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-center p-10">
          <img src="M.png" alt="Feature" className="max-w-full max-h-full object-contain" />
        </div>
      </div>

      <div className="sticky top-0 h-[80vh] flex items-center justify-between bg-white border-t border-gray-200 font-inter">
        <div className="w-full sm:w-1/2 p-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Never miss a thing with SmartSummary
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Transcribe interviews, podcasts, and meetings. <br />
            Empower collaboration with easy sharing and search. <br />
            Get AI-generated notes and highlights saved automatically.
          </p>
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-center p-10">
          <img src="M.png" alt="Feature" className="max-w-full max-h-full object-contain" />
        </div>
      </div>

      <div className="sticky top-0 h-[80vh] flex items-center justify-between bg-white border-t border-gray-200 font-inter">
        <div className="w-full sm:w-1/2 p-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Never miss a thing with SmartSummary
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Transcribe interviews, podcasts, and meetings. <br />
            Empower collaboration with easy sharing and search. <br />
            Get AI-generated notes and highlights saved automatically.
          </p>
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-center p-10">
          <img src="M.png" alt="Feature" className="max-w-full max-h-full object-contain" />
        </div>
      </div>

      <Footer />

      <style jsx>{`
        .curved-underline {
          position: relative;
          display: inline-block;
        }
        .curved-underline::after {
          content: '';
          position: absolute;
          left: -2%;
          bottom: -2px;
          width: 104%;
          height: 6px;
          background: black;
          border-radius: 80px;
          transform: scaleY(0.8) rotate(-0.9deg);
          opacity: 0.9;
        }
        .animate-scroll-right {
          animation: scrollRight 25s linear infinite;
        }
        .animate-scroll-left {
          animation: scrollLeft 25s linear infinite;
        }
        @keyframes scrollRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes scrollLeft {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .font-inter {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Roboto, Helvetica, Arial, sans-serif;
        }
      `}</style>
    </>
  );
}

export default Home;
