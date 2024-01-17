import { TbActivity } from "react-icons/tb";
import { AiFillDashboard } from "react-icons/ai";
import { MdOutlinePermMedia } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg"
const sideBarItems = [
    { 
        name: 'Dashboard',
        link: '/admin-home', 
        icon: AiFillDashboard
    }, 

    {
        name: "Staff", 
        link: '/home/user', 
        icon: CgProfile
    }, 

    { 
        name: "Rooms", 
        link: '/home/room',
        icon: MdOutlinePermMedia
    },

    { 
        name: "Tasks", 
        link: '/home/tasks', 
        icon: FaTasks
    }

    
]

export default sideBarItems