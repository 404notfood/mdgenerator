import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2dd4bf 0%, #22d3ee 50%, #3b82f6 100%)',
          borderRadius: '8px',
        }}
      >
        <span
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#0a0a0b',
          }}
        >
          M
        </span>
      </div>
    ),
    {
      ...size,
    }
  )
}
