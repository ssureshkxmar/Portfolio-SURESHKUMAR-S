import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { MapPin, Users, BookOpen, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const HeaderContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 1rem 0 3rem 0;
  margin-bottom: 2rem;
  position: relative;
  overflow: visible;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 1rem;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  animation: ${float} 6s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 10px;
    background: radial-gradient(ellipse at center, rgba(88, 166, 255, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(4px);
  }
`;

const Avatar = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 0 0 2px rgba(88, 166, 255, 0.5),
    0 10px 30px rgba(88, 166, 255, 0.3);
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    transform: scale(1.08) rotate(5deg);
  }
`;

const UserInfo = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 2.5rem;
    margin: 0 0 0.5rem 0;
    font-weight: 800;
    background: linear-gradient(90deg, #ffffff, #8b949e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }

  .login {
    font-size: 1.2rem;
    color: #58a6ff;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    
    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  p {
    font-size: 1.1rem;
    color: #c9d1d9;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    max-width: 600px;
  }
`;

const Metrics = styled.div`
  display: flex;
  gap: 1rem;
  color: #8b949e;
  font-size: 0.95rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }

  .metric {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.03);
    padding: 0.6rem 1.2rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 0.3s ease;
    cursor: default;
    
    &:hover {
      background: rgba(88, 166, 255, 0.1);
      border-color: rgba(88, 166, 255, 0.3);
      transform: translateY(-2px);
      color: #ffffff;
    }
    
    strong {
      color: #ffffff;
      font-size: 1.1rem;
    }
  }
`;

const ProfileHeader = ({ username = 'ssureshkxmar' }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const res = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <HeaderContainer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p style={{ color: '#8b949e', margin: '0 auto' }}>Syncing GitHub Ecosystem...</p>
      </HeaderContainer>
    );
  }

  if (!profile) return null;

  return (
    <HeaderContainer
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <AvatarWrapper>
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
          <Avatar src={profile.avatar_url} alt={profile.name} />
        </a>
      </AvatarWrapper>
      
      <UserInfo>
        <h1>{profile.name || profile.login}</h1>
        <a href={profile.html_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <div className="login">
            <GithubIcon />
            @{profile.login}
            <ExternalLink size={14} style={{ opacity: 0.5 }} />
          </div>
        </a>
        <p>{profile.bio || "Building intelligent digital systems that bridge AI, healthcare, and next-generation technology."}</p>
        
        <Metrics>
          <motion.div className="metric" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Users size={16} />
            <span><strong>{profile.followers}</strong> followers</span>
          </motion.div>
          <motion.div className="metric" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <BookOpen size={16} />
            <span><strong>{profile.public_repos}</strong> repos</span>
          </motion.div>
        </Metrics>
      </UserInfo>
    </HeaderContainer>
  );
};

export default ProfileHeader;
