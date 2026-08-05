import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Calendar, Code2 } from 'lucide-react';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  width: 100%;
  max-height: 75vh;
  overflow-y: auto;
  
  /* Custom Scrollbar */
  &::-webkit-scrollbar { width: 8px; }
  &::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); border-radius: 4px; }
  &::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
  &::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
  
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const RepoCard = styled(motion.div)`
  background: rgba(22, 27, 34, 0.6);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(88, 166, 255, 0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(88, 166, 255, 0.3);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(88, 166, 255, 0.1);
    
    &::before { opacity: 1; }
    
    .external-icon { opacity: 1; transform: translate(0, 0); }
  }
`;

const RepoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #58a6ff;
    font-weight: 600;
    word-break: break-word;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .external-icon {
    color: #8b949e;
    opacity: 0;
    transform: translate(-5px, 5px);
    transition: all 0.3s ease;
  }
`;

const RepoDesc = styled.p`
  color: #8b949e;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RepoFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  color: #8b949e;
  font-size: 0.85rem;
  margin-top: auto;

  .stat {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .lang-color {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }
`;

const ErrorMessage = styled.div`
  padding: 2rem;
  color: #ff7b72;
  text-align: center;
  width: 100%;
  background: rgba(255, 123, 114, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 123, 114, 0.2);
`;

const getLangColor = (lang) => {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    C: '#555555',
    'C++': '#f34b7d',
    Java: '#b07219'
  };
  return colors[lang] || '#8b949e';
};

const RepoGridView = ({ username = 'ssureshkxmar', searchQuery = '', onSelectRepo }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers });
        
        if (!res.ok) throw new Error('Failed to fetch repositories. Rate limit might be exceeded.');
        
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRepos();
  }, [username]);

  const filteredRepos = repos.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (repo.language && repo.language.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#8b949e' }}>Loading Repositories...</div>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <GridContainer>
      {filteredRepos.map((repo, idx) => (
        <div key={repo.id} style={{ display: 'block', height: '100%', cursor: 'pointer' }} onClick={() => onSelectRepo(repo.name)}>
          <RepoCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: (idx % 10) * 0.05 }}
          >
            <RepoHeader>
              <h3>
                <Code2 size={18} color="#c9d1d9" /> 
                {repo.name}
              </h3>
              <ExternalLink className="external-icon" size={18} />
            </RepoHeader>
            <RepoDesc>{repo.description || "No description provided."}</RepoDesc>
            <RepoFooter>
              {repo.language && (
                <div className="stat">
                  <span className="lang-color" style={{ backgroundColor: getLangColor(repo.language) }} />
                  {repo.language}
                </div>
              )}
              <div className="stat">
                <Star size={14} /> {repo.stargazers_count}
              </div>
              <div className="stat">
                <GitFork size={14} /> {repo.forks_count}
              </div>
              <div className="stat" style={{ marginLeft: 'auto' }}>
                <Calendar size={14} /> {new Date(repo.updated_at).toLocaleDateString()}
              </div>
            </RepoFooter>
          </RepoCard>
        </div>
      ))}
      {filteredRepos.length === 0 && (
        <div style={{ color: '#8b949e', gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
          No repositories found matching your search.
        </div>
      )}
    </GridContainer>
  );
};

export default RepoGridView;
