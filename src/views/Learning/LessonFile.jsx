import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import food from '../../assets/food.pdf';
import osha from '../../assets/osha.pdf';
import { useParams } from 'react-router';
import useFetch from 'Hooks/useFetch';

// Set up pdfjs worker source
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

const LessonFile = () => {
  const { id } = useParams();
  const { isLoading, data } = useFetch(`library/${id}/all-resources`, 'get');
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  console.log(data);

  const Data = [
    { title: 'CDPH Food Safety Program', resourceUrl: `${food}`, id: '65f04832dbb7f1e6459b5067' },
    { title: 'Osha Training Guidelines', resourceUrl: `${osha}`, id: '65f048ef0818c753684eca60' }
  ];

  function onDocumentError(error) {
    console.error('Error loading PDF:', error);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const filteredData = Data.filter(item => item.id === id);

  return isLoading ? (
    <div className=" flex items-center justify-center h-screen">
      <CircularProgress />
    </div>
  ) : (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      {filteredData.map((item, i) => {
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
            <Box width={'80%'} maxHeight={'500px'}>
              <Document file={resourceUrl} onLoadSuccess={onDocumentLoadSuccess} onError={onDocumentError}>
                <Page pageNumber={pageNumber} />
              </Document>
              <div className="items-center flex justify-center gap-3 py-4">
                <Button variant="contained" style={{ backgroundColor: 'blue' }} onClick={previousPage} disabled={pageNumber <= 1}>
                  Prev
                </Button>
                <p>
                  Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                </p>

                <Button variant="contained" style={{ backgroundColor: 'blue' }} onClick={nextPage} disabled={pageNumber >= numPages}>
                  Next
                </Button>
              </div>
            </Box>
          </Grid>
        );
      })}
    </Box>
  );
};

export default LessonFile;
