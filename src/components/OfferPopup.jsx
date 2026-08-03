import React, { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import offerImage from "../assets/images/Gemeni Offer.png";

const OfferPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsVisible(false);

  const whatsappMessage = encodeURIComponent(
    "Hi, I saw your Google AI Pro offer on your website. I'm interested in the Rs. 999 / 18 Months subscription. Please guide me."
  );
  const whatsappUrl = `https://wa.me/923102204842?text=${whatsappMessage}`;

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 9998,
          animation: "offerFadeIn 0.2s ease",
        }}
      />

      {/* Main Container */}
      <div
        className="popup-box"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "min(94vw, 760px)",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          boxShadow: "0 24px 70px rgba(0,0,0,0.55)",
          animation: "offerSlideUp 0.3s ease",
        }}
      >
        {/* LEFT PANEL — IMAGE 100% UNCROPPED */}
        <div
          className="popup-img-wrapper"
          style={{
            flex: "0 0 52%",
            width: "52%",
            backgroundColor: "#0b0c16",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
          }}
        >
          <img
            src={offerImage}
            alt="Google AI Pro Offer"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* RIGHT PANEL — CONTENT */}
        <div
          className="popup-content-wrapper"
          style={{
            flex: "0 0 48%",
            width: "48%",
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px 16px",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="popup-close-btn"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#f3f4f6",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
            aria-label="Close"
          >
            <X style={{ width: "15px", height: "15px", color: "#374151" }} />
          </button>

          {/* Text Content */}
          <div>
            <p
              className="txt-badge"
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#7c3aed",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "6px",
                marginTop: "2px",
              }}
            >
              Limited Time Offer
            </p>

            <h2
              className="txt-title"
              style={{
                fontSize: "21px",
                fontWeight: "800",
                color: "#111827",
                lineHeight: "1.25",
                marginBottom: "8px",
              }}
            >
              Google AI Pro<br />
              <span style={{ color: "#7c3aed" }}>18 Months</span> at<br />
              Only <span style={{ color: "#ef4444" }}>Rs. 999!</span>
            </h2>

            <p
              className="txt-desc"
              style={{
                fontSize: "12px",
                color: "#4b5563",
                lineHeight: "1.4",
                marginBottom: "12px",
              }}
            >
              Includes Gemini AI Pro, 5TB Storage, Google Flow Credits & NotebookLM Premium.
            </p>

            <ul
              className="txt-list"
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 14px 0",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {[
                "Instant Delivery",
                "One Time Payment",
                "3 Months Warranty",
                "24/7 Support",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "#ede9fe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="#7c3aed"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="popup-btn-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-order"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px 12px",
                backgroundColor: "#25D366",
                color: "#fff",
                fontWeight: "700",
                fontSize: "13px",
                borderRadius: "8px",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              <MessageCircle style={{ width: "16px", height: "16px", flexShrink: 0 }} />
              Order Now — Rs. 999
            </a>

            <button
              onClick={handleClose}
              className="btn-later"
              style={{
                padding: "8px 12px",
                backgroundColor: "transparent",
                color: "#9ca3af",
                fontSize: "12px",
                fontWeight: "500",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                cursor: "pointer",
              }}
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes offerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes offerSlideUp {
          from { opacity: 0; transform: translate(-50%, -46%); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }

        /* Mobile specific styles: side-by-side with perfectly fit image & responsive text */
        @media (max-width: 640px) {
          .popup-box {
            width: 95vw !important;
            flex-direction: row !important;
          }
          .popup-img-wrapper {
            flex: 0 0 50% !important;
            width: 50% !important;
          }
          .popup-content-wrapper {
            flex: 0 0 50% !important;
            width: 50% !important;
            padding: 10px 8px !important;
          }
          .popup-close-btn {
            top: 4px !important;
            right: 4px !important;
            width: 22px !important;
            height: 22px !important;
          }
          .txt-badge {
            font-size: 8px !important;
            margin-bottom: 2px !important;
            letter-spacing: 0.5px !important;
          }
          .txt-title {
            font-size: 12px !important;
            margin-bottom: 4px !important;
            line-height: 1.15 !important;
          }
          .txt-desc {
            font-size: 9px !important;
            margin-bottom: 4px !important;
            line-height: 1.25 !important;
          }
          .txt-list {
            margin-bottom: 6px !important;
            gap: 2px !important;
          }
          .txt-list li {
            font-size: 8.5px !important;
            gap: 4px !important;
          }
          .txt-list span {
            width: 12px !important;
            height: 12px !important;
          }
          .popup-btn-group {
            gap: 4px !important;
          }
          .btn-order {
            padding: 6px 4px !important;
            font-size: 9.5px !important;
            border-radius: 6px !important;
          }
          .btn-order svg {
            width: 12px !important;
            height: 12px !important;
          }
          .btn-later {
            padding: 4px 4px !important;
            font-size: 9px !important;
            border-radius: 6px !important;
          }
        }
      `}</style>
    </>
  );
};

export default OfferPopup;
