/* eslint-disable no-nested-ternary */
import AddIcon from '@mui/icons-material/Add';
import { loadStripe } from '@stripe/stripe-js';
import './TabsView.css';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
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
  where,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, uploadString, getDownloadURL } from 'firebase/storage';


import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { MotionViewport } from 'src/components/animate';
import Image from 'src/components/image';
import { useAuthContext } from '../../../auth/useAuthContext';
import firebaseApp from '../../../firebase';
import {trackEvent} from '../../../utils/trackVisitor'

// import useResponsive from 'src/hooks/useResponsive';


const stripePromise = loadStripe(
  'pk_live_51NAUESCf4YXq1rsyBMpbCD1Yqi5kocGdjxYqcqknpppNXXnUKKCVxar7NqInLJRCJTCEVkbqQPppP7nvve8E053I00P0pVQI8d'
);

const UPGRADE_PRICE_MAP = {
  silver_to_advanced: 'price_1Sh1flCf4YXq1rsy94ex1p16',
  silver_to_gold: 'price_1OgVtOCf4YXq1rsy99bw9IHr',
  advanced_to_gold: 'price_1Sh1gECf4YXq1rsycqlOtspg',
};
const UPGRADE_CONFIG = {
  silver: {
    advanced: {
      title: 'Advanced Program',
      price: '€200',
      priceId: UPGRADE_PRICE_MAP.silver_to_advanced,
      features: [
        'Advanced Data Insights (BSP App)',
        'BSP Tennis Betting Model',
        'Essential Video Content',
      ],
    },
    gold: {
      title: 'Gold Program',
      price: '€600',
      priceId: UPGRADE_PRICE_MAP.silver_to_gold,
      features: [
        'Advanced Data Insights (BSP App)',
        'BSP Tennis Betting Model',
        'Essential Video Content',
        'High-Stakes Betting Frameworks',
        'BSP Masterclass (20+ Hours of Video)',
        'Real Time Study Cases',
      ],
    },
  },
  advanced: {
    gold: {
      title: 'Gold Program',
      price: '€400',
      priceId: UPGRADE_PRICE_MAP.advanced_to_gold,
      features: [
        'High-Stakes Betting Frameworks',
        'BSP Masterclass (20+ Hours of Video)',
        'Real Time Study Cases',
      ],
    },
  },
};

// ----------------------------------------------------------------------

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Initialize Firestore
const db = getFirestore(firebaseApp);

export default function Tips({ setCurrentPage }) {
  Tips.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
  };

  const { user } = useAuthContext();

  const [publicTips, setPublicTips] = useState([]);
  const [premiumTips, setPremiumTips] = useState([]);
  const [value, setValue] = useState(0);

  const [showMenu, setShowMenu] = useState(false);
  const [addTip, setAddTip] = useState(false);
  const [addMessage, setAddMessage] = useState(false);
  const [addAnalysis, setAddAnalysis] = useState(false);

  const [docId, setDocId] = useState(null);

  const [attachImage, setAttachImage] = useState();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [message, setMessage] = useState('');
  const [bankroll, setBankroll] = useState('');
  const [minimumOdd, setMinimumOdd] = useState('');
  const [group, setGroup] = useState('');
  const [analysisTitle, setAnalysisTitle] = useState('');
  const [analysisMessage, setAnalysisMessage] = useState('');
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [analysisData, setAnalysisData] = useState([]);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deletedTip, setDeletedTip] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openUpgrade, setOpenUpgrade] = useState(false);


  const storage = getStorage(firebaseApp);

  const groups = [
    {
      value: 'Insights',
      label: 'Insights',
    },
    {
      value: 'Bets',
      label: 'Bets',
    },
    {
      value: 'Both',
      label: 'Both',
    },
    {
      value: 'Exp-Insights',
      label: 'Exp-Insights',
    },
  ];




  // ===== EXPIRY CHECK =====
  const checkExpireDate = () => {
    const sec = user?.expire_date ? user.expire_date.seconds * 1000 : 0;
    if (!sec) return true; // no expiry = allowed
    return Date.now() < sec;
  };

  // ===== MEMBERSHIP =====
  const membership = String(user?.membership || '1');

  // ===== ACCESS RULES =====

  // Bets → Silver (8), Advanced (9), Gold (10)
  const canViewBets =
    membership !== '1' && checkExpireDate();

  // Insights → ONLY Advanced (9), Gold (10)
  const canViewInsights =
    ['9', '10'].includes(membership) && checkExpireDate();


  const hasNoSubscription = membership === '1';
  const isSilver = membership === '8';
  const isGold = membership === '10';
  const isAdvanced = membership === '9';
  const isExpired = !checkExpireDate();


  const handleUpgradeCheckout = async (priceId) => {
    try {
      const stripe = await stripePromise;

      const response = await fetch(
        'https://us-central1-bspconsult-bcd6e.cloudfunctions.net/createCheckoutSession',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            priceId,
            customerEmail: user?.email,
            platform: 'web',
            upgrade: true, 
          }),
        }
      );

      const session = await response.json();

      if (!session?.id) {
        throw new Error('Invalid Stripe session');
      }

      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Upgrade checkout error:', error);
    }
  };

  const currentPlan =
    isSilver ? 'silver' :
      isAdvanced ? 'advanced' :
        null;

  const upgradeData =
    currentPlan && selectedPlan
      ? UPGRADE_CONFIG[currentPlan]?.[selectedPlan]
      : null;


