import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Send,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  Check,
  X,
  Play,
  Pause,
  Eye,
  Phone,
  ShieldCheck,
  Copy,
  Sparkles,
  Info,
  RotateCcw,
  Sun,
  Moon
} from 'lucide-react';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../services/api';
import purpleLogo from '../../assets/images/ansari-tools-logo-purple.png';
import blackLogo from '../../assets/images/Ansari Tools Logo Black.png';
import greyLogo from '../../assets/images/Ansari Tools Logo Grey.png';

const DEFAULT_WHATSAPP_NUMBER = '+92 322 7866655';
const DEFAULT_WHATSAPP_DISPLAY = '0322 7866655';

const TEMPLATES = {
  numberChange: {
    id: 'numberChange',
    name: '📱 WhatsApp Number Change & Warranty Notice',
    heading: 'Official Support Notice – you’re just a message away',
    subject: 'Ansari Tools: Customer Support & Official WhatsApp Update',
    message: `Assalam-o-Alaikum / Hello,

Yeh zaroori email aapko yeh itla dene ke liye bheja ja raha hai ke Ansari Tools ka official WhatsApp contact number change ho gaya hai.

Aainda tamaam Canva subscription queries, renewal deals, aur warranty claims ke liye brahe meharbani hamare naye number par contact karein.

📌 Please save our new number in your phone contacts immediately as "Ansari Tools":
New WhatsApp Number: 0322 7866655 (+92 322 7866655)

Agar aapke Canva account me koi masla ya warranty claim ho, to isi new number par apna email text karein, hum foran solve karenge.

Shukriya,
Ansari Tools Team`
  },
  renewalDeal: {
    id: 'renewalDeal',
    name: '🎁 Subscription Renewal & Discount Offer',
    heading: 'Exclusive Canva Pro Renewal & Warranty Support',
    subject: 'Ansari Tools: Exclusive Canva Pro Renewal & Warranty Support',
    message: `Assalam-o-Alaikum / Hello Valued Customer,

Umeed hai aapka Canva Pro subscription behtareen chal raha hoga. 

Agar aapki Canva subscription expire hone wali hai ya aap renew karwana chahte hain, to abhi hamare official WhatsApp par contact karein aur exclusive discount hasil karein.

Naye number par contact karein:
WhatsApp: 0322 7866655 (+92 322 7866655)

Tamaam warranty claims aur instant replacement support bhi isi number par dastyab hai.

Best regards,
Ansari Tools Team`
  },
  custom: {
    id: 'custom',
    name: '✍️ Custom Blank Message',
    heading: '',
    subject: '',
    message: ''
  }
};

