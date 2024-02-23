// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { ContactEmergencyOutlined } from '@mui/icons-material';

const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon
};


const currentRole = localStorage.getItem('role');

const adminSideNavItems = [
  {
    id: 'navigation',
    title: 'System Management',
    caption: 'Dashboard',
    type: 'group',
    icon: icons['NavigationOutlinedIcon'], // Group Icon
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: icons['HomeOutlinedIcon'], // Specific Icon
        url: '/dashboard'
      },
      // Assuming "Work Order" might be related to tasks or projects
      {
        id: 'work order',
        title: 'Work Order',
        type: 'item',
        icon: icons['AccountTreeOutlinedIcon'], // Changed Icon
        url: '/dashboard/tasks'
      },
      // Assuming "Rooms" might be a part of site or facility management
      {
        id: 'rooms',
        title: 'Rooms',
        type: 'item',
        icon: icons['AppsOutlinedIcon'], // Changed Icon
        url: '/dashboard/rooms'
      },
      {
        id: 'facilities',
        title: 'Facilities',
        type: 'item',
        icon: icons['SecurityOutlinedIcon'], // Main Icon for Facilities
        url: '/dashboard/facilities' // Base URL for Facilities
        // children: [
        //   {
        //     id: 'facility locations',
        //     title: 'Facility Locations',
        //     type: 'item',
        //     icon: icons['LocationCityTwoTone'], // Correctly referencing the new icon
        //     url: '/dashboard/facilities/locations'
        //   },
        //   {
        //     id: 'maps',
        //     title: 'View Facilities',
        //     type: 'item',
        //     icon: icons['LocationCityTwoTone'], // Correctly referencing the new icon
        //     url: '/dashboard/facilities/maps'
        //   }
        // ]
      },
      // Work History might involve documentation or reports
      {
        id: 'work history',
        title: 'Work History',
        type: 'item',
        icon: icons['ChromeReaderModeOutlinedIcon'], // Changed Icon
        url: '/dashboard/work-history'
      },
      // Messages could use a communication-related icon
      {
        id: 'messages',
        title: 'Messages',
        type: 'item',
        icon: icons['ContactSupportOutlinedIcon'], // Changed Icon
        url: '/dashboard/messages' // Assuming URL should be unique and relevant
      },
      // Evidence might relate to documentation or verification
      {
        id: 'evidence',
        title: 'Evidence',
        type: 'item',
        icon: icons['HelpOutlineOutlinedIcon'], // Changed Icon
        url: '/dashboard/evidence' // Assuming URL should be unique and relevant
      },
      {

        id: 'contact',
        title: 'Contact Us',
        type: 'item',
        icon: icons['ContactSupportOutlinedIcon'], // Changed Icon
        url: '/dashboard/contact' // Assuming URL should be unique and relevant
      },
      {

        id: 'inventory',
        title: 'Inventory',
        type: 'item',
        icon: icons['InventoryOutlinedIcon'], // Changed Icon
        url: '/dashboard/inventory' // Assuming URL should be unique and relevant
      },


    ]
  },
  {
    id: 'admin',
    title: 'Administrator',
    type: 'group',
    icon: icons['AccountTreeOutlinedIcon'], // Group Icon
    children: [
      {
        id: 'user',
        title: 'User',
        type: 'item',
        icon: icons['AppsOutlinedIcon'], // Assuming it relates to user management
        url: '/dashboard/users'
      },
      {
        id: 'permissions',
        title: 'Permissions',
        type: 'item',
        icon: icons['SecurityOutlinedIcon'], // Permissions often relate to security
        url: '/dashboard/permissions'
      },
      {
        id: 'user roles',
        title: 'User Roles',
        type: 'item',
        icon: icons['BlockOutlinedIcon'], // Assuming it relates to access control
        url: '/dashboard/roles'
      }
    ]
  }
];

const cleanerSideNavItems = [
  {
    id: 'navigation',
    title: 'System Management',
    caption: 'Dashboard',
    type: 'group',
    icon: icons['NavigationOutlinedIcon'], // Group Icon
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: icons['HomeOutlinedIcon'], // Specific Icon
        url: '/dashboard'
      },
      // Assuming "Work Order" might be related to tasks or projects
      {
        id: 'work order',
        title: 'Work Order',
        type: 'item',
        icon: icons['AccountTreeOutlinedIcon'], // Changed Icon
        url: '/dashboard/tasks'
      },
      // Assuming "Rooms" might be a part of site or facility management
      {
        id: 'rooms',
        title: 'Rooms',
        type: 'item',
        icon: icons['AppsOutlinedIcon'], // Changed Icon
        url: '/dashboard/rooms'
      },
      {
        id: 'messages',
        title: 'Messages',
        type: 'item',
        icon: icons['ContactSupportOutlinedIcon'], // Changed Icon
        url: '/dashboard/messages' // Assuming URL should be unique and relevant
      },
    ]
  }
];

const inspectorSideNavItems = [
  {
    id: 'navigation',
    title: 'System Management',
    caption: 'Dashboard',
    type: 'group',
    icon: icons['NavigationOutlinedIcon'], // Group Icon
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: icons['HomeOutlinedIcon'], // Specific Icon
        url: '/dashboard'
      },
      // Assuming "Work Order" might be related to tasks or projects
      {
        id: 'work order',
        title: 'Work Order',
        type: 'item',
        icon: icons['AccountTreeOutlinedIcon'], // Changed Icon
        url: '/dashboard/tasks'
      },
      // Assuming "Rooms" might be a part of site or facility management
      {
        id: 'rooms',
        title: 'Rooms',
        type: 'item',
        icon: icons['AppsOutlinedIcon'], // Changed Icon
        url: '/dashboard/rooms'
      },
      // Messages could use a communication-related icon
      {
        id: 'messages',
        title: 'Messages',
        type: 'item',
        icon: icons['ContactSupportOutlinedIcon'], // Changed Icon
        url: '/dashboard/messages' // Assuming URL should be unique and relevant
      },
      // Evidence might relate to documentation or verification
      {
        id: 'evidence',
        title: 'Evidence',
        type: 'item',
        icon: icons['HelpOutlineOutlinedIcon'], // Changed Icon
        url: '/dashboard/evidence' // Assuming URL should be unique and relevant
      }
    ]
  }
];

 const renderSideNavItemsByRole = (role) => {
  if (role === 'Admin') return adminSideNavItems;
  else if (role === 'Cleaner') return cleanerSideNavItems;
  else return inspectorSideNavItems;
};

export default renderSideNavItemsByRole

