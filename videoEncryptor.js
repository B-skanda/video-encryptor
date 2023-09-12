const fs = require("fs");
const path = require("path");
const crypto = require("crypto-js");

class VideoEncryptor {
  constructor() {}

  encryptVideo(videoPath, encryptionKey, outputPath) {
    try {
      if (!fs.existsSync(videoPath)) {
        throw new Error(`Video file does not exist at ${videoPath}`);
      }

      const videoBuffer = fs.readFileSync(videoPath);
      const videoString = videoBuffer.toString("base64");
      const encryptedString = crypto.AES.encrypt(
        videoString,
        encryptionKey
      ).toString();

      outputPath = this.replaceExtension(outputPath, "encrypted");

      fs.writeFileSync(outputPath, encryptedString);
      console.log(`Video encrypted and saved as ${outputPath}`);
    } catch (error) {
      console.error(`Error during video encryption: ${error.message}`);
    }
  }

  decryptVideo(encryptedFilePath, encryptionKey, outputPath) {
    try {
      if (!fs.existsSync(encryptedFilePath)) {
        throw new Error(
          `Encrypted video file does not exist at ${encryptedFilePath}`
        );
      }

      const encryptedString = fs.readFileSync(encryptedFilePath, "utf8");
      const decryptedBytes = crypto.AES.decrypt(encryptedString, encryptionKey);

      if (!decryptedBytes.sigBytes) {
        throw new Error("Invalid decryption key or corrupted encrypted file.");
      }

      const videoBuffer = Buffer.from(
        decryptedBytes.toString(crypto.enc.Utf8),
        "base64"
      );

      if (!path.extname(outputPath)) {
        outputPath = `${outputPath}.mp4`;
      }

      if (fs.existsSync(outputPath)) {
        throw new Error(
          `Output file already exists at ${outputPath}. Choose a different path.`
        );
      }

      fs.writeFileSync(outputPath, videoBuffer);
      console.log(`Video decrypted and saved as ${outputPath}`);
    } catch (error) {
      console.error(`Error during video decryption: ${error.message}`);
    }
  }

  replaceExtension(filePath, newExtension) {
    const currentExtension = path.extname(filePath);
    const filenameWithoutExtension = path.basename(filePath, currentExtension);
    return `${filenameWithoutExtension}.${newExtension}`;
  }
}

module.exports = VideoEncryptor;
