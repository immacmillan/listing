import { useEffect } from 'react'

export default function VideoWalkthrough() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">As seen on Social Media</h2>
      <div className="flex justify-center">
        <div className="w-full" style={{ maxWidth: '605px', minWidth: '325px' }}>
          <p className="text-sm font-medium text-gray-500 mb-3">Video Walkthrough by Zane</p>
          <blockquote
          className="tiktok-embed rounded-xl overflow-hidden"
          cite="https://www.tiktok.com/@zane.rentals/video/7440891140318006571"
          data-video-id="7440891140318006571"
          style={{ maxWidth: '605px', minWidth: '325px' }}
        >
          <section>
            <a
              target="_blank"
              rel="noreferrer"
              title="@zane.rentals"
              href="https://www.tiktok.com/@zane.rentals?refer=embed"
            >
              @zane.rentals
            </a>
            <p>Walking through 5236 Malta Street</p>
            <a
              target="_blank"
              rel="noreferrer"
              title="♬ original sound - Zane.Rentals"
              href="https://www.tiktok.com/music/original-sound-7440891152243837742?refer=embed"
            >
              ♬ original sound - Zane.rentals
            </a>
          </section>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