function createTypographyWithLineBreaks(text) {
  const lines = text.split('\n');

  return lines.map((line, lineIndex) => {
    // Split the line by ** to find bold segments
    const segments = line.split('**');
    
    return (
      <React.Fragment key={lineIndex}>
        <span style={{ display: 'block' }}>
          {segments.map((segment, segmentIndex) => {
            // Every odd index (1, 3, 5, ...) should be bold
            const isBold = segmentIndex % 2 === 1;
            
            return isBold ? (
              <strong key={segmentIndex}>{segment}</strong>
            ) : (
              <React.Fragment key={segmentIndex}>{segment}</React.Fragment>
            );
          })}
        </span>
      </React.Fragment>
    );
  });
}

  const fetchInsightsTips = useCallback(async () => {
    try {
      // Reference to the tips collection
      const tipsCollectionRef = collection(db, 'communication');
      // Create a query against the collection

      const membershipLevel = Number(user?.membership);
      const groupType = membershipLevel < 8 ? 'Exp-Insights' : 'Insights';

      const q = query(
        tipsCollectionRef,
        where('group', '==', groupType), // Apply the filter
        orderBy('date', 'desc') // Sort by date in descending order
      );
      // Get a snapshot of the collection
      const tipsSnapshot = await getDocs(q);
      // Map through documents and set data in state
      const tipsList = tipsSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      setPublicTips(tipsList);
    } catch (error) {
      console.error('Error fetching tips: ', error);
    }
  }, [user?.membership]);

  const fetchBetTips = useCallback(async () => {
    try {
      // Reference to the tips collection
      const tipsCollectionRef = collection(db, 'communication');
      // Create a query against the collection
      const q = query(
        tipsCollectionRef,
        where('group', '==', 'Bets'), // Apply the filter
        orderBy('date', 'desc') // Sort by date in descending order
      );
      // Get a snapshot of the collection
      const tipsSnapshot = await getDocs(q);
      // Map through documents and set data in state
      const tipsList = tipsSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      setPremiumTips(tipsList);
    } catch (error) {
      console.error('Error fetching tips: ', error);
    }
  }, []);

  useEffect(() => {
    fetchInsightsTips();
    fetchBetTips();
  }, [fetchInsightsTips, fetchBetTips]);

  useEffect(() => {
  if (openUpgrade) {
    if (hasNoSubscription || isSilver) {
      setSelectedPlan('advanced');
    } else if (isAdvanced) {
      setSelectedPlan('gold');
    }
  }
}, [openUpgrade, hasNoSubscription, isSilver, isAdvanced]);


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

  const handleChange = (event, newValue) => {
    if (newValue === 0){
      trackEvent("Insights");
    }
    else{
      trackEvent("Bets");
    }
    setValue(newValue);
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleMessage = () => {
    setDocId(null);
    setImageUrl(null);
    setPdfUrl(null);
    setAnalysisData([]);
    setAnalysisTitle('');
    setAnalysisMessage('');
    setAddAnalysis(false);
    setAddMessage(true);
    setShowMenu(false);
  };

  const handleTip = () => {
    setDocId(null);
    setImageUrl(null);
    setPdfUrl(null);
    setAnalysisData([]);
    setAnalysisTitle('');
    setAnalysisMessage('');
    setAddAnalysis(false);
    setAddTip(true);
    setShowMenu(false);
  };

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleChangeBankroll = (e) => {
    setBankroll(e.target.value);
  };
  const handleChangeMimimumOdd = (e) => {
    setMinimumOdd(e.target.value);
  };

  const handleChangeGroup = (e) => {
    setGroup(e.target.value);
  };

  const handleUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoadingMessage(true);

      const filePath = `${type}s/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, filePath);

      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      if (type === "image") {
        setImageUrl(downloadURL);
        setPdfUrl('');
      }
      else if (type === "pdf") {
        setPdfUrl(downloadURL);
        setImageUrl('');
      }

      // setMessage(downloadURL)
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setLoadingMessage(false);
      event.target.value = ''; // reset input
    }
  };


  const handleAddMessage = async () => {
    setLoadingMessage(true);

    try {
      const analysesList = analysisData.map((item) => JSON.stringify(item));
      const baseData = {
        title,
        message,
        imageUrl: imageUrl || null,
        pdfUrl: pdfUrl || null,
        type: 'Message',
        analyses: analysesList,
        updatedAt: serverTimestamp(),
      };

      if (docId) {
        await updateDoc(doc(db, 'communication', docId), {
          ...baseData,
        });
      }
      else if (group !== 'Both') {
        await addDoc(collection(db, 'communication'), {
          ...baseData,
          group,
          date: serverTimestamp(),
        });
      } else {
        await Promise.all([
          addDoc(collection(db, 'communication'), {
            ...baseData,
            group: 'Insights',
            date: serverTimestamp(),
          }),
          addDoc(collection(db, 'communication'), {
            ...baseData,
            group: 'Bets',
            date: serverTimestamp(),
          }),
        ]);
      }

      // =========================
      // CLEANUP (LIMIT = 30)
      // =========================
      const q = query(
        collection(db, 'communication'),
        where('type', '==', 'Message'),
        orderBy('date', 'desc')
      );

      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      if (list.length > 30) {
        await deleteDoc(doc(db, 'communication', list[list.length - 1].id));
      }

      // =========================
      // UI
      // =========================
      setTitle('');
      setMessage('');
      setImageUrl(null);
      setPdfUrl(null);
      setGroup('Insights');
      setDocId(null);
      setAddMessage(false);

      fetchInsightsTips();
      fetchBetTips();
    } catch (err) {
      console.error('Firestore error:', err);
    } finally {
      setLoadingMessage(false);
    }
  };

  const handleAddAnalysis = () => {
    setAnalysisData([
      ...analysisData,
      {
        title: analysisTitle,
        body: analysisMessage,
      },
    ]);
    setAnalysisTitle('');
    setAnalysisMessage('');
    setAddAnalysis(false);
  };

  const handleAddTip = async () => {
    setLoadingMessage(true);

    try {
      const analysesList = analysisData.map((item) => JSON.stringify(item));
      let imgUrl = imageUrl;

      if (attachImage) {
        // Create a reference to the image file in Firebase Storage
        const imageRef = ref(storage, `images/${Date.now()}.png`);
        // Upload the image as a string
        await uploadString(imageRef, attachImage, 'data_url');
        // Get the download URL
        imgUrl = await getDownloadURL(imageRef);
      }

      const baseData = {
        title,
        imageUrl: imgUrl || null,
        type: 'Tip',
        reliability: parseFloat(bankroll),
        minimumodd: parseFloat(minimumOdd),
        analyses: analysesList,
        updatedAt: serverTimestamp(),
        date: new Date(),
      };

      if (docId) {
        await updateDoc(doc(db, 'communication', docId), {
          ...baseData,
        });
      }
      else if (group !== 'Both') {
        const tipData = {
          ...baseData,
          group,
        };
        await addDoc(collection(db, 'communication'), tipData);
      } else {
        const publicData = {
          ...baseData,
          group: 'Insights',
        };
        await addDoc(collection(db, 'communication'), publicData);
        const premimumData = {
          ...baseData,
          group: 'Bets',
        };
        await addDoc(collection(db, 'communication'), premimumData);
      }

      // =========================
      // CLEANUP (LIMIT = 30)
      // =========================
      const tipsCollectionRef = collection(db, 'communication');
      // Create a query against the collection
      const q = query(
        tipsCollectionRef,
        where('type', '==', 'Tip'), // Apply the filter
        orderBy('date', 'desc') // Sort by date in descending order
      );
      // Get a snapshot of the collection
      const tipsSnapshot = await getDocs(q);
      // Map through documents and set data in state
      const tipsList = tipsSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      if (tipsList.length > 30) {
        await deleteDoc(doc(db, 'communication', tipsList[tipsList.length - 1].id));
      }

      setTitle('');
      setAttachImage();
      setBankroll('');
      setAnalysisData([]);
      setGroup('Insights');
      setAddTip(false);
      fetchInsightsTips();
      fetchBetTips();
    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setLoadingMessage(false);
    }
  };

  const handleDeleteTip = async () => {
    if (!deletedTip) return;

    setDeleteLoading(true);
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, 'communication', deletedTip.id));

      // Refresh the messages list
      await fetchInsightsTips();
      await fetchBetTips();

      // Close the delete confirmation dialog
      setDeleteConfirm(false);
      setDeletedTip(null);
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const calculateStake = (reliability) => {
    if (user.stakingStrategy === 'Conservative') {
      return reliability;
    }
    if (user.stakingStrategy === 'Balanced') {
      return reliability * 1.5
    }
    return reliability * 2.25 || 0;
  };
  const calculateStakeAmount = (reliability) => {
    if (!user.bankroll) return 0;

    if (user.stakingStrategy === 'Conservative') {
      return user.bankroll * reliability / 100.00;
    }
    if (user.stakingStrategy === 'Balanced') {
      return user.bankroll * reliability * 1.5 / 100.00;
    }
    return user.bankroll * reliability * 2.25 / 100.00 || 0;
  };

  const handleCancelAttachment = () => {
    setImageUrl(null);
    setPdfUrl(null);
  };

  const handleEdit = (tip) => {
    const parsedAnalyses = Array.isArray(tip?.analyses)
      ? tip.analyses
        .map((item) => {
          try {
            return JSON.parse(item);
          } catch {
            return null;
          }
        })
        .filter(Boolean)
      : [];

    setAnalysisData(parsedAnalyses);
    setAnalysisTitle('');
    setAnalysisMessage('');
    setAddAnalysis(false);
    setDocId(tip.id);
    setTitle(tip.title);
    setMessage(tip.message);
    setImageUrl(tip.imageUrl);
    setPdfUrl(tip.pdfUrl);

    if (tip.type === "Message"){
      setAddMessage(true);
    }
    else{
      setBankroll(tip.reliability);
      setMinimumOdd(tip.minimumodd);
      setAddTip(true);
    }
  }


  const imageInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  return (

    <Container
      className=" content-grid"
      component={MotionViewport}
      sx={{
        px: 3,
      }}
    >
      <div className="all-content">


        <Dialog
          open={openUpgrade}
          onClose={() => setOpenUpgrade(false)}
          maxWidth={false}
          disableScrollLock
          PaperProps={{
            sx: {
              background: 'transparent',
              boxShadow: 'none',
              borderRadius: 0,
              padding: 0,
              margin: 0,
              overflow: 'visible',
            },
          }}
        >
          <DialogContent
            sx={{
              padding: 0,
              margin: 0,
              background: 'transparent',
              overflow: 'visible',
            }}
          >
            {!isGold && (isSilver || isAdvanced || hasNoSubscription) && (
              <div className="upgrade-box">

                {/* HEADER */}
                <div className="upgrade-content-header">
                  <div className="upgrade-content">
                    <h3>{hasNoSubscription ? 'Choose Membership' : 'Upgrade Membership'}</h3>
                    <p>Upgrade to unlock advanced features and full access.</p>
                  </div>

                  <button
                    type="button"
                    className="upgrade-close"
                    onClick={() => setOpenUpgrade(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="upgrade-divider" />

                {/* PLAN SWITCH */}
                <div className="plan-switch">

                  {(hasNoSubscription || isSilver) && (
                    <>
                      <button
                        type="button"
                        className={`plan-btn advanced ${selectedPlan === 'advanced' ? 'active' : ''}`}
                        onClick={() => setSelectedPlan('advanced')}
                      >
                        Advanced
                      </button>

                      <button
                        type="button"
                        className={`plan-btn gold ${selectedPlan === 'gold' ? 'active' : ''}`}
                        onClick={() => setSelectedPlan('gold')}
                      >
                        Gold
                      </button>
                    </>
                  )}

                  {isAdvanced && (
                    <button type="button" className="plan-btn gold active">
                      Gold
                    </button>
                  )}

                </div>

                {/* DYNAMIC CARD */}
                {upgradeData && (
                  <div className={`upgrade-card upgrade-card--${selectedPlan}`}>
                    <div className="upgrade-inner">

                      <div className="upgrade-headers">
                        <h3 className="upgrade-title">{upgradeData.title}</h3>

                        {selectedPlan === 'advanced' && (
                          <span className="best-value-badge">Best Value</span>
                        )}
                      </div>


                      <div className="upgrade-price">
                        <span className="price-amount">{upgradeData.price}</span>
                        <span className="price-period">one time fee</span>
                      </div>

                      <div className="upgrade-note">
                        Lock in current pricing before next update.
                      </div>

                      <button
                        type="button"
                        className={selectedPlan === 'gold' ? 'Gold-btn' : 'adva-btn'}
                        onClick={() => {
                          setOpenUpgrade(false);
                          handleUpgradeCheckout(upgradeData.priceId);
                        }}
                      >
                        Get {upgradeData.title}
                      </button>

                    </div>

                    <div className="upgrade-includes">
                      <h4>
                        Extra benefits with{' '}
                        <span className={selectedPlan === 'gold' ? 'gold-text' : 'advanced-text'}>
                          {selectedPlan === 'gold' ? 'Gold' : 'Advanced'}
                        </span>
                      </h4>

                      <ul>
                        {upgradeData.features.map((feature) => (
                          <li key={feature} className="active">
                            <img
                              src={
                                selectedPlan === 'gold'
                                  ? '/img/gold-tick.svg'
                                  : '/img/check-circle.svg'
                              }
                              alt="check"
                            />
                            <span className="include-text">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

              </div>
            )}
          </DialogContent>
        </Dialog>



        {/* addMessage */}
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
          <DialogTitle sx={{ color: '#FFF' }}>Add a message</DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              margin="dense"
              label="Title"
              name="title"
              value={title}
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
            {!docId && (
              <TextField
                select
                fullWidth
                margin="dense"
                label="Group"
                defaultValue="Public"
                value={group}
                onChange={(e) => handleChangeGroup(e)}
                sx={{
                  input: {
                    color: '#FFF',
                  },
                  label: {
                    color: '#FFF !important',
                  },
                  textAlign: 'left',
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        bgcolor: '#0d1117',
                      },
                    },
                  },
                }}
              >
                {groups.map((option) => (
                  <MenuItem key={option.value} value={option.value} sx={{ color: '#FFF' }}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}

            <TextField
              autoFocus
              fullWidth
              multiline
              rows={10}
              type="text"
              margin="dense"
              label="Message"
              name="message"
              value={message}
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
            <Typography
              variant="h6"
              sx={{ color: '#FFF', fontWeight: 600, textAlign: 'center', marginTop: '20px' }}
            >
              Analyses
            </Typography>
            {analysisData.length > 0 &&
              analysisData.map((item, index) => (
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 400 }}>
                    {item.title}
                  </Typography>
                  <DeleteOutlineIcon
                    sx={{ color: '#57636C', cursor: 'pointer' }}
                    onClick={() => {
                      setAnalysisData((prevData) => prevData.filter((_, index2) => index2 !== index));
                    }}
                  />
                </Box>
              ))}
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(#047efc, #12488f)',
                ':hover': { opacity: 0.8 },
                marginTop: '20px',
                textTransform: 'none',
              }}
              onClick={() => {
                setAddAnalysis(true);
              }}
            >
              Add an analysis
            </Button>
          </DialogContent>
          <DialogActions>
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleUpload(e, 'image')}
            />

            <input
              type="file"
              accept="application/pdf"
              ref={pdfInputRef}
              style={{ display: 'none' }}
              onChange={(e) => handleUpload(e, 'pdf')}
            />
            {!imageUrl && !pdfUrl ? (
              <>
                <Button
                  color="inherit"
                  sx={{ color: '#FFF', backgroundColor: 'transparent' }}
                  onClick={() => imageInputRef.current.click()}
                >
                  Image
                </Button>

                <Button
                  color="inherit"
                  sx={{ color: '#FFF', backgroundColor: 'transparent' }}
                  onClick={() => pdfInputRef.current.click()}
                >
                  PDF
                </Button>
              </>
            ) : (
              <Button
                color="error"
                variant="contained"
                onClick={handleCancelAttachment}
              >
                Remove file
              </Button>
            )}

            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="inherit"
              sx={{ color: '#FFF', backgroundColor: 'transparent' }}
              onClick={() => {
                setTitle('');
                setMessage('');
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
              Send
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* addTip */}
        <Dialog
          open={addTip}
          onClose={() => setAddTip(false)}
          PaperProps={{
            style: {
              px: 2,
              width: '100%',
              background: '#0d1117',
              border: '2px solid #076af478',
            },
          }}
        >
          <DialogTitle sx={{ color: '#FFF' }}>Add a tip</DialogTitle>
          <DialogContent sx={{ textAlign: 'center' }}>
            <TextField
              autoFocus
              fullWidth
              type="text"
              margin="dense"
              label="Title"
              name="title"
              value={title}
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

            {!docId && (
              <TextField
                select
                fullWidth
                margin="dense"
                label="Group"
                defaultValue="Public"
                onChange={(e) => handleChangeGroup(e)}
                sx={{
                  input: {
                    color: '#FFF',
                  },
                  label: {
                    color: '#FFF !important',
                  },
                  textAlign: 'left',
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        bgcolor: '#0d1117',
                      },
                    },
                  },
                }}
              >
                {groups.map((option) => (
                  <MenuItem key={option.value} value={option.value} sx={{ color: '#FFF' }}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}

            <TextField
              autoFocus
              fullWidth
              multiline
              type="text"
              margin="dense"
              label="Bankroll(%)"
              name="bankroll"
              value={bankroll}
              onChange={(e) => handleChangeBankroll(e)}
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
              type="text"
              margin="dense"
              label="Minimum Odd"
              name="minimumodd"
              value={minimumOdd}
              onChange={(e) => handleChangeMimimumOdd(e)}
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
              onClick={() => {
                if (attachImage || imageUrl) {
                  setAttachImage();
                  setImageUrl(null);
                }
                else {
                  document.getElementById('file-input')?.click();
                }
              }}
            >
              {attachImage || imageUrl
                ? (<Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    setAttachImage();
                    setImageUrl(null);
                  }}
                >
                  Remove file
                </Button>
                )
                : (<Typography variant="h6" sx={{ color: '#FFF', fontWeight: 400 }}>
                  Image
                </Typography>
                )
              }
              {(attachImage || imageUrl) && (
                <Image
                  visibleByDefault
                  disabledEffect
                  alt="Image"
                  src={attachImage || imageUrl}
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

            <Typography
              variant="h6"
              sx={{ color: '#FFF', fontWeight: 600, textAlign: 'center', marginTop: '20px' }}
            >
              Analyses
            </Typography>
            {analysisData.length > 0 &&
              analysisData.map((item, index) => (
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ color: '#FFF', fontWeight: 400 }}>
                    {item.title}
                  </Typography>
                  <DeleteOutlineIcon
                    sx={{ color: '#57636C', cursor: 'pointer' }}
                    onClick={() => {
                      setAnalysisData((prevData) => prevData.filter((_, index2) => index2 !== index));
                    }}
                  />
                </Box>
              ))}
            <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(#047efc, #12488f)',
                ':hover': { opacity: 0.8 },
                marginTop: '20px',
                textTransform: 'none',
              }}
              onClick={() => {
                setAddAnalysis(true);
              }}
            >
              Add an analysis
            </Button>
          </DialogContent>
          <DialogActions>
            <Button
              color="inherit"
              sx={{ color: '#FFF', backgroundColor: 'transparent' }}
              onClick={() => {
                setTitle('');
                setAttachImage();
                setBankroll('');
                setAnalysisData([]);
                setGroup('Insights');
                setAddTip(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={loadingMessage}
              variant="contained"
              sx={{ background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8 } }}
              onClick={() => handleAddTip()}
            >
              Send
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* add Analysis */}
        <Dialog
          open={addAnalysis}
          onClose={() => setAddAnalysis(false)}
          PaperProps={{
            style: {
              px: 2,
              width: '100%',
              background: '#0d1117',
              border: '2px solid #076af478',
            },
          }}
        >
          <DialogTitle sx={{ color: '#FFF' }}>Add an analysis</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              type="text"
              margin="dense"
              label="Title"
              name="title"
              onChange={(e) => {
                setAnalysisTitle(e.target.value);
              }}
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
              rows={10}
              type="text"
              margin="dense"
              label="Message"
              name="message"
              onChange={(e) => {
                setAnalysisMessage(e.target.value);
              }}
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
                setAnalysisTitle('');
                setAnalysisMessage('');
                setAddAnalysis(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={loadingMessage}
              variant="contained"
              sx={{ background: 'linear-gradient(#047efc, #12488f)', ':hover': { opacity: 0.8 } }}
              onClick={() => handleAddAnalysis()}
            >
              Confirm
            </LoadingButton>
          </DialogActions>
        </Dialog>

        {/* delete confirm */}
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
          <DialogTitle sx={{ color: '#FFF' }}>Delete Tip</DialogTitle>
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
                Are you sure you want to delete the tip?
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type='button'
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
              onClick={() => handleDeleteTip()}
            >
              Yes
            </LoadingButton>
          </DialogActions>
        </Dialog>

        <Box sx={{ mt: 3, mx: 'auto', maxWidth: 720, textAlign: 'center' }}>
          <div className="tabs-border">
            <div className="tabs-container">
              <button type='button'
                className={`tab-btn ${value === 0 ? 'active' : ''}`}
                onClick={(e) => handleChange(e, 0)}
              >
                Insights
              </button>
              <button type='button'
                className={`tab-btn ${value === 1 ? 'active' : ''}`}
                onClick={(e) => handleChange(e, 1)}
              >
                Bets
              </button>
            </div>
          </div>

          {/* TAB 0 */}
          {value === 0 && (
            <div className="tab-panel">
              {!canViewInsights ? (
          
                <div className="premium-lock-container">
                  <div className="premium-lock-content">
                    <div className="lock-icon">
                      <img src="/img/locked-premium.svg" alt="Locked" />
                    </div>

                    <h3 className="lock-title">Insights Locked</h3>
                    <p className="lock-subtitle">
                      One click away from full access
                    </p>

                    {(hasNoSubscription || isSilver || isExpired) && (
                      <button
                        type="button"
                        className="lock-btn"
                        onClick={() =>
                          hasNoSubscription
                            ? setCurrentPage('Subscriptions')
                            : setOpenUpgrade(true)
                        }
                      >
                        {hasNoSubscription ? 'View Programs' : 'Upgrade Now'}
                      </button>
                    )}

                  </div>
                </div>
              ) : (
                <>
                  {publicTips.map((tip, index) => {
                    const stake = Number(calculateStake(tip.reliability) || 0);
                    const stakeAmount = Number(calculateStakeAmount(tip.reliability) || 0);

                    return (
                      <div className="tip-border" key={tip.id}>
                        <div className="tip-card">
                          <div className="tip-header">
                            <span>{formatDate(tip.date.toDate())}</span>
                            <span>{tip.title}</span>

                            {user?.role === 'administrator' && (
                              <div className="admin-icons">
                                <EditIcon onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(tip);
                                }}/>
                                <DeleteIcon  onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteConfirm(true);
                                  setDeletedTip(tip);
                                }} />
                              </div>
                            )}
                          </div>

                          <div className="tip-body">
                            {tip.imageUrl && (
                              <img src={tip.imageUrl} alt="tip" />
                            )}

                            {tip.message && (
                              <p>{createTypographyWithLineBreaks(tip.message)}</p>
                            )}


                            {Array.isArray(tip.analyses) &&
                              tip.analyses.map((analyse, i) => {
                                let parsed;
                                try {
                                  parsed = JSON.parse(analyse);
                                } catch {
                                  return null;
                                }

                                return (
                                  <div key={i}>
                                    <h4>{parsed.title}</h4>
                                    <p>{createTypographyWithLineBreaks(parsed.body)}</p>
                                  </div>
                                );
                              })}

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          )}

          {/* TAB 1 */}
          {value === 1 && (
            <div className="tab-panel">
              {!canViewBets ? (
                <div className="premium-lock-container">
                  <div className="premium-lock-content">
                    <div className="lock-icon">
                      <img src="/img/locked-premium.svg" alt="Locked" />
                    </div>

                    <h3 className="lock-title">Bets Locked</h3>
                    <p className="lock-subtitle">One click away from full access</p>

                    <button
                      type="button"
                      className="lock-btn"
                      onClick={() => setCurrentPage('Subscriptions')}
                    >
                      View Programs
                    </button>
                  </div>
                </div>

              ) : (
                <>
                  {premiumTips.map((tip) => {
                    const stake = Number(calculateStake(tip.reliability) || 0);
                    const stakeAmount = Number(calculateStakeAmount(tip.reliability) || 0);

                    return tip.type === 'Tip' ? (
                      <div className="tip-border" key={tip.id}>
                        <div className="tip-card">
                          {/* HEADER */}
                          <div className="tip-header">
                            <span>{formatDate(tip.date.toDate())}</span>
                            <span>{tip.title}</span>

                            {user?.role === 'administrator' && (
                              <div className="admin-icons">
                                <EditIcon
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(tip);
                                  }}
                                />
                                <DeleteIcon
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteConfirm(true);
                                    setDeletedTip(tip);
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          {/* BODY */}
                          <div className="tip-body">
                            {tip.pdfUrl && (
                              <iframe
                                src={tip.pdfUrl}
                                title="pdf-preview"
                                style={{
                                  width: '100%',
                                  height: 300,
                                  border: 'none',
                                  borderRadius: '8px',
                                }}
                              />
                            )}

                            {tip.imageUrl && (
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img
                                  src={tip.imageUrl}
                                  alt="tip"
                                  style={{ marginTop: 16, borderRadius: 6 }}
                                />
                              </div>
                            )}

                            <div className="row bold">
                              <strong>STAKE</strong>
                              <span>{stake.toFixed(2)} %</span>
                            </div>

                            <div className="row bold">
                              <strong>STAKE AMOUNT</strong>
                              <span>{stakeAmount.toFixed(2)} €</span>
                            </div>

                            <div className="row bold">
                              <strong>MINIMUM ODD</strong>
                              <span>{(tip.minimumodd || 0).toFixed(2)} ⓘ</span>
                            </div>

                            <hr />

                            {tip.analyses.map((analyse, index) => (
                              <div key={index}>
                                <h4>{JSON.parse(analyse).title}</h4>
                                <p>
                                  {createTypographyWithLineBreaks(
                                    JSON.parse(analyse).body
                                  )}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* MESSAGE TYPE */
                      <div className="tip-border" key={tip.id}>
                        <div className="tip-card">
                          <div className="tip-header">
                            <div className="tip-text">
                              <span className="tip-date">{formatDate(tip.date.toDate())}</span>
                              <span className="tip-title">{tip.title}</span>
                            </div>

                            {user?.role === 'administrator' && (
                              <div className="admin-icons">
                                <EditIcon
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(tip);
                                  }}
                                />
                                <DeleteIcon
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteConfirm(true);
                                    setDeletedTip(tip);
                                  }}
                                />
                              </div>
                            )}
                          </div>


                          <div className="tip-body">
                            {tip.pdfUrl && (
                              <iframe
                                src={`${tip.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                title="pdf-preview"
                                style={{
                                  width: '100%',
                                  height: 500,
                                  border: 'none',
                                }}
                              />
                            )}

                            {tip.imageUrl && (
                              <img
                                src={tip.imageUrl}
                                alt="tip"
                                style={{ borderRadius: 6 }}
                              />
                            )}

                            <p style={{ marginTop: 16 }}>
                              {createTypographyWithLineBreaks(tip.message)}
                            </p>

                            {tip.analyses.map((analyse, index) => (
                              <div key={index}>
                                <h4>{JSON.parse(analyse).title}</h4>
                                <p>
                                  {createTypographyWithLineBreaks(
                                    JSON.parse(analyse).body
                                  )}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </>
              )}
            </div>
          )}

          {user?.role === 'administrator' && (
            <>
              {/* FLOATING ACTION BUTTON */}
              <button type='button'
                className="admin-fab"
                aria-label="add"
                onClick={() => setShowMenu(!showMenu)}
              >
                {showMenu ? <CloseIcon /> : <AddIcon />}
              </button>

              {/* MENU */}
              {showMenu && (
                <div className="admin-menu">
                  <div className="admin-menu-row">
                    <span className="admin-menu-text">Add a message</span>
                    <button
                      type="button"
                      className="admin-circle-btn"
                      onClick={() => handleMessage()}
                    >
                      <ChatIcon style={{ color: '#FFF', width: 20, height: 20 }} />
                    </button>
                  </div>

                  <div className="admin-menu-row">
                    <span className="admin-menu-text">Add a tip</span>
                    <button type='button'
                      className="admin-circle-btn"
                      onClick={() => handleTip()}
                    >
                      <BarChartIcon style={{ color: '#FFF', width: 20, height: 20 }} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </Box>
      </div>
    </Container>
  );
}


