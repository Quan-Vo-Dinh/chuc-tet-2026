"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AlertDialog } from "radix-ui";
import { type FamilyMember } from "@/src/constants/greetings";

export default function HomeCardGrid({ members }: { members: FamilyMember[] }) {
  const router = useRouter();
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const handleCardClick = (member: FamilyMember) => {
    setSelectedMember(member);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (selectedMember) {
      router.push(`/li-xi/${selectedMember.slug}`);
    }
    setOpen(false);
  };

  return (
    <>
      <div className="home__grid">
        {members.map((member) => (
          <button
            key={member.slug}
            className="home__card"
            onClick={() => handleCardClick(member)}
            type="button"
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
          </button>
        ))}
      </div>

      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="confirm-modal-overlay" />
          <AlertDialog.Content className="confirm-modal">
            <div className="confirm-modal__icon">🧧</div>
            <AlertDialog.Title className="confirm-modal__title">
              Xác nhận danh tính
            </AlertDialog.Title>
            <AlertDialog.Description className="confirm-modal__desc">
              Thiệp lì xì này được viết riêng cho{" "}
              <strong>{selectedMember?.name}</strong> (
              {selectedMember?.relation}
              ). Bạn chỉ nên mở thiệp của chính mình thôi nhé!
              <br />
              <br />
              Bạn có phải là <strong>{selectedMember?.name}</strong> không?
            </AlertDialog.Description>
            <div className="confirm-modal__actions">
              <AlertDialog.Cancel asChild>
                <button className="confirm-modal__btn confirm-modal__btn--cancel">
                  Không, tôi nhầm
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  className="confirm-modal__btn confirm-modal__btn--confirm"
                  onClick={handleConfirm}
                >
                  ✅ Đúng rồi, mở thiệp!
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
