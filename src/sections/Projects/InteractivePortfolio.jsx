import React, { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import SearchBar from './SearchBar';
import SegmentedControl from './SegmentedControl';
import ProfileHeader from './ProfileHeader';
import RepoGridView from './RepoGridView';
import GalleryView from './GalleryView';
import FileExplorer from './FileExplorer';
import CodeInspectorView from './CodeInspectorView';

const PortfolioContainer = styled.div`
  width: 95vw;
  max-width: 1400px;
  margin: 0 auto;
  color: #c9d1d9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  min-height: 80vh;
  padding-top: 2rem;
  position: relative;
`;

const Workspace = styled(motion.div)`
  display: flex;
  height: 85vh;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  background: rgba(13, 17, 23, 0.6);
  backdrop-filter: blur(20px);
  
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const InteractivePortfolio = () => {
  const [activeTab, setActiveTab] = useState('repos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedAppRepo, setSelectedAppRepo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (fileItem, repoName) => {
    setSelectedFile(fileItem);
  };

  const mainTabs = [
    { id: 'repos', label: 'Repositories' },
    { id: 'products', label: 'Products' }
  ];

  return (
    <PortfolioContainer>
      {!selectedAppRepo && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <SegmentedControl 
            activeView={activeTab} 
            setActiveView={setActiveTab} 
            tabs={mainTabs} 
          />
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </motion.div>
      )}
      
      <AnimatePresence mode="wait">
        {selectedAppRepo ? (
          <motion.div
            key="workspace-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            <Workspace>
              <FileExplorer 
                repoName={selectedAppRepo} 
                onFileSelect={handleFileSelect} 
                onBack={() => { setSelectedAppRepo(null); setSelectedFile(null); }} 
              />
              <CodeInspectorView 
                selectedFile={selectedFile}
                repoName={selectedAppRepo}
              />
            </Workspace>
          </motion.div>
        ) : (
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'repos' ? (
              <RepoGridView searchQuery={searchQuery} onSelectRepo={setSelectedAppRepo} />
            ) : (
              <GalleryView />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PortfolioContainer>
  );
};

export default InteractivePortfolio;
