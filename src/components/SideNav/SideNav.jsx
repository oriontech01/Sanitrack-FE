import React, { useEffect } from 'react';
import './SideNav.scss';
import { NavLink } from 'react-router-dom';
import { RiReplyAllLine, RiShoppingBagLine, RiFileTextLine } from 'react-icons/ri';
import { TbActivity } from "react-icons/tb";
import { AiFillDashboard } from "react-icons/ai";
import { MdOutlinePermMedia } from "react-icons/md";
import { FaTasks, FaAngleDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg"

const SideNav = () => {
  let username
  useEffect(() => {
    username = localStorage.getItem('name')
  }, [])

  return (
    <nav className='nav'>
      <div className="tab-menu">
        {/* Dashboard */}
        <NavLink to="/home/dashboard" className="dashboard-btn">
          <AiFillDashboard className="dashboard-icon" />
          <p>Dashboard</p>
        </NavLink>
        {/* Tasks */}
        <NavLink to="/home/tasks" className="tasks-btn">
          <FaTasks className="task-img" />
          <p>Tasks</p>
        </NavLink>
        {/* User */}
        <NavLink to="/home/user" className="user-btn">
          <CgProfile className="user-img" />
          <p>User</p>
        </NavLink>

        {/* Messages */}
        <NavLink to="/home/messages" className="message-btn">
          <RiReplyAllLine className="message-img" />
          <p>Messages</p>
        </NavLink>

        {/* Work Orders */}
        <NavLink to="/home/workorders" className="work-orders-btn">
          <RiShoppingBagLine className="work-order-img" />
          <p>Work Orders</p>
        </NavLink>

        {/* Reports */}
        <NavLink to="/home/reports" className="reports-btn">
          <RiFileTextLine className="report-img" />
          <p>Reports</p>
        </NavLink>

        {/* Evidence */}
        <NavLink to="/home/evidence" className="evidence-btn">
          <MdOutlinePermMedia className="evidence-img" />
          <p>Evidence</p>
        </NavLink>

        {/* Tracker */}
        <NavLink to="/home/tracker" className="tracker-btn">
          <TbActivity className="tracker-img" />
          <p>Tracker</p>
        </NavLink>
      </div>
    </nav>
  )
}

export default SideNav