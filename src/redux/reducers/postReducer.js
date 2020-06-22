import {
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  GET_ALL_POST_SUCCESS,
  GET_ALL_POST_FAIL,
  DELETE_POST_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL
} from "../actions/postActions";

const initState = {
  posts: [],
};

export default function postReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_POST_SUCCESS:{

      let post = action.payload;
      let posts = state.posts;
      posts.push(post);
      
      return {
        ...state,
        posts,
      };
    }

    case CREATE_POST_FAIL:
      return state;

    case GET_ALL_POST_SUCCESS: {
      // ADDING PAYLOAD TO POSTS

      let allPosts = action.payload;
      return {
        // PUSHING DATA INTO EMPTY POSTS ARRAY
        ...state,
        posts: allPosts,
      };
    }

    case GET_ALL_POST_FAIL:
      return state;
      
    case DELETE_POST_SUCCESS:{
      let postIdToDelete = action.payload;
      let newPosts = state.posts.filter(({_id}) => _id !== postIdToDelete);
      
      return {
        ...state,
        posts: newPosts
      };
    }

    case CREATE_COMMENT_SUCCESS: {
      console.log("PAYLOAD: ", action.payload)
      console.log("INITIAL STATE: ", state)
      let comment = action.payload.comment;
      let filteredpost = state.posts.map((post) => {
        console.log("SINGLE PSOT:", post)
        if(post._id === action.payload.id) {
          let comments = post.comments;
          comments.push(comment);

          console.log("All Comments: ", comments)
          return {
            ...post,
            comments
          };
        } else {
          return post;
        }
      });
      console.log("filteredpost: ", filteredpost)

      return {
        ...state,
        posts: filteredpost
      }
    }

    case CREATE_COMMENT_FAIL:
      return state;  


    default:
      return state;
  }
}
