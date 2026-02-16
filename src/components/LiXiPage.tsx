"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Fireworks } from "@fireworks-js/react";
import type { FireworksHandlers } from "@fireworks-js/react";
import {
  familyMembers,
  defaultGreeting,
  type FamilyMember,
} from "@/src/constants/greetings";
import LixiCard from "@/src/components/LixiCard";

// ─── Pre-generated blossom styles (pure, no Math.random in render) ─
const BLOSSOM_STYLES = Array.from({ length: 18 }).map((_, i) => ({
  left: `${(i * 37 + 13) % 100}%`,
  animationDelay: `${((i * 3.7 + 1.2) % 8).toFixed(1)}s`,
  animationDuration: `${6 + ((i * 2.3 + 0.5) % 6)}s`,
  fontSize: `${10 + ((i * 5.1 + 2) % 14)}px`,
  opacity: 0.5 + ((i * 0.17 + 0.05) % 0.5),
  symbol: i % 3 === 0 ? "🌸" : i % 3 === 1 ? "🏵️" : "✿",
}));

// ─── Falling Blossoms Component ───────────────────────────────
function FallingBlossoms() {
  return (
    <div className="blossoms-container" aria-hidden="true">
      {BLOSSOM_STYLES.map((s, i) => (
        <div
          key={i}
          className="blossom"
          style={{
            left: s.left,
            animationDelay: s.animationDelay,
            animationDuration: s.animationDuration,
            fontSize: s.fontSize,
            opacity: s.opacity,
          }}
        >
          {s.symbol}
        </div>
      ))}
    </div>
  );
}

// ─── Fireworks Background ─────────────────────────────────────
const FireworksBackground = ({ burst }: { burst: boolean }) => {
  const ref = useRef<FireworksHandlers>(null);
  const hasBurst = useRef(false);

  useEffect(() => {
    // Auto-start after a short delay for dramatic effect
    const timer = setTimeout(() => {
      ref.current?.start();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Launch a massive burst when envelope opens
  useEffect(() => {
    if (burst && !hasBurst.current) {
      hasBurst.current = true;
      // Rapid-fire a volley of fireworks for dramatic entrance
      ref.current?.updateOptions({
        intensity: 50,
        particles: 120,
        explosion: 8,
      });
      ref.current?.launch(12);

      // Return to ambient mode after burst
      setTimeout(() => {
        ref.current?.updateOptions({
          intensity: 18,
          particles: 80,
          explosion: 6,
        });
      }, 3000);
    }
  }, [burst]);

  return (
    <Fireworks
      ref={ref}
      className="fireworks-canvas"
      options={{
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.02,
        friction: 0.97,
        gravity: 1.2,
        particles: 80,
        traceLength: 3,
        traceSpeed: 8,
        explosion: 6,
        intensity: 18,
        flickering: 30,
        lineStyle: "round",
        hue: {
          min: 0,
          max: 60,
        },
        delay: {
          min: 25,
          max: 55,
        },
        rocketsPoint: {
          min: 15,
          max: 85,
        },
        lineWidth: {
          explosion: {
            min: 1,
            max: 4,
          },
          trace: {
            min: 0.5,
            max: 2,
          },
        },
        brightness: {
          min: 50,
          max: 80,
        },
        decay: {
          min: 0.01,
          max: 0.03,
        },
        mouse: {
          click: false,
          move: false,
          max: 1,
        },
      }}
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: 2147483647,
      }}
    />
  );
};

// ─── SVG: Horse Ornament for Envelope ─────────────────────────
function HorseOrnament() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="horse-ornament"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular frame */}
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="#f5c842"
        strokeWidth="3"
        opacity="0.6"
      />
      <circle
        cx="60"
        cy="60"
        r="48"
        fill="none"
        stroke="#f5c842"
        strokeWidth="1"
        opacity="0.3"
      />
      {/* Stylized horse silhouette */}
      <g transform="translate(28, 22) scale(0.55)" fill="#f5c842">
        <path d="M95 45c-3-8-10-15-18-18l5-15c1-3-1-6-4-7s-6 0-7 3l-6 14c-4-1-8-1-12 0l-6-14c-1-3-4-4-7-3s-5 4-4 7l5 15c-8 3-15 10-18 18l-8 3c-3 1-5 4-5 7v12c0 3 2 6 5 7l8 3c3 8 10 15 18 18v10c0 4 3 7 7 7s7-3 7-7v-6c2 0 4 0 6 0v6c0 4 3 7 7 7s7-3 7-7v-10c8-3 15-10 18-18l8-3c3-1 5-4 5-7V55c0-3-2-6-5-7l-8-3zM58 90c-14 0-25-11-25-25s11-25 25-25 25 11 25 25-11 25-25 25z" />
        <circle cx="48" cy="58" r="4" />
        <path
          d="M58 75c-6 0-11-3-14-7 2 1 5 2 8 2h12c3 0 6-1 8-2-3 4-8 7-14 7z"
          fill="none"
          stroke="#f5c842"
          strokeWidth="2"
        />
      </g>
      {/* Year text */}
      <text
        x="60"
        y="108"
        textAnchor="middle"
        fill="#f5c842"
        fontSize="11"
        fontFamily="serif"
        fontWeight="bold"
        letterSpacing="2"
      >
        2026
      </text>
    </svg>
  );
}

// ─── Li Xi Envelope 3D ────────────────────────────────────────
function LiXiEnvelope({
  recipientName,
  onOpen,
}: {
  recipientName: string;
  onOpen: () => void;
}) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => onOpen(), 900);
  };

  return (
    <div className="envelope-scene">
      {/* Golden Horse illustration */}
      <div className="envelope-horse" aria-hidden="true">
        <Image
          src="/horse.svg"
          alt=""
          width={320}
          height={180}
          priority
          className="envelope-horse__img"
        />
      </div>

      <div
        className={`envelope ${isOpening ? "envelope--open" : ""}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        aria-label={`Mở lì xì dành cho ${recipientName}`}
      >
        {/* Envelope body */}
        <div className="envelope__body">
          <div className="envelope__pattern" />
          <HorseOrnament />
          <div className="envelope__text">
            <span className="envelope__title">Lì Xì</span>
            <span className="envelope__subtitle">Bính Ngọ 2026</span>
          </div>
          <div className="envelope__recipient">Kính gửi: {recipientName}</div>
        </div>
        {/* Envelope flap */}
        <div className="envelope__flap">
          <div className="envelope__flap-inner" />
        </div>
        {/* Tap hint */}
        {!isOpening && (
          <div className="envelope__hint">
            <span className="envelope__hint-dot" />
            Chạm để mở
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────
export default function LiXiPage({
  member,
  isDefault,
}: {
  member: FamilyMember | null;
  isDefault: boolean;
}) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const data = member || defaultGreeting;

  return (
    <div className="lixi-page">
      <FireworksBackground burst={envelopeOpened} />
      <FallingBlossoms />

      {/* Traditional cloud patterns */}
      <div className="cloud-pattern cloud-pattern--1" aria-hidden="true" />
      <div className="cloud-pattern cloud-pattern--2" aria-hidden="true" />

      {!envelopeOpened ? (
        <LiXiEnvelope
          recipientName={data.name}
          onOpen={() => setEnvelopeOpened(true)}
        />
      ) : (
        <LixiCard data={data} isDefault={isDefault} />
      )}
    </div>
  );
}
