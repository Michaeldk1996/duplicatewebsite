import { useEffect, useState, useCallback } from 'react';
import { doc, getDoc, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import '../exclusive/profile-settings.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import PropTypes from 'prop-types';
import { db as DB } from '../../firebase';

// ─── Constants ───────────────────────────────────────────
const EVENT_FIELDS = [
  'count', 'AdvancedUpgrade', 'Bets', 'ChangeBankroll',
  'ChangeStrategy', 'Insights', 'Logout',
  'ResetPassword', 'CancelSubscription', 'SilverUpgrade', 'ChooseMembership',

  'mob_count', 'mob_AdvancedUpgrade', 'mob_Bets', 'mob_ChangeBankroll',
  'mob_ChangeStrategy', 'mob_Insights', 'mob_Logout', 'mob_MobileAccessBets', 'mob_ResetPassword', 
  'mob_CancelSubscription', 'mob_SilverUpgrade', 'mob_ChooseMembership',

  'mobile_DeleteAccount', 'mobile_ResetPassword', 'mobile_ChangeBankroll', 'mobile_ChangeStrategy', 'mobile_DeleteRecord', 'mobile_ModifyTip', 'mobile_ModifyMessage',
  'mobile_logout', 'Mobile_login', 'mobile_Insights', 'mobile_Bets', 'mobile_SendNotification', 'mobile_AddMessage', 'mobile_AddTip', 'mobile_SilverUpgrade',
  'mobile_AdvancedUpgrade', 'mobile_Instagram', 'mobile_Snapchat', 'mobile_TermofService', 'mobile_PrivacyPolicy', 'mobile_Programs', 'mobile_GetSilver',
  'mobile_GetAdvanced', 'mobile_GetGold', 'mobile_Programs_Silver', 'mobile_Programs_Advanced', 'mobile_Programs_Gold'
];

const FIELD_COLORS = {
  count:          '#348AF7',
  AdvancedUpgrade:'#FFCB2B',
  Bets:           '#34D399',
  ChangeBankroll: '#F472B6',
  ChangeStrategy: '#A78BFA',
  Insights:       '#FB923C',
  Logout:         '#F87171',
  MobileAccessBets:'#22D3EE',
  ResetPassword:  '#E879F9',
  CancelSubscription: '#A78BFA',
  SilverUpgrade:      '#22D3EE',
  ChooseMembership:   '#34D399',

  mob_count:          '#FFCB2B',
  mob_AdvancedUpgrade:'#F87171',
  mob_Bets:           '#34D399',
  mob_ChangeBankroll: '#FFCB2B',
  mob_ChangeStrategy: '#FB923C',
  mob_Insights:       '#A78BFA',
  mob_Logout:         '#F472B6',
  mob_MobileAccessBets:'#34D399',
  mob_ResetPassword:  '#348AF7',
  mob_CancelSubscription: '#22D3EE',
  mob_SilverUpgrade:      '#34D399',
  mob_ChooseMembership:   '#A78BFA',
  
  mobile_DeleteAccount: '#348AF7',
  mobile_ResetPassword: '#FFCB2B',
  mobile_ChangeBankroll: '#34D399',
  mobile_ChangeStrategy: '#F472B6',
  mobile_DeleteRecord: '#A78BFA',
  mobile_ModifyTip: '#FB923C',
  mobile_ModifyMessage: '#F87171',
  mobile_logout: '#22D3EE',
  Mobile_login: '#E879F9',
  mobile_Insights: '#348AF7',
  mobile_Bets: '#FFCB2B',
  mobile_SendNotification: '#34D399',
  mobile_AddMessage: '#F472B6',
  mobile_AddTip: '#A78BFA',
  mobile_SilverUpgrade: '#FB923C',
  mobile_AdvancedUpgrade: '#F87171',
  mobile_Instagram: '#22D3EE',
  mobile_Snapchat: '#E879F9',
  mobile_TermofService: '#348AF7',
  mobile_PrivacyPolicy: '#FFCB2B',
  mobile_Programs: '#34D399',
  mobile_GetSilver: '#F472B6',
  mobile_GetAdvanced: '#A78BFA',
  mobile_GetGold: '#FB923C',
  mobile_Programs_Silver: '#F87171',
  mobile_Programs_Advanced: '#22D3EE',
  mobile_Programs_Gold: '#E879F9'
};

const FIELD_LABELS = {
  count:           'Visitors',
  AdvancedUpgrade: 'Advanced Upgrade',
  Bets:            'Bets',
  ChangeBankroll:  'Change Bankroll',
  ChangeStrategy:  'Change Strategy',
  Insights:        'Insights',
  Logout:          'Logout',
  MobileAccessBets:'Mobile Access Bets',
  ResetPassword:   'Reset Password',
  CancelSubscription: 'Cancel Subscription',
  SilverUpgrade: 'Silver Upgrade',
  ChooseMembership: 'Choose Membership'
};

const FIELD_WebMob_LABELS = {
  mob_count:           'Visitors',
  mob_AdvancedUpgrade: 'Advanced Upgrade',
  mob_Bets:            'Bets',
  mob_ChangeBankroll:  'Change Bankroll',
  mob_ChangeStrategy:  'Change Strategy',
  mob_Insights:        'Insights',
  mob_Logout:          'Logout',
  mob_MobileAccessBets:'Mobile Access Bets',
  mob_ResetPassword:   'Reset Password',
  mob_CancelSubscription: 'Cancel Subscription',
  mob_SilverUpgrade: 'Silver Upgrade',
  mob_ChooseMembership: 'Choose Membership'
};

const FIELD_MOBILE_LABELS = {
  mobile_DeleteAccount: 'Delete Account',
  mobile_ResetPassword: 'Reset Password',
  mobile_ChangeBankroll: 'Change Bankroll',
  mobile_ChangeStrategy: 'Change Strategy',
  mobile_DeleteRecord: 'Delete Record',
  mobile_ModifyTip: 'Modify Tip',
  mobile_ModifyMessage: 'Modify Message',
  mobile_logout: 'logout',
  Mobile_login: 'login',
  mobile_Insights: 'Insights',
  mobile_Bets: 'Bets',
  mobile_SendNotification: 'Send Notification',
  mobile_AddMessage: 'Add Message',
  mobile_AddTip: 'Add Tip',
  mobile_SilverUpgrade: 'Silver Upgrade',
  mobile_AdvancedUpgrade: 'Advanced Upgrade',
  mobile_Instagram: 'Instagram',
  mobile_Snapchat: 'Snapchat',
  mobile_TermofService: 'Term of Service',
  mobile_PrivacyPolicy: 'Privacy Policy',
  mobile_Programs: 'Programs',
  mobile_GetSilver: 'Get Silver',
  mobile_GetAdvanced: 'Get Advanced',
  mobile_GetGold: 'Get Gold',
  mobile_Programs_Silver: 'Programs Silver',
  mobile_Programs_Advanced: 'Programs Advanced',
  mobile_Programs_Gold: 'Programs Gold',
};


// ─── Helpers ─────────────────────────────────────────────
const getWeekNumber = (dateStr) => {
  const d = new Date(dateStr);
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
};

const groupData = (docs, range) => {
  if (range === 'daily') return docs;

  const grouped = {};
  docs.forEach((d) => {
    let key;
    if (range === 'weekly') {
      key = `W${getWeekNumber(d.date)} ${d.date.slice(0, 4)}`;
    } else {
      key = d.date.slice(0, 7);
    }

    if (!grouped[key]) {
      grouped[key] = { date: key };
      EVENT_FIELDS.forEach((f) => { grouped[key][f] = 0; });
    }
    EVENT_FIELDS.forEach((f) => {
      grouped[key][f] += d[f] || 0;
    });
  });

  return Object.values(grouped);
};

// ─── Custom Tooltip ──────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(18,20,30,0.97)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 10,
      padding: '10px 16px',
      fontSize: 13,
    }}>
      <p style={{ color: '#B9BDC7', marginBottom: 6 }}>{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom: 2 }}>
          {FIELD_LABELS[p.dataKey] ?? FIELD_MOBILE_LABELS[p.dataKey]}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
};

