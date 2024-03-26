import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdf from '../../assets/intent.pdf';
import food from '../../assets/food.pdf';
import osha from '../../assets/osha.pdf';
import { useParams } from 'react-router';
import useFetch from 'Hooks/useFetch';

// Set up pdfjs worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const LessonFile = () => {
  const { id } = useParams();
  const { isLoading, data } = useFetch(`library/${id}/all-resources`, 'get');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  console.log(data);

  const Data = [
    { title: 'CDPH Food Safety Program', resourceUrl: `${food}`, id: '65fb07cf11c0dc2d3d569e83' },
    { title: 'Osha Training Guidelines', resourceUrl: `${osha}`, id: '65fb064e11c0dc2d3d569e7c' }
  ];

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function onDocumentError(error) {
    console.error('Error loading PDF:', error);
  }

  return isLoading ? (
    <div className=" flex items-center justify-center h-screen">
      <CircularProgress />
    </div>
  ) : (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      {Data.map((item, i) => {
        const { title, resourceUrl } = item;
        return (
          <Grid container spacing={2} key={i}>
            <Grid item xs={12}>
              <Box
                width={'100%'}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                alignContent={'center'}
                marginBottom={5}
              >
                <Typography variant="h2" color={'blue'} gutterBottom>
                  {title}
                </Typography>
              </Box>
            </Grid>
            <Box width={'100%'}>
              <Document file={resourceUrl} onLoadSuccess={onDocumentLoadSuccess} onError={onDocumentError}>
                {Array.from(new Array(numPages), (el, index) => (
                  <Page pageNumber={index + 1} key={`page_${index + 1}`} onRenderFailure={onDocumentError} style={{ width: '100%' }} />
                ))}
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </Box>
          </Grid>
        );
      })}
    </Box>
  );
};

export default LessonFile;
