import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { WebContainer } from '@webcontainer/api';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { fetchGitHubRepoTree } from '../../utils/githubLoader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: #ffffff;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const PreviewContainer = styled.div`
  flex: 1;
  background: #ffffff;
  position: relative;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const TerminalContainer = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
`;

const StatusOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  z-index: 10;
`;

let webcontainerInstance = null;

const WebContainerRunner = ({ repoName = 'profilo', username = 'ssureshkxmar' }) => {
  const terminalRef = useRef(null);
  const [status, setStatus] = useState('Booting Interactive Container...');
  const [url, setUrl] = useState('');

  useEffect(() => {
    let fitAddon;
    let terminal;
    let isMounted = true;

    const init = async () => {
      // 1. Setup Terminal
      terminal = new Terminal({
        convertEol: true,
        theme: { background: '#1e1e1e' },
        fontSize: 12,
        fontFamily: 'monospace'
      });
      fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);
      terminal.open(terminalRef.current);
      fitAddon.fit();

      try {
        // 2. Boot WebContainer
        if (!webcontainerInstance) {
          webcontainerInstance = await WebContainer.boot();
        }
        terminal.writeln('WebContainer booted successfully.');
        setStatus(`Fetching repository data for ${repoName}...`);

        // 3. Fetch GitHub Repo
        const repoTree = await fetchGitHubRepoTree(username, repoName, 'main');
        terminal.writeln('Repository fetched successfully from GitHub API.');
        setStatus('Mounting filesystem...');

        // 4. Mount Files
        await webcontainerInstance.mount(repoTree);
        terminal.writeln('Files mounted to container virtual filesystem.');

        const hasPackageJson = 'package.json' in repoTree;

        if (hasPackageJson) {
          setStatus('Installing dependencies...');
          terminal.writeln('Detected package.json. Installing dependencies...');
          const installProcess = await webcontainerInstance.spawn('npm', ['install']);
          installProcess.output.pipeTo(new WritableStream({
            write(data) { terminal.write(data); }
          }));

          const installExitCode = await installProcess.exit;
          if (installExitCode !== 0) {
            terminal.writeln('Installation failed. You might need to check package.json or node version.');
            setStatus('Installation Failed');
            return;
          }

          terminal.writeln('Dependencies installed. Starting server...');
          setStatus('Starting Dev Server...');

          const startProcess = await webcontainerInstance.spawn('npm', ['run', 'dev']);
          startProcess.output.pipeTo(new WritableStream({
            write(data) { terminal.write(data); }
          }));
        } else {
          setStatus('Starting Static Server...');
          terminal.writeln('No package.json found. Serving static files with npx serve...');
          const serveProcess = await webcontainerInstance.spawn('npx', ['-y', 'serve', '.']);
          serveProcess.output.pipeTo(new WritableStream({
            write(data) { terminal.write(data); }
          }));
        }

        webcontainerInstance.on('server-ready', (port, previewUrl) => {
          terminal.writeln(`\r\nServer ready on port ${port}`);
          if (isMounted) {
            setUrl(previewUrl);
            setStatus('');
          }
        });

      } catch (err) {
        terminal.writeln(`\r\nError: ${err.message}`);
        setStatus(`Error: ${err.message}`);
      }
    };

    init();

    const handleResize = () => {
      if (fitAddon) fitAddon.fit();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      if (terminal) terminal.dispose();
      
      // Cleanup running processes if any (optional, WebContainer instance persists)
      // webcontainerInstance.teardown() is available in newer API versions but keeping it simple here
    };
  }, [repoName, username]);

  return (
    <Container>
      <Content>
        <PreviewContainer>
          {status && (
            <StatusOverlay>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg className="spin" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                    <line x1="12" y1="2" x2="12" y2="6"></line>
                    <line x1="12" y1="18" x2="12" y2="22"></line>
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                    <line x1="2" y1="12" x2="6" y2="12"></line>
                    <line x1="18" y1="12" x2="22" y2="12"></line>
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                  </svg>
                  {status}
                </div>
              </div>
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </StatusOverlay>
          )}
          {url && <iframe src={url} title="Preview" />}
        </PreviewContainer>
        <TerminalContainer ref={terminalRef} />
      </Content>
    </Container>
  );
};

export default WebContainerRunner;
