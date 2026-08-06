import React from 'react';

export default function SchemaMarkup() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "OloBuy - Pakistan's Safest Manual Escrow Service",
    "image": "https://olobuy.pk/logo.png",
    "@id": "https://olobuy.pk",
    "url": "https://olobuy.pk",
    "telephone": "+923300100010",
    "priceRange": "PKR",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "25 Sea View Road, Block 4 Clifton",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "postalCode": "75600",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.8138,
      "longitude": 67.0308
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://olobuy.pk"
    ],
    "description": "OloBuy is Pakistan's #1 secure manual escrow service for e-commerce, freelancers, and online buyers or sellers on OLX and Facebook. 100% fraud protection, zero-risk online transactions, and safe payment holding until delivery."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
