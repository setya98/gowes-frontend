import { UPLOAD_MULTIPLE_IMAGE } from "../constant";

export const uploadMultipleImage = (photos) => (dispatch) => {
  dispatch({
    type: UPLOAD_MULTIPLE_IMAGE,
    payload: {
      photos: photos,
    },
  });
};