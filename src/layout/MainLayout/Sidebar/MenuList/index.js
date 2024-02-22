import React, { useState, useEffect } from 'react';

// material-ui
import { Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import renderSideNavItemsByRole from 'menu-items'; // Assuming 'menu-items' exports a function now

// ==============================|| MENULIST ||============================== //

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Assuming renderSideNavItemsByRole is now a function that accepts a role and returns items accordingly
    const role = localStorage.getItem('role');
    setMenuItems(renderSideNavItemsByRole(role)); // Update to call renderSideNavItemsByRole with role

    // Optional: listen to an event for role changes if your app supports dynamic role updates
    const handleRoleChange = () => {
      const newRole = localStorage.getItem('role');
      setMenuItems(renderSideNavItemsByRole(newRole));
    };

    // Example: Listen to a custom event 'roleChanged'
    window.addEventListener('roleChanged', handleRoleChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('roleChanged', handleRoleChange);
    };
  }, []); // Empty array means this effect runs once on mount, but you can include variables here if needed

  const menuListItems = menuItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{menuListItems}</>;
};

export default MenuList;
