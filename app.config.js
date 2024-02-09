import 'dotenv/config';

export default { 
  "expo": {
    "name": "sanitrack",
    "slug": "sanitrack",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/msslogo.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "googleServicesFile": "./google-services.json",
      "adaptiveIcon": {
        "foregroundImage": "./assets/msslogo.png",
        "backgroundColor": "#4630EB"
      },
      "package": "com.orion.sanitrack"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "expo-document-picker"
    ],
    "extra": {
      "eas": {
        "projectId": "b3cb1efd-5bca-4061-b626-050774444c01"
      },
      cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
      baseUrl: process.env.SANITRACK_API_URI,
      cloudinaryUrl: process.env.CLOUDINARY_URI,
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      jwtKey: process.env.JWT_KEY
      
    },
    "owner": "test-kali"
  }
}
