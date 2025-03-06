"use client";

import { useState } from 'react';
import Card from '@mui/material/Card';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Tooltip, Typography } from '@mui/material';
import { ExpandLess } from '@mui/icons-material';

interface CollapsibleProps {
  sx?: object;
  title: string;
  children: React.ReactNode;
  onClickFunction?: () => void;
}

const Collapsible = ({ sx, title, children, onClickFunction }: CollapsibleProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    if (!expanded && onClickFunction) {
      onClickFunction();
    }
    setExpanded((prev) => !prev);
  };

  return (
    <>
    <Tooltip title={`${expanded ? 'Hide': 'Show'} ${title} Repositories.`}>
      <Card onClick={handleChange} sx={{ ...sx, cursor: 'pointer', width: '100%', padding: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 7 }}>
        <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        {expanded && <ExpandLess />}
        {!expanded && <ExpandMore />}
      </Card>
      </Tooltip>
      {expanded && children}
    </>
  );
};

export default Collapsible;
