import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useParams } from 'react-router';
import useFetch from 'Hooks/useFetch';

const Lessons = () => {
  const { id } = useParams();
  const { isLoading, data } = useFetch(`course-lesson/${id}/all-lessons`, 'get');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (data.length > 0 && !selectedVideo) {
      setSelectedVideo(data[0]);
    }
  }, [data, selectedVideo]);

  const handleVideoSelect = video => {
    setSelectedVideo(video);
  };

  return isLoading ? (
    <section className="flex items-center justify-center h-screen">
      <CircularProgress />
    </section>
  ) : (
    <Grid
      container
      sx={{
        display: 'flex',
        columnGap: '20px',
        padding: '5px 10px',
        width: '100%',
        height: '100%'
      }}
    >
      <article className={`w-[70%]`}>
        {selectedVideo && (
          <>
            <div className="">
              <video
                controls
                className="w-full h-auto max-h-[480px] bg-slate-400 shadow-lg"
                src={selectedVideo.resourceUrl}
                title="video player"
              >
                <track kind="captions" />
              </video>
            </div>
            <h1 className="font-bold text-xl mt-3 text-[blue]">{selectedVideo.courseTitle}</h1>
            <div className="flex justify-between flex-col gap-2">
              <span className="text-gray-500">7,948,154 views • Jun 22, 2022</span>
              <hr className="my-15 border-t border-gray-300" />
              <div className="flex justify-between flex-col">
                <div className="flex gap-5">
                  <img className="w-12 h-12 rounded-full" src={selectedVideo.thumbnailUrl} alt="Channel" />

                  <div>
                    <span className="font-semibold">{selectedVideo.name}</span>
                    <span className="text-gray-500 block">subscribers</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700">Ensure to complete this lesson before moving to the next.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </article>
      <div className="w-[20%] flex flex-col gap-2">
        {data.map((lessons, i) => {
          const { courseTitle, name, resourceUrl, thumbnailUrl } = lessons;
          return (
            <button
              className={`w-[150%] mb-5 h-fit cursor-pointer flex gap-2 shadow-md`}
              key={i}
              onClick={() => handleVideoSelect(lessons)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleVideoSelect(lessons);
              }}
            >
              <img className={`w-[45%] h-full bg-gray-400 object-cover`} src={thumbnailUrl} alt="Thumbnail" />
              <div className="flex flex-1 ">
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold text-[blue]">{courseTitle}</h1>
                  <h2 className="text-gray-500">{name}</h2>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Grid>
  );
};

export default Lessons;
