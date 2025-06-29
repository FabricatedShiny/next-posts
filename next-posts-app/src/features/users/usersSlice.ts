import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

export interface UsersState {
	users: User[];
	filteredUsers: User[];
	searchTerm: string;
	sortKey: "name" | "email";
	sortOrder: "asc" | "desc";
	loading: boolean;
	error: string | null;
}

const initialState: UsersState = {
	users: [],
	filteredUsers: [],
	searchTerm: "",
	sortKey: "name",
	sortOrder: "asc",
	loading: false,
	error: null,
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/users");
	if (!response.ok) {
		throw new Error("Failed to fetch users");
	}
	return response.json() as Promise<User[]>;
});

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload;
			state.filteredUsers = filterAndSortUsers(
				state.users,
				action.payload,
				state.sortKey,
				state.sortOrder,
			);
		},
		setSortKey: (state, action: PayloadAction<"name" | "email">) => {
			state.sortKey = action.payload;
			state.filteredUsers = filterAndSortUsers(
				state.users,
				state.searchTerm,
				action.payload,
				state.sortOrder,
			);
		},
		setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
			state.sortOrder = action.payload;
			state.filteredUsers = filterAndSortUsers(
				state.users,
				state.searchTerm,
				state.sortKey,
				action.payload,
			);
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload;
				state.filteredUsers = filterAndSortUsers(
					action.payload,
					state.searchTerm,
					state.sortKey,
					state.sortOrder,
				);
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Failed to fetch users";
			});
	},
});

// Helper function to filter and sort users
function filterAndSortUsers(
	users: User[],
	searchTerm: string,
	sortKey: "name" | "email",
	sortOrder: "asc" | "desc",
): User[] {
	let filtered = users;

	// Apply search filter
	if (searchTerm) {
		const lowerSearchTerm = searchTerm.toLowerCase();
		filtered = users.filter(
			(user) =>
				user.name.toLowerCase().includes(lowerSearchTerm) ||
				user.email.toLowerCase().includes(lowerSearchTerm),
		);
	}

	// Apply sorting
	filtered.sort((a, b) => {
		const aValue = a[sortKey].toLowerCase();
		const bValue = b[sortKey].toLowerCase();

		if (sortOrder === "asc") {
			return aValue.localeCompare(bValue);
		} else {
			return bValue.localeCompare(aValue);
		}
	});

	return filtered;
}

export const { setSearchTerm, setSortKey, setSortOrder, clearError } =
	usersSlice.actions;
export default usersSlice.reducer;
