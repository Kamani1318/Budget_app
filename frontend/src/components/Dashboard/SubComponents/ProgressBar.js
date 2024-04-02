import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';

export default function ProgressBar(props) {
    const {progress} = props;

  return (
    <Tooltip 
      title={`${progress}%`} 
      PopperProps={{
        popperOptions: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -10], // move the tooltip 10px up
              },
            },
          ],
        },
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          '& .MuiLinearProgress-barColorPrimary': {
            backgroundColor: '#19B5D1',
          },
          '& .MuiLinearProgress-colorPrimary': {
            backgroundColor: 'white',
          },
        }}
      />
    </Tooltip>
  );
}