import { familyMembers } from "@/src/constants/greetings";
import LiXiPage from "@/src/components/LiXiPage";

export async function generateStaticParams() {
  return familyMembers.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = familyMembers.find((m) => m.slug === slug);

  if (!member) {
    return {
      title: "Lì Xì Bính Ngọ 2026 — Chúc Mừng Năm Mới",
      description: "Thiệp chúc Tết Bính Ngọ 2026 từ Minh Quân (Bin)",
    };
  }

  return {
    title: `Lì Xì cho ${member.name} — Bính Ngọ 2026`,
    description: `Thiệp lì xì Tết Bính Ngọ 2026 dành cho ${member.relation} từ Minh Quân (Bin)`,
  };
}

export default async function LiXiSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = familyMembers.find((m) => m.slug === slug) || null;

  return <LiXiPage member={member} isDefault={!member} />;
}
