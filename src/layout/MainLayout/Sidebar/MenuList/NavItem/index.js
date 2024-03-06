import PropTypes from 'prop-types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import * as actionTypes from 'store/actions';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const dispatch = useDispatch();
  const location = useLocation();
  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon color="inherit" /> : <ArrowForwardIcon color="inherit" fontSize={level > 0 ? 'inherit' : 'default'} />;

  // Determine if the current route matches the item URL
  const isSelected = location.pathname === item.url;

  let itemTarget = '';
  if (item.target) {
    itemTarget = '_blank';
  }
  let listItemProps = { component: Link, to: item.url };
  if (item.external) {
    listItemProps = { component: 'a', href: item.url };
  }

  return (
    <ListItemButton
      disabled={item.disabled}
      sx={{
        ...(level > 1 && { backgroundColor: 'transparent !important', py: 1, borderRadius: '5px' }),
        borderRadius: '5px',
        marginBottom: '5px',
        pl: `${level * 16}px`
      }}
      selected={isSelected} // Set based on current route
      onClick={() => dispatch({ type: actionTypes.MENU_OPEN, isOpen: item.id })}
      {...listItemProps}
    >
      <ListItemIcon sx={{ minWidth: 25 }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography sx={{ pl: 1.4 }} variant={isSelected ? 'subtitle1' : 'body1'} color="inherit">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption, pl: 2 }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
