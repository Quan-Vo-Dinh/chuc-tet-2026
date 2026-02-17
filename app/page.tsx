import Image from "next/image";
import { familyMembers } from "@/src/constants/greetings";
import HomeCardGrid from "@/src/components/HomeCardGrid";

export default function Home() {
  return (
    <div className="home-page">
      {/* Falling blossoms */}
      <div className="blossoms-container" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="blossom"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              fontSize: `${10 + Math.random() * 14}px`,
              opacity: 0.4 + Math.random() * 0.4,
            }}
          >
            {i % 3 === 0 ? "🌸" : i % 3 === 1 ? "🏵️" : "✿"}
          </div>
        ))}
      </div>

      {/* Cloud patterns */}
      <div className="cloud-pattern cloud-pattern--1" aria-hidden="true" />
      <div className="cloud-pattern cloud-pattern--2" aria-hidden="true" />

      <h1 className="home__title">🧧 Lì Xì chúc Tết Bính Ngọ 2026</h1>
      <p className="home__subtitle">Chúc Mừng Năm Mới</p>

      <HomeCardGrid members={familyMembers} />

      <div className="home__footer">
        <p>
          Made by <span className="home__footer-name">Quân</span> đẹp trai vô
          địch thanh lịch khắp vũ trụ
        </p>
        <Image
          src="/images/quan-dep-trai.png"
          alt="Quân đẹp trai"
          width={120}
          height={120}
        />
      </div>
    </div>
  );
}
