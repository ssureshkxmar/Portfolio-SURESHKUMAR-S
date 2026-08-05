import React, { useState } from 'react';
import styled from 'styled-components';
import { createClient, Provider, useQuery, cacheExchange, fetchExchange } from 'urql';
import WebContainerRunner from './WebContainerRunner';

// Define the GraphQL Query
const GITHUB_QUERY = `
  query FetchGitHubProfileAndRepos($username: String!) {
    user(login: $username) {
      name
      login
      avatarUrl
      bio
      repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC, isFork: false) {
        nodes {
          id
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

const Container = styled.div`
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  color: #c9d1d9;
  background: linear-gradient(145deg, #0d1117 0%, #161b22 100%);
  border: 1px solid rgba(88, 166, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  padding: 2.5rem;
  margin-top: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid rgba(48, 54, 61, 0.7);
  padding-bottom: 2.5rem;

  img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 3px solid rgba(88, 166, 255, 0.5);
    box-shadow: 0 0 20px rgba(88, 166, 255, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 30px rgba(88, 166, 255, 0.4);
    }
  }

  h2 {
    font-size: 2rem;
    margin: 0 0 0.25rem 0;
    background: linear-gradient(90deg, #58a6ff, #a371f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }
  
  .login {
    font-size: 1.25rem;
    color: #8b949e;
    font-weight: 400;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    color: #c9d1d9;
    margin: 0;
    line-height: 1.5;
    max-width: 600px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  color: #c9d1d9;
  margin-bottom: 1rem;
`;

const RepoScroll = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-bottom: 2rem;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #30363d;
    border-radius: 4px;
  }
`;

const RepoCard = styled.div`
  min-width: 320px;
  background: rgba(22, 27, 34, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(48, 54, 61, 0.8);
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${props => props.$active && `
    border-color: #a371f7;
    background: rgba(163, 113, 247, 0.05);
    box-shadow: 0 0 0 1px rgba(163, 113, 247, 0.5), 0 8px 24px rgba(163, 113, 247, 0.15);
  `}

  &:hover {
    transform: translateY(-5px);
    border-color: #58a6ff;
    box-shadow: 0 8px 24px rgba(88, 166, 255, 0.15);
  }

  h3 {
    margin: 0 0 0.75rem 0;
    color: #58a6ff;
    font-size: 1.1rem;
    font-weight: 600;
  }

  p {
    font-size: 0.85rem;
    color: #8b949e;
    flex: 1;
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }

  .meta {
    display: flex;
    gap: 1.25rem;
    font-size: 0.8rem;
    color: #8b949e;
    align-items: center;
  }

  .lang-color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
    vertical-align: middle;
  }
`;

const ErrorBox = styled.div`
  color: #ff7b72;
  background: rgba(255, 123, 114, 0.1);
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  border: 1px solid rgba(255, 123, 114, 0.4);
`;

const DashboardContent = ({ username }) => {
  const [selectedRepo, setSelectedRepo] = useState('profilo');

  const [result] = useQuery({
    query: GITHUB_QUERY,
    variables: { username },
  });

  const { data, fetching, error } = result;

  if (fetching) return <Container><p>Syncing Live GitHub Ecosystem...</p></Container>;
  const user = data?.user || {
    name: "SURESHKUMAR S",
    login: "ssureshkxmar",
    avatarUrl: "https://github.com/ssureshkxmar.png", // actual image
    bio: "Building intelligent digital systems that bridge AI, healthcare, and next-generation technology.",
    repositories: {
      nodes: [
        { id: "1", name: "moviesstreamfinder", description: "Movie stream finder app.", stargazerCount: 1, forkCount: 0, primaryLanguage: { name: "JavaScript", color: "#f1e05a" } },
        { id: "2", name: "ES-Innovations", description: "ES Innovations project.", stargazerCount: 2, forkCount: 0, primaryLanguage: { name: "TypeScript", color: "#3178c6" } },
        { id: "3", name: "profilo", description: "Interactive Developer Portfolio.", stargazerCount: 5, forkCount: 1, primaryLanguage: { name: "HTML", color: "#e34c26" } },
        { id: "4", name: "-CardioVis-Pro", description: "Cardio visualization tool.", stargazerCount: 3, forkCount: 0, primaryLanguage: { name: "JavaScript", color: "#f1e05a" } },
        { id: "5", name: "nano-boys", description: "Nano boys project.", stargazerCount: 0, forkCount: 0, primaryLanguage: { name: "HTML", color: "#e34c26" } },
        { id: "6", name: "nano-pp", description: "Nano pp project.", stargazerCount: 0, forkCount: 0, primaryLanguage: { name: "HTML", color: "#e34c26" } },
      ]
    }
  };

  return (
    <Container>
      {error && (
        <ErrorBox style={{ marginBottom: '2rem' }}>
          <p><strong>Missing GitHub Token</strong></p>
          <p>Live sync is disabled. Showing cached profile data. To enable live sync, add `VITE_GITHUB_TOKEN` to your `.env` file.</p>
        </ErrorBox>
      )}

      <Header>
        <img src={user.avatarUrl} alt={user.name} />
        <div>
          <h2>{user.name || user.login}</h2>
          <div className="login">{user.login}</div>
          <p>{user.bio}</p>
        </div>
      </Header>
      
      <SectionTitle>Select a Repository to Run</SectionTitle>
      <RepoScroll>
        {user.repositories.nodes.map(repo => (
          <RepoCard 
            key={repo.id} 
            $active={selectedRepo === repo.name}
            onClick={() => setSelectedRepo(repo.name)}
          >
            <h3>{repo.name}</h3>
            <p>{repo.description || "No description provided."}</p>
            <div className="meta">
              {repo.primaryLanguage && (
                <span>
                  <span className="lang-color" style={{ backgroundColor: repo.primaryLanguage.color }}></span>
                  {repo.primaryLanguage.name}
                </span>
              )}
              <span>⭐ {repo.stargazerCount}</span>
              <span>🍴 {repo.forkCount}</span>
            </div>
          </RepoCard>
        ))}
      </RepoScroll>
      
      <div style={{ marginTop: '2rem' }}>
        <SectionTitle>In-Browser Code Execution</SectionTitle>
        <p style={{ fontSize: '0.875rem', color: '#8b949e', marginBottom: '1rem' }}>
          Running {selectedRepo} natively in your browser tab using WebContainers.
        </p>
        <WebContainerRunner key={selectedRepo} repoName={selectedRepo} />
      </div>
    </Container>
  );
};

const GitHubDashboard = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  
  // Create client dynamically
  const client = createClient({
    url: 'https://api.github.com/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      };
    },
  });

  return (
    <Provider value={client}>
      <DashboardContent username="ssureshkxmar" />
    </Provider>
  );
};

export default GitHubDashboard;
