import React from 'react';
import { Card, CardContent, Typography, Avatar, LinearProgress } from '@mui/material';
import { CheckCircleOutline as CheckCircleOutlineIcon, MoreVert as MoreVertIcon, ArrowUpward as ArrowUpwardIcon, Circle as CircleIcon } from '@mui/icons-material';
import './NewDashboard.scss'
export default function Dashboard() {
  // Dummy data to simulate the data structure
  const data = {
    stats: [
      { label: 'Website View', value: 'Last Campaign Performance', time: 'campaign sent 2 days ago', type: 'circle' },
      { label: 'Daily Sales', value: '15% increase in today sales', time: 'updated 4 min ago', type: 'up' },
      { label: 'Completed Tasks', value: 'Last Campaign Performance', time: 'just updated', type: 'check' },
    ],
    projects: [
      { name: 'Material XD Version', members: [/* Array of member avatars */], budget: '$14,000', completion: 60 },
      { name: 'Add Progress Track', members: [/* Array of member avatars */], budget: '$3,000', completion: 10 },
    ],
    orders: [
      { desc: '$2400, Design changes', date: '22 DEC 7:20 PM' },
      { desc: 'New order #1832412', date: '21 DEC 11 PM' },
      { desc: 'Server payments for April', date: '21 DEC 9:34 PM' },
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '20px' }}>
        {data.stats.map((stat, index) => (
          <Card key={index} style={{ width: '30%', padding: '10px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {stat.label}
              </Typography>
              <Typography color="text.secondary">
                {stat.value}
              </Typography>
              <Typography variant="body2">
                {stat.type === 'circle' && <CircleIcon />}
                {stat.type === 'up' && <ArrowUpwardIcon />}
                {stat.type === 'check' && <CheckCircleOutlineIcon />}
                {stat.time}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Card style={{ padding: '10px' }}>
          <Typography variant="h5" component="div">
            Projects
          </Typography>
          {/* Table of projects */}
        </Card>

        <Card style={{ padding: '10px' }}>
          <Typography variant="h5" component="div">
            Orders Overview
          </Typography>
          {data.orders.map((order, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="body2">{order.desc}</Typography>
              <Typography color="text.secondary">{order.date}</Typography>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
