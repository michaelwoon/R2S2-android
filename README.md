# Flood Warning Mobile App

Setup: 

Download Android Studio https://developer.android.com/studio/index.html (default options for everything)

Create a project (name and location are not important)

Wait for the initial build to finish

Under 'Tools' go to 'AVD Manager'

Create an Android Virtual Device by downloading any OS


Install Node.js: 'sudo apt install nodejs '

Download the repo: 'git clone https://github.com/michaelwoon/R2S2-android.git'

'cd R2S2-android'

'npm install -g react-native-cli'

'npm install'


Follow these instructions to let React Native use the AVD

https://stackoverflow.com/questions/44920676/sdk-location-not-found


Run:

Open Android Studio

Under 'Tools' go to 'AVD Manager'
Start the AVD by hitting the play button on the right side


Go to the R2S2-android directory

Run 'react-native run-android'

Use 'react-native log-android' in a different window for console.log() statements
