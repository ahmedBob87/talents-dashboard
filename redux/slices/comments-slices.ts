import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";
import { api } from "../api";
import { RootState } from "../store";

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const commentsAdapter = createEntityAdapter({
  selectId: (comment: IComment) => comment.id,
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = commentsAdapter.getInitialState({
  status: "idle",
  error: null,
  // keep track of which comments have been modified locally
  locallyModified: {} as Record<string, string>,
});

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<IComment>) => {
      const newComment: IComment = {
        ...action.payload,
        id: Date.now(), // Generate a temporary ID
      };
      commentsAdapter.addOne(state, newComment);
      state.locallyModified[newComment.id] = "added";
    },

    updateComment: (
      state,
      action: PayloadAction<Pick<IComment, "id" | "body">>
    ) => {
      const { id, ...changes } = action.payload;
      commentsAdapter.updateOne(state, { id, changes });
      state.locallyModified[id] = state.locallyModified[id] || "updated";
    },

    deleteComment: (state, action: PayloadAction<number>) => {
      commentsAdapter.removeOne(state, action.payload);
      state.locallyModified[action.payload] = "deleted";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getCommentsByPostId.matchFulfilled,
      (state, action: PayloadAction<IComment[]>) => {
        // Filter out any comments that have been locally deleted
        const commentsToAdd = action.payload.filter(
          (comment) => state.locallyModified[comment.id] !== "deleted"
        );

        commentsAdapter.upsertMany(state, commentsToAdd);
      }
    );
  },
});

export const { addComment, updateComment, deleteComment } =
  commentsSlice.actions;

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
} = commentsAdapter.getSelectors((state: any) => state.comments);

export const selectCommentsByPostId = (state: RootState, postId: number) =>
  selectAllComments(state).filter(
    (comment: IComment) => comment.postId === postId
  );

export default commentsSlice.reducer;
