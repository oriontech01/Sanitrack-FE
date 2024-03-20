import { Box, Button, Grid, Typography, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';

const activeBorderColor = '#5454D4';
const inactiveBorderColor = '#717B8C';

const Header = ({ titles, activeTitle }) => {
  //   const containerBorderColor = activeTitle === titles.length - 1 ? '#5454D4' : '#717B8C';
  console.log('Active Title:', activeTitle);
  console.log('Title:', titles.length - 1);
  return (
    <div
      className="flex gap-4 items-center justify-around"
      style={{
        borderBottom: `2px solid ${activeTitle === titles.length ? activeBorderColor : inactiveBorderColor}`
      }}
    >
      {titles.map((title, index) => (
        <div
          key={index}
          style={{
            fontSize: '14px',
            marginBottom: '3px',
            fontWeight: 700,
            color: title.active ? '#5454D4' : '#717B8C',
            cursor: 'default'
          }}
        >
          {title.text}
        </div>
      ))}
    </div>
  );
};

const AddCourse = () => {
  const [activeTitle, setActiveTitle] = useState(0);
  const [formData, setFormData] = useState({
    courseTitle: '',
    courseLevel: '',
    courseGroup: '',
    curriculum: '',
    assessment: '',
    publishCourse: ''
  });

  const titles = [
    { id: 1, text: 'Basic information', active: activeTitle === 0 },
    { id: 2, text: 'Curriculum', active: activeTitle === 1 },
    { id: 3, text: 'Assessment', active: activeTitle === 2 },
    { id: 4, text: 'Publish course', active: activeTitle === 3 }
  ];

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    // Handle file upload, for now, just setting the file name
    setFormData({ ...formData, image: file.name });
  };

  const handleNext = () => {
    setActiveTitle(activeTitle + 1);
  };

  const handlePrev = () => {
    setActiveTitle(activeTitle - 1);
  };

  const renderContent = () => {
    switch (activeTitle) {
      case 0:
        return (
          <div className="flex flex-col gap-5">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="flex flex-col gap-2 items-center justify-center">
                <Typography variant="h6" color={'GrayText'}>
                  Course Thumbnail
                </Typography>
                <div className="bg-slate-300 ml-5 items-center justify-center p-10">
                  <img src={formData.image} alt="Uploaded" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </div>
              </div>

              <input type="file" accept="image/*" id="image-upload" style={{ display: 'none' }} onChange={handleImageUpload} />
              <div className="flex flex-col gap-3 justify-center">
                <Typography width="50%">
                  Upload your course Thumbnail. Important guideline:1200/800 pixel or 12:8 Ratio. Supported format: .jpg, .jpeg, or png
                </Typography>
                <label htmlFor="image-upload" className="w-[23%]">
                  <Button variant="contained" component="span">
                    <ImageIcon /> Upload Image
                  </Button>
                </label>
              </div>
            </Box>
            <div className="flex items-center flex-wrap gap-5">
              <TextField
                name="courseTitle"
                label="Course Title"
                variant="outlined"
                margin="normal"
                value={formData.courseTitle}
                onChange={handleInputChange}
                className="w-[45%]"
              />
              <FormControl variant="outlined" className="w-[45%]">
                <InputLabel id="course-level">Select Course Level</InputLabel>
                <Select
                  labelId="course-level"
                  id="courseLevel"
                  name="courseLevel"
                  value={formData.courseLevel}
                  onChange={handleInputChange}
                  label="course-group"
                >
                  <MenuItem value="personal">level 1</MenuItem>
                  <MenuItem value="work">level 2</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" className="w-[45%]">
                <InputLabel id="course-group">Select Course group</InputLabel>
                <Select
                  labelId="course-group"
                  id="courseGroup"
                  name="courseGroup"
                  value={formData.courseGroup}
                  onChange={handleInputChange}
                  label="course-group"
                >
                  <MenuItem value="group 1">group 1</MenuItem>
                  <MenuItem value="group 2">group 2</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <TextField
              name="curriculum"
              label="Curriculum"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.curriculum}
              onChange={handleInputChange}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <TextField
              name="assessment"
              label="Assessment"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.assessment}
              onChange={handleInputChange}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <Typography variant="h6" gutterBottom>
              Publish Course
            </Typography>
            <ul>
              {Object.entries(formData).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        padding: '5px 10px',
        width: '100%',
        height: '100%'
      }}
    >
      <Typography variant="h6" color={'blue'} gutterBottom>
        Create a New Course
      </Typography>
      <Box
        sx={{
          flexBasis: '100%',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
          paddingY: '16px',
          paddingX: '13px',
          borderRadius: '9px'
        }}
      >
        <Header titles={titles} activeTitle={activeTitle} />
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} alignContent={'center'}>
          <Typography variant="h5" gutterBottom>
            {activeTitle === 0 ? 'Basic Information' : activeTitle === 1 ? 'Curriculum' : activeTitle === 2 ? 'Assessment' : 'Course Name'}
          </Typography>
          <Typography variant="h6" color={'blue'} gutterBottom>
            save & Preview
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: '#b3bcd4',
            height: '.5px'
          }}
        />
        {renderContent()}
        <Box
          //   width={'100%'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          marginBottom={5}
          //   justifyContent={''}
        >
          {activeTitle > 0 && (
            <Button variant="outlined" title="Add a new course" onClick={handlePrev}>
              Previous
            </Button>
          )}
          <Button
            variant="contained"
            style={{ backgroundColor: 'blue' }}
            title="Add a new course"
            onClick={handleNext}
            disabled={activeTitle === titles.length - 1}
          >
            {activeTitle === titles.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default AddCourse;
