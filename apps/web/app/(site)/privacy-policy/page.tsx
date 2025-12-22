import React from 'react';
import Seo from '../../../components/Seo';

export default function PrivacyPage(){
  return (
    <main>
      <Seo title="Privacy Policy" description="Privacy policy for AdSense placeholders and data usage." />
      <h1>Privacy Policy</h1>
      <p>This site uses Ad placeholders for demo purposes. No real ads are served in this repo. If you use AdSense, make sure to comply with Google's policies and provide a clear privacy policy and user consent if required.</p>
      <h2>AdSense</h2>
      <p>We include AdSense placeholders (`DATA-ADSENSE-CLIENT` and `DATA-ADSENSE-SLOT`). Replace them with your real values when deploying.</p>
    </main>
  );
}
