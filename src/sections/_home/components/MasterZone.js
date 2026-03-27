import PropTypes from 'prop-types';
// @mui
import AddIcon from '@mui/icons-material/Add';
import PrevIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { MotionViewport } from 'src/components/animate';
import Image from 'src/components/image';
import { useAuthContext } from '../../../auth/useAuthContext';
import firebaseApp from '../../../firebase';

// ----------------------------------------------------------------------

// Initialize Firestore
const db = getFirestore(firebaseApp);

export default function MasterZone({ onChange }) {
  MasterZone.propTypes = {
    onChange: PropTypes.func.isRequired,
  };
  const { user } = useAuthContext();
  console.log(user.role);
  const checkExpireDate = () => {
    const sec = user.expire_date ? user.expire_date.seconds * 1000 : 0;
    const expireDate = new Date(sec);
    const currentDate = new Date();
    return currentDate.getTime() < expireDate.getTime();
  };

  const isSubscribed = user.membership === '10' && checkExpireDate();
  const [masterZoneMessages, setMasterZoneMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [addMessage, setAddMessage] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [attachImage, setAttachImage] = useState();
  const [title, setTitle] = useState('');
  const [analyse, setAnalyse] = useState('');
  const [conclusion, setConclusion] = useState('');

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deletedMessage, setDeletedMessage] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchMasterClassZone = useCallback(async () => {
    try {
      // Reference to the masterclass_zone collection
      const collectionRef = collection(db, 'masterclass_zone');
      // Create a query against the collection
      const q = query(
        collectionRef,
        orderBy('date', 'desc') // Sort by date in descending order
      );
      // Get a snapshot of the collection
      const messagesSnapshot = await getDocs(q);
      // Map through documents and set data in state
      const messageList = messagesSnapshot.docs.map((element) => ({
        id: element.id,
        ...element.data(),
      }));
      setMasterZoneMessages(messageList);
    } catch (error) {
      console.error('Error fetching tips: ', error);
    }
  }, []);

  useEffect(() => {
    fetchMasterClassZone();
  }, [fetchMasterClassZone]);

  function formatDate(dateString) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${dayName}, ${day} ${month}, ${year} ${hour}:${minute}`;
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeMessage = (e) => {
    setAnalyse(e.target.value);
  };

  const handleChangeConclusion = (e) => {
    setConclusion(e.target.value);
  };

  const handleAddMessage = async () => {
    setLoadingMessage(true);

    try {
      const messageData = {
        date: new Date(),
        title,
        analyse,
        conclusion,
        imageUrl: attachImage,
      };
      await addDoc(collection(db, 'masterclass_zone'), messageData);
      setTitle('');
      setAnalyse('');
      setConclusion('');
      setAttachImage();
      setAddMessage(false);
      fetchMasterClassZone();
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setLoadingMessage(false);
    }
  };

  const handleSubscription = () => {
    onChange(user?.membership);
  };

  const handleDeleteMessage = async () => {
    if (!deletedMessage) return;

    setDeleteLoading(true);
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, 'masterclass_zone', deletedMessage.id));

      // Refresh the messages list
      await fetchMasterClassZone();

      // Close the delete confirmation dialog
      setDeleteConfirm(false);
      setDeletedMessage(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  function createTypographyWithLineBreaks(text) {
    // Split the text by new line characters
    const lines = text.split('\n');

    // Map the lines to Typography components, adding <br /> elements in between
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== lines.length - 1 && <br />} {/* Don't add <br /> after the last line */}
      </React.Fragment>
    ));
  }

  return (
    <Container
      component={MotionViewport}
      sx={{
        px: 3,
      }}
    >
      <Dialog
        open={addMessage}
        onClose={() => setAddMessage(false)}
        PaperProps={{
          style: {
            px: 2,
            width: '100%',
            background: '#0d1117',
            border: '2px solid #076af478',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFF' }}>Add Message</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            type="text"
            margin="dense"
            label="Title"
            name="title"
            onChange={(e) => handleChangeTitle(e)}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 1,
            }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 400 }}>
              Image
            </Typography>
            {attachImage && (
              <Image
                visibleByDefault
                disabledEffect
                alt="Image"
                src={attachImage}
                sx={{ width: 50, height: 50, borderRadius: 1 }}
              />
            )}
          </Box>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.onload = (event) => {
                  setAttachImage(event.target.result);
                };

                reader.readAsDataURL(file);
              }
            }}
          />

          <TextField
            autoFocus
            fullWidth
            multiline
            rows={10}
            type="text"
            margin="dense"
            label="Analyse"
            name="analyse"
            onChange={(e) => handleChangeMessage(e)}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />

          <TextField
            autoFocus
            fullWidth
            multiline
            rows={8}
            type="text"
            margin="dense"
            label="Conclusion"
            name="conclusion"
            onChange={(e) => handleChangeConclusion(e)}
            sx={{
              input: {
                color: '#FFF',
              },
              label: {
                color: '#FFF !important',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            sx={{ color: '#FFF', backgroundColor: 'transparent' }}
            onClick={() => {
              setTitle('');
              setAnalyse('');
              setAttachImage();
              setAddMessage(false);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={loadingMessage}
            variant="contained"
            sx={{ background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8 } }}
            onClick={() => handleAddMessage()}
          >
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        PaperProps={{
          style: {
            px: 2,
            width: '100%',
            background: '#0d1117',
            border: '2px solid #076af478',
          },
        }}
      >
        <DialogTitle sx={{ color: '#FFF' }}>Delete Message</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 1,
            }}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 400 }}>
              Are you sure you want to delete the message?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            sx={{ color: '#FFF', backgroundColor: 'transparent' }}
            onClick={() => {
              setDeleteConfirm(false);
            }}
          >
            No
          </Button>
          <LoadingButton
            loading={deleteLoading}
            variant="contained"
            sx={{ background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8 } }}
            onClick={() => handleDeleteMessage()}
          >
            Yes
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {isSubscribed ? (
        <Box
          sx={{
            mt: 1,
            mx: 'auto',
            maxWidth: 700,
            textAlign: 'center',
            minHeight: '80vh',
            position: 'relative',
          }}
        >
          {(selectedMessage === undefined || selectedMessage === null) && (
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', height: '100%' }}
            >
              {masterZoneMessages.map((message, index) => (
                <Box
                  sx={{
                    mt: index > 0 ? 3 : 0,
                    px: 2,
                  }}
                >
                  {message.imageUrl && (
                    <Box
                      sx={{
                        backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                        minWidth: '700px',
                        borderRadius: '24px',
                        padding: '2px',
                        transition: 'all .2s',
                        position: 'relative',
                        transform: 'none',
                        boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMessage(message);
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: '#0d1117',
                          width: '100%',
                          height: '100%',
                          border: '1px solid rgba(239, 240, 246, .08)',
                          borderRadius: '24px',
                          transition: 'all .2s',
                          position: 'relative',
                          boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                          px: 3,
                          py: 4,
                          justifyContent: 'center',
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Box
                          component="img"
                          alt="Logo"
                          src={message.imageUrl}
                          sx={{
                            borderRadius: 1,
                            width: '300px',
                            height: '100%',
                          }}
                        />
                      </Box>
                      {user?.role === 'administrator' && (
                        <DeleteIcon
                          sx={{
                            position: 'absolute',
                            right: '20px',
                            top: '20px',
                            cursor: 'pointer'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm(true);
                            setDeletedMessage(message);
                          }}
                        />
                      )}
                    </Box>
                  )}
                </Box>
              ))}
              {user?.role === 'administrator' && (
                <Fab
                  color="primary"
                  aria-label="add"
                  sx={{
                    position: 'fixed',
                    bottom: 50,
                    right: 24,
                    background: 'linear-gradient(#047efc, #12488f)',
                    ':hover': { opacity: 0.8 },
                  }}
                  onClick={() => setAddMessage(true)}
                >
                  <AddIcon />
                </Fab>
              )}
            </Box>
          )}
          {selectedMessage && (
            <>
              <Box
                sx={{
                  alignItems: 'left',
                  display: 'flex',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedMessage(null)}
              >
                <PrevIcon />
              </Box>
              <Box
                sx={{
                  backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                  borderRadius: 1,
                  padding: '2px',
                  transition: 'all .2s',
                  position: 'relative',
                  transform: 'none',
                  boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
                  mt: 3,
                  mb: 3,
                  maxWidth: 720,
                }}
              >
                <Paper
                  sx={{
                    boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                    backgroundColor: '#0d1117',
                    border: '0px solid rgba(239, 240, 246, .08)',
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'linear-gradient(45deg, #0863e3, transparent)',
                    }}
                  >
                    <Typography variant="h7" sx={{ color: 'primary.contrastText', mt: 1 }}>
                      {formatDate(selectedMessage.date.toDate())}
                    </Typography>
                    <Typography variant="h7" sx={{ color: 'primary.contrastText', mb: 1 }}>
                      {selectedMessage.title}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      mt: 3,
                      px: 4,
                    }}
                  >
                    <Box
                      component="img"
                      alt="Logo"
                      src={selectedMessage.imageUrl}
                      sx={{
                        borderRadius: 1,
                        width: '680px',
                        height: '100%',
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      pb: 2,
                      borderBottomLeftRadius: '6px',
                      borderBottomRightRadius: '6px',
                    }}
                  >
                    <Typography
                      variant="h7"
                      sx={{
                        color: '#FFF',
                        px: 4,
                        mt: 3,
                        mb: 2,
                        textAlign: 'left',
                        fontWeight: 600,
                        textDecoration: 'underline',
                        textDecorationColor: '#FFF',
                      }}
                    >
                      Analyse
                    </Typography>
                    <Typography
                      variant="h7"
                      sx={{ color: '#FFF', px: 4, mb: 1, textAlign: 'left' }}
                    >
                      {createTypographyWithLineBreaks(selectedMessage.analyse)}
                    </Typography>
                    <Typography
                      variant="h7"
                      sx={{
                        color: '#FFF',
                        px: 4,
                        mt: 2,
                        mb: 2,
                        textAlign: 'left',
                        fontWeight: 600,
                        textDecoration: 'underline',
                        textDecorationColor: '#FFF',
                      }}
                    >
                      Conclusion
                    </Typography>
                    <Typography
                      variant="h7"
                      sx={{ color: '#FFF', px: 4, mb: 1, textAlign: 'left' }}
                    >
                      {createTypographyWithLineBreaks(selectedMessage.conclusion)}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </>
          )}
        </Box>
      ) : (
        <Paper
          sx={{
            borderRadius: 3,
            textAlign: 'center',
            backgroundColor: 'transparent',
            mt: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              mt: 0,
              columnGap: 1,
              rowGap: 0,
              justifyContent: 'center',
              px: 2,
            }}
          >
            <Box
              sx={{
                backgroundImage: 'linear-gradient(326deg, #076af4, #0d1117 49%, #086af5)',
                minWidth: '540px',
                borderRadius: '24px',
                padding: '2px',
                transition: 'all .2s',
                position: 'relative',
                transform: 'none',
                boxShadow: '0 0 70px rgba(9, 134, 251, .19)',
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#0d1117',
                  width: '100%',
                  height: '100%',
                  border: '1px solid rgba(239, 240, 246, .08)',
                  borderRadius: '24px',
                  transition: 'all .2s',
                  position: 'relative',
                  boxShadow: '0 2px 7px rgba(20, 20, 43, .06)',
                  px: 3,
                  py: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    width: '77px',
                    height: '77px',
                    border: '2px solid #0866eb',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 2,
                    justifyContent: 'center',
                  }}
                >
                  <RemoveModeratorIcon />
                </Box>
                <Typography
                  sx={{ color: 'rgb(203, 213, 225)', fontWeight: 400, fontSize: '36px', mt: 2 }}
                >
                  Purchase Membership
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(203, 213, 225, 0.5)',
                    fontWeight: 400,
                    fontSize: '18px',
                    mt: 1,
                  }}
                >
                  You need to be a Gold Member to unlock the Masterclass Zone
                </Typography>
                <Box
                  sx={{
                    background: 'linear-gradient(#047efc, #12488f)',
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    height: '48px',
                    borderRadius: '8px',
                    mt: 4,
                    mb: 2,
                    ':hover': {
                      opacity: 0.8,
                    },
                  }}
                >
                  <Button
                    variant="filled"
                    color="inherit"
                    sx={{
                      position: 'relative',
                      zIndex: 2, // Ensure the button text is above the overlay
                      color: '#FFF',
                      width: '100%',
                      height: '48px',
                      fontSize: 16,
                      fontWeight: 400,
                    }}
                    onClick={() => handleSubscription()}
                  >
                    {user.membership === '8' ? 'Upgrade to gold' : 'Purchase Membership'}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </Container>
  );
}
