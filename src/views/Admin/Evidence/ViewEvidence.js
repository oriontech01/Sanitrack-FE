import { useParams } from 'react-router-dom';
import useEvidence from 'Hooks/useEvidence';
import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia } from '@mui/material';
import Loader from 'component/Loader/Loader';

const ViewEvidence = () => {
  const { taskId } = useParams();
  const { getImages, allImages } = useEvidence();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getImages(taskId);
      setLoading(false);
    };
    fetchData();
  }, [taskId]); // Added taskId as a dependency for useEffect

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="lg"> {/* Ensures the container is centered and has a max-width */}
      <Typography variant="h2" gutterBottom align="center" sx={{ mb: 4, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' } }}>
        Gallery for Task {taskId}
      </Typography>
      <Grid container spacing={2}>
        {allImages && allImages.length > 0 ? (
          allImages.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={image.image_url !== 'empty' ? image.image_url : 'path/to/default/image'} // Provide a default image path if 'empty'
                  alt={`Image ${index + 1}`}
                  sx={{ height: '250px', width: '100%', objectFit: 'cover' }} // Use sx for styling
                />
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">No image has been uploaded for this task.</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ViewEvidence;
