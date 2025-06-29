import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface PostsState {
	posts: Post[];
	selectedUserId: number | null;
	loading: boolean;
	error: string | null;
}

const initialState: PostsState = {
	posts: [],
	selectedUserId: null,
	loading: false,
	error: null,
};

// Async thunk for fetching posts by user ID
export const fetchPostsByUserId = createAsyncThunk(
	"posts/fetchPostsByUserId",
	async (userId: number) => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
		);
		if (!response.ok) {
			throw new Error("Failed to fetch posts");
		}
		return response.json() as Promise<Post[]>;
	},
);

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setSelectedUserId: (state, action: PayloadAction<number | null>) => {
			state.selectedUserId = action.payload;
		},
		clearPosts: (state) => {
			state.posts = [];
			state.selectedUserId = null;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPostsByUserId.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPostsByUserId.fulfilled, (state, action) => {
				state.loading = false;
				state.posts = action.payload;
			})
			.addCase(fetchPostsByUserId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch posts";
			});
	},
});

export const { setSelectedUserId, clearPosts, clearError } = postsSlice.actions;
export default postsSlice.reducer;
