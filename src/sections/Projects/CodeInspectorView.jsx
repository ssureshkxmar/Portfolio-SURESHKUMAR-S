import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Play, X, Terminal, Code2 } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AnimatePresence, motion } from 'framer-motion';
import WebContainerRunner from './WebContainerRunner';

const InspectorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(13, 17, 23, 0.8);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(22, 27, 34, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  .file-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #c9d1d9;
    font-size: 0.9rem;
  }
`;

const RunButton = styled(motion.button)`
  background: rgba(35, 134, 54, 0.1);
  border: 1px solid rgba(35, 134, 54, 0.4);
  color: #3fb950;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 10px rgba(35, 134, 54, 0.2);

  &:hover {
    background: rgba(35, 134, 54, 0.2);
    box-shadow: 0 0 15px rgba(35, 134, 54, 0.4);
  }

  .pulse {
    width: 8px;
    height: 8px;
    background: #3fb950;
    border-radius: 50%;
    box-shadow: 0 0 10px #3fb950;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(63, 185, 80, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(63, 185, 80, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(63, 185, 80, 0); }
  }
`;

const CloseOutputButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #ef4444;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: rgba(239, 68, 68, 0.2);
  }
`;

const CodeArea = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
  
  pre {
    margin: 0 !important;
    border-radius: 0 !important;
    background: transparent !important;
  }
`;

const OutputArea = styled(motion.div)`
  flex: 1;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HowToRunPanel = styled.div`
  background: rgba(22, 27, 34, 0.8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #c9d1d9;
    font-size: 1rem;
    margin: 0 0 1rem 0;
  }

  .commands {
    background: #0d1117;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    font-family: monospace;
    color: #8b949e;
    font-size: 0.85rem;
    
    div { margin-bottom: 0.5rem; }
    div:last-child { margin-bottom: 0; }
    span { color: #58a6ff; }
  }
`;

const CodeInspectorView = ({ selectedFile, repoName, username = 'ssureshkxmar' }) => {
  const [code, setCode] = useState('');
  const [mediaUrl, setMediaUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [runState, setRunState] = useState('idle'); // idle | output

  useEffect(() => {
    const fetchCode = async () => {
      if (!selectedFile || !repoName) return;
      setLoading(true);
      setMediaUrl(null);
      setCode('');
      
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/${selectedFile.path}`, { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.content) {
            const isImage = /\.(png|jpe?g|gif|webp|ico|svg)$/i.test(selectedFile.path);
            const isVideo = /\.(mp4|webm|ogg)$/i.test(selectedFile.path);

            if (isImage || isVideo) {
              const ext = selectedFile.path.split('.').pop().toLowerCase();
              const mimeType = isImage ? `image/${ext === 'svg' ? 'svg+xml' : ext}` : `video/${ext}`;
              setMediaUrl(`data:${mimeType};base64,${data.content.replace(/\n/g, '')}`);
            } else {
              const binaryContent = atob(data.content.replace(/\s/g, ''));
              const bytes = new Uint8Array(binaryContent.length);
              for (let i = 0; i < binaryContent.length; i++) {
                bytes[i] = binaryContent.charCodeAt(i);
              }
              setCode(new TextDecoder('utf-8').decode(bytes));
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCode();
  }, [selectedFile, repoName, username]);

  const getLanguage = (filename) => {
    if (!filename) return 'javascript';
    const ext = filename.split('.').pop().toLowerCase();
    const map = {
      'js': 'javascript', 'jsx': 'jsx', 'ts': 'typescript', 'tsx': 'tsx',
      'py': 'python', 'json': 'json', 'html': 'html', 'css': 'css', 'md': 'markdown'
    };
    return map[ext] || 'javascript';
  };

  const handleRunClick = () => {
    setRunState('output');
  };

  return (
    <InspectorContainer>
      <Header>
        <div className="file-info">
          {runState === 'output' ? (
            <span style={{ color: '#58a6ff' }}>
              <div className="dot" style={{ display: 'inline-block', width: 8, height: 8, background: '#58a6ff', borderRadius: '50%', marginRight: 8 }} />
              Live Preview: {repoName}
            </span>
          ) : (
            <>
              <Code2 size={16} color="#8b949e" />
              {selectedFile ? selectedFile.path : 'Select a file to view code'}
            </>
          )}
        </div>
        
        {repoName && runState !== 'output' && (
          <RunButton 
            onClick={handleRunClick}
            whileTap={{ scale: 0.95 }}
          >
            <div className="pulse" />
            <Play size={14} /> Run Application
          </RunButton>
        )}

        {runState === 'output' && (
          <CloseOutputButton onClick={() => setRunState('idle')}>
            <X size={14} /> Close Output
          </CloseOutputButton>
        )}
      </Header>
      
      {runState === 'output' ? (
        <OutputArea initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <WebContainerRunner repoName={repoName} username={username} />
        </OutputArea>
      ) : (
        <>
          <CodeArea>
            {loading ? (
              <div style={{ padding: '2rem', color: '#8b949e' }}>Loading file contents...</div>
            ) : mediaUrl ? (
              <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', background: '#0d1117' }}>
                {/\.(mp4|webm|ogg)$/i.test(selectedFile?.path) ? (
                  <video src={mediaUrl} controls style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '8px' }} />
                ) : (
                  <img src={mediaUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' }} />
                )}
              </div>
            ) : (
              <SyntaxHighlighter
                language={getLanguage(selectedFile?.path)}
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{ padding: '1.5rem', fontSize: '0.85rem' }}
              >
                {code || '// No file selected or file is empty'}
              </SyntaxHighlighter>
            )}
          </CodeArea>
          
          <HowToRunPanel>
            <h3><Terminal size={16} /> How to Run</h3>
            <div className="commands">
              <div>$ <span>git clone</span> https://github.com/{username}/{repoName}.git</div>
              <div>$ <span>cd</span> {repoName}</div>
              <div>$ <span>npm</span> install</div>
              <div>$ <span>npm</span> run dev</div>
            </div>
          </HowToRunPanel>
        </>
      )}
    </InspectorContainer>
  );
};

export default CodeInspectorView;
