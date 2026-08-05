import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LockIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const SendIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const WaveSVG = () => (
  <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
  </svg>
);

const ContactContainer = styled.section`
  position: relative;
  width: 100vw;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000;
  overflow: hidden;
  padding: 8rem 0; /* padding instead of margin to prevent gaps */
`;

const WavyTop = styled.div`
  position: absolute;
  top: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 5;
  
  svg {
    position: relative;
    display: block;
    width: calc(150% + 1.3px);
    height: 120px;
    transform: rotate(180deg);
  }
  
  .shape-fill {
    fill: ${(props) => props.theme.body};
  }
`;

const WavyBottom = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 5;
  
  svg {
    position: relative;
    display: block;
    width: calc(150% + 1.3px);
    height: 120px;
  }
  
  .shape-fill {
    fill: ${(props) => props.theme.body};
  }
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), #1a1a1a;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
    display: none; /* Hide until video is added */
  }
  
  .placeholder-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  gap: 4rem;

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`;

const TextSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 900px) {
    align-items: center;
  }
`;

const Title = styled(motion.h2)`
  font-size: 5rem;
  font-weight: 900;
  color: #fff;
  text-transform: uppercase;
  margin: 0;
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(0,0,0,0.5);

  @media (max-width: 1024px) {
    font-size: 3.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SubTitle = styled(motion.p)`
  font-size: 1.5rem;
  color: #e5e5e5;
  font-style: italic;
  font-family: serif;
  margin-top: 1rem;
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const FormSection = styled(motion.div)`
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.02);

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

const Input = styled.input`
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.4);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(0, 0, 0, 0.4);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1rem;
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Format the message for WhatsApp
    const text = `Hi Suresh, I am ${formData.name}. %0AContact Details: ${formData.contact}%0A%0A${formData.message}`;
    
    // Redirect to WhatsApp API
    window.open(`https://wa.me/918925427760?text=${text}`, '_blank');
  };

  return (
    <ContactContainer id="contact">
      <WavyTop>
        <WaveSVG />
      </WavyTop>
      
      <VideoBackground>
        {/* Placeholder image until you add your actual video */}
        <img className="placeholder-img" src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2000&auto=format&fit=crop" alt="Background" />
        
        {/* When you have the video, uncomment this and remove the img above */}
        {/* <video autoPlay loop muted playsInline>
          <source src="/your-video.mp4" type="video/mp4" />
        </video> */}
      </VideoBackground>

      <Content>
        <TextSection>
          <Title
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            LET'S BUILD<br/>TOGETHER
          </Title>
          <SubTitle
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            (Contact Me)
          </SubTitle>
        </TextSection>

        <FormSection
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '2rem 0' }}
            >
              <h3 style={{ color: '#4ade80', fontSize: '1.5rem', marginBottom: '1rem' }}>Securely Sent!</h3>
              <p style={{ color: '#e5e5e5', lineHeight: '1.6' }}>
                You have securely contacted the developer. Wait for a maximum of 2-3 hrs for a reply.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ color: '#a3a3a3', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <LockIcon /> End-to-end encrypted. Reply within 2-3 hours.
              </div>
              
              <Input 
                type="text" 
                placeholder="Your Name" 
                required 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
              />
              <Input 
                type="text" 
                placeholder="Contact Details (Email or Phone)" 
                required 
                value={formData.contact} 
                onChange={e => setFormData({...formData, contact: e.target.value})} 
              />
              <TextArea 
                placeholder="Your Message..." 
                required 
                value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})} 
              />
              
              <SubmitButton type="submit">
                <SendIcon /> Send Secure Message
              </SubmitButton>
            </form>
          )}
        </FormSection>
      </Content>

      <WavyBottom>
        <WaveSVG />
      </WavyBottom>
    </ContactContainer>
  );
};

export default Contact;
