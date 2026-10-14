import { ImageResponse } from 'next/og';
import { SITE_DESCRIPTION } from '@/lib/metadata';

export const alt = 'TaskTrack: a simple task manager for students';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: '#f9fafb',
        borderTop: '24px solid #2563eb',
      }}
    >
      <div style={{ display: 'flex', fontSize: 96, fontWeight: 700, color: '#111827' }}>
        Task<span style={{ color: '#2563eb' }}>Track</span>
      </div>
      <div style={{ marginTop: 24, fontSize: 40, color: '#4b5563', maxWidth: 900 }}>
        {SITE_DESCRIPTION}
      </div>
    </div>,
    size,
  );
}
