import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 199;
`;

const ViewerContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85vw;
  height: 85vh;
  background: rgba(32, 32, 32, 0.8);
  color: #fff;
  z-index: 200;
  border-radius: 24px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  font-family: 'Inter', sans-serif;

  @media (max-width: 48em) {
    width: 95vw;
    height: 90vh;
    border-radius: 16px;
  }
`;

const Header = styled.div`
  padding: 1.2rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .repo-info {
    display: flex;
    align-items: center;
    gap: 10px;

    svg {
      color: ${props => props.accentColor || '#06b6d4'};
    }

    h2 {
      font-size: 1.1rem;
      font-weight: 500;
      letter-spacing: 0.5px;
      margin: 0;
      opacity: 0.9;
    }
  }
`;

const CloseBtn = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ef4444;
    border-color: #ef4444;
    transform: rotate(90deg);
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
  width: 280px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  overflow-y: auto;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  @media (max-width: 48em) {
    width: 100%;
    height: 35%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const CodeArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
  background: rgba(0, 0, 0, 0.4);
  position: relative;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
`;

const CodeHeader = styled.div`
  position: sticky;
  top: 0;
  background: rgba(20, 20, 20, 0.9);
  backdrop-filter: blur(5px);
  padding: 0.8rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
`;

const CodeContent = styled.pre`
  margin: 0;
  padding: 2rem;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #e0e0e0;
  tab-size: 4;

  code {
    white-space: pre;
    display: block;
  }
`;

const FileItem = styled.div`
  padding: 0.7rem 1rem;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: ${props => props.active ? 'rgba(6, 182, 212, 0.15)' : 'transparent'};
  border: 1px solid ${props => props.active ? 'rgba(6, 182, 212, 0.3)' : 'transparent'};

  &:hover {
    background: ${props => props.active ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
    transform: translateX(4px);
  }

  span {
    font-size: 0.85rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: ${props => props.active ? 1 : 0.8};
  }

  svg {
    margin-right: 0.8rem;
    flex-shrink: 0;
  }
`;

const Breadcrumb = styled.div`
  padding: 0.8rem 2rem;
  font-size: 0.8rem;
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.5);

  .path-part {
    cursor: pointer;
    transition: color 0.2s;
    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }

  .root {
    color: #06b6d4;
    font-weight: 600;
  }
`;

const LoadingSpinner = styled.div`
  width: 30px;
  height: 30px;
  border: 2px solid rgba(6, 182, 212, 0.1);
  border-top: 2px solid #06b6d4;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const CenterBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  opacity: 0.6;
  text-align: center;
  padding: 2rem;
`;

const ErrorMsg = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #f87171;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 400px;
  text-align: center;

  button {
    margin-top: 1rem;
    background: #ef4444;
    color: #fff;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const GithubViewer = ({ repo, onClose }) => {
  const [currentPath, setCurrentPath] = useState('');
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('github_pat') || '');

  const getHeaders = () => {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    return headers;
  };

  const fetchFiles = async (path = '') => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
        headers: getHeaders()
      });
      
      if (!res.ok) {
        const errData = await res.json();
        if (res.status === 403 && errData.message.includes('rate limit')) {
          throw new Error('API Rate Limit Exceeded. Please add a Personal Access Token in settings.');
        }
        throw new Error(errData.message || 'Repository not found or private');
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setFiles(data.sort((a, b) => (b.type === 'dir') - (a.type === 'dir')));
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

  const fetchFileContent = async (item) => {
    setLoading(true);
    setError(null);
    try {
      // Use the API URL instead of download_url to ensure headers (like Token) work correctly
      const res = await fetch(item.url, {
        headers: getHeaders()
      });
      
      if (!res.ok) throw new Error('Failed to fetch file content');
      
      const data = await res.json();
      
      if (data.content) {
        // GitHub API returns content as Base64. We need to decode it.
        // Handling multi-byte characters (UTF-8) correctly
        const binaryContent = atob(data.content.replace(/\s/g, ''));
        const bytes = new Uint8Array(binaryContent.length);
        for (let i = 0; i < binaryContent.length; i++) {
          bytes[i] = binaryContent.charCodeAt(i);
        }
        const decodedContent = new TextDecoder('utf-8').decode(bytes);
        setCode(decodedContent);
      } else {
        throw new Error('This file appears to be empty or too large to preview.');
      }
    } catch (err) {
      console.error('File Fetch Error:', err);
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSaveToken = (e) => {
    e.preventDefault();
    localStorage.setItem('github_pat', token);
    setShowTokenInput(false);
    fetchFiles(currentPath);
  };

  useEffect(() => {
    if (repo) fetchFiles();
  }, [repo]);

  const handleItemClick = (item) => {
    if (item.type === 'dir') {
      fetchFiles(item.path);
    } else {
      setSelectedFile(item);
      fetchFileContent(item);
    }
  };

  const navigateToPath = (path) => {
    fetchFiles(path);
  };

  return (
    <>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <ViewerContainer
        initial={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }}
        animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
        exit={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <Header>
          <div className="repo-info">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <h2>{repo}</h2>
            {token && <span style={{fontSize: '0.7rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '10px'}}>Authenticated</span>}
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
            <CloseBtn onClick={() => setShowTokenInput(!showTokenInput)} style={{background: showTokenInput ? '#06b6d4' : 'rgba(255, 255, 255, 0.05)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </CloseBtn>
            <CloseBtn onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </CloseBtn>
          </div>
        </Header>

        <AnimatePresence>
          {showTokenInput && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ background: 'rgba(6, 182, 212, 0.1)', borderBottom: '1px solid rgba(6, 182, 212, 0.2)', overflow: 'hidden' }}
            >
              <form onSubmit={handleSaveToken} style={{ padding: '1rem 2rem', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 5px 0', fontSize: '0.75rem', opacity: 0.7 }}>GitHub Personal Access Token (for rate limits & private repos)</p>
                  <input 
                    type="password" 
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxx"
                    style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}
                  />
                </div>
                <button type="submit" style={{ alignSelf: 'flex-end', background: '#06b6d4', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>Save</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <Breadcrumb>
          <span className="path-part root" onClick={() => navigateToPath('')}>root</span>
          {currentPath.split('/').filter(Boolean).map((part, index, array) => (
            <React.Fragment key={part}>
              <span>/</span>
              <span 
                className="path-part" 
                onClick={() => navigateToPath(array.slice(0, index + 1).join('/'))}
              >
                {part}
              </span>
            </React.Fragment>
          ))}
        </Breadcrumb>

        <Content>
          <Sidebar>
            {loading && !files.length ? (
               <CenterBox><LoadingSpinner /><p>Indexing...</p></CenterBox>
            ) : error && !files.length ? (
               <CenterBox>
                 <ErrorMsg>
                   <p>{error}</p>
                   {error.includes('Rate Limit') && <button onClick={() => setShowTokenInput(true)} style={{background: '#06b6d4'}}>Add Token</button>}
                   <button onClick={() => fetchFiles('')}>Retry Connection</button>
                 </ErrorMsg>
               </CenterBox>
            ) : (
              files.map(file => (
                <FileItem
                  key={file.sha}
                  active={selectedFile?.sha === file.sha}
                  onClick={() => handleItemClick(file)}
                >
                  {file.type === 'dir' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                  )}
                  <span>{file.name}</span>
                </FileItem>
              ))
            )}
          </Sidebar>

          <CodeArea>
            {loading && files.length > 0 && (
              <div style={{position: 'absolute', top: '1rem', right: '1rem'}}><LoadingSpinner /></div>
            )}
            {selectedFile ? (
              <>
                <CodeHeader>
                  <span>{selectedFile.path}</span>
                  <span>{selectedFile.type === 'file' && !['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'mp4', 'webm', 'ogg'].some(ext => selectedFile.name.toLowerCase().endsWith(ext)) ? `${code.split('\n').length} lines` : 'Media Preview'}</span>
                </CodeHeader>
                <div style={{height: 'calc(100% - 40px)', overflow: 'auto'}}>
                  {(() => {
                    const name = selectedFile.name.toLowerCase();
                    if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].some(ext => name.endsWith(ext))) {
                      return (
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%', padding: '2rem'}}>
                          <img 
                            src={selectedFile.download_url} 
                            alt={selectedFile.name} 
                            style={{maxWidth: '100%', maxHeight: '70vh', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'}} 
                          />
                        </div>
                      );
                    }
                    if (['mp4', 'webm', 'ogg'].some(ext => name.endsWith(ext))) {
                      return (
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100%', padding: '2rem'}}>
                          <video 
                            src={selectedFile.download_url} 
                            controls 
                            style={{maxWidth: '100%', maxHeight: '70vh', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'}} 
                          />
                        </div>
                      );
                    }
                    return (
                      <CodeContent>
                        <code>{code}</code>
                      </CodeContent>
                    );
                  })()}
                </div>
              </>
            ) : (
              <CenterBox>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{opacity: 0.2}}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                <p>Select a file to explore the codebase</p>
              </CenterBox>
            )}
          </CodeArea>
        </Content>
      </ViewerContainer>
    </>
  );
};

export default GithubViewer;

