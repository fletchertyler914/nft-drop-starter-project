import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

import mm from './assets/mm.png';
import sprayblue from './assets/sprayblue.png';
import tortuga from './assets/tortuga.png';
import spraybrown from './assets/spraybrown.png';

import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'firecrab_';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // Actions
  const isWalletConnected = () => {
    try {
      const { solana } = window;
      if (solana && solana.isPhantom) {
        console.log('Phantom Wallet Found: ', solana);
        const response = solana.connect({ onlyIfTrusted: true });
        if (response.publicKey) {
          console.log(
            'Connected with Public Key: ',
            response.publicKey.toString(),
            response
          );
          setWalletAddress(response.publicKey.toString());
          return;
        }
        return;
      }
      console.log('Phantom Wallet Not Found: ', solana);
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  // State
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  // Render the not connected button if the user has not connected it.
  const NotConnectedContainer = () => (
    <button
      className='cta-button connect-wallet-button'
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  // When our component first mounts, let's check to see if a Phantom Wallet is available.
  useEffect(() => {
    const onLoad = async () => {
      await isWalletConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className='App'>
      <div className='container'>
        <div className='header-container'>
          <img src={mm} alt='Glasshole' height={350} />
          <img src={sprayblue} alt='Glasshole' height={350} />
          <img src={tortuga} alt='Glasshole' height={350} />
          <img src={spraybrown} alt='Glasshole' height={350} />
          <p className='header'>Glasshole Glass: Season #1</p>
          <p className='sub-text'>Glasshole Gone NFT</p>
          {!walletAddress && <NotConnectedContainer />}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className='footer-container'>
          <img alt='Twitter Logo' className='twitter-logo' src={twitterLogo} />
          <a
            className='footer-text'
            href={TWITTER_LINK}
            target='_blank'
            rel='noreferrer'
          >{`built with ♥️ by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
