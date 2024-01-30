const cleanerPage = () => { 
    return(
        <div className="bg-color room-container">
      <div className="first_block">
        <div className="room_a">ROOM A</div>
        <div className="room_a_timer">
          <div className="timer-box">
            <MdOutlineTimer/>
            <p className="time-counter" id="timer">00:00:00</p>
            <p className="timer_start_btn" id="toggleButton">START</p>
          </div>
        </div>
      </div>
      <div className="second_block">
        {/* Repeated content for each upload box can be mapped from an array if preferred */}
        <UploadBox label="FLOOR" idSuffix="1" />
        <UploadBox label="WINDOWS" idSuffix="2" />
        <UploadBox label="CURTAINS" idSuffix="3" />
        <UploadBox label="FURNITURES" idSuffix="4" />
      </div>
      <div className="last_section">
        <a href="#" className="submit_btn">SUBMIT</a>
        <div className="view_guide">
          <a href="#" className="view_guide_text">VIEW GUIDE</a>
        </div>
      </div>
    </div>
    )
}
const UploadBox = ({ label, idSuffix }) => {
    const fileInputId = `fileInput${idSuffix}`;
    const checkboxId = `checkbox${idSuffix}`;
    return (
      <div className="upload_box">
          <div className="custom-upload-container">
              <span className="custom-upload-text">{label}</span>
              <input type="file" id={fileInputId} className="custom-upload-input" style={{ display: 'none' }} />
              <label htmlFor={fileInputId} className="custom-upload-icon">
              <IoCloudUploadOutline />
              </label>
          </div>
        <div className="checkbox">
          <div className="custom-checkbox-container">
            <input type="checkbox" className="custom-checkbox" id={checkboxId} />
            <label htmlFor={checkboxId} className="custom-checkbox-label">
              <span className="custom-checkbox-checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    );
  };
  