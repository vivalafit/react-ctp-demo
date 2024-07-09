import React, { useEffect, useRef, useState } from 'react';
import '../node_modules/@vgs/click-to-pay/dist/my-sdk.es.js';

const ClickToPayIntegration = () => {
    const [cardId, setCardId] = useState(null);
    const [isRecognized, setIsRecognized] = useState(false);
    const initiatorRef = useRef(null);
    const widgetRef = useRef(null);
    const buttonRef = useRef(null);
  
    useEffect(() => {
      const initiatorElement = initiatorRef.current;
  
      const handleInitCompleted = (event) => {
        const result = event.detail.isRecognized;
        setIsRecognized(result);
        console.log('isRecognized:', result);
  
        if (result) {
          const widget = document.createElement('click-to-pay-widget');
          widgetRef.current.appendChild(widget);
  
          widget.addEventListener('card-chosen', (event) => {
            console.log('card-chosen:', event.detail);
            setCardId(event.detail.cardId);
          });
  
          buttonRef.current.disabled = false;
        }
      };
  
      initiatorElement.addEventListener('init-completed', handleInitCompleted);
  
      return () => {
        initiatorElement.removeEventListener('init-completed', handleInitCompleted);
      };
    }, []);
  
    const handleContinueClick = () => {
      const widget = widgetRef.current.querySelector('click-to-pay-widget');
      if (widget) {
        widget.checkout(cardId);
      }
    };
  
    return (
      <div>
        <div className="ctp-container" ref={widgetRef}>
          <click-to-pay-initiator
            ref={initiatorRef}
            session-id="your-session-id"
            env="sandbox"
            card-brands='["mastercard"]'
            locale="en_US"
            phone="4153456424"
            email="test@test.com"
          ></click-to-pay-initiator>
        </div>
        <button id="continue" ref={buttonRef} disabled onClick={handleContinueClick}>
          Continue
        </button>
        <iframe width="450" height="600"></iframe>
      </div>
    );
  };
  
  export default ClickToPayIntegration;