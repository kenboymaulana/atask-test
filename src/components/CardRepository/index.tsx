import { Star } from '@mui/icons-material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

interface CardProps {
  sx: object | null;
  title: string;
  description: string;
  stargazers_count: number;
}

const CardRepository = ({ sx={}, title, description, stargazers_count }: CardProps) => {
  return (
    <Card sx={{ ...sx, padding: 1, pl: 1 }}>
        <div style={{ float: 'right', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" component="div" sx={{ fontWeight: 'bold', fontSize: 14 }}>
                {stargazers_count}
            </Typography>
            <Star sx={{ color: 'grey.800', fontSize: 18, mt: -0.1, ml: 0.3 }} />
        </div>
        <Typography variant="body2" component="div" sx={{ fontWeight: 'bold', fontSize: 16 }}>
          {title}
        </Typography>
        <Typography variant="body2" component="p" sx={{ color: 'grey.800', width: '90%', textAlign: 'justify' }}>
          {description}
        </Typography>
    </Card>
  );
};

export default CardRepository;
