import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import UVResultCard from '../components/UVResultCard';
import SectionTiles from '../components/SectionTiles';
import Chatbot from '../components/Chatbot';
import uvVideo from '../assets/video.mp4';
import facts from '../assets/facts.png'; 
export default function Dashboard() {
  const [uvData, setUvData] = useState(null);
  const [loc, setLoc] = useState(null);
  const [section, setSection] = useState(null);

  const uvIndex = uvData?.result?.uv ?? 0;

  return (
    <div className="dashboard-container">
      <div className="logo-container">
        <h1 className='Logo'>&#127774; SunSafe</h1>
      </div>

      <div className="container">
        {/* Introductory Section */}
        <div className="intro-container">
          <div className="intro-content">
            <div className="paras">
              
              <h2 className="intro-title"> The Sun gives Life, and a Hidden Danger!!</h2>
              <p className="intro-fact">
              You can’t see <b>UV Rays</b>, but you can truly feel the burn — <br />
  on your skin, your food supply, your health, and even our planet.
              </p>
              <button className="cta-button">
              Get The Facts and Avoid the UV Trap!
            </button>
            </div>

            <div className="video-section">
              
              <video className="video-player" autoPlay loop controls muted playsInline>
                <source src={uvVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            
          </div>
          
            <div className='whys'>
              <img src={facts} alt="" className='facts' />
              <div className="why">
                <h1>Think sunshine is all smiles? Or could it be sneaky too?</h1>
                Did you know? UV rays are invisible sunbeams—great in small doses for Vitamin D, but too much is like eating too much candy. They can burn skin, damage eyes, and even harm crops . Checking the UV Index is like a weather forecast for your health—stay shaded, stay safe, with SunSafe!</div>
            </div>
        </div>
        
        <InputForm onUV={setUvData} onLocation={setLoc} />
        <UVResultCard uvData={uvData} />
        <SectionTiles onOpen={setSection} />
      </div>

      <Chatbot
        open={!!section}
        onClose={() => setSection(null)}
        section={section || 'health'}
        uvIndex={uvIndex}
        locationName={loc ? `${loc.lat.toFixed(3)}, ${loc.lng.toFixed(3)}` : 'Unknown'}
      />
    </div>
  );
}
