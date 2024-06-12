import React, { useState } from 'react';
import { 
    Avatar,
    Button,
    ButtonGroup,
    Fab,
    Modal,
    Stack,
    styled,
    TextField,
    Tooltip,
    Typography,
    Box,
    IconButton
} from '@mui/material';
import { 
    Add as AddIcon,
    DateRange,
    EmojiEmotions,
    Image,
    PersonAdd,
    VideoCameraBack,
} from '@mui/icons-material';
import { createPost } from '../api/postApi';

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
});

const UserBox = styled(Box)({
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "20px",
});

const Add = ({ user, onNewPost }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showImageInput, setShowImageInput] = useState(false);

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
    };

    const handlePost = async () => {
        try {
            const postData = {
                userId: user.id,
                content: content,
                image: imageUrl
            };
            await createPost(postData);
            setOpen(false);
            setContent('');
            setImageUrl('');
            setShowImageInput(false);
            onNewPost();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <>
            <Tooltip 
                onClick={(e) => setOpen(true)}
                title="add" 
                sx={{ 
                    position: "fixed", 
                    bottom: 30, 
                    left: { xs: "calc(50% - 25px)", md: 30 },
                }}
            >
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <StyledModal
                open={open}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    width={400}
                    height={400}
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    p={3}
                    borderRadius={5}
                >
                    <Typography variant='h6' color={"gray"} textAlign={"center"}>
                        Create Post
                    </Typography>
                    <UserBox>
                        <Avatar 
                            src='https://randomuser.me/api/portraits/thumb/men/17.jpg'
                            sx={{ width: 30, height: 30 }}
                        />
                        <Typography fontWeight={500} variant='span'>
                            {user.name}
                        </Typography>
                    </UserBox>
                    <TextField 
                        sx={{ width: "100%" }}
                        id='standard-multiline-static'
                        multiline
                        rows={3}
                        placeholder="What's on your mind?"
                        variant='standard'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Stack direction={"row"} gap={1} mt={2} mb={3} alignItems="center">
                        <EmojiEmotions sx={{ cursor: "pointer" }} color="primary" />
                        <IconButton 
                            color="primary" 
                            aria-label="add image URL" 
                            component="span"
                            onClick={() => setShowImageInput(!showImageInput)}
                        >
                            <Image />
                        </IconButton>
                        <VideoCameraBack sx={{ cursor: "pointer" }} color="success" />
                        <PersonAdd sx={{ cursor: "pointer" }} color="error" />
                    </Stack>
                    {showImageInput && (
                        <TextField
                            sx={{ width: "100%", marginBottom: "10px" }}
                            placeholder="Enter image URL"
                            variant='standard'
                            value={imageUrl}
                            onChange={handleImageUrlChange}
                        />
                    )}
                   
                    <ButtonGroup
                        fullWidth
                        variant='contained'
                        aria-label='outlined primary button group'
                    >
                        <Button onClick={handlePost}>Post</Button>
                        <Button sx={{ width: "100px" }}>
                            <DateRange />
                        </Button>
                    </ButtonGroup>
                </Box>
            </StyledModal>
        </>
    );
}

export default Add;
