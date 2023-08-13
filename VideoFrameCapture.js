import React, { useState , useRef} from 'react';
import { useAuth, authFetch } from '../auth'; // Adjust the path as needed

const VideoFrameCapture = () => {
   
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedFrameBefore, setSelectedFrameBefore] = useState(null);
  const [selectedFrameAfter, setSelectedFrameAfter] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null);
  const { authState } = useAuth();

// Check if authState is defined before accessing accessToken
const token = authState ? authState.accessToken : null;

const handleImageUpload = (event) => {

const file = event.target.files[0]; // Get the selected file from the event

  if (file) {
    setSelectedImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
  }
};

<video
ref={videoRef}
src="path_to_your_video_backend"
controls
onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
/>
const response =  authFetch('/upload/predict', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

const handleEnhanceClick = async () => {
    try {
      const response = await authFetch('/upload/predict', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });


      if (response.ok) {
        const data = await response.json();
        setPredictedImage(data.predicted_image);
      } else {
        console.error('Error retrieving predicted image:', response.statusText);
      }
    } catch (error) {
      console.error('Error communicating with the server', error);
    }
  };

  const handleSubmitClick = async () => {
    if (selectedImageFile && selectedFrameBefore && selectedFrameAfter) {
      try {
        const formData = new FormData();
        formData.append('image', selectedImageFile);
        formData.append('frameBefore', selectedFrameBefore);
        formData.append('frameAfter', selectedFrameAfter);
  
        const response = await authFetch('/upload/submit', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
  
        if (response.ok) {
          setPredictedImage(null); // Clear predicted image
          setSelectedImage(null); // Clear selected image
          setSelectedFrameBefore(null); // Clear captured frames
          setSelectedFrameAfter(null);
        } else {
          console.error('Error uploading image:', response.statusText);
        }
      } catch (error) {
        console.error('Error communicating with the server', error);
      }
    } else {
      console.log('Please select an image and capture frames before submitting.');
    }
  };
  
  
    const handlePlayPause = () => {
      const video = videoRef.current;
  
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    };

    


    const handleCaptureFrame = () => {
        const video = videoRef.current;
    
        // Ensure the video has loaded metadata
        if (!video.duration) {
          return;
        }

        // Capture frames 5 seconds before and after the current time
    const captureTime = Math.max(0, currentTime - 5);

    const captureTimeAfter = Math.min(video.duration, currentTime + 5);

    video.currentTime  = captureTimeBefore;


    // Wait for the video to seek
  // Wait for the video to seek
  video.onseeked = () => {
    const canvasBefore = document.createElement('canvas');
    canvasBefore.width = video.videoWidth;
    canvasBefore.height = video.videoHeight;
    const ctxBefore = canvasBefore.getContext('2d');
    ctxBefore.drawImage(video, 0, 0, canvasBefore.width, canvasBefore.height);
    const frameDataURLBefore = canvasBefore.toDataURL('image/png/jpg');
    setSelectedFrameBefore(frameDataURLBefore);

    // Now capture frame after 5 seconds
    video.currentTime = captureTimeAfter;

    // Wait for the video to seek again
      video.onseeked = () => {
        const canvasAfter = document.createElement('canvas');
        canvasAfter.width = video.videoWidth;
        canvasAfter.height = video.videoHeight;
        const ctxAfter = canvasAfter.getContext('2d');
        ctxAfter.drawImage(video, 0, 0, canvasAfter.width, canvasAfter.height);
        const frameDataURLAfter = canvasAfter.toDataURL('image/png/jpg');
        setSelectedFrameAfter(frameDataURLAfter);
      };
    };
    };    



  const styles = {
    uploadContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: 'linear-gradient(to right, #000000 5%, #3533cd)',
      backgroundSize: 'cover',
    },
    uploadBox: {
      backgroundColor: 'white',
      border: '2px solid #ccc',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
      textAlign: 'center',
    },
    imageBox: {
      position: 'relative',
      marginBottom: '10px',
    },
    uploadedImage: {
      maxWidth: '100%',
      maxHeight: '300px',
    },
    uploadMessage: {
      fontSize: '18px',
      color: '#555',
      marginBottom: '10px',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
    },
    uploadButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginRight: '10px',
    },
    enhanceButton: {
      backgroundColor: '#28a745',
    },
    captureButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      marginRight: '10px',
    },

/* Styles for the frame container */
frameContainer : {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
},


/* Styles for captured frames */
capturedFrame:{
  width: '48%',
  maxHeight: '200px',
  border: '1px solid #ccc',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
}
  };

  return (
    <div style={styles.uploadContainer}>
      <div style={styles.uploadBox}>
        <div style={styles.imageBox}>
        <video
            ref={videoRef}
            src="path_to_your_video_backend"
            controls
            onTimeUpdate={() => setCurrentTime(videoRef.current.currentTime)}
          />
          {selectedImage || predictedImage ? (
            <img
              src={predictedImage || selectedImage}
              alt="Uploaded"
              style={styles.uploadedImage}
            />
          ) : (
            <div style={styles.uploadMessage}>Upload an image</div>
          )}
          {selectedImageFile ? null : (
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageUpload}
            />
          )}
        </div>
        <div style={styles.buttons}>
          <button style={styles.uploadButton} onClick={handleSubmitClick}>
            Submit
          </button>
          {predictedImage && (
            <button style={styles.enhanceButton} onClick={handleEnhanceClick}>
              Enhance
            </button>

          )}
          <button style={styles.captureButton} onClick={handleCaptureFrame}>
            Capture Frame
          </button>
          </div>
        {selectedFrameBefore && (
          <div style={styles.frameContainer}>
            <img
              src={selectedFrameBefore}
              alt="Captured Before"
              style={styles.capturedFrame}
            />
            <img
              src={selectedFrameAfter}
              alt="Captured After"
              style={styles.capturedFrame}
            />
          </div>
        )}
        </div>

      </div>
    
  );
};
export default VideoFrameCapture;

