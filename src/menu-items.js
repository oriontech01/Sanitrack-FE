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
import { LibraryAddOutlined, LocationCity, NewReleasesRounded, NotificationAdd, TaskSharp, TimelapseOutlined, TimelapseRounded, TimelapseSharp, Timeline, Timer10TwoTone } from '@mui/icons-material';
import { InventoryRounded } from '@mui/icons-material';
import { BrowseGallery } from '@mui/icons-material';
import { MessageOutlined, PunchClockRounded } from '@mui/icons-material';
import { FaBagShopping, FaBuilding } from 'react-icons/fa6';

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
      {
        id: 'facilities',
        title: 'Facilties',
        type: 'item',
        icon: LocationCity, // Changed Icon
        url: '/dashboard/locations'
      },
      {
        id: 'facility-timer',
        title: 'Facility Timer',
        type: 'item',
        icon: TimelapseOutlined, // Changed Icon
        url: '/dashboard/facility-timer'
      },
      {
        id: 'facility-release',
        title: 'Facility Release',
        type: 'item',
        icon: NewReleasesRounded, // Changed Icon
        url: '/dashboard/facility-release'
      },
      // {
      //   id: 'facilities',
      //   title: 'Facilities',
      //   type: 'item',
      //   icon: FaBuilding, // Main Icon for Facilities
      //   url: '/dashboard/facilities' // Base URL for Facilities
      // },
      {
        id: 'rooms',
        title: 'Rooms',
        type: 'item',
        icon: icons['AppsOutlinedIcon'], // Changed Icon
        url: '/dashboard/rooms'
      },
      {
        id: 'work schedule',
        title: 'Work Schedule',
        type: 'item',
        icon: icons['AccountTreeOutlinedIcon'], // Changed Icon
        url: '/dashboard/work-schedule'
      },
      {
        id: 'work history',
        title: 'Work History',
        type: 'item',
        icon: icons['ChromeReaderModeOutlinedIcon'], // Changed Icon
        url: '/dashboard/work-history'
      },
      {
        id: 'messages',
        title: 'Messages',
        type: 'item',
        icon: MessageOutlined, // Changed Icon
        url: '/dashboard/messages' 
      },
      {
        id: 'learning',
        title: 'Training',
        type: 'item',
        icon: LibraryAddOutlined, // Changed Icon
        url: '/dashboard/learning' 
      },
      {
        id: 'evidence',
        title: 'Evidence',
        type: 'item',
        icon: BrowseGallery, // Changed Icon
        url: '/dashboard/evidence' 
      },
      {
        id: 'inventory',
        title: 'Inventory',
        type: 'item',
        icon: InventoryRounded, // Changed Icon
        url: '/dashboard/inventory' 
      }
    ]
  },
  {
    id: 'admin',
    title: 'Administrator',
    type: 'group',
    icon: icons['AccountTreeOutlinedIcon'], // Group Icon
    children: [
      {
        id: 'users',
        title: 'Users',
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
        id: 'timer',
        title: 'Timer',
        type: 'item',
        icon: PunchClockRounded, // Changed Icon
        url: '/dashboard/timer'
      },
      // {
      //   id: 'notifications',
      //   title: 'Notifications',
      //   type: 'item',
      //   icon: NotificationAdd, // Changed Icon
      //   url: '/dashboard/notifications'
      // },
      {
        id: 'learning',
        title: 'Training',
        type: 'item',
        icon: LibraryAddOutlined, // Changed Icon
        url: '/dashboard/learning' 
      },
      {
        id: 'messages',
        title: 'Messages',
        type: 'item',
        icon: MessageOutlined, // Changed Icon
        url: '/dashboard/messages' 
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
      {
        id: 'learning',
        title: 'Training',
        type: 'item',
        icon: LibraryAddOutlined, // Changed Icon
        url: '/dashboard/learning' 
      },
      {
        id: 'messages',
        title: 'Messages',
        type: 'item',
        icon: MessageOutlined, // Changed Icon
        url: '/dashboard/messages' 
      },
      {
        id: 'requests',
        title: 'Requests',
        type: 'item',
        icon: FaBagShopping, // Changed Icon
        url: '/dashboard/requests' 
      },
      {
        id: 'facility-timer',
        title: 'Facility Timer',
        type: 'item',
        icon: TimelapseOutlined, // Changed Icon
        url: '/dashboard/inspector/facility-timer'
      },
      {
        id: 'facility-release',
        title: 'Facility Release',
        type: 'item',
        icon: NewReleasesRounded, // Changed Icon
        url: '/dashboard/inspector/facility-release'
      },
    ]
  }
];

const renderSideNavItemsByRole = role => {
  if (role === 'Admin') return adminSideNavItems;
  else if (role === 'Cleaner') return cleanerSideNavItems;
  else return inspectorSideNavItems;
};

export default renderSideNavItemsByRole;
