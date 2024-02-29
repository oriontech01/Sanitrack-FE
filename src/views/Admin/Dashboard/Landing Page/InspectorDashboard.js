import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const InspectorDashboard = () => {
  // This data is just for the example and should be fetched from your backend or context
  const tasks = [
    {
      id: 1,
      title: 'Discovery Mall',
      subtitle: 'Floor, Windows, Bathroom...'
    },
    {
      id: 2,
      title: 'Aso Villa',
      subtitle: 'Floor, Windows, Bathroom...'
    }
    // ... more tasks
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" color="blue">
        Welcome {localStorage.getItem('name')}!
      </Typography>
      <Typography variant="h4" mt={2}>
        Below are the locations for the tasks of the day.
      </Typography>

      <Box sx={{ mb: 2, mt: 3 }}>
        <List style={{ display: 'flex', gap: 10 }}>
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <ListItem style={{ backgroundColor: 'lightblue', borderRadius: 10 }} secondaryAction={<ChevronRightIcon />}>
                <ListItemText
                  primaryTypographyProps={{ fontWeight: 'bold', color: 'blue' }}
                  primary={task.title}
                  secondary={task.subtitle}
                />
              </ListItem>
              {index < tasks.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Add additional UI elements as needed */}
    </Box>
  );
};

export default InspectorDashboard;
