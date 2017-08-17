# QuickFit

An exercise generator that allows you to keep track of workouts! This SPA allows users to add or select exercises along with some timing variations.

Fitness is the first step to greatness!

### Background

> “I really think a champion is defined not by their wins but by how they can recover when they fall." - Serena Williams

As a way to promote a healthy lifestyle, our goal is to create an easy to use application that provides a simple way to create an engaging exercise experience. This application aims to provide the ability to add custom movements or select from a list of basic movements, frame it within popular timing conventions, and provide visual, audio, and physical cues to the athlete.

Whether you are new to fitness or an experienced athlete, we strive to provide an easy to use interface that anyone can use right out of the box.

## Feature Functionality & MVP

- [x] Workout generator with timer and exercise selections
- [x] Three timing options
  * Counter
    - Duration
    - Toggle count up or down
    - IE. count up to 15mins
  * Interval
    - Rounds
    - Durations/Intervals
    - IE. 5 Rounds of 5 minutes of work
  * Tabata
    - Rounds
    - 20s Work, 10s Rest
    - IE. 8 Rounds of 20s work/10s rest, totaling 4mins
- [x] Visual and physical* cues to alert user of interface changes
- [x] User creation and login
- [x] An easy way to retrieve past workouts to monitor progress
- [x] Smooth and polished frontend for Apple App Store submission/acceptance

TBD*

## Future Features

- [ ] Social element to share workouts and progress
- [ ] Hardware access for added functionality and features

## Wireframes

![Whiteboard](/docs/images/FullSizeRender.jpg)

![generator mockup](/docs/images/2-Generator.png)

![add mockup](/docs/images/4-AddExercise.png)

## Stack & Challenges

### Technologies
- [Django](https://www.djangoproject.com/) handles our backend: serving APIs, ensuring security, and handling auth.
- [React Native](https://facebook.github.io/react-native/) is used for our frontend, mobile framework. Providing quick rendering and a smooth experience.
- [React/Redux](https://github.com/reactjs/react-redux) utilizes unidirectional data flow for our state's management
- [Expo.io](https://expo.io) is a tool that allows us to build and share native applications across iOS.
- [Axios](https://github.com/mzabriskie/axios) is a frontend library that streamlines HTTP requests to our API endpoints.

### Challenges

The main technical challenges will include:

1. Learning two new frameworks, `Django` and `React Native`
2. Rapid prototyping amongst multi-member team
3. Multi-member git collaboration
4. How to access API endpoint? Utilize built-in Fetch tool or 3rd party library ([Axios](https://github.com/mzabriskie/axios))
5. Production hosting on Heroku (not common to host Django applications)

## Weekend Accomplishments
1. Functioning prototypes for both back and frontends.
2. Chris Brickey completed Django tutorials and set up a working backend environment.
3. Justin Austria completed React Native tutorials and set up a frontend/mobile testing environment.
4. Kevin Shen assisted Chris Brickey with research, implementation, and planning.
5. Norris Kwan assisted Justin Austria with research, implementation, and planning.
6. Our team mapped out our MVPs, wireframes, component hierarchy, schema, and state shape.
7. Chris Brickey created wireframes.
8. Norris Kwan and Justin Austria completed README draft and proposal.


## Implementation Timeline

**Day 1**:

- Continue progress from the weekend. Achieve successful request/response from front to backend. (Chris & Kevin)
- Create main features' visual components. (Justin & Norris)

**Day 2**:

- RESTful API and OAuth (Chris & Kevin)
- Build timer logic (Justin & Norris)

**Day 3**:

- Finalize backend functionality and confirm security (Chris & Kevin)
- Finalize remaining components for add and profile (Justin & Norris)
- Research and take steps towards entering mobile market, App Store. (all members)

**Day 4**:

- Research and incorporate gestures and physical alerts (Justin & Norris)
- Write detailed documentation regarding backend for production readme (Chris & Kevin)
- Debug, polish, and test functionality and UX (all members)

**Day 5**:

- Finalize production readme (Justin & Norris)
- Debug, polish, and test functionality and UX (all members)

## Group Members and Primary Roles

### Team
[![Justin Austria][pic_ja]][git_ja] | [![Norris Kwan][pic_nk]][git_nk] | [![Kevin Shen][pic_ks]][git_ks] |
:------------------:|:-----------------------:|:-----------------------:|:-------------:|
[Justin Austria][git_ja] | [Norris Kwan][git_nk] | [Kevin Shen][git_ks]

[git_ja]: https://github.com/Tulen
[git_cb]: https://github.com/chrisbrickey
[git_nk]: https://github.com/nrrs
[git_ks]: https://github.com/kevinshenyang07
[pic_ja]: https://avatars1.githubusercontent.com/u/11968940?v=4&s=200
[pic_cb]: https://avatars1.githubusercontent.com/u/7623023?v=4&s=200
[pic_nk]: https://avatars1.githubusercontent.com/u/425246?v=4&s=200
[pic_ks]: https://avatars1.githubusercontent.com/u/10000295?v=4&s=200

### Primary Focus

All members have and will participate in research, brainstorming, troubleshooting, and development. There are no hard lines between our responsibilities. We're working as a team and supporting each other in all/any ways possible.

#### **Backend:** Chris Brickey & Kevin Shen
Both backend members will be responsible for creating auth, API endpoints, and backend routing.

#### **Frontend:** Justin Austria & Norris Kwan
Both frontend members will be responsible for the UX of the application along with handling utility and state management.