const EmailBroadcastPage = () => {
  const navigate = useNavigate();

  // Data states
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCount: 0,
    sentCount: 0,
    pendingCount: 0
  });

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, expired
  const [durationFilter, setDurationFilter] = useState('all'); // all, 1 Month, 6 Months, 1 Year
  const [broadcastFilter, setBroadcastFilter] = useState('all'); // all, pending, sent

  // Selection states
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [customSelectCount, setCustomSelectCount] = useState(10);

  // Read persisted draft from localStorage on initial render
  const getInitialDraft = () => {
    try {
      const saved = localStorage.getItem('ansari_broadcast_draft');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return null;
  };

  const initialDraft = getInitialDraft();

  // Composer Form
  const [activeTemplate, setActiveTemplate] = useState(initialDraft?.activeTemplate || 'numberChange');
  const [heading, setHeading] = useState(
    initialDraft?.heading !== undefined 
      ? initialDraft.heading 
      : TEMPLATES.numberChange.heading
  );
  const [subject, setSubject] = useState(
    initialDraft?.subject !== undefined 
      ? initialDraft.subject 
      : TEMPLATES.numberChange.subject
  );
  const [customMessage, setCustomMessage] = useState(
    initialDraft?.customMessage !== undefined 
      ? initialDraft.customMessage 
      : TEMPLATES.numberChange.message
  );
  const [newWhatsApp, setNewWhatsApp] = useState(initialDraft?.newWhatsApp || DEFAULT_WHATSAPP_NUMBER);
  const [newWhatsAppDisplay, setNewWhatsAppDisplay] = useState(initialDraft?.newWhatsAppDisplay || DEFAULT_WHATSAPP_DISPLAY);
  const [delayMs, setDelayMs] = useState(initialDraft?.delayMs || 1000);

  // Auto-save status
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
  const [lastSavedAt, setLastSavedAt] = useState(null);

  // Test email state
  const [testEmail, setTestEmail] = useState('');
  const [sendingTest, setSendingTest] = useState(false);

  // Preview Modal
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewTheme, setPreviewTheme] = useState('light'); // 'light' or 'dark'

  // Batch Sending Progress Modal
  const [isSendingBatch, setIsSendingBatch] = useState(false);
  const [batchProgress, setBatchProgress] = useState({
    total: 0,
    current: 0,
    successful: 0,
    failed: 0,
    logs: [],
    isFinished: false
  });
  const stopSendingRef = useRef(false);

  // Fetch subscribers from backend
  const fetchSubscribers = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (durationFilter !== 'all') params.append('duration', durationFilter);
      if (broadcastFilter !== 'all') params.append('broadcastStatus', broadcastFilter);
      if (searchTerm.trim()) params.append('search', searchTerm.trim());

      const res = await fetch(`${API_BASE_URL}/canva-subscriptions/broadcast/list?${params.toString()}`, {
        credentials: 'include'
      });
      const data = await res.json();

      if (res.ok) {
        setSubscribers(data.subscribers || []);
        setStats({
          totalCount: data.totalCount || 0,
          sentCount: data.sentCount || 0,
          pendingCount: data.pendingCount || 0
        });
      } else {
        toast.error(data.message || 'Error fetching subscribers');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error loading subscribers');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, durationFilter, broadcastFilter, searchTerm]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  // Sync draft from MongoDB on mount
  useEffect(() => {
    const fetchSavedDraft = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/canva-subscriptions/broadcast/config`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok && data.config) {
          const cfg = data.config;
          // If localStorage didn't have custom values, use server values
          if (!localStorage.getItem('ansari_broadcast_draft')) {
            if (cfg.activeTemplate) setActiveTemplate(cfg.activeTemplate);
            if (cfg.heading !== undefined) setHeading(cfg.heading);
            if (cfg.subject !== undefined) setSubject(cfg.subject);
            if (cfg.customMessage !== undefined) setCustomMessage(cfg.customMessage);
            if (cfg.newWhatsApp) setNewWhatsApp(cfg.newWhatsApp);
            if (cfg.newWhatsAppDisplay) setNewWhatsAppDisplay(cfg.newWhatsAppDisplay);
            if (cfg.delayMs) setDelayMs(cfg.delayMs);
          }
          if (cfg.updatedAt) {
            setLastSavedAt(new Date(cfg.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          }
        }
      } catch (err) {
        console.warn('Could not load broadcast config from server:', err);
      }
    };
    fetchSavedDraft();
  }, []);

  // Save to MongoDB helper
  const saveDraftToServer = useCallback(async (draftData) => {
    try {
      setSaveStatus('saving');
      const res = await fetch(`${API_BASE_URL}/canva-subscriptions/broadcast/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(draftData)
      });
      if (res.ok) {
        setSaveStatus('saved');
        setLastSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } else {
        setSaveStatus('error');
      }
    } catch (e) {
      setSaveStatus('error');
    }
  }, []);

  // Debounced Auto-save to localStorage & MongoDB whenever composer state changes
  useEffect(() => {
    const draft = {
      activeTemplate,
      heading,
      subject,
      customMessage,
      newWhatsApp,
      newWhatsAppDisplay,
      delayMs
    };

    // Instant save to localStorage so refresh never loses user changes
    try {
      localStorage.setItem('ansari_broadcast_draft', JSON.stringify(draft));
    } catch (e) {
      // ignore
    }

    setSaveStatus('saving');
    const timer = setTimeout(() => {
      saveDraftToServer(draft);
    }, 600);

    return () => clearTimeout(timer);
  }, [activeTemplate, heading, subject, customMessage, newWhatsApp, newWhatsAppDisplay, delayMs, saveDraftToServer]);

  // Handle template selection change
  const handleTemplateChange = (templateId) => {
    setActiveTemplate(templateId);
    const tmpl = TEMPLATES[templateId];
    if (tmpl) {
      if (tmpl.heading !== undefined) setHeading(tmpl.heading);
      setSubject(tmpl.subject);
      setCustomMessage(tmpl.message);
    }
  };

  const handleResetToDefaultTemplate = () => {
    const tmpl = TEMPLATES[activeTemplate] || TEMPLATES.numberChange;
    setHeading(tmpl.heading || '');
    setSubject(tmpl.subject || '');
    setCustomMessage(tmpl.message || '');
    toast.info('Template text reset to original default');
  };

  // Toggle selection for a single subscriber
  const toggleSelectOne = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Select all currently visible subscribers
  const handleSelectAllVisible = () => {
    if (subscribers.length === 0) return;
    const allVisibleIds = subscribers.map(s => s._id);
    const areAllSelected = allVisibleIds.every(id => selectedIds.has(id));

    setSelectedIds(prev => {
      const next = new Set(prev);
      if (areAllSelected) {
        allVisibleIds.forEach(id => next.delete(id));
      } else {
        allVisibleIds.forEach(id => next.add(id));
      }
      return next;
    });
  };

  // Clear all selections
  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  // Quick Batch Selection
  const handleSelectBatchRange = (startIndex, count) => {
    const pendingSubs = subscribers.filter(s => !s.lastBroadcastDate);
    const targetPool = pendingSubs.length > 0 ? pendingSubs : subscribers;
    const slice = targetPool.slice(startIndex, startIndex + count);

    setSelectedIds(new Set(slice.map(s => s._id)));
    toast.info(`Selected ${slice.length} subscribers (Batch ${Math.floor(startIndex / count) + 1})`);
  };

  const handleSelectNextPending = (count) => {
    const pendingSubs = subscribers.filter(s => !s.lastBroadcastDate);
    const targetPool = pendingSubs.length > 0 ? pendingSubs : subscribers;
    const slice = targetPool.slice(0, count);
    if (slice.length === 0) {
      toast.warning('No subscribers found matching current filters');
      return;
    }
    setSelectedIds(new Set(slice.map(s => s._id)));
    toast.info(`Selected ${slice.length} subscribers`);
  };

  const handleSelectCustomPending = (count) => {
    const num = parseInt(count, 10);
    if (isNaN(num) || num <= 0) {
      toast.warning('Please enter a valid number greater than 0');
      return;
    }
    handleSelectNextPending(num);
  };

  const handleAppendPending = (count) => {
    const num = parseInt(count, 10);
    if (isNaN(num) || num <= 0) {
      toast.warning('Please enter a valid number greater than 0');
      return;
    }
    const pendingSubs = subscribers.filter(s => !s.lastBroadcastDate && !selectedIds.has(s._id));
    const targetPool = pendingSubs.length > 0 ? pendingSubs : subscribers.filter(s => !selectedIds.has(s._id));
    const slice = targetPool.slice(0, num);
    if (slice.length === 0) {
      toast.warning('No more additional subscribers available to add');
      return;
    }
    setSelectedIds(prev => {
      const next = new Set(prev);
      slice.forEach(s => next.add(s._id));
      return next;
    });
    toast.info(`Added ${slice.length} more subscribers to selection`);
  };

  // Send Test Email
  const handleSendTestEmail = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      toast.error('Please enter a valid email for test');
      return;
    }
    if (!subject.trim()) {
      toast.error('Subject cannot be empty');
      return;
    }

    try {
      setSendingTest(true);
      const res = await fetch(`${API_BASE_URL}/canva-subscriptions/broadcast/send-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          testEmail: testEmail.trim(),
          heading,
          subject,
          message: customMessage,
          newWhatsApp,
          newWhatsAppDisplay
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Test email sent successfully to ${testEmail}! Check your inbox.`);
      } else {
        toast.error(data.message || data.error || 'Failed to send test email');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error sending test email');
    } finally {
      setSendingTest(false);
    }
  };

  // Send to 1 specific subscriber directly
  const handleSendSingle = async (sub) => {
    if (!window.confirm(`Send broadcast email to ${sub.email}?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/canva-subscriptions/broadcast/send-batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          subscribers: [{ id: sub._id, email: sub.email, duration: sub.duration, date: sub.date, status: sub.status }],
          heading,
          subject,
          message: customMessage,
          newWhatsApp,
          newWhatsAppDisplay,
          delayMs: 0
        })
      });

      const data = await res.json();
      if (res.ok && data.successful > 0) {
        toast.success(`Email sent to ${sub.email}`);
        fetchSubscribers();
      } else {
        toast.error(data.results?.[0]?.error || 'Failed to send email');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error');
    }
  };

  // Start Batch Sending to all selected
  const handleStartBatchSending = async () => {
    if (selectedIds.size === 0) {
      toast.error('Please select at least 1 subscriber to send to');
      return;
    }
    if (!subject.trim()) {
      toast.error('Please specify an email subject');
      return;
    }

    const selectedSubs = subscribers
      .filter(s => selectedIds.has(s._id))
      .map(s => ({ id: s._id, email: s.email, duration: s.duration, date: s.date, status: s.status }));

    const confirmMsg = `Are you sure you want to send this broadcast email to ${selectedSubs.length} selected subscribers?\n\nTip: Each email will be sent individually with a ${delayMs / 1000}s delay to ensure high inbox delivery and protect your Gmail limit.`;
    if (!window.confirm(confirmMsg)) return;

    stopSendingRef.current = false;
    setIsSendingBatch(true);
    setBatchProgress({
      total: selectedSubs.length,
      current: 0,
      successful: 0,
      failed: 0,
      logs: [`[${new Date().toLocaleTimeString()}] 🚀 Initiating broadcast batch of ${selectedSubs.length} emails...`],
      isFinished: false
    });

    const CHUNK_SIZE = 15;
    let successfulCount = 0;
    let failedCount = 0;
    let processedCount = 0;

    for (let i = 0; i < selectedSubs.length; i += CHUNK_SIZE) {
      if (stopSendingRef.current) {
        setBatchProgress(prev => ({
          ...prev,
          logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ⏹️ Sending stopped by admin.`]
        }));
        break;
      }

      const chunk = selectedSubs.slice(i, i + CHUNK_SIZE);

      try {
        const res = await fetch(`${API_BASE_URL}/canva-subscriptions/broadcast/send-batch`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            subscribers: chunk,
            heading,
            subject,
            message: customMessage,
            newWhatsApp,
            newWhatsAppDisplay,
            delayMs
          })
        });

        const data = await res.json();

        if (res.ok && data.results) {
          data.results.forEach(item => {
            processedCount++;
            if (item.success) {
              successfulCount++;
              setBatchProgress(prev => ({
                ...prev,
                current: processedCount,
                successful: successfulCount,
                logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ✅ Sent to: ${item.email}`]
              }));
            } else {
              failedCount++;
              setBatchProgress(prev => ({
                ...prev,
                current: processedCount,
                failed: failedCount,
                logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ❌ Failed for: ${item.email} (${item.error || 'Unknown error'})`]
              }));
            }
          });
        } else {
          chunk.forEach(item => {
            processedCount++;
            failedCount++;
            setBatchProgress(prev => ({
              ...prev,
              current: processedCount,
              failed: failedCount,
              logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ❌ Batch failed for ${item.email}: ${data.message || 'Server error'}`]
            }));
          });
        }
      } catch (err) {
        console.error('Batch error:', err);
        chunk.forEach(item => {
          processedCount++;
          failedCount++;
          setBatchProgress(prev => ({
            ...prev,
            current: processedCount,
            failed: failedCount,
            logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ❌ Network error for ${item.email}`]
          }));
        });
      }
    }

    setBatchProgress(prev => ({
      ...prev,
      isFinished: true,
      logs: [
        ...prev.logs,
        `[${new Date().toLocaleTimeString()}] 🏁 Broadcast completed! Total: ${processedCount}, Successful: ${successfulCount}, Failed: ${failedCount}`
      ]
    }));

    toast.success(`Batch finished: ${successfulCount} emails sent successfully!`);
    fetchSubscribers();
  };

  // Reset Broadcast Status for selected or all
  const handleResetStatus = async (resetAll = false) => {
    const targetCount = resetAll ? stats.totalCount : selectedIds.size;
    if (targetCount === 0 && !resetAll) {
      toast.warning('No subscribers selected to reset');
      return;
    }

    const confirmMsg = resetAll
      ? 'Reset broadcast sent status for ALL subscribers? They will all show as Pending again.'
      : `Reset broadcast sent status for ${targetCount} selected subscribers?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/canva-subscriptions/broadcast/reset-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          resetAll,
          ids: resetAll ? [] : Array.from(selectedIds)
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Broadcast status reset for ${data.modifiedCount} subscribers`);
        fetchSubscribers();
      } else {
        toast.error('Failed to reset status');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error resetting status');
    }
  };

  const areAllFilteredSelected = subscribers.length > 0 && subscribers.every(s => selectedIds.has(s._id));

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to="/admin/canva-subscriptions"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Canva Subscriptions
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Broadcast System
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Mail className="w-7 h-7 text-emerald-600" />
            Canva Subscribers Email Broadcast
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Send bulk announcements, WhatsApp number change notices & warranty reminders to your 900+ Canva clients.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchSubscribers}
            disabled={loading}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition cursor-pointer"
            title="Refresh subscriber list"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-600' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setShowPreviewModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            Live Email Preview
          </button>
        </div>
      </div>

      {/* Gmail Quota & Strategy Advisory Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-amber-50/60 to-emerald-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="p-2 bg-amber-100/80 text-amber-800 rounded-xl mt-0.5 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 text-xs sm:text-sm">
            <div className="font-bold text-amber-950 flex items-center gap-2">
              <span>Gmail 500 Emails/Day Limit & 900+ Subscribers Best Strategy</span>
              <span className="text-[10px] font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Recommended
              </span>
            </div>
            <p className="text-amber-900/90 leading-relaxed">
              Google ki personal Gmail policy ke mutabiq <strong>ansaritools3@gmail.com</strong> se rozana ziada se ziada <strong>500 emails per 24 hours</strong> send ho sakti hain.
              Aapke paas <strong>{stats.totalCount} subscribers</strong> hain. Is liye safe delivery ke lye:
            </p>
            <ul className="list-disc pl-5 text-amber-900/90 space-y-1">
              <li>
                <strong>Batch 1 (1–450 emails):</strong> Aaj send karein (100–100 ke 4 batches me).
              </li>
              <li>
                <strong>Batch 2 (Remaining {Math.max(0, stats.totalCount - 450)} emails):</strong> Kal 24 ghante baad send karein.
              </li>
              <li>
                System har recipient ko individual personalized email bhejega (with 1 second delay), jis se email direct <strong>Primary Inbox</strong> me jaegi, Spam me nahi!
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4 Summary Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Subscribers */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Subscribers</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{stats.totalCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">In Database</div>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Broadcast Pending */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Notice</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">{stats.pendingCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Not sent yet</div>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Broadcast Sent */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sent Completed</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">{stats.sentCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Email delivered</div>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Selected Count */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Selected Now</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 mt-1">{selectedIds.size}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Ready for batch send</div>
          </div>
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
            <Mail className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Composer & Message Settings (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Email Message Composer
              </h2>
              <div className="flex items-center gap-2">
                {saveStatus === 'saving' && (
                  <span className="text-[11px] font-medium text-amber-600 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Saving...
                  </span>
                )}
                {saveStatus === 'saved' && (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-200/60">
                    <Check className="w-3 h-3 text-emerald-600" /> Auto-saved {lastSavedAt ? `(${lastSavedAt})` : ''}
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetToDefaultTemplate}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
                  title="Reset to original template text"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Template
                </button>
              </div>
            </div>

            {/* Template Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Pre-made Template
              </label>
              <div className="grid grid-cols-1 gap-2">
                {Object.values(TEMPLATES).map(tmpl => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleTemplateChange(tmpl.id)}
                    className={`text-left p-3 rounded-xl border text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                      activeTemplate === tmpl.id
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-semibold shadow-xs ring-1 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{tmpl.name}</span>
                    {activeTemplate === tmpl.id && (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sender & Contact Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  New WhatsApp (Intl)
                </label>
                <input
                  type="text"
                  value={newWhatsApp}
                  onChange={(e) => setNewWhatsApp(e.target.value)}
                  placeholder="+92 322 7866655"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Display Number
                </label>
                <input
                  type="text"
                  value={newWhatsAppDisplay}
                  onChange={(e) => setNewWhatsAppDisplay(e.target.value)}
                  placeholder="0322 7866655"
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>

            {/* Email Subject */}
            {/* Email Headline / Main Heading */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Headline (Main Heading)
              </label>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Official Support Notice – you’re just a message away"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-slate-900"
              />
            </div>

            {/* Email Subject Line */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Important Notice: ..."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            {/* Message Body */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Message Body
                </label>
                <span className="text-[11px] text-slate-400">Line breaks preserved automatically</span>
              </div>
              <textarea
                rows={9}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Enter your message in Urdu / Roman Urdu / English..."
                className="w-full text-xs sm:text-sm p-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans leading-relaxed text-slate-800"
              />
            </div>

            {/* Throttle Delay Setting */}
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <div>
                <span className="font-bold text-slate-800">Sending Throttle (Delay):</span>
                <p className="text-[11px] text-slate-500">Wait time between emails to protect Gmail account</p>
              </div>
              <select
                value={delayMs}
                onChange={(e) => setDelayMs(Number(e.target.value))}
                className="text-xs font-bold px-2.5 py-1.5 border border-slate-200 rounded-lg bg-white"
              >
                <option value={800}>0.8s (Fast)</option>
                <option value={1000}>1.0s (Recommended)</option>
                <option value={1500}>1.5s (Safe)</option>
                <option value={2000}>2.0s (Very Safe)</option>
              </select>
            </div>

            {/* Test Email Section */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                🧪 Send Test Email First (Verify Look & Inbox)
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Enter your email (e.g. yourname@gmail.com)"
                  className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  disabled={sendingTest}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {sendingTest ? 'Sending...' : 'Send Test'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Sends 1 sample email to check how it appears on mobile & desktop before sending to all 900+ customers.
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleStartBatchSending}
                disabled={selectedIds.size === 0 || isSendingBatch}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {selectedIds.size === 0
                    ? 'Select Subscribers to Send'
                    : `Start Broadcast to ${selectedIds.size} Selected Subscribers`}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Audience, Filters & Subscribers Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Quick Batch & Manual Selection Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-sm space-y-4">
            {/* Header & Reset/Clear */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Audience Selection Tools (Manual & Batch)
              </div>
              <div className="flex items-center gap-2 text-xs">
                {selectedIds.size > 0 && (
                  <span className="font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                    {selectedIds.size} Selected
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="px-2 py-1 text-slate-500 hover:text-red-600 font-semibold cursor-pointer rounded hover:bg-red-50 transition"
                >
                  Clear Selection
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => handleResetStatus(false)}
                  className="px-2 py-1 text-slate-500 hover:text-slate-800 font-medium cursor-pointer flex items-center gap-1 rounded hover:bg-slate-100 transition"
                  title="Reset status for selected"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset Selected Status
                </button>
              </div>
            </div>

            {/* Manual Custom Count Input Bar */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                  Custom Select:
                </span>
                <input
                  type="number"
                  min="1"
                  max={subscribers.length || 971}
                  value={customSelectCount}
                  onChange={(e) => setCustomSelectCount(e.target.value)}
                  className="w-20 px-2.5 py-1.5 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. 15"
                />
                <button
                  type="button"
                  onClick={() => handleSelectCustomPending(customSelectCount)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  Select First {customSelectCount || 10}
                </button>
                <button
                  type="button"
                  onClick={() => handleAppendPending(customSelectCount)}
                  className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
                  title="Add more to current selection"
                >
                  + Add {customSelectCount || 10} More
                </button>
              </div>

              {/* Quick Preset Buttons (10, 20, 50, 100) */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-slate-500 mr-1">Presets:</span>
                <button
                  type="button"
                  onClick={() => handleSelectCustomPending(10)}
                  className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                >
                  10
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectCustomPending(20)}
                  className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                >
                  20
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectCustomPending(50)}
                  className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                >
                  50
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectCustomPending(100)}
                  className="px-2.5 py-1 rounded-md bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                >
                  100
                </button>
              </div>
            </div>

            {/* Batch Ranges Bar */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                100-Subscribers Batches:
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleSelectBatchRange(0, 100)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  1 - 100
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectBatchRange(100, 100)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  101 - 200
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectBatchRange(200, 100)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  201 - 300
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectBatchRange(300, 100)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  301 - 400
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectBatchRange(400, 100)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  401 - 500
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectBatchRange(500, 100)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  501 - 600
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectBatchRange(600, 100)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  601 - 700
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectBatchRange(700, 100)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  701 - 800
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectBatchRange(800, 100)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  801 - 900
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectBatchRange(900, 100)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  901 - 971
                </button>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Search */}
              <div className="sm:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by customer email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Broadcast Status Filter */}
              <div className="sm:col-span-3">
                <select
                  value={broadcastFilter}
                  onChange={(e) => setBroadcastFilter(e.target.value)}
                  className="w-full py-2 px-2.5 text-xs border border-slate-200 rounded-xl bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Status: All</option>
                  <option value="pending">Pending Only</option>
                  <option value="sent">Sent Only</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div className="sm:col-span-3">
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="w-full py-2 px-2.5 text-xs border border-slate-200 rounded-xl bg-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Plan: All Plans</option>
                  <option value="1 Month">1 Month</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="1 Year">1 Year</option>
                </select>
              </div>
            </div>

            {/* Selection info bar */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800">
                  Showing {subscribers.length} of {stats.totalCount} subscribers
                </span>
                {selectedIds.size > 0 && (
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold text-[11px]">
                    {selectedIds.size} Selected
                  </span>
                )}
              </div>
              <button
                onClick={handleSelectAllVisible}
                className="font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
              >
                {areAllFilteredSelected ? 'Deselect All Visible' : 'Select All Visible'}
              </button>
            </div>
          </div>

          {/* Subscribers Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="max-h-[580px] overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider z-10">
                  <tr>
                    <th className="py-3 px-3 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={areAllFilteredSelected}
                        onChange={handleSelectAllVisible}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-3">Subscriber Email</th>
                    <th className="py-3 px-3">Plan</th>
                    <th className="py-3 px-3">Broadcast Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
                        Loading subscribers...
                      </td>
                    </tr>
                  ) : subscribers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        No subscribers match the current filter or search criteria.
                      </td>
                    </tr>
                  ) : (
                    subscribers.map((sub, index) => {
                      const isSelected = selectedIds.has(sub._id);
                      const isSent = !!sub.lastBroadcastDate;

                      return (
                        <tr
                          key={sub._id}
                          onClick={() => toggleSelectOne(sub._id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-purple-100/70 border-l-4 border-l-purple-600 font-semibold'
                              : index % 2 === 0
                              ? 'bg-white hover:bg-slate-50'
                              : 'bg-slate-50/40 hover:bg-slate-100/60'
                          }`}
                        >
                          <td
                            className="py-2.5 px-3 text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectOne(sub._id)}
                              className="rounded border-slate-300 text-purple-600 focus:ring-purple-500 cursor-pointer h-4 w-4"
                            />
                          </td>
                          <td className="py-2.5 px-3 font-medium text-slate-800">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-xs">{sub.email}</span>
                              {isSelected && (
                                <span className="text-[10px] font-bold bg-purple-200 text-purple-900 px-1.5 py-0.2 rounded">
                                  Selected
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(sub.email);
                                  toast.info('Email copied');
                                }}
                                className="text-slate-300 hover:text-slate-600 p-0.5 ml-auto"
                                title="Copy Email"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded-md text-[11px]">
                              {sub.duration || 'Canva Pro'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            {isSent ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Sent ({new Date(sub.lastBroadcastDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">
                                <Clock className="w-3 h-3 text-amber-600" />
                                Pending
                              </span>
                            )}
                          </td>
                          <td
                            className="py-2.5 px-3 text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={() => handleSendSingle(sub)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 text-[11px] font-semibold transition cursor-pointer"
                              title="Send email to this subscriber now"
                            >
                              Send Now
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Live Email Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Live Email Preview</h3>
                <p className="text-xs text-slate-500">See how recipients see your email in Light &amp; Dark Mode</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Theme Switcher Toggle */}
                <div className="flex items-center bg-slate-200/90 p-1 rounded-xl border border-slate-300/70 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setPreviewTheme('light')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      previewTheme === 'light'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    Light Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTheme('dark')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      previewTheme === 'dark'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    Dark Mode (iPhone)
                  </button>
                </div>

                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Email Meta Bar */}
            <div className={`px-6 py-3 border-b text-xs space-y-1 transition-colors ${
              previewTheme === 'dark' 
                ? 'bg-slate-900 border-slate-800 text-slate-300' 
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <div><strong>From:</strong> Ansari Tools &lt;ansaritools3@gmail.com&gt;</div>
              <div><strong>Subject:</strong> {subject || '(No Subject)'}</div>
              <div><strong>To:</strong> customer@example.com</div>
            </div>

            {/* Modal Body Preview (Hostinger-inspired crisp white email canvas) */}
            <div className={`flex-1 overflow-y-auto p-4 sm:p-6 transition-colors duration-300 ${
              previewTheme === 'dark' ? 'bg-[#0b0e11]' : 'bg-slate-100'
            }`}>
              <div className="max-w-xl mx-auto rounded-2xl shadow-xl overflow-hidden bg-white border border-slate-200 text-slate-900">
                
                {/* Email Header: Centered Logo on Clean White Canvas */}
                <div className="pt-8 px-7 pb-4 flex justify-center text-center">
                  <img
                    src={purpleLogo}
                    alt="Ansari Tools"
                    className="h-10 sm:h-11 w-auto object-contain mx-auto"
                  />
                </div>

                {/* Main Email Content */}
                <div className="px-7 pb-7 pt-2">
                  {/* Headline (Dynamic) */}
                  <h1 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
                    {heading || 'Official Support Notice – you’re just a message away'}
                  </h1>

                  {/* Formatted Message Body */}
                  <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line mb-6 font-normal">
                    {customMessage || 'Your message text will appear here...'}
                  </div>

                  {/* Signature Hostinger Midnight Purple Card */}
                  <div className="bg-[#1F1739] text-white rounded-2xl p-6 sm:p-7 mb-6 shadow-md text-left">
                    <div className="text-lg sm:text-xl font-bold text-white mb-1">
                      New Official WhatsApp Support
                    </div>
                    <div className="text-sm font-semibold text-[#d1c7f7] mb-5 tracking-wide">
                      <a href={`tel:+${newWhatsApp.replace(/[^0-9]/g, '')}`} className="hover:underline text-[#d1c7f7]">
                        {newWhatsAppDisplay || newWhatsApp}
                      </a>
                    </div>

                    {/* CTA Button */}
                    <div>
                      <a
                        href={`https://wa.me/${newWhatsApp.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#6C5CE7] hover:bg-[#5a48e0] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                        Message on WhatsApp
                      </a>
                    </div>

                    {/* Sub-note inside card */}
                    <div className="mt-4 pt-3 border-t border-white/10 text-xs text-[#b8afdc] leading-relaxed">
                      Please save <strong>{newWhatsAppDisplay || newWhatsApp}</strong> in your phone contacts as <strong>"Ansari Tools"</strong> for instant warranty assistance.
                    </div>
                  </div>

                  {/* Guidelines Light Card (Hostinger style) */}
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Important Subscriber Guidelines:
                  </div>
                  <div className="bg-[#f6f8fb] border border-[#eef2f6] rounded-xl p-4 text-xs space-y-2 text-slate-700 mb-5">
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 font-bold text-slate-900">📌 Warranty Claims:</span>
                      <span>Text your registered email to our new WhatsApp number for fast warranty re-invites.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 font-bold text-slate-900">🎁 Renewal Deals:</span>
                      <span>Get lowest discounted rates on Canva Pro, ChatGPT & digital tools renewals.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 font-bold text-slate-900">⚡ Fast Response:</span>
                      <span>Dedicated support replies within minutes during business hours.</span>
                    </div>
                  </div>

                  {/* Recipient Subscription Details & Status Card */}
                  <div className="bg-[#fafbfc] border border-[#e5e7eb] rounded-xl p-4 text-xs mb-6">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100 font-semibold">
                      <span className="text-slate-800">Canva Pro Subscription Status</span>
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase">● Active (245 Days Remaining)</span>
                    </div>
                    <div className="pt-2.5 space-y-1.5 text-slate-600">
                      <div className="flex justify-between">
                        <span>Recipient Email:</span>
                        <span className="font-semibold text-slate-900">customer@example.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Plan Duration:</span>
                        <span className="font-semibold text-slate-900">1 Year</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Valid Until:</span>
                        <span className="font-semibold text-slate-900">Dec 31, 2026</span>
                      </div>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-emerald-700 font-medium">
                      ✓ Aapka subscription plan active hai. Kisi bhi query ya warranty replacement ke liye WhatsApp par message karein.
                    </div>
                  </div>

                  {/* Clean Divider */}
                  <div className="border-t border-slate-200 my-6"></div>

                  {/* Email Footer (Hostinger Style with Grey Logo) */}
                  <div>
                    <div className="mb-3">
                      <img
                        src={greyLogo}
                        alt="Ansari Tools"
                        className="h-8 w-auto object-contain opacity-80"
                      />
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">
                      You have received this email as you are a registered customer at Ansari Tools. For queries, contact support@ansaritools.com.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 mb-3">
                      <a href={`https://wa.me/${newWhatsApp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-slate-900">WhatsApp</a>
                      <span>•</span>
                      <a href="https://ansaritools.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">Official Website</a>
                      <span>•</span>
                      <a href="https://ansaritools.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">Help Center</a>
                      <span>•</span>
                      <a href="https://ansaritools.com" target="_blank" rel="noreferrer" className="hover:text-slate-900">Privacy Policy</a>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      © 2024-{new Date().getFullYear()} Ansari Tools International. All rights reserved.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-white border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-900 transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Batch Sending Progress Modal */}
      {isSendingBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-5 animate-scale-up">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-emerald-600 animate-bounce" />
                  {batchProgress.isFinished ? 'Broadcast Finished!' : 'Sending Broadcast Emails...'}
                </h3>
                <p className="text-xs text-slate-500">
                  {batchProgress.isFinished
                    ? 'All selected emails processed.'
                    : `Sending email ${batchProgress.current} of ${batchProgress.total} with delay...`}
                </p>
              </div>
              {batchProgress.isFinished && (
                <button
                  onClick={() => setIsSendingBatch(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Progress</span>
                <span>
                  {batchProgress.total > 0
                    ? Math.round((batchProgress.current / batchProgress.total) * 100)
                    : 0}%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-300 rounded-full"
                  style={{
                    width: `${batchProgress.total > 0 ? (batchProgress.current / batchProgress.total) * 100 : 0}%`
                  }}
                />
              </div>
            </div>

            {/* Live Counters */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Processed</div>
                <div className="text-lg font-extrabold text-slate-900">{batchProgress.current} / {batchProgress.total}</div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-700 uppercase">Successful</div>
                <div className="text-lg font-extrabold text-emerald-700">{batchProgress.successful}</div>
              </div>
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                <div className="text-[10px] font-bold text-rose-700 uppercase">Failed</div>
                <div className="text-lg font-extrabold text-rose-700">{batchProgress.failed}</div>
              </div>
            </div>

            {/* Live Scrolling Activity Logs */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Activity Log</div>
              <div className="h-44 overflow-y-auto bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] space-y-1 leading-relaxed">
                {batchProgress.logs.map((log, i) => (
                  <div key={i} className="break-all">{log}</div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              {!batchProgress.isFinished ? (
                <button
                  type="button"
                  onClick={() => {
                    stopSendingRef.current = true;
                    toast.info('Stopping after current email...');
                  }}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Stop Sending
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSendingBatch(false)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailBroadcastPage;
