const VideoEncryptor = require("./videoEncryptor"); // Import the class
const videoEncryptor = new VideoEncryptor(); // Create an instance

const videoPath = "C:/Users/skan2/Desktop/testvideo.mp4"; // Specify your video file path
const encryptionKey = "aes-256-cbc"; // Use a 32-character encryption key
const encryptedPath = "C:/Users/skan2/Desktop.encrypted";
const decryptedPath = "C:/Users/skan2/Desktop.mp4";

try {
  // Encrypt the video
  const encryptMessage = videoEncryptor.encryptVideo(videoPath, encryptionKey, encryptedPath);
  console.log(encryptMessage);

  // Decrypt the video
  const decryptMessage = videoEncryptor.decryptVideo(encryptedPath, encryptionKey, decryptedPath);
  console.log(decryptMessage);
} catch (error) {
  console.error("An error occurred:", error.message);
}