// ─── Main Component ──────────────────────────────────────
export default function AdminPage() {
  const [allowed, setAllowed]       = useState(null);
  const [allDocs, setAllDocs]       = useState([]);
  const [chartData, setChartData]   = useState([]);
  const [range, setRange]           = useState('daily');
  const [activeFields, setActiveFields] = useState(['count']);
  const [loading, setLoading]       = useState(false);

  // ── Auth check
  useEffect(() => {
    const check = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) { setAllowed(false); return; }
      const snap = await getDoc(doc(DB, 'users', user.uid));
      setAllowed(snap.exists() && snap.data()?.adminPanel === true);
    };
    check();
  }, []);

  // ── Fetch visitors
  useEffect(() => {
    if (!allowed) return;
    const fetchVisitors = async () => {
      setLoading(true);
      const q = query(collection(DB, 'visitors'), orderBy('date', 'asc'));
      const snap = await getDocs(q);
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAllDocs(docs);
      setLoading(false);
    };
    fetchVisitors();
  }, [allowed]);

  // ── Regroup when range changes
  useEffect(() => {
    setChartData(groupData(allDocs, range));
  }, [allDocs, range]);

  // ── Toggle field
  const toggleField = useCallback((field) => {
    setActiveFields((prev) => {
      if (prev.includes(field)) {
        if (prev.length > 1) {
          return prev.filter((f) => f !== field);
        }
        return prev;
      }
      return [...prev, field];
    });
  }, []);

  // ── Render: access denied / loading auth
  if (allowed === null) {
    return (
      <div className="dashboard-layout">
        <main className="dashboard-content">
          <section className="content-grid">
            <div className="all-content">
              <div className="all-profile-info">
                <div className="info-box" style={{ maxWidth: '1200px', padding: '24px' }}>
                  <h3>Admin Panel</h3>
                  <div className="info-row"><span>Loading...</span></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="dashboard-layout">
        <main className="dashboard-content">
          <section className="content-grid">
            <div className="all-content">
              <div className="all-profile-info">
                <div className="info-box" style={{ maxWidth: '1200px', padding: '24px' }}>
                  <h3>Admin Panel</h3>
                  <div className="info-row">
                    <span style={{ color: '#ff4d4f', fontWeight: 600 }}>Access Denied</span>
                    <span className="profile-ans" style={{ color: '#ff4d4f' }}>
                      You do not have permission to view this page.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // ── Render: admin dashboard
  return (
    <div className="dashboard-layout">
      <main className="dashboard-content">
        <header className="page-header">
          <h1>BSP Consult <span>- Admin Panel</span></h1>
        </header>

        <section className="content-grid">
          <div className="all-content">
            <p className="manage-profile">Analytics Dashboard</p>

            <div className="all-profile-info">

              {/* ── Range selector ── */}
              <div className="info-box" style={{ maxWidth: '1200px', padding: '20px 24px' }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['daily', 'weekly', 'monthly'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRange(r)}
                      style={{
                        padding: '8px 20px',
                        borderRadius: 48,
                        border: range === r ? '1px solid #348AF7' : '1px solid rgba(255,255,255,0.15)',
                        background: range === r ? '#348AF733' : 'transparent',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: 14,
                        fontWeight: range === r ? 600 : 400,
                        textTransform: 'capitalize',
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Field selector ── */}
              <div className="info-box" style={{ maxWidth: '1200px', padding: '20px 24px' }}>
                <h3 style={{ textAlign: 'left', marginBottom: 16, paddingBottom: 12 }}>
                  Website Metrics
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingBottom: 8 }}>
                  {EVENT_FIELDS.map((field) => {
                    const active = activeFields.includes(field);
                    if (FIELD_LABELS[field]){
                      return (
                        <button
                          key={field}
                          type="button"
                          onClick={() => toggleField(field)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 48,
                            border: active
                              ? `1px solid ${FIELD_COLORS[field]}`
                              : '1px solid rgba(255,255,255,0.15)',
                            background: active
                              ? `${FIELD_COLORS[field]}22`
                              : 'transparent',
                            color: active ? FIELD_COLORS[field] : '#B9BDC7',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: active ? 600 : 400,
                          }}
                        >
                          {FIELD_LABELS[field]}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
                <h3 style={{ textAlign: 'left', marginBottom: 16, paddingBottom: 12 }}>
                  Website Mobile Metrics
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingBottom: 8 }}>
                  {EVENT_FIELDS.map((field) => {
                    const active = activeFields.includes(field);
                    if (FIELD_WebMob_LABELS[field]){
                      return (
                        <button
                          key={field}
                          type="button"
                          onClick={() => toggleField(field)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 48,
                            border: active
                              ? `1px solid ${FIELD_COLORS[field]}`
                              : '1px solid rgba(255,255,255,0.15)',
                            background: active
                              ? `${FIELD_COLORS[field]}22`
                              : 'transparent',
                            color: active ? FIELD_COLORS[field] : '#B9BDC7',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: active ? 600 : 400,
                          }}
                        >
                          {FIELD_WebMob_LABELS[field]}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
                <h3 style={{ textAlign: 'left', marginBottom: 16, paddingBottom: 12 }}>
                  Mobile Metrics
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingBottom: 8 }}>
                  {EVENT_FIELDS.map((field) => {
                    const active = activeFields.includes(field);
                    if (FIELD_MOBILE_LABELS[field]){
                      return (
                        <button
                          key={field}
                          type="button"
                          onClick={() => toggleField(field)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: 48,
                            border: active
                              ? `1px solid ${FIELD_COLORS[field]}`
                              : '1px solid rgba(255,255,255,0.15)',
                            background: active
                              ? `${FIELD_COLORS[field]}22`
                              : 'transparent',
                            color: active ? FIELD_COLORS[field] : '#B9BDC7',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: active ? 600 : 400,
                          }}
                        >
                          {FIELD_MOBILE_LABELS[field]}
                        </button>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              {/* ── Chart ── */}
              <div className="info-box" style={{ maxWidth: '1200px', padding: '24px' }}>
                <h3 style={{ textAlign: 'left', paddingBottom: 16, marginBottom: 24 }}>
                  {range.charAt(0).toUpperCase() + range.slice(1)} Overview
                </h3>

                {loading ? (
                  <div style={{ color: '#B9BDC7', textAlign: 'center', padding: 40 }}>
                    Loading data...
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={340}>
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: '#B9BDC7', fontSize: 11 }}
                        tickLine={false}
                        axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                      />
                      <YAxis
                        tick={{ fill: '#B9BDC7', fontSize: 11 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend
                        formatter={(value) => (
                          <span style={{ color: '#B9BDC7', fontSize: 12 }}>
                            {FIELD_LABELS[value]}
                          </span>
                        )}
                      />
                      {activeFields.map((field) => (
                        <Line
                          key={field}
                          type="monotone"
                          dataKey={field}
                          stroke={FIELD_COLORS[field]}
                          strokeWidth={2}
                          dot={{ r: 3, fill: FIELD_COLORS[field] }}
                          activeDot={{ r: 5 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}