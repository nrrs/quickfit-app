#### Primary objective is making the .IPA 
- .ipa is a 'file' aka 'bundle' aka 'program' aka 'binary'
- it encompasses all the frontend code and lives on the iphone (when you click the icon on your iphone, it loads the .ipa file and then you are using the app)
- .xcodeproj 'file' is a precursor to the .ipa so we have to go back through Xcode to package the files into an .ipa that can live on iphones 
- the app can live on our iphones and have ALL functionality (including talking to backend server) for anyone with the xcode project - even if it is not on the app store 
- when a developer submits an app for approval to the app store, the .ipa is the 'attachment' that gets uploaded along with the application form 


#### What about backend?
- the django/backend files are deployed to a production server that must be awake when anyone tries to test the frontend and/or use the .ipa from a phone
- after the backend is deployed, the url of the production hosting platform/server is the prefix that React Native needs to fetch data
- backend files are never seen by Apple


#### Step 1: Move the frontend files to an Xcode Project
- Tutorial for using React Native with XCode: https://www.raywenderlich.com/165140/react-native-tutorial-building-ios-android-apps-javascript
- replace the urls with the urls of the production server (e.g. "https://....heroku..../api/movements/")
- make sure you are using https for production code (http is too vulnerable)


#### Step 2: Get the .ipa on your phone to demo it
- on top left, click on the device shown (displays a dropdown)
- select YOUR PERSONAL DEVICE for the build



#### Step 3: Transform .app into .ipa and Upload to Apple

*Tutorial: 
- https://www.christianengvall.se/react-native-build-for-ios-app-store/

* register as apple developer 
- make an LLC now if there is a possibility that you will put it on the app store if approved...even if you're pretty sure that no one is ever going to use the app
- one person makes the apple developer account for the team/LLC (used to be $100/yr; might be free now)

*Xcode / General / Signing 
- pick a developer team (your apple developer account)
- add certificate (provided by apple)
- restart Xcode 
- may need to use some terminal commands like xcru to 'sign' the app file or usr/bin/codesign

* change bundle identifier (e.g. com.yourcompany.projectname)
- bundle identifier is provided by apple to the apple developer
- you can add them from your apple developer account and can see them there 
- In Xcode, insert this under YourProject/info.plist/bundle identifier

* XC Archive 
- In Xcode, on top left, click on the device shown (displays a dropdown)
- select GENERIC IOS DEVICE for the build
- XC Archive transforms the code from xcodeproject to .ipa

* Click 'Upload to AppStore' (appears after archiving success)


#### Step 4: Complete application to App Store
- Login to apple developer account 
- itunesconnect.apple.com / login / myapps
- 


