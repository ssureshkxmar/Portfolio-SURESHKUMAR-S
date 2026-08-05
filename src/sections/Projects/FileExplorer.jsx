import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Folder, FileCode, ChevronRight, GitBranch } from 'lucide-react';

const ExplorerContainer = styled.div`
  width: 300px;
  background: rgba(22, 27, 34, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (max-width: 900px) {
    width: 100%;
    height: 35%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const SectionHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.85rem;
  font-weight: 600;
  color: #8b949e;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
`;

const RepoItem = styled.div`
  padding: 0.6rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.$active ? '#58a6ff' : '#c9d1d9'};
  background: ${props => props.$active ? 'rgba(88, 166, 255, 0.1)' : 'transparent'};
  border-left: 3px solid ${props => props.$active ? '#58a6ff' : 'transparent'};
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .name {
    flex: 1;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const TreeItem = styled.div`
  padding: 0.4rem 1rem 0.4rem ${props => 1 + (props.$depth * 1)}rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.$active ? '#58a6ff' : '#c9d1d9'};
  background: ${props => props.$active ? 'rgba(88, 166, 255, 0.1)' : 'transparent'};
  font-size: 0.85rem;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const FileExplorer = ({ username = 'ssureshkxmar', repoName, onFileSelect, onBack }) => {
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [selectedPath, setSelectedPath] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      if (!repoName) return;
      setLoading(true);
      setTree([]);
      setExpandedFolders(new Set());
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        // First get default branch
        const repoRes = await fetch(`https://api.github.com/repos/${username}/${repoName}`, { headers });
        if (!repoRes.ok) throw new Error("Failed to fetch repo");
        const repoData = await repoRes.json();
        
        const res = await fetch(`https://api.github.com/repos/${username}/${repoName}/git/trees/${repoData.default_branch}?recursive=1`, { headers });
        if (res.ok) {
          const data = await res.json();
          setTree(data.tree || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTree();
  }, [repoName, username]);

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileSelect = (item) => {
    setSelectedPath(item.path);
    onFileSelect(item, repoName);
  };

  const renderTree = () => {
    const sorted = [...tree].sort((a, b) => {
      if (a.type === b.type) return a.path.localeCompare(b.path);
      return a.type === 'tree' ? -1 : 1;
    });

    return sorted.map((item) => {
      const parts = item.path.split('/');
      const depth = parts.length - 1;
      const name = parts[parts.length - 1];
      const parentPath = parts.slice(0, -1).join('/');

      if (depth > 0 && !expandedFolders.has(parentPath)) return null;

      if (item.type === 'tree') {
        const isExpanded = expandedFolders.has(item.path);
        return (
          <TreeItem key={item.path} $depth={depth} onClick={() => toggleFolder(item.path)}>
            <ChevronRight size={14} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
            <Folder size={14} color="#8b949e" />
            {name}
          </TreeItem>
        );
      }

      return (
        <TreeItem 
          key={item.path} 
          $depth={depth} 
          $active={selectedPath === item.path}
          onClick={() => handleFileSelect(item)}
        >
          <FileCode size={14} color="#58a6ff" />
          {name}
        </TreeItem>
      );
    });
  };

  return (
    <ExplorerContainer>
      <div 
        style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#8b949e', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.1)' }}
        onClick={onBack}
      >
        <ChevronRight size={14} style={{ transform: 'rotate(180deg)' }} /> Back to Repos
      </div>
      <SectionHeader>
        <GitBranch size={16} />
        {repoName.toUpperCase()}
      </SectionHeader>
      
      <ListContainer>
        {loading ? <div style={{ padding: '1rem', color: '#8b949e' }}>Loading workspace...</div> : renderTree()}
      </ListContainer>
    </ExplorerContainer>
  );
};

export default FileExplorer;
