import React, { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Badge,
  Chip,
  ClickAwayListener,
  Fade,
  Grid,
  Paper,
  Popper,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  Typography,
  ListItemButton
} from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// assets
import QueryBuilderTwoToneIcon from '@mui/icons-material/QueryBuilderTwoTone';
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import { set } from 'date-fns';

// ==============================|| NOTIFICATION SECTION ||============================== //

const NotificationSection = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const anchorRef = React.useRef(null);
  const [messageList, setMessageList] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token = localStorage.getItem('auth-token');

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
    // Reset unread messages count to 0 when the notification icon is clicked
    if (!open) setUnreadCount(0);
  };

  useEffect(() => {
    const fetchMessageList = async () => {
      try {
        const res = await axios.get(`${BASE_URL}notification/get-notification-messages`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        setMessageList(res.data.data);
        // Set unread messages count based on fetched messages
        setUnreadCount(res.data.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessageList();

    return () => {
       setMessageList([])
    }
  }, []);

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        sx={{
          minWidth: { sm: 50, xs: 35 }
        }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        aria-label="Notification"
        onClick={handleToggle}
        color="inherit"
      >
        <Badge
          badgeContent={unreadCount}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: 'red', // Use any color value you prefer
              color: 'white' // Sets the text color inside the badge, if needed
            }
          }}
        >
          <NotificationsNoneTwoToneIcon sx={{ fontSize: '1.5rem' }} />
        </Badge>
      </Button>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 10]
            }
          },
          {
            name: 'preventOverflow',
            options: {
              altAxis: true // false by default
            }
          }
        ]}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 350,
                    minWidth: 250,
                    backgroundColor: theme.palette.background.paper,
                    pb: 0,
                    borderRadius: '10px'
                  }}
                >
                  <PerfectScrollbar style={{ height: 320, overflowX: 'hidden' }}>
                    {messageList.length > 0 ? (
                      messageList.map(message => {
                        return (
                          <ListItemButton key={message._id} sx={{ pt: 0 }}>
                            <ListItemText
                              primary={<Typography variant="subtitle1">{message.title}</Typography>}
                              secondary={<Typography variant="subtitle2">{message.body}</Typography>}
                            />
                            <ListItemSecondaryAction sx={{ top: 22 }}>
                              <Grid container justifyContent="flex-end">
                                <Grid item>
                                  <QueryBuilderTwoToneIcon
                                    sx={{
                                      fontSize: '0.75rem',
                                      mr: 0.5,
                                      color: theme.palette.grey[400]
                                    }}
                                  />
                                </Grid>
                                <Grid item>
                                  <Typography variant="caption" display="block" gutterBottom sx={{ color: theme.palette.grey[400] }}>
                                    now
                                  </Typography>
                                </Grid>
                              </Grid>
                            </ListItemSecondaryAction>
                          </ListItemButton>
                        );
                      })
                    ) : (
                      <Typography textAlign={'center'} variant="body1">
                        No message available
                      </Typography>
                    )}
                  </PerfectScrollbar>
                </List>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;
