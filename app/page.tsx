import Image from "next/image";
import Link from "next/link";
import { familyMembers } from "@/src/constants/greetings";

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

      <h1 className="home__title">🧧 Lì Xì Bính Ngọ 2026</h1>
      <p className="home__subtitle">Chúc Mừng Năm Mới</p>

      <div className="home__grid">
        {familyMembers.map((member) => (
          <Link
            key={member.slug}
            href={`/li-xi/${member.slug}`}
            className="home__card"
          >
            <Image
              src={member.photo}
              alt={`Ảnh ${member.name}`}
              width={64}
              height={64}
              className="home__card-avatar"
            />
            <span className="home__card-name">{member.name}</span>
            <span className="home__card-relation">{member.relation}</span>
          </Link>
        ))}
      </div>

      <p className="home__footer">Thương chúc, Minh Quân (Bin)</p>
    </div>
  );
}
