import axios from 'axios';

const hostUrl = 'https://afternoon-bastion-37946.herokuapp.com';

export const fetchMovementsByUser = movement => {
  axios.get(`${hostUrl}/api/uesrs/${movement.author_id}/movements`)
    .then( res => {
      console.log(res);
    })
    .catch( err => {
      console.log(err);
    });
};

export const postMovementByUser = movement => {
  axios.post(`${hostUrl}/api/movements)`)
    .then( res => {
      console.log(res);
    })
    .catch( err => {
      console.log(err);
    });
};

export const fetchWorkoutsByUser = workout => {
  axios.get(`${hostUrl}/api/users/${workout.author_id}/workouts/`)
    .then( res => {
      console.log(res);
    })
    .catch( err => {
      console.log(err);
    });
};

export const postWorkoutByUser = workout => {
  axios.post(`${hostUrl}/api/workouts)`)
    .then( res => {
      console.log(res);
    })
    .catch( err => {
      console.log(err);
    });
};
