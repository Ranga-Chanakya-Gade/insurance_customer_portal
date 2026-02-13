import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { Close, PlayCircleOutline, Description } from '@mui/icons-material';
import { useState } from 'react';

interface AnnouncementBannerProps {
  message: string;
  ctaButtons?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: 'text' | 'outlined' | 'contained';
  }>;
  onDismiss?: () => void;
}

const AnnouncementBanner = ({ message, ctaButtons, onDismiss }: AnnouncementBannerProps) => {
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (isDismissed) {
    return null;
  }

  return (
    <Box
      sx={{
        bgcolor: '#1976d2',
        color: 'white',
        py: 1.5,
        position: 'relative',
        borderBottom: '2px solid',
        borderColor: 'primary.dark',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 0 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              {message}
            </Typography>
          </Box>

          {ctaButtons && ctaButtons.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              {ctaButtons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant || 'outlined'}
                  size="small"
                  startIcon={button.icon}
                  onClick={button.onClick}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  {button.label}
                </Button>
              ))}
            </Box>
          )}

          {onDismiss && (
            <IconButton
              size="small"
              onClick={handleDismiss}
              sx={{
                color: 'white',
                ml: 1,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
              aria-label="Dismiss announcement"
            >
              <Close fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default AnnouncementBanner;

// Pre-configured Annual Enrollment Banner
export const AnnualEnrollmentBanner = ({
  onViewPolicy,
  onWatchVideo,
  onDismiss,
}: {
  onViewPolicy: () => void;
  onWatchVideo: () => void;
  onDismiss?: () => void;
}) => {
  return (
    <AnnouncementBanner
      message="🎉 Annual Enrollment is now open!"
      ctaButtons={[
        {
          label: 'View Your Policy',
          icon: <Description fontSize="small" />,
          onClick: onViewPolicy,
          variant: 'outlined',
        },
        {
          label: 'Watch Video',
          icon: <PlayCircleOutline fontSize="small" />,
          onClick: onWatchVideo,
          variant: 'outlined',
        },
      ]}
      onDismiss={onDismiss}
    />
  );
};
