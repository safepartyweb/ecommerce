'use client';

import { useEffect } from 'react';

const LeadConnectorWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', '687afbe0afd53255e3f869a6');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      data-chat-widget
      data-widget-id="687afbe0afd53255e3f869a6"
      data-location-id="kmtGxcIecAT1e3hrA4EI"
    />
  );
};

export default LeadConnectorWidget;
