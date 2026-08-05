import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, BatteryCharging, Factory } from 'lucide-react';

const ProductsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ProductCard = styled(motion.div)`
  background: rgba(13, 17, 23, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  margin-top: 2rem;
  
  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImageSection = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.05);

  .main-image {
    width: 100%;
    height: 300px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }
  
  .hardware-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    
    .hw-part {
      height: 150px;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }
  }
`;

const ProductDetails = styled.div`
  padding: 3rem 3rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 950px) {
    padding: 1rem 2.5rem 3rem 2.5rem;
  }

  .badge {
    align-self: flex-start;
    background: rgba(88, 166, 255, 0.15);
    color: #58a6ff;
    padding: 0.4rem 1rem;
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(88, 166, 255, 0.3);
  }

  h2 {
    font-size: 2.2rem;
    color: #ffffff;
    margin-bottom: 0.5rem;
    line-height: 1.2;
    font-weight: 800;
  }
  
  h3 {
    font-size: 1.4rem;
    color: #ffc107;
    margin-bottom: 1.5rem;
    font-weight: 600;
    letter-spacing: 1px;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.05rem;
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }

  .features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .feature {
      display: flex;
      align-items: flex-start;
      gap: 1rem;

      .icon-box {
        background: rgba(255, 255, 255, 0.05);
        padding: 0.6rem;
        border-radius: 8px;
        color: #ffc107;
        border: 1px solid rgba(255, 193, 7, 0.2);
      }

      div {
        h4 { color: #fff; margin-bottom: 0.25rem; font-size: 0.95rem; font-weight: 600; }
        span { color: #8b949e; font-size: 0.85rem; line-height: 1.4; display: block; }
      }
    }
  }
`;

const GalleryView = () => {
  return (
    <ProductsContainer>
      <ProductCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ProductImageSection>
          <div className="main-image">
            {/* Replace this src with "/img1.png" when you upload your image to the public folder */}
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" alt="Smart Factories Main System" />
          </div>
          <div className="hardware-grid">
            <div className="hw-part">
              {/* Replace this src with "/img2.png" when you upload your image to the public folder */}
              <img src="https://images.unsplash.com/photo-1592503254549-270505b22591?q=80&w=500&auto=format&fit=crop" alt="Smart Factories Battery Compartment" />
            </div>
            <div className="hw-part">
              {/* Replace this src with "/img3.png" when you upload your image to the public folder */}
              <img src="https://images.unsplash.com/photo-1601244460005-7798935c179c?q=80&w=500&auto=format&fit=crop" alt="Smart Factories Architecture" />
            </div>
          </div>
        </ProductImageSection>
        
        <ProductDetails>
          <div className="badge">IoT & Embedded Systems</div>
          <h2>Smart Factories</h2>
          <h3>ENERGY POWER CONTROL</h3>
          <p>
            An advanced, custom-built industrial hardware solution engineered for real-time energy monitoring and automated power regulation. Seamlessly integrating a Raspberry Pi Pico and an ESP Wi-Fi Module, this system delivers live telemetry directly to your dashboard.
          </p>
          
          <div className="features">
            <div className="feature">
              <div className="icon-box"><Cpu size={18} /></div>
              <div>
                <h4>Dual Processing</h4>
                <span>Combines Raspberry Pi Pico logic with ESP Wi-Fi connectivity.</span>
              </div>
            </div>
            <div className="feature">
              <div className="icon-box"><Activity size={18} /></div>
              <div>
                <h4>Live Telemetry</h4>
                <span>Real-time precision current sensing with an integrated OLED display.</span>
              </div>
            </div>
            <div className="feature">
              <div className="icon-box"><Zap size={18} /></div>
              <div>
                <h4>Power Regulation</h4>
                <span>Automated motor driver control for active industrial load management.</span>
              </div>
            </div>
            <div className="feature">
              <div className="icon-box"><BatteryCharging size={18} /></div>
              <div>
                <h4>Autonomous Power</h4>
                <span>Integrated step-up voltage regulator powered by high-capacity 18650 cells.</span>
              </div>
            </div>
          </div>
        </ProductDetails>
      </ProductCard>
    </ProductsContainer>
  );
};

export default GalleryView;
