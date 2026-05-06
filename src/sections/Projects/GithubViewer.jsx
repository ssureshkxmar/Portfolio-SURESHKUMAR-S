import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ViewerContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 80vh;
  background: ${props => props.theme.body};
  color: ${props => props.theme.text};
  z-index: 200;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 48em) {
    width: 95vw;
    height: 90vh;
  }
`;

const Header = styled.div`
  padding: 1rem 2rem;
  background: rgba(0,0,0,0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255,255,255,0.1);

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
    color: #ef4444;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;

  @media (max-width: 48em) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 30%;
  border-right: 1px solid rgba(255,255,255,0.1);
  overflow-y: auto;
  padding: 1rem;
  background: rgba(0,0,0,0.1);

  @media (max-width: 48em) {
    width: 100%;
    height: 40%;
  }
`;

const CodeArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background: rgba(0,0,0,0.3);
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
  position: relative;
`;

const FileItem = styled.div`
  padding: 0.6rem 1rem;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  background: ${props => props.active ? 'rgba(255,255,255,0.1)' : 'transparent'};

  &:hover {
    background: rgba(255,255,255,0.05);
  }

  svg {
    margin-right: 0.8rem;
    opacity: 0.7;
  }
`;

const Breadcrumb = styled.div`
  padding: 0.5rem 2rem;
  font-size: 0.8rem;
  opacity: 0.6;
  background: rgba(0,0,0,0.05);
  cursor: pointer;

  span:hover {
    text-decoration: underline;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.5);
  z-index: 10;
`;

const GithubViewer = ({ repo, onClose }) => {
  const [currentPath, setCurrentPath] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFiles = async (path = '') => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to fetch repository contents');
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setFiles(data);
        setCurrentPath(path);
      } else {
        throw new Error('Invalid repository data received');
      }
    } catch (err) {
      console.error('Github Fetch Error:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  const fetchFileContent = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch file content');
      const text = await res.text();
      setCode(text);
    } catch (err) {
      console.error('File Fetch Error:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (repo) fetchFiles();
  }, [repo]);

  const handleItemClick = (item) => {
    if (item.type === 'dir') {
      fetchFiles(item.path);
    } else {
      setSelectedFile(item);
      fetchFileContent(item.download_url);
    }
  };

  const handleBack = () => {
    if (!currentPath) return;
    const parts = currentPath.split('/');
    parts.pop();
    fetchFiles(parts.join('/'));
  };

  return (
    <ViewerContainer
      initial={{ opacity: 0, scale: 0.9, y: 50, x: '-50%', y: '-50%' }}
      animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
      exit={{ opacity: 0, scale: 0.9, y: 50, x: '-50%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <Header>
        <h2>{repo}</h2>
        <CloseBtn onClick={onClose}>&times;</CloseBtn>
      </Header>

      <Breadcrumb onClick={handleBack}>
        <span style={{color: '#06b6d4'}}>root</span> {currentPath && ` / ${currentPath}`}
      </Breadcrumb>

      <Content>
        <Sidebar>
          {loading && !files.length ? (
             <div style={{textAlign: 'center', padding: '2rem'}}>Loading repository...</div>
          ) : error && !files.length ? (
             <div style={{color: '#ef4444', padding: '1rem', fontSize: '0.8rem'}}>
               Error: {error}
               <button onClick={() => fetchFiles(currentPath)} style={{display: 'block', marginTop: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer'}}>Retry</button>
             </div>
          ) : (
            files.map(file => (
              <FileItem
                key={file.sha}
                active={selectedFile?.sha === file.sha}
                onClick={() => handleItemClick(file)}
              >
                {file.type === 'dir' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                )}
                {file.name}
              </FileItem>
            ))
          )}
        </Sidebar>

        <CodeArea>
          {loading && files.length > 0 && <LoadingOverlay>Loading file...</LoadingOverlay>}
          {error && files.length > 0 && <div style={{color: '#ef4444', padding: '1rem'}}>{error}</div>}
          {selectedFile ? (
            <pre style={{margin: 0}}><code style={{whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>{code}</code></pre>
          ) : (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.4}}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{marginBottom: '1rem'}}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
              Select a file to view code
            </div>
          )}
        </CodeArea>
      </Content>
    </ViewerContainer>
  );
};

export default GithubViewer;
