import { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  Box,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
  alpha,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment,
  LocalHospital,
  Calculate,
  Event,
  ArrowForwardIos,
  Menu as MenuLinesIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  onFindCareClick: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 64;

const Sidebar = ({ onFindCareClick, mobileOpen = false, onMobileClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // For mobile: show all items
  // For desktop: only show Find Care, Appointments, Calculator (Dashboard & Actions in header)
  const allMenuItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      color: '#1976d2',
      special: false,
    },
    {
      path: '/actions',
      label: 'Actions',
      icon: <Assignment />,
      color: '#ed6c02',
      special: false,
    },
    {
      path: '/find-care',
      label: 'Find Care',
      icon: <LocalHospital />,
      color: '#2e7d32',
      special: true,
    },
    {
      path: '/my-appointments',
      label: 'My Appointments',
      icon: <Event />,
      color: '#9c27b0',
      special: false,
    },
    {
      path: '/coverage-calculator',
      label: 'Coverage Calculator',
      icon: <Calculate />,
      color: '#d32f2f',
      special: false,
    },
  ];

  const menuItems = isMobile ? allMenuItems : allMenuItems.slice(2); // Desktop: skip Dashboard & Actions

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.special) {
      onFindCareClick();
    } else {
      navigate(item.path);
    }
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Collapse Button (Desktop only) */}
      {!isMobile && (
        <Box
          sx={{
            p: 1.5,
            display: 'flex',
            justifyContent: collapsed ? 'center' : 'flex-end',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            onClick={() => setCollapsed(!collapsed)}
            sx={{
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 1.5,
              cursor: 'pointer',
              transition: 'all 0.2s',
              bgcolor: alpha(theme.palette.primary.main, 0.05),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.15),
                transform: 'scale(1.05)',
              },
            }}
          >
            <MenuLinesIcon sx={{ fontSize: 22, color: 'primary.main' }} />
          </Box>
        </Box>
      )}

      {/* Menu Items */}
      <List sx={{ flex: 1, p: collapsed ? 1 : 2 }}>
        {menuItems.map((item, index) => (
          <ListItemButton
            key={item.path}
            onClick={() => handleItemClick(item)}
            sx={{
              mb: 1.5,
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              bgcolor: isActive(item.path) ? alpha(item.color, 0.1) : 'transparent',
              border: '1px solid',
              borderColor: isActive(item.path) ? item.color : 'transparent',
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 0 : 2,
              '&:hover': {
                bgcolor: alpha(item.color, 0.08),
                transform: collapsed ? 'scale(1.05)' : 'translateX(4px)',
                borderColor: alpha(item.color, 0.3),
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 4,
                bgcolor: item.color,
                opacity: isActive(item.path) ? 1 : 0,
                transition: 'opacity 0.3s',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                width: '100%',
                py: 1,
              }}
            >
              {/* Icon Container */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  bgcolor: isActive(item.path) ? item.color : alpha(item.color, 0.1),
                  color: isActive(item.path) ? 'white' : item.color,
                  transition: 'all 0.3s',
                  '& svg': {
                    fontSize: 20,
                  },
                }}
              >
                {item.icon}
              </Box>

              {/* Label - Hidden when collapsed */}
              {!collapsed && (
                <>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      fontWeight={isActive(item.path) ? 700 : 600}
                      sx={{
                        color: isActive(item.path) ? item.color : 'text.primary',
                        transition: 'all 0.3s',
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>

                  {/* Arrow Indicator */}
                  <ArrowForwardIos
                    sx={{
                      fontSize: 14,
                      color: item.color,
                      opacity: isActive(item.path) ? 1 : 0,
                      transition: 'opacity 0.3s',
                    }}
                  />
                </>
              )}
            </Box>
          </ListItemButton>
        ))}
      </List>

      {/* Footer - Hidden when collapsed */}
      {!collapsed && (
        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: alpha(theme.palette.primary.main, 0.02),
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              border: '1px dashed',
              borderColor: theme.palette.primary.main,
            }}
          >
            <Typography variant="caption" fontWeight={600} color="primary" display="block" gutterBottom>
              Need Help?
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Contact our support team for assistance
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            backgroundImage: 'none',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            backgroundImage: 'none',
            top: 64,
            height: 'calc(100vh - 64px)',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
