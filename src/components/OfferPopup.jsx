import React, { useState, useEffect } from "react";
import { X, MessageCircle, Phone, Check, ShieldCheck, ArrowDown, Sparkles, UserPlus, Copy } from "lucide-react";
import logo from "../assets/images/Ansari Tools Logo.png";

const ACK_STORAGE_KEY = "ansari_tools_whatsapp_number_update_ack";
const SESSION_DISMISSED_KEY = "ansari_tools_whatsapp_update_session_dismissed";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const NEW_WHATSAPP_DISPLAY = "0322 7866655";
const NEW_WHATSAPP_INTL = "+92 322 7866655";
const NEW_WHATSAPP_DIGITS = "923227866655";

const OfferPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [contactSaved, setContactSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deviceType, setDeviceType] = useState("generic");

  useEffect(() => {
    // Clear previously stored suppression keys so popup appears on every refresh as requested
    try {
      localStorage.removeItem(ACK_STORAGE_KEY);
      sessionStorage.removeItem(SESSION_DISMISSED_KEY);
    } catch (e) {}

    const ua = navigator.userAgent || "";
    if (/iphone|ipad|ipod/i.test(ua)) {
      setDeviceType("ios");
    } else if (/android/i.test(ua)) {
      setDeviceType("android");
    } else {
      setDeviceType("generic");
    }

    // Show popup on every refresh/page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSavedNumber = () => {
    setIsVisible(false);
  };

  const handleCopyNumber = () => {
    try {
      navigator.clipboard.writeText("03227866655");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {}
  };

  const handleSaveContact = (e) => {
    setContactSaved(true);

    const ua = navigator.userAgent || "";
    const isIOS = /iphone|ipad|ipod/i.test(ua);

    // 1. iPhone (iOS): Native Safari contact preview
    if (isIOS) {
      // Default link href="/ansari-tools.vcf" handles iOS contact card opening
      setTimeout(() => setContactSaved(false), 5000);
      return;
    }

    // 2. Android & Desktop: In-memory Blob (bypasses HTTP insecure download alerts)
    try {
      if (e && e.preventDefault) e.preventDefault();
      const vCardData = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Tools;Ansari;;;",
        "FN:Ansari Tools",
        "TEL;TYPE=CELL,VOICE;TYPE=pref:+923227866655",
        "TEL;TYPE=WORK,VOICE:03227866655",
        "EMAIL;TYPE=INTERNET:ansaritools3@gmail.com",
        "URL:https://ansaritools.com",
        "NOTE:Official WhatsApp Number Ansari Tools",
        "END:VCARD"
      ].join("\r\n");

      const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
      const blobUrl = window.URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.href = blobUrl;
      tempLink.setAttribute("download", "Ansari Tools.vcf");
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      setTimeout(() => {
        window.URL.revokeObjectURL(blobUrl);
        setContactSaved(false);
      }, 5000);
    } catch (err) {
      // Allow fallback
      setTimeout(() => setContactSaved(false), 5000);
    }
  };

  const prefilledMessage = encodeURIComponent(
    "Hello Ansari Tools, I am contacting you on your new official WhatsApp number."
  );
  const whatsappUrl = `https://wa.me/${NEW_WHATSAPP_DIGITS}?text=${prefilledMessage}`;

  if (!isVisible) return null;

  return (
    <>
      {/* Dark Semi-transparent Backdrop */}
      <div
        onClick={handleClose}
        className="wa-popup-backdrop"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(10, 4, 25, 0.75)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          zIndex: 9998,
          animation: "waFadeIn 0.25s ease",
        }}
      />

      {/* Main Modal Container */}
      <div
        className="wa-popup-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wa-update-title"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "min(94vw, 840px)",
          maxHeight: "min(94vh, 660px)",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          boxShadow: "0 25px 70px -10px rgba(16, 4, 40, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          animation: "waScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* LEFT PANEL — BRANDED GRAPHIC SECTION */}
        <div className="wa-popup-visual-panel">
          {/* Subtle Ambient Orbs */}
          <div className="wa-visual-orb wa-visual-orb-1" />
          <div className="wa-visual-orb wa-visual-orb-2" />
          <div className="wa-visual-grid" />

          {/* Brand Header */}
          <div className="wa-visual-header">
            <div className="wa-visual-logo-row">
              <img src={logo} alt="Ansari Tools" className="wa-visual-logo-img" />
              <div className="wa-visual-logo-text">
                <span className="wa-visual-brand-name">ANSARI TOOLS</span>
                <span className="wa-visual-brand-sub">Official Contact Update</span>
              </div>
            </div>
            <div className="wa-visual-pill">
              <span className="wa-visual-pulse-dot" />
              OFFICIAL NOTICE
            </div>
          </div>

          {/* Central Graphics: WhatsApp Card & Transition */}
          <div className="wa-visual-center">
            {/* Center Icon Card */}
            <div className="wa-visual-icon-card">
              <div className="wa-visual-wa-bubble">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
                </svg>
              </div>
              <h3 className="wa-visual-heading">WhatsApp Number Changed</h3>
            </div>

            {/* Old vs New Card Comparison */}
            <div className="wa-visual-compare-box">
              {/* Old Status */}
              <div className="wa-visual-status-row wa-visual-status-old">
                <span className="wa-visual-status-label">PREVIOUS NUMBER</span>
                <span className="wa-visual-badge-deactivated">DEACTIVATED</span>
              </div>

              {/* Transfer indicator */}
              <div className="wa-visual-transfer-line">
                <ArrowDown className="w-4 h-4 text-emerald-400 animate-bounce" />
                <span>TRANSFERRED TO NEW NUMBER</span>
              </div>

              {/* New Number Highlight */}
              <div className="wa-visual-status-row wa-visual-status-new">
                <div className="wa-visual-new-tag">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>NEW OFFICIAL WHATSAPP</span>
                </div>
                <div className="wa-visual-new-digits">{NEW_WHATSAPP_DISPLAY}</div>
              </div>
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="wa-visual-footer">
            <span className="wa-visual-footer-pill">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300 mr-1.5" />
              {deviceType === "ios"
                ? "1-TAP SAVE FOR IPHONE"
                : deviceType === "android"
                ? "1-TAP SAVE FOR ANDROID"
                : "1-TAP SAVE FOR IPHONE & ANDROID"}
            </span>
          </div>
        </div>

        {/* RIGHT PANEL — CONTENT & CTAS */}
        <div className="wa-popup-content-panel">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="wa-popup-close-btn"
            aria-label="Close Announcement"
          >
            <X className="w-4 h-4 text-gray-500 hover:text-gray-900 transition-colors" />
          </button>

          {/* Header & Badges */}
          <div>
            <div className="wa-badge-row">
              <span className="wa-update-pill">
                <span className="wa-pulse-dot" />
                IMPORTANT CONTACT UPDATE
              </span>
            </div>

            <h2 id="wa-update-title" className="wa-main-title">
              Our WhatsApp Number Has Changed
            </h2>

            <p className="wa-main-desc">
              Our previous WhatsApp number has been <strong>permanently deactivated</strong>.
              For all orders, warranty claims, instant renewals, and general support, please connect with Ansari Tools on our new official WhatsApp number.
            </p>

            {/* VISUALLY PROMINENT CONTACT BOX */}
            <div className="wa-contact-box">
              {/* Centered Number Copied Notification Overlay */}
              {copied && (
                <div className="wa-center-copied-toast" role="status" aria-live="polite">
                  <div className="wa-center-copied-pill">
                    <Check className="w-4 h-4 text-emerald-300 stroke-[3]" />
                    <span>Number Copied!</span>
                  </div>
                </div>
              )}

              <div className="wa-contact-box-header">
                <span className="wa-contact-label">NEW OFFICIAL WHATSAPP</span>
                <span className="wa-verified-badge">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Verified Official</span>
                </span>
              </div>

              <div className="wa-contact-number-row">
                <div className="wa-number-icon-wrap">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa-contact-number-link"
                >
                  {NEW_WHATSAPP_INTL}
                </a>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="wa-copy-number-btn"
                  title="Copy Number"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Comparison Sub-row */}
              <div className="wa-status-subrow">
                <span className="text-gray-500 font-medium">Previous WhatsApp Number:</span>
                <span className="wa-inactive-badge">NO LONGER ACTIVE</span>
              </div>
            </div>

            {/* Subtext Notice */}
            <p className="wa-save-subtext">
              📌 Please save our new WhatsApp number to avoid missing order updates, warranty support, and future assistance.
            </p>

            {/* Security Note */}
            <div className="wa-security-note">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>For your security, please use only the official WhatsApp number shown on <strong>ansaritools.com</strong>.</span>
            </div>
          </div>

          {/* Action Button Group */}
          <div className="wa-popup-btn-group">
            {/* 1-Tap Save to Contacts Button for iPhone and Android */}
            <a
              href="/ansari-tools.vcf"
              download="Ansari Tools.vcf"
              onClick={handleSaveContact}
              className="wa-btn-save-contact"
            >
              {contactSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300 flex-shrink-0 stroke-[3]" />
                  <span>
                    {deviceType === "android"
                      ? 'Card Ready! Tap "Open" to Save'
                      : "Contact Card Ready! Tap Save"}
                  </span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 flex-shrink-0 text-white" />
                  <span>
                    {deviceType === "ios"
                      ? "Save Contact to iPhone (1-Tap)"
                      : deviceType === "android"
                      ? "Save Contact to Android Phone"
                      : "Save Contact to Phone (iPhone & Android)"}
                  </span>
                </>
              )}
            </a>

            {/* Helper micro-text */}
            <div className="wa-auto-save-helper">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>
                {deviceType === "ios"
                  ? "Directly opens Contact Card on your iPhone"
                  : deviceType === "android"
                  ? 'Tap button, then tap "Open" to save into Contacts'
                  : 'iPhone: Direct Card | Android: Tap "Open" to save'}
              </span>
            </div>

            {/* Primary CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn-primary"
            >
              <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488" />
              </svg>
              <span>Message Us on New WhatsApp</span>
            </a>

            {/* Secondary CTA */}
            <button
              onClick={handleSavedNumber}
              className="wa-btn-secondary"
            >
              <Check className="w-4 h-4 text-purple-600" />
              <span>I've Saved the New Number</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scoped CSS Styles for Modal */}
      <style>{`
        @keyframes waFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes waScaleUp {
          from { opacity: 0; transform: translate(-50%, -46%) scale(0.96); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        /* ── Left Visual Panel ── */
        .wa-popup-visual-panel {
          flex: 0 0 44%;
          width: 44%;
          background: linear-gradient(150deg, #13052e 0%, #2b0d66 50%, #062b14 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px;
          position: relative;
          overflow: hidden;
          color: #ffffff;
        }

        .wa-visual-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          pointer-events: none;
        }
        .wa-visual-orb-1 {
          width: 180px;
          height: 180px;
          top: -30px;
          right: -20px;
          background: rgba(37, 211, 102, 0.22);
        }
        .wa-visual-orb-2 {
          width: 220px;
          height: 220px;
          bottom: -40px;
          left: -40px;
          background: rgba(147, 51, 234, 0.3);
        }
        .wa-visual-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
        }

        .wa-visual-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .wa-visual-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .wa-visual-logo-img {
          height: 34px;
          width: auto;
          object-fit: contain;
        }
        .wa-visual-logo-text {
          display: flex;
          flex-direction: column;
        }
        .wa-visual-brand-name {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #ffffff;
        }
        .wa-visual-brand-sub {
          font-size: 10px;
          color: rgba(196, 181, 253, 0.8);
        }
        .wa-visual-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 9.5px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(37, 211, 102, 0.15);
          border: 1px solid rgba(37, 211, 102, 0.4);
          color: #4ade80;
          letter-spacing: 0.05em;
        }
        .wa-visual-pulse-dot {
          width: 6px;
          height: 6px;
          background-color: #22c55e;
          border-radius: 50%;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .wa-visual-center {
          position: relative;
          z-index: 2;
          margin: 18px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }
        .wa-visual-icon-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 8px;
        }
        .wa-visual-wa-bubble {
          width: 58px;
          height: 58px;
          border-radius: 20px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.4), inset 0 2px 4px rgba(255,255,255,0.4);
        }
        .wa-visual-heading {
          font-size: 16px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .wa-visual-compare-box {
          width: 100%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          backdrop-filter: blur(8px);
        }
        .wa-visual-status-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
        }
        .wa-visual-status-label {
          color: rgba(220, 205, 255, 0.7);
          font-size: 10px;
          font-weight: 600;
        }
        .wa-visual-badge-deactivated {
          font-size: 9.5px;
          font-weight: 800;
          color: #f87171;
          background: rgba(239, 68, 68, 0.16);
          border: 1px solid rgba(239, 68, 68, 0.3);
          padding: 2px 7px;
          border-radius: 6px;
          letter-spacing: 0.03em;
        }
        .wa-visual-transfer-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 9.5px;
          font-weight: 700;
          color: #4ade80;
          letter-spacing: 0.05em;
          padding: 3px 0;
        }
        .wa-visual-status-new {
          background: rgba(37, 211, 102, 0.12);
          border: 1px solid rgba(37, 211, 102, 0.35);
          border-radius: 8px;
          padding: 8px 10px;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
        }
        .wa-visual-new-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 9.5px;
          font-weight: 800;
          color: #4ade80;
        }
        .wa-visual-new-digits {
          font-family: monospace, sans-serif;
          font-size: 17px;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.05em;
        }

        .wa-visual-footer {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
        }
        .wa-visual-footer-pill {
          display: inline-flex;
          align-items: center;
          font-size: 10.5px;
          font-weight: 800;
          color: #d1fae5;
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.35);
          padding: 4px 12px;
          border-radius: 999px;
          letter-spacing: 0.04em;
        }

        /* ── Right Content Panel ── */
        .wa-popup-content-panel {
          flex: 0 0 56%;
          width: 56%;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 28px;
          position: relative;
          box-sizing: border-box;
          overflow-y: auto;
        }

        .wa-popup-close-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #f3f4f6;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: background-color 0.2s, transform 0.2s;
        }
        .wa-popup-close-btn:hover {
          background-color: #e5e7eb;
          transform: scale(1.05);
        }

        .wa-badge-row {
          margin-bottom: 8px;
        }
        .wa-update-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          color: #2b0d66;
          background: #f0ebff;
          border: 1px solid #d8b4fe;
          padding: 3px 10px;
          border-radius: 999px;
          letter-spacing: 0.04em;
        }
        .wa-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #7c3aed;
        }

        .wa-main-title {
          font-size: 23px;
          font-weight: 800;
          color: #111827;
          line-height: 1.25;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .wa-main-desc {
          font-size: 13px;
          color: #4b5563;
          line-height: 1.5;
          margin-bottom: 14px;
        }

        /* ── Contact Box ── */
        .wa-contact-box {
          position: relative;
          background: #f0fdf4;
          border: 1.5px solid #86efac;
          border-radius: 14px;
          padding: 12px 14px;
          margin-bottom: 12px;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.08);
          overflow: hidden;
        }

        .wa-center-copied-toast {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
          pointer-events: none;
          background: rgba(240, 253, 244, 0.7);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          animation: waToastFade 0.18s ease-out;
        }

        .wa-center-copied-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #11052c 0%, #1c0a3d 100%);
          color: #ffffff;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 800;
          letter-spacing: 0.02em;
          border: 1.5px solid #22c55e;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(34, 197, 94, 0.4);
          animation: waToastPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes waToastFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes waToastPop {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .wa-contact-box-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .wa-contact-label {
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #166534;
        }
        .wa-verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #dcfce7;
          border: 1px solid #4ade80;
          color: #15803d;
          font-size: 10px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 999px;
        }

        .wa-contact-number-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .wa-number-icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #dcfce7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .wa-contact-number-link {
          font-size: 21px;
          font-weight: 900;
          color: #15803d;
          font-family: monospace, sans-serif;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: color 0.15s;
        }
        .wa-contact-number-link:hover {
          color: #166534;
        }

        .wa-copy-number-btn {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 9px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid #bbf7d0;
          color: #374151;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }
        .wa-copy-number-btn:hover {
          background: #f0fdf4;
          border-color: #86efac;
          color: #15803d;
          transform: translateY(-1px);
        }

        .wa-status-subrow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          padding-top: 6px;
          border-top: 1px dashed #bbf7d0;
        }
        .wa-inactive-badge {
          font-size: 9.5px;
          font-weight: 800;
          color: #b91c1c;
          background: #fee2e2;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.03em;
        }

        .wa-save-subtext {
          font-size: 12px;
          color: #4b5563;
          line-height: 1.45;
          margin-bottom: 10px;
        }

        .wa-security-note {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background: #faf5ff;
          border: 1px solid #e9d5ff;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 11px;
          color: #6b21a8;
          line-height: 1.4;
          margin-bottom: 14px;
        }

        /* ── Button Group ── */
        .wa-popup-btn-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .wa-btn-save-contact {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 11px 16px;
          background: linear-gradient(135deg, #2b0d66 0%, #4c1d95 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 13.5px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(76, 29, 149, 0.35);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          cursor: pointer;
        }
        .wa-btn-save-contact:hover {
          transform: translateY(-1.5px);
          box-shadow: 0 8px 22px rgba(76, 29, 149, 0.5);
          background: linear-gradient(135deg, #371285 0%, #5b21b6 100%);
          color: #ffffff;
        }

        .wa-auto-save-helper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: 11px;
          color: #6b7280;
          margin-top: -2px;
          margin-bottom: 2px;
          text-align: center;
        }

        .wa-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px 16px;
          background: linear-gradient(135deg, #25D366 0%, #16a34a 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 14px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          cursor: pointer;
        }
        .wa-btn-primary:hover {
          transform: translateY(-1.5px);
          box-shadow: 0 8px 24px rgba(37, 211, 102, 0.55);
          background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
        }

        .wa-btn-secondary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 10px 14px;
          background: #ffffff;
          color: #4b5563;
          font-size: 12.5px;
          font-weight: 700;
          border-radius: 12px;
          border: 1.5px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.2s;
        }
        .wa-btn-secondary:hover {
          background: #f9fafb;
          border-color: #cbd5e1;
          color: #111827;
        }

        /* ── Mobile Responsive Adjustments ── */
        @media (max-width: 768px) {
          .wa-popup-modal {
            width: 95vw !important;
            max-height: 94vh !important;
            flex-direction: column !important;
          }
          .wa-popup-visual-panel {
            flex: 0 0 auto !important;
            width: 100% !important;
            padding: 14px 16px !important;
          }
          .wa-visual-center {
            display: none !important;
          }
          .wa-visual-footer {
            display: none !important;
          }
          .wa-popup-content-panel {
            flex: 1 1 auto !important;
            width: 100% !important;
            padding: 16px 14px !important;
          }
          .wa-main-title {
            font-size: 18px !important;
            margin-bottom: 6px !important;
          }
          .wa-main-desc {
            font-size: 11.5px !important;
            margin-bottom: 10px !important;
          }
          .wa-contact-box {
            padding: 10px 12px !important;
            margin-bottom: 10px !important;
          }
          .wa-contact-number-link {
            font-size: 18px !important;
          }
          .wa-save-subtext {
            font-size: 11px !important;
            margin-bottom: 8px !important;
          }
          .wa-security-note {
            font-size: 10.5px !important;
            padding: 6px 8px !important;
            margin-bottom: 10px !important;
          }
          .wa-btn-primary {
            padding: 10px 14px !important;
            font-size: 13px !important;
          }
          .wa-btn-secondary {
            padding: 8px 12px !important;
            font-size: 11.5px !important;
          }
        }
      `}</style>
    </>
  );
};

export default OfferPopup;
