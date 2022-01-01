import { CssBaseline, Typography } from '@mui/material';
import * as React from 'react';

interface IHeroSectionProps {
  tagline: string;
  coverUrl: string;
}

const HeroSection: React.FC<IHeroSectionProps> = ({
  tagline, coverUrl
}) => {
  return (
    <div style={{ 
        height: '100vh',
        minHeight: '560px',
        // backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundImage: `url(${coverUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center', 
        display: 'flex', flexWrap: 'wrap', flexDirection: "column", justifyContent: 'center'
      }}>
      <CssBaseline />
      <div style={{ 
        width: "100%", height: "100%", 
        position: 'absolute', left: 0, top: 0,
        display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center'}}>
        <div style={{
            margin: "150px",
            display: "flex", flexWrap: 'nowrap',
            bottom: '0', left: '0', position: 'absolute', 
            backgroundColor: "white"
          }}>
          <Typography variant="h1" sx={{ 
              fontWeight: "bold", 
              textAlign: "left",
            }}>
            {/* Lorem ipsum dolor sit amet */}
            {tagline}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;