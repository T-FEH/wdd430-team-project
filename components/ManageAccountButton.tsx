'use client';

import { useClerk } from '@clerk/nextjs';
import { buttonStyles } from '@/lib/ui';

/** Opens Clerk's account settings (name, email, password, sessions) in a modal. */
export default function ManageAccountButton() {
  const { openUserProfile } = useClerk();

  return (
    <button type="button" onClick={() => openUserProfile()} className={buttonStyles.secondary}>
      Manage account
    </button>
  );
}
