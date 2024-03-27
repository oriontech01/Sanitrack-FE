import 'dotenv/config';

export default {
  expo: {
    name: 'sanitrack',
    slug: 'sanitrack',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/msslogo.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#fff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      googleServicesFile: './google-services.json',
      adaptiveIcon: {
        foregroundImage: './assets/msslogo.png',
        backgroundColor: '#4630EB',
      },
      package: 'com.orion.sanitrack',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      '@react-native-firebase/app',
      '@react-native-firebase/auth',
      'expo-document-picker',
      [
        'expo-camera',
        {
          cameraPermission: 'Allow $(PRODUCT_NAME) to access your camera.',
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            usesCleartextTraffic: true, // ? enable HTTP requests
          },
          ios: {
            flipper: true,
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: '64587dbc-ef7e-4189-96d9-7b23d99821f7',
        name: 'native-boy',
        baseUrl: process.env.SANITRACK_API_URI,
      },
      cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
      baseUrl: process.env.SANITRACK_API_URI,
      cloudinaryUrl: process.env.CLOUDINARY_URI,
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      jwtKey: process.env.JWT_KEY,
      chatEngineProjectId: process.env.CHAT_ENGINE_PROJECT_ID,
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    },
    owner: 'native-boy',
  },
};
