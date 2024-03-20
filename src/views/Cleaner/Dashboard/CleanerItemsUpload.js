import useCleanerHook from 'Hooks/cleaner/useCleanerHook';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, Flip } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CleanerItemsUpload = () => {
  const { rooms, getRoomsToClean ,uploadCleaningItemsUrl,itemsLoading,loading} = useCleanerHook();
  useEffect(() => {
    getRoomsToClean();
  }, []);

  const [base64String, setBase64String] = useState('');
  const [formData, setFormData] = useState([]);
  const [formName, setFormName] = useState([]);
  //   console.log('base', base64String);

  const fileToBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = error => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (index, event) => {
    try {
      const file = event.target.files[0];
      const newData = [...formData];
      const reader = new FileReader();

      // reader.onloadend = () => {

      //   setBase64String(reader.result);
      // };

      // reader.readAsDataURL(file)
      // ;

      const base64String = await fileToBase64(file);

      let data = {
        file: base64String,
        upload_preset: 'img_upload'
      };
      console.log(data);
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dyh4orev5/upload`, data, {
        headers: {
          'content-type': 'application/json'
        }
      });

      if (response.status == 200) {
        toast.success('Image Uploaded Successfully', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
        newData[index] = {
          detail_id: rooms[index].roomDetailId,
          image_path: response?.data?.url
        };
        console.log("newt",newData)
        setFormData(newData);
        console.log('ressssss', response);
      }

      return true;
    } catch (error) {
      //   alert('OOPS. An ERROR occurred');
      console.error('Upload error:', error);
      toast.error("Error Occured Uploading Image", {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Flip
      });

      return false;
    }
  };

  const handleSubmit = () => {
    const data = { inputs: formData };
    console.log('submoitted', data);
    uploadCleaningItemsUrl(data)
  };
  return (
    <>
    <ToastContainer/>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 mt-10">
          {(rooms && !loading) && rooms.map((room, index) => (
            <div className="p-3 bg-yellow-100 flex justify-between items-center" key={room?._id}>
              <span className="flex items-center gap-x-2">
                <p className="text-blue-500 font-bold">{room?.name}</p>
              </span>
              <div>
                <label htmlFor={`imageUpload_${index}`}>
                  {/* <p className="text-sm">Instructor Picture</p> */}
                  <div className="lg:w-32 h-auto relative">
                    <input
                      className="w-full h-40 hidden     p-2 bg-lmsGray rounded-md border border-[#E1E1E1]  text-[#ACACAC] "
                      type="file"
                      id={`imageUpload_${index}`}
                      accept="image/*"
                      onChange={event => handleImageChange(index, event)}
                    />
                    <div className="cursor-pointer lg:w-32  flex items-center justify-center ">
                      <span className=" w-auto   flex justify-center items-center gap-x-1">
                        <p className="text-[#737373]">Upload Picture</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M14.3667 18.9577H5.6334C3.30006 18.9577 1.81673 17.566 1.6834 15.241L1.25006 8.36602C1.1834 7.32435 1.54173 6.32435 2.2584 5.56602C2.96673 4.80768 3.96673 4.37435 5.00006 4.37435C5.26673 4.37435 5.52506 4.21602 5.65006 3.96602L6.25006 2.77435C6.74173 1.79935 7.97506 1.04102 9.05006 1.04102H10.9584C12.0334 1.04102 13.2584 1.79935 13.7501 2.76602L14.3501 3.98268C14.4751 4.21602 14.7251 4.37435 15.0001 4.37435C16.0334 4.37435 17.0334 4.80768 17.7417 5.56602C18.4584 6.33268 18.8167 7.32435 18.7501 8.36602L18.3167 15.2493C18.1667 17.6077 16.7251 18.9577 14.3667 18.9577ZM9.05006 2.29102C8.4334 2.29102 7.65006 2.77435 7.36673 3.33268L6.76673 4.53268C6.41673 5.20768 5.74173 5.62435 5.00006 5.62435C4.30006 5.62435 3.65006 5.90768 3.16673 6.41602C2.69173 6.92435 2.45006 7.59102 2.50006 8.28268L2.9334 15.166C3.0334 16.8494 3.94173 17.7077 5.6334 17.7077H14.3667C16.0501 17.7077 16.9584 16.8494 17.0667 15.166L17.5001 8.28268C17.5417 7.59102 17.3084 6.92435 16.8334 6.41602C16.3501 5.90768 15.7001 5.62435 15.0001 5.62435C14.2584 5.62435 13.5834 5.20768 13.2334 4.54935L12.6251 3.33268C12.3501 2.78268 11.5667 2.29935 10.9501 2.29935H9.05006V2.29102Z"
                            fill="#737373"
                          />
                          <path
                            d="M11.25 7.29102H8.75C8.40833 7.29102 8.125 7.00768 8.125 6.66602C8.125 6.32435 8.40833 6.04102 8.75 6.04102H11.25C11.5917 6.04102 11.875 6.32435 11.875 6.66602C11.875 7.00768 11.5917 7.29102 11.25 7.29102Z"
                            fill="#737373"
                          />
                          <path
                            d="M10.0013 15.6257C8.15964 15.6257 6.66797 14.134 6.66797 12.2923C6.66797 10.4507 8.15964 8.95898 10.0013 8.95898C11.843 8.95898 13.3346 10.4507 13.3346 12.2923C13.3346 14.134 11.843 15.6257 10.0013 15.6257ZM10.0013 10.209C8.8513 10.209 7.91797 11.1423 7.91797 12.2923C7.91797 13.4423 8.8513 14.3757 10.0013 14.3757C11.1513 14.3757 12.0846 13.4423 12.0846 12.2923C12.0846 11.1423 11.1513 10.209 10.0013 10.209Z"
                            fill="#737373"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center justify-center pt-5">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <button
          onClick={handleSubmit}
          className="text-white flex justify-center  mb-4 gap-x-2 items-center px-4 py-2 bg-yellow-700 w-auto lg:h-[40px] text-base border-t-2 mt-2 "
            disabled={itemsLoading}
        >
          {itemsLoading ? 'Loading...' : 'Save Images'}
        </button>
      </div>
    </>
  );
};

export default CleanerItemsUpload;
