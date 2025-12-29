import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Utils4You'
export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 120,
                    background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                }}
            >
                U4Y
            </div>
        ),
        {
            ...size,
        }
    )
}
