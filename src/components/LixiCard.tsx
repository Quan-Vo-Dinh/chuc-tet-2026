"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  familyMembers,
  type FamilyMember,
  defaultGreeting,
} from "@/src/constants/greetings";

// ─── Spring config for the swap animation ─────────────────────
const SWAP_SPRING = {
  type: "spring" as const,
  stiffness: 65,
  damping: 18,
  mass: 1.1,
};

// ─── Money Layer ──────────────────────────────────────────────
function MoneyLayer() {
  return (
    <Image
      src="/images/assets/500k-front.png"
      alt="Tờ 500.000đ — Lộc Xuân từ Minh Quân (Bin)"
      width={1121}
      height={474}
      quality={100}
      unoptimized
      priority
      className="money-layer-img"
    />
  );
}

// ─── Greeting Layer ───────────────────────────────────────────
function GreetingLayer({
  data,
  isDefault,
  onConfetti,
  confettiFired,
}: {
  data: FamilyMember | typeof defaultGreeting;
  isDefault: boolean;
  onConfetti: () => void;
  confettiFired: boolean;
}) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, []);

  const paragraphs = data.message.split("\n").filter((l) => l.trim());

  return (
    <div className={`card ${showContent ? "card--visible" : ""}`}>
      {/* Decorative top border */}
      <div className="card__top-border">
        <div className="card__corner card__corner--left">✦</div>
        <div className="card__border-line" />
        <div className="card__corner card__corner--right">✦</div>
      </div>

      {/* Relation badge */}
      <div className="card__relation">{data.relation}</div>

      {/* Photo frame */}
      <div className="card__photo-frame">
        <div className="card__photo-border">
          <div className="card__photo-wrapper">
            <Image
              src={data.photo}
              alt={`Ảnh ${data.name}`}
              width={280}
              height={280}
              className="card__photo"
              priority
            />
          </div>
        </div>
        <div className="card__photo-ornament card__photo-ornament--tl">❀</div>
        <div className="card__photo-ornament card__photo-ornament--tr">❀</div>
        <div className="card__photo-ornament card__photo-ornament--bl">❀</div>
        <div className="card__photo-ornament card__photo-ornament--br">❀</div>
      </div>

      {/* Name */}
      <h1 className="card__name">{data.name}</h1>

      {/* Message */}
      <div className="card__message">
        {paragraphs.map((para, idx) => (
          <p
            key={idx}
            className="card__paragraph"
            style={{ animationDelay: `${0.5 + idx * 0.25}s` }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Confetti button */}
      <button
        className={`card__btn ${confettiFired ? "card__btn--fired" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onConfetti();
        }}
        disabled={confettiFired}
      >
        <span className="card__btn-icon">🧧</span>
        <span>{confettiFired ? "Lộc Xuân đã đến!" : "Nhận Lộc Xuân"}</span>
      </button>

      {/* Bottom ornament */}
      <div className="card__bottom-ornament">✦ Bính Ngọ 2026 ✦</div>

      {/* Nav to other family members */}
      {!isDefault && (
        <div className="card__family-nav">
          <p className="card__family-nav-label">Gửi lì xì cho:</p>
          <div className="card__family-links">
            {familyMembers
              .filter(
                (m) =>
                  !("slug" in data) || m.slug !== (data as FamilyMember).slug,
              )
              .map((m) => (
                <a
                  key={m.slug}
                  href={`/li-xi/${m.slug}`}
                  className="card__family-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  {m.name}
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main LixiCard: 2-Layer Stack with Swap ───────────────────
export default function LixiCard({
  data,
  isDefault,
}: {
  data: FamilyMember | typeof defaultGreeting;
  isDefault: boolean;
}) {
  const [showingMoney, setShowingMoney] = useState(false);
  const [confettiFired, setConfettiFired] = useState(false);
  const swapLock = useRef(false);

  const fireConfetti = useCallback(() => {
    if (confettiFired) return;
    setConfettiFired(true);

    // Swap to money layer
    if (!swapLock.current) {
      swapLock.current = true;
      setShowingMoney(true);
      setTimeout(() => { swapLock.current = false; }, 800);
    }

    const count = 200;
    const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        particleCount: Math.floor(count * particleRatio),
        ...opts,
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ["#f5c842", "#d4a017", "#ffd700"],
    });
    fire(0.2, {
      spread: 60,
      colors: ["#8b0000", "#cc0000", "#ff2222"],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ["#f5c842", "#cc0000", "#ffd700", "#8b0000"],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ["#f5c842", "#d4a017"],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ["#cc0000", "#ff4444", "#ffd700"],
    });
  }, [confettiFired]);

  const handleSwap = useCallback(() => {
    if (swapLock.current) return;
    swapLock.current = true;
    setShowingMoney((prev) => !prev);
    setTimeout(() => {
      swapLock.current = false;
    }, 800);
  }, []);

  return (
    <div
      className="layer-stack"
      onClick={handleSwap}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleSwap()}
      aria-label={showingMoney ? "Xem lại thiệp chúc" : "Xem lì xì 500.000đ"}
    >
      {/* ── Back layer (peeking out) ── */}
      <motion.div
        className="layer-stack__layer layer-stack__layer--back"
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: 1,
          y: showingMoney ? -550 : 45,
          scale: showingMoney ? 2 : 0.93,
          rotateX: showingMoney ? 0 : 2,
          zIndex: showingMoney ? 20 : 1,
          filter: showingMoney ? "brightness(1)" : "brightness(0.7)",
        }}
        transition={SWAP_SPRING}
      >
        <MoneyLayer />
      </motion.div>

      {/* ── Front layer (greeting card) ── */}
      <motion.div
        className="layer-stack__layer layer-stack__layer--front"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{
          opacity: 1,
          y: showingMoney ? 45 : 0,
          scale: showingMoney ? 0.93 : 1,
          rotateX: showingMoney ? -2 : 0,
          zIndex: showingMoney ? 1 : 20,
          filter: showingMoney ? "brightness(0.7)" : "brightness(1)",
        }}
        transition={SWAP_SPRING}
      >
        <GreetingLayer
          data={data}
          isDefault={isDefault}
          onConfetti={fireConfetti}
          confettiFired={confettiFired}
        />
      </motion.div>

      {/* Swap hint */}
      <motion.div
        className="swap-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="swap-hint__icon">⇅</span>
        {showingMoney ? "Chạm để xem thiệp" : "Chạm để xem lì xì"}
      </motion.div>
    </div>
  );
}
