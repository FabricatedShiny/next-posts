import React from "react";
import {
	Modal,
	Box,
	Typography,
	Card,
	CardContent,
	CircularProgress,
	Alert,
	IconButton,
	Divider,
	Stack,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../lib/store";
import { clearPosts } from "../features/posts/postsSlice";

interface PostsModalProps {
	open: boolean;
	onClose: () => void;
	userName: string;
}

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: { xs: "90vw", sm: "70vw", md: "60vw" },
	maxWidth: "800px",
	maxHeight: "80vh",
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	p: 0,
	overflow: "hidden",
};

const PostsModal: React.FC<PostsModalProps> = ({ open, onClose, userName }) => {
	const dispatch = useDispatch();
	const { posts, loading, error } = useSelector(
		(state: RootState) => state.posts,
	);

	const handleClose = () => {
		dispatch(clearPosts());
		onClose();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="posts-modal-title"
			aria-describedby="posts-modal-description">
			<Box sx={modalStyle}>
				{/* Header */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						p: 2,
						borderBottom: 1,
						borderColor: "divider",
						bgcolor: "primary.main",
						color: "primary.contrastText",
					}}>
					<Typography id="posts-modal-title" variant="h6" component="h2">
						Posts by {userName}
					</Typography>
					<IconButton
						onClick={handleClose}
						sx={{ color: "primary.contrastText" }}
						aria-label="close">
						<CloseIcon />
					</IconButton>
				</Box>

				{/* Content */}
				<Box
					sx={{
						p: 2,
						maxHeight: "calc(80vh - 80px)",
						overflowY: "auto",
					}}>
					{loading && (
						<Box display="flex" justifyContent="center" p={4}>
							<CircularProgress />
						</Box>
					)}

					{error && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{error}
						</Alert>
					)}

					{!loading && !error && posts.length === 0 && (
						<Typography
							variant="body1"
							color="text.secondary"
							textAlign="center"
							py={4}>
							No posts found for this user.
						</Typography>
					)}

					{!loading && posts.length > 0 && (
						<Stack spacing={2}>
							<Typography variant="subtitle1" color="text.secondary">
								{posts.length} post{posts.length !== 1 ? "s" : ""} found
							</Typography>

							{posts.map((post) => (
								<Card key={post.id} variant="outlined">
									<CardContent>
										<Typography
											variant="h6"
											component="h3"
											gutterBottom
											fontWeight="bold">
											{post.title}
										</Typography>
										<Divider sx={{ mb: 2 }} />
										<Typography
											variant="body1"
											color="text.secondary"
											paragraph>
											{post.body}
										</Typography>
									</CardContent>
								</Card>
							))}
						</Stack>
					)}
				</Box>
			</Box>
		</Modal>
	);
};

export default PostsModal;
