import { useParams } from 'react-router-dom';
import useEvidence from 'Hooks/useEvidence';
import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia } from '@mui/material';
import Loader from 'component/Loader/Loader';

const ViewEvidence = () => {
  const { taskId } = useParams();
  const { getImages, allImages } = useEvidence();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await getImages(taskId);
      setLoading(false)
    };
    fetchData();
  }, []);

  if(loading){
    return <Loader/>
  }

  return (
    <Container className="evidence-container">
      <Typography variant="h2" gutterBottom>
        Gallery for Task {taskId}
      </Typography>
      <Grid container spacing={2} className="gallery-images">
        {allImages && allImages.length > 0 ? (
          allImages.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={image.image_url !== 'empty' ? image.image_url : ''}
                  alt={`Image ${index + 1}`}
                  style={{ height: 'auto', width: '100%', objectFit: 'cover', marginTop: '10px' }}
                />
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1">No image has been uploaded for this task</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ViewEvidence;
