import { TbActivity, TbMessage, TbPaperBag } from "react-icons/tb";
import { AiFillDashboard } from "react-icons/ai";
import { MdBarChart, MdOutlinePermMedia } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg"
import { History, RoomOutlined } from "@mui/icons-material";

const sideBarItems = [
    { 
        name: 'Dashboard',
        link: '/admin-home', 
        icon: AiFillDashboard
    }, 
    {
        name: "Rooms", 
        link: '/home/room',  
        icon: RoomOutlined
    },

    { 
        name: "Tasks", 
        link: '/home/tasks', 
        icon: FaTasks
    },

    {
        name: "User", 
        link: '/home/user', 
        icon: CgProfile
    }, 

    { 
        name: "Evidence", 
        link: '/home/evidence',
        icon: MdOutlinePermMedia
    },
    {
        name: "Messages", 
        link: '/home/messages', 
        icon: TbMessage
    },
    {
        name: "Report", 
        link: '/home/report', 
        icon: MdBarChart
    },
    // {
    //     name: "Work Order", 
    //     link: '/home/work-order', 
    //     icon: TbPaperBag
    // },
    {
        name: "Tracker", 
        link: '/home/tracker', 
        icon: TbActivity
    },
    {
        name: "Work History", 
        link: '/home/work-history',  
        icon: History
    },
]

export default sideBarItems