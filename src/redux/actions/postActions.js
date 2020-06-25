import axios from "axios";
const ENDPOINT = "http://localhost:5000"
// making variables to prevent spelling mistake
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAIL = "CREATE_POST_FAIL";
export const GET_ALL_POST_SUCCESS = "GET_ALL_POST_SUCCESS";
export const GET_ALL_POST_FAIL = "GET_ALL_POST_FAIL";
export const DELETE_POST_FAIL = "DELETE_POST"
export const DELETE_POST_SUCCESS ="DELETE_POST_SUCCESS"
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_FAIL = "CREATE_COMMENT_FAIL";
// dispatch from redux thunk
// data is object {topic, body}
export function createPost(data, cb) {
  return (dispatch) => {
    axios.post(ENDPOINT + "/createPost", data).then((response) => {
      console.log("Post Created. ", response);
      if (response.data.type === "success") {
        dispatch({
          type: CREATE_POST_SUCCESS,
          payload: response.data.post,
        });

        cb();
      } else {
        if (response.data.type === "error") {
          dispatch({
            type: CREATE_POST_FAIL,
          });
          alert(response.data.message);
        }
      }
    });
  };
}

export function getAllPosts(data) {
  return (dispatch) => {
    axios
      .get(ENDPOINT + "/getAllPosts")
      .then(function (response) {
        console.log("POSTS RESPONSE: ", response.data);
        if (response.data.type === "success") {
          dispatch({
            type: GET_ALL_POST_SUCCESS,
            payload: response.data.allPosts,
          });
        } else {
          dispatch({
            type: GET_ALL_POST_FAIL,
          });
          alert("Post Failed.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function deletePost(postId) {
  return (dispatch) => {
    axios
      .delete(ENDPOINT + "/deletePost/" + postId)
      .then(function (response) {
        console.log("POSTS RESPONSE: ", response.data);
        if (response.data.type === "success") {
          dispatch({
            type: DELETE_POST_SUCCESS,
            payload: postId,
          });
        } else {
         console.log("failed");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function addPostComment(data, cb) {
  return (dispatch) => {
    axios.post(ENDPOINT + "/createComment", data).then((response) => {
      console.log("Comment Created. ", response);
      if (response.data.type === "success") {
        dispatch({
          type: CREATE_COMMENT_SUCCESS,
          payload: {
            id: data.id,
            comment: data.comment
          },
        });
        alert(response.data.message);

        // CLOSES INPUT SECTION
        cb();
      } else {
        if (response.data.type === "error") {
          dispatch({
            type: CREATE_COMMENT_FAIL,
          });
          alert(response.data.message);
        }
      }
    });
  };
}