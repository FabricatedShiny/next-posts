import React, { useEffect, useState } from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	Button,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress,
	Alert,
	Snackbar,
	Paper,
	Chip,
	IconButton,
	useTheme,
	Stack,
	SelectChangeEvent,
} from "@mui/material";
import {
	Email as EmailIcon,
	Business as BusinessIcon,
	LocationCity as LocationIcon,
	Search as SearchIcon,
	Sort as SortIcon,
	Brightness4 as DarkModeIcon,
	Brightness7 as LightModeIcon,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../lib/store";
import {
	fetchUsers,
	setSearchTerm,
	setSortKey,
	setSortOrder,
	clearError,
	User,
} from "../features/users/usersSlice";
import {
	fetchPostsByUserId,
	setSelectedUserId,
} from "../features/posts/postsSlice";
import PostsModal from "./PostsModal";
import { saveToLocalStorage, loadFromLocalStorage } from "../lib/localStorage";

interface UsersDashboardProps {
	onToggleTheme: () => void;
	isDarkMode: boolean;
}

const UsersDashboard: React.FC<UsersDashboardProps> = ({
	onToggleTheme,
	isDarkMode,
}) => {
	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>();

	const { filteredUsers, searchTerm, sortKey, sortOrder, loading, error } =
		useSelector((state: RootState) => state.users);

	const [modalOpen, setModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	// Load saved preferences on mount
	useEffect(() => {
		const savedSearch = loadFromLocalStorage("userSearch");
		const savedSort = loadFromLocalStorage("userSort");

		if (savedSearch) {
			dispatch(setSearchTerm(savedSearch));
		}

		if (savedSort) {
			dispatch(setSortKey(savedSort.key));
			dispatch(setSortOrder(savedSort.order));
		}

		dispatch(fetchUsers());
	}, [dispatch]);

	// Save preferences to localStorage
	useEffect(() => {
		saveToLocalStorage("userSearch", searchTerm);
	}, [searchTerm]);

	useEffect(() => {
		saveToLocalStorage("userSort", { key: sortKey, order: sortOrder });
	}, [sortKey, sortOrder]);

	// Handle error display
	useEffect(() => {
		if (error) {
			setSnackbarOpen(true);
		}
	}, [error]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchTerm(event.target.value));
	};

	const handleSortKeyChange = (event: SelectChangeEvent) => {
		dispatch(setSortKey(event.target.value as "name" | "email"));
	};

	const handleSortOrderChange = (event: SelectChangeEvent) => {
		dispatch(setSortOrder(event.target.value as "asc" | "desc"));
	};

	const handleViewPosts = async (user: User) => {
		setSelectedUser(user);
		dispatch(setSelectedUserId(user.id));
		dispatch(fetchPostsByUserId(user.id));
		setModalOpen(true);
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setSelectedUser(null);
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
		dispatch(clearError());
	};

	const highlightText = (text: string, searchTerm: string) => {
		if (!searchTerm) return text;

		const regex = new RegExp(`(${searchTerm})`, "gi");
		const parts = text.split(regex);

		return parts.map((part, index) =>
			regex.test(part) ? (
				<Box
					key={index}
					component="span"
					sx={{
						backgroundColor: theme.palette.warning.light,
						fontWeight: "bold",
					}}>
					{part}
				</Box>
			) : (
				part
			),
		);
	};

	return (
		<Box sx={{ p: { xs: 2, md: 3 } }}>
			{/* Header */}
			<Paper elevation={1} sx={{ p: 3, mb: 3 }}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					mb={2}>
					<Typography variant="h4" component="h1" gutterBottom>
						Users Dashboard
					</Typography>
					<IconButton onClick={onToggleTheme} color="inherit">
						{isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
					</IconButton>
				</Stack>

				{/* Search and Sort Controls */}
				<Stack spacing={2}>
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" },
							gap: 2,
							alignItems: "center",
						}}>
						<TextField
							fullWidth
							label="Search Users"
							placeholder="Search by name or email..."
							value={searchTerm}
							onChange={handleSearchChange}
							InputProps={{
								startAdornment: (
									<SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
								),
							}}
							variant="outlined"
						/>

						<FormControl fullWidth>
							<InputLabel>Sort By</InputLabel>
							<Select
								value={sortKey}
								onChange={handleSortKeyChange}
								label="Sort By"
								startAdornment={
									<SortIcon sx={{ mr: 1, color: "text.secondary" }} />
								}>
								<MenuItem value="name">Name</MenuItem>
								<MenuItem value="email">Email</MenuItem>
							</Select>
						</FormControl>

						<FormControl fullWidth>
							<InputLabel>Order</InputLabel>
							<Select
								value={sortOrder}
								onChange={handleSortOrderChange}
								label="Order">
								<MenuItem value="asc">Ascending</MenuItem>
								<MenuItem value="desc">Descending</MenuItem>
							</Select>
						</FormControl>
					</Box>

					{/* Results Count */}
					<Box>
						<Chip
							label={`${filteredUsers.length} user${
								filteredUsers.length !== 1 ? "s" : ""
							} found`}
							color="primary"
							variant="outlined"
						/>
					</Box>
				</Stack>
			</Paper>

			{/* Loading State */}
			{loading && (
				<Box display="flex" justifyContent="center" p={4}>
					<CircularProgress size={60} />
				</Box>
			)}

			{/* Users Grid */}
			{!loading && (
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: {
							xs: "1fr",
							sm: "repeat(2, 1fr)",
							lg: "repeat(3, 1fr)",
						},
						gap: 3,
					}}>
					{filteredUsers.map((user) => (
						<Card
							key={user.id}
							elevation={2}
							sx={{
								"height": "100%",
								"display": "flex",
								"flexDirection": "column",
								"transition": "transform 0.2s, box-shadow 0.2s",
								"&:hover": {
									transform: "translateY(-4px)",
									boxShadow: 4,
								},
							}}>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography
									variant="h6"
									component="h2"
									gutterBottom
									fontWeight="bold">
									{highlightText(user.name, searchTerm)}
								</Typography>

								<Stack spacing={1.5}>
									<Box display="flex" alignItems="center" gap={1}>
										<EmailIcon color="action" fontSize="small" />
										<Typography variant="body2" color="text.secondary">
											{highlightText(user.email, searchTerm)}
										</Typography>
									</Box>

									<Box display="flex" alignItems="center" gap={1}>
										<BusinessIcon color="action" fontSize="small" />
										<Typography variant="body2" color="text.secondary">
											{user.company.name}
										</Typography>
									</Box>

									<Box display="flex" alignItems="center" gap={1}>
										<LocationIcon color="action" fontSize="small" />
										<Typography variant="body2" color="text.secondary">
											{user.address.city}
										</Typography>
									</Box>
								</Stack>
							</CardContent>

							<Box p={2} pt={0}>
								<Button
									variant="contained"
									fullWidth
									onClick={() => handleViewPosts(user)}
									sx={{
										borderRadius: 2,
										textTransform: "none",
										fontWeight: "bold",
									}}>
									View Posts
								</Button>
							</Box>
						</Card>
					))}
				</Box>
			)}

			{/* No Results */}
			{!loading && filteredUsers.length === 0 && (
				<Paper elevation={1} sx={{ p: 4, textAlign: "center" }}>
					<Typography variant="h6" color="text.secondary" gutterBottom>
						No users found
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Try adjusting your search terms or filters
					</Typography>
				</Paper>
			)}

			{/* Posts Modal */}
			<PostsModal
				open={modalOpen}
				onClose={handleCloseModal}
				userName={selectedUser?.name || ""}
			/>

			{/* Error Snackbar */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
				<Alert
					onClose={handleCloseSnackbar}
					severity="error"
					sx={{ width: "100%" }}>
					{error}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default UsersDashboard;
