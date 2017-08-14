# QuickFit

An exercise generator that allows you to keep track of workouts! This mobile app allows users to add and select exercises, generate and customize workouts, utilize specialized timers, and store and review progress.

>“I really think a champion is defined not by their wins but by how they can recover when they fall." - Serena Williams

>“Grind Hard, Shine Hard.” – Dwayne "The Rock" Johnson

>"At the end of the day, if I can say I had fun, it was a good day." - Simone Biles

### Disclaimer of Liability
The Quickfit app includes features that promote physical activity.  Consider the risks involved and consult with your medical professional before engaging in any physical activity. The creators and collaborators of the Quickfit app are not responsible or liable for any injuries or damages you may sustain that result from your use of, or inability to use, the features of the Quickfit app.

Development plans include a modal for first-time users and users not logged in that forces them to accept liability waiver before using app features.

### Background

As a way to promote a healthy lifestyle, our goal is to create an easy to use application that provides a simple way to create an engaging exercise experience. Right out of the box, our users can immediately generate a randomize, yet balanced, workout based on the  difficulty level of their choice.

Whether you are new to fitness or an experienced athlete, we strive to provide an easy to use interface that anyone can use right out of the box.

Fitness is the first step to greatness!

## Features

- [x] On tap, generate a random workout based on the difficulty level of your choice.
- [x] Add your own custom movements and categorize them by type and difficulty.
- [x] Create custom workouts based on your custom movements, along with the ones we provided.
- [x] Timing Options!
  * Counter: Count down from a specified duration
  * Interval: Set rounds and durations for interval training
- [x] Pause your workouts and resume where you left off.
- [x] Add post-workout notes for your perusal.
- [x] Hold down cards to display post-workout notes and movement description in a tool-tip.
- [x] Receive visual and physical cues as to when to start and finish your workout.
- [x] Sign up with an editable profile.
- [x] As a member, track your workouts to monitor your progress.

## Stack

### Technologies
- [Django](https://www.djangoproject.com/) handles our backend: serving APIs, ensuring security, and handling auth.
- [OAuth](https://oauth.net/) was implemented to allow login through 3rd party platforms.
- [React Native](https://facebook.github.io/react-native/) is used for our frontend, mobile framework.
- [Expo.io](https://expo.io) is a tool that allows us to build and share native applications across iOS.

### Libraries
- [Axios](https://github.com/mzabriskie/axios) is a frontend library that streamlines HTTP requests to our API endpoints.
- [Moment.js](https://momentjs.com/) JavaScript time library used for displaying semantic dates for our users to track their workouts.

## Collaborators

[![Justin Austria][pic_ja]][git_ja]  | [![Chris Brickey][pic_cb]][git_cb] | [![Norris Kwan][pic_nk]][git_nk] | [![Kevin Shen][pic_ks]][git_ks] |
:------------------:|:-----------------------:|:-----------------------:|:-------------:|
[Justin Austria][git_ja] | [Chris Brickey][git_cb] | [Norris Kwan][git_nk] | [Kevin Shen][git_ks]

[git_ja]: https://github.com/Tulen
[git_cb]: https://github.com/chrisbrickey
[git_nk]: https://github.com/nrrs
[git_ks]: https://github.com/kevinshenyang07
[pic_ja]: https://avatars1.githubusercontent.com/u/11968940?v=4&s=200
[pic_cb]: https://avatars1.githubusercontent.com/u/7623023?v=4&s=200
[pic_nk]: https://avatars1.githubusercontent.com/u/425246?v=4&s=200
[pic_ks]: https://avatars1.githubusercontent.com/u/10000295?v=4&s=200

## Future Plans

- [ ] Add calendar for workout tracking
- [ ] Social element to share workouts and progress
- [ ] Hardware access including camera for progress tracking
- [ ] Apple App Store
