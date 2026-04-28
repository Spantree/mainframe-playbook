import React, { useState } from 'react';

interface FullWidthImageProps {
  src: string;
  alt: string;
  caption?: string;
  maxHeight?: string;
}

export default function FullWidthImage({ src, alt, caption, maxHeight }: FullWidthImageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Resolve the image path for Docusaurus static assets
  let resolvedSrc: string;
  try {
    resolvedSrc = require(`@site/static${src}`).default;
  } catch {
    resolvedSrc = src;
  }

  const imgStyle: React.CSSProperties = maxHeight
    ? { maxHeight, objectFit: 'contain', width: '100%', display: 'block' }
    : {};

  return (
    <>
      <figure style={{ margin: '2rem 0' }}>
        <img
          src={resolvedSrc}
          alt={alt}
          className="full-width-image"
          style={imgStyle}
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
        />
        {caption && (
          <figcaption style={{
            textAlign: 'center',
            fontSize: '0.8rem',
            color: '#64748b',
            marginTop: '0.5rem',
            fontStyle: 'italic',
          }}>
            {caption} — <span style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => setLightboxOpen(true)}>click to expand</span>
          </figcaption>
        )}
      </figure>

      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-label="Expanded image view"
        >
          <img src={resolvedSrc} alt={alt} />
        </div>
      )}
    </>
  );
}
