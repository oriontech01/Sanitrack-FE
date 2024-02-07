import { useParams } from 'react-router-dom';
import useEvidence from '../../Hooks/useEvidence';
import { useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia } from '@mui/material';

const ViewEvidence = () => {
  const { taskId } = useParams();
  const { getImages, allImages } = useEvidence();

  useEffect(() => {
    const fetchData = async () => {
      await getImages(taskId);
    };
    fetchData();
  }, [getImages, taskId]);

  return (
    <Container className="evidence-container">
      <Typography variant="h2">Gallery for Task {taskId}</Typography>
      <Grid container spacing={2} className="gallery-images">
        {allImages ? (
          allImages.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={image.image_url !== 'empty' ? image.image_url : ''}
                  alt={`Image ${index + 1}`}
                  style={{ height: 500, width: 500, objectFit: 'cover', marginTop: '10px' }}
                />
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No image has been uploaded for this room</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ViewEvidence;
