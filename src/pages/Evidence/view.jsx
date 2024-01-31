import { useParams } from "react-router-dom";
import "./view.scss";
import useEvidence from "../../Hooks/useEvidence";
import { useEffect } from "react";
const ViewEvidence = () => {
  const { taskId } = useParams();
  const { getImages, allImages } = useEvidence();

  // console.log(`task id => ${taskId}`)
  useEffect(() => {
    const fetchData = async () => {
      await getImages(taskId);
    };
    fetchData();
  }, [getImages]);
  return (
    <>
      <div className="evidence-container">
        <h2>Gallery</h2>
        <div className="gallery-images">
          {allImages ? (
            allImages.map((image, index) => (
              <div className="image-item ">
                {image.image_url !== "empty" ? (
                  <img src={image.image_url} alt={`Image ${index + 1}`} />
                ) : (
                  <p key={index}>There is no image for this room</p>
                )}
              </div>
            ))
          ) : (
            <p>No image has been uploaded for this room</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewEvidence;
