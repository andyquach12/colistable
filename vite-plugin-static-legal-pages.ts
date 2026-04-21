import { Plugin } from 'vite';

const privacyHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy | CoListable</title>
  <meta name="description" content="CoListable Privacy Policy - Learn how we collect, use, and protect your information.">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; color: #1e293b; background: #f8fafc; line-height: 1.7; -webkit-font-smoothing: antialiased; }
    header { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 24px; font-weight: 700; color: #0f172a; text-decoration: none; letter-spacing: -0.5px; }
    .logo span { color: #1e3a5f; }
    .logo sub { font-size: 10px; font-weight: 400; color: #64748b; vertical-align: baseline; margin-left: 4px; letter-spacing: 0; }
    .back-link { color: #64748b; text-decoration: none; font-size: 14px; }
    .back-link:hover { color: #1e3a5f; }
    main { max-width: 720px; margin: 0 auto; padding: 48px 24px 80px; }
    h1 { font-size: 36px; font-weight: 700; color: #0f172a; margin-bottom: 4px; letter-spacing: -0.5px; }
    .last-updated { color: #94a3b8; font-size: 14px; margin-bottom: 40px; }
    h2 { font-size: 20px; font-weight: 600; color: #0f172a; margin-top: 36px; margin-bottom: 12px; }
    p { color: #475569; font-size: 15px; margin-bottom: 12px; }
    ul { margin: 8px 0 16px 24px; color: #475569; font-size: 15px; }
    ul li { margin-bottom: 6px; padding-left: 4px; }
    ul li strong { color: #1e293b; }
    a { color: #1e3a5f; }
    footer { text-align: center; padding: 24px; border-top: 1px solid #e2e8f0; background: #f1f5f9; color: #94a3b8; font-size: 13px; }
  </style>
</head>
<body>
<header>
  <a href="/" class="logo"><span>Co</span>Listable<sub>Cross-Listing Automation for Collectibles</sub></a>
  <a href="/" class="back-link">&larr; Back to Home</a>
</header>
<main>
  <h1>Privacy Policy</h1>
  <p class="last-updated">Last updated: March 6, 2026</p>
  <h2>1. Introduction</h2>
  <p>CoListable ("we," "our," or "us") operates the CoListable platform, a watch inventory management and cross-listing service. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>
  <h2>2. Information We Collect</h2>
  <p>We may collect the following types of information:</p>
  <ul>
    <li><strong>Account Information:</strong> Name, email address, phone number, and business name when you create an account.</li>
    <li><strong>Listing Data:</strong> Watch details, images, pricing, descriptions, and other inventory information you provide.</li>
    <li><strong>Platform Connections:</strong> OAuth tokens and account identifiers when you connect third-party platforms (e.g., eBay, Facebook Marketplace, Chrono24, Reddit).</li>
    <li><strong>Payment Information:</strong> Billing details processed securely through our payment provider, Stripe. We do not store full credit card numbers.</li>
    <li><strong>Usage Data:</strong> Log data, device information, browser type, pages visited, and analytics events to improve our services.</li>
    <li><strong>Communications:</strong> Feedback, support requests, and inquiry messages sent through our platform.</li>
  </ul>
  <h2>3. How We Use Your Information</h2>
  <p>We use the information we collect to:</p>
  <ul>
    <li>Provide, operate, and maintain our services</li>
    <li>Manage your account and process transactions</li>
    <li>Cross-list your watch inventory to connected platforms</li>
    <li>Generate AI-powered descriptions, identifications, and price insights</li>
    <li>Send service-related notifications and updates</li>
    <li>Respond to your inquiries and support requests</li>
    <li>Monitor and analyze usage trends to improve the platform</li>
    <li>Detect and prevent fraud or unauthorized access</li>
  </ul>
  <h2>4. Sharing of Information</h2>
  <p>We do not sell your personal information. We may share your data with:</p>
  <ul>
    <li><strong>Third-Party Platforms:</strong> When you connect and publish listings to external marketplaces, your listing data is shared with those platforms per their terms.</li>
    <li><strong>Service Providers:</strong> Trusted vendors who help us operate our services (e.g., hosting, analytics, payment processing).</li>
    <li><strong>Public Catalogs:</strong> If you enable a public dealer catalog, the information you choose to display will be publicly accessible.</li>
    <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
  </ul>
  <h2>5. Data Security</h2>
  <p>We implement industry-standard security measures including encryption in transit (TLS/SSL), row-level security policies on our database, and secure token management for third-party integrations. However, no method of transmission over the internet is 100% secure.</p>
  <h2>6. Data Retention</h2>
  <p>We retain your account and listing data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting us.</p>
  <h2>7. Your Rights</h2>
  <p>Depending on your jurisdiction, you may have the right to:</p>
  <ul>
    <li>Access, correct, or delete your personal data</li>
    <li>Object to or restrict certain processing</li>
    <li>Export your data in a portable format</li>
    <li>Withdraw consent where processing is based on consent</li>
  </ul>
  <p>To exercise these rights, please contact us at the email below.</p>
  <h2>8. Cookies &amp; Analytics</h2>
  <p>We use cookies and similar technologies (including PostHog analytics) to understand usage patterns and improve our services. You can manage cookie preferences through your browser settings.</p>
  <h2>9. Third-Party Links</h2>
  <p>Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties. We encourage you to review their privacy policies.</p>
  <h2>10. Children's Privacy</h2>
  <p>CoListable is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.</p>
  <h2>11. Changes to This Policy</h2>
  <p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a revised "Last updated" date.</p>
  <h2>12. Contact Us</h2>
  <p>If you have any questions about this Privacy Policy, please contact us at:<br><a href="mailto:info@colistable.com">info@colistable.com</a></p>
</main>
<footer>&copy; 2026 CoListable. All rights reserved.</footer>
</body>
</html>`;

const tosHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Service | CoListable</title>
  <meta name="description" content="CoListable Terms of Service - Rules and guidelines for using our cross-listing platform.">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; color: #1e293b; background: #f8fafc; line-height: 1.7; -webkit-font-smoothing: antialiased; }
    header { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 24px; font-weight: 700; color: #0f172a; text-decoration: none; letter-spacing: -0.5px; }
    .logo span { color: #1e3a5f; }
    .logo sub { font-size: 10px; font-weight: 400; color: #64748b; vertical-align: baseline; margin-left: 4px; letter-spacing: 0; }
    .back-link { color: #64748b; text-decoration: none; font-size: 14px; }
    .back-link:hover { color: #1e3a5f; }
    main { max-width: 720px; margin: 0 auto; padding: 48px 24px 80px; }
    h1 { font-size: 36px; font-weight: 700; color: #0f172a; margin-bottom: 4px; letter-spacing: -0.5px; }
    .last-updated { color: #94a3b8; font-size: 14px; margin-bottom: 40px; }
    h2 { font-size: 20px; font-weight: 600; color: #0f172a; margin-top: 36px; margin-bottom: 12px; }
    p { color: #475569; font-size: 15px; margin-bottom: 12px; }
    ul { margin: 8px 0 16px 24px; color: #475569; font-size: 15px; }
    ul li { margin-bottom: 6px; padding-left: 4px; }
    a { color: #1e3a5f; }
    footer { text-align: center; padding: 24px; border-top: 1px solid #e2e8f0; background: #f1f5f9; color: #94a3b8; font-size: 13px; }
  </style>
</head>
<body>
<header>
  <a href="/" class="logo"><span>Co</span>Listable<sub>Cross-Listing Automation for Collectibles</sub></a>
  <a href="/" class="back-link">&larr; Back to Home</a>
</header>
<main>
  <h1>Terms of Service</h1>
  <p class="last-updated">Last updated: March 6, 2026</p>
  <h2>1. Acceptance of Terms</h2>
  <p>By accessing or using CoListable ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service. These Terms apply to all visitors, users, and others who access or use the Service.</p>
  <h2>2. Description of Service</h2>
  <p>CoListable is a watch inventory management and cross-listing platform that allows users to manage watch listings, publish to third-party marketplaces (including eBay, Facebook Marketplace, Chrono24, and Reddit), generate AI-powered descriptions and identifications, and operate a public dealer catalog.</p>
  <h2>3. Account Registration</h2>
  <p>To use the Service, you must:</p>
  <ul>
    <li>Create an account with accurate and complete information</li>
    <li>Be at least 18 years of age</li>
    <li>Maintain the security of your account credentials</li>
    <li>Promptly notify us of any unauthorized use of your account</li>
  </ul>
  <p>You are responsible for all activity that occurs under your account. CoListable reserves the right to suspend or terminate accounts that violate these Terms.</p>
  <h2>4. Subscription Plans &amp; Billing</h2>
  <p>CoListable offers subscription-based plans with varying features and listing limits. By subscribing to a paid plan, you agree to pay the applicable fees. Subscriptions automatically renew unless cancelled before the end of the current billing period.</p>
  <ul>
    <li>All fees are charged in advance on a recurring basis</li>
    <li>No refunds will be issued for partial billing periods</li>
    <li>We reserve the right to change pricing with 30 days' notice</li>
    <li>Payment processing is handled securely through Stripe</li>
  </ul>
  <h2>5. User Content &amp; Listings</h2>
  <p>You retain ownership of all content you submit to CoListable, including watch descriptions, images, and listing data ("User Content"). By submitting User Content, you grant CoListable a non-exclusive, worldwide license to use, display, and distribute your content solely for the purpose of operating the Service.</p>
  <p>You represent and warrant that:</p>
  <ul>
    <li>You own or have the right to use all content you submit</li>
    <li>Your listings accurately describe the items offered for sale</li>
    <li>Your use of the Service complies with all applicable laws and regulations</li>
    <li>You will not list counterfeit, stolen, or prohibited items</li>
  </ul>
  <h2>6. Third-Party Platform Integrations</h2>
  <p>CoListable enables publishing listings to third-party platforms. When you connect your accounts and publish through CoListable:</p>
  <ul>
    <li>You remain subject to the terms and policies of each third-party platform</li>
    <li>CoListable is not responsible for actions taken by third-party platforms, including listing removals or account suspensions</li>
    <li>You authorize CoListable to act on your behalf when publishing, updating, or removing listings on connected platforms</li>
    <li>You are solely responsible for ensuring compliance with each platform's seller requirements</li>
  </ul>
  <h2>7. AI-Generated Content</h2>
  <p>CoListable offers AI-powered features including watch identification, description generation, and price intelligence. AI-generated content is provided as a starting point and may contain inaccuracies. You are responsible for reviewing and verifying all AI-generated content before publishing.</p>
  <h2>8. Prohibited Conduct</h2>
  <p>You agree not to:</p>
  <ul>
    <li>Use the Service for any unlawful purpose</li>
    <li>List counterfeit or misrepresented watches</li>
    <li>Interfere with or disrupt the Service or its infrastructure</li>
    <li>Attempt to gain unauthorized access to other users' accounts or data</li>
    <li>Scrape, crawl, or otherwise extract data from the Service without permission</li>
    <li>Use the Service to send spam or unsolicited communications</li>
    <li>Circumvent listing limits or other usage restrictions</li>
  </ul>
  <h2>9. Intellectual Property</h2>
  <p>The Service, including its design, features, code, logos, and documentation, is the property of CoListable and is protected by intellectual property laws. You may not copy, modify, distribute, or reverse-engineer any part of the Service without prior written consent.</p>
  <h2>10. Limitation of Liability</h2>
  <p>To the maximum extent permitted by law, CoListable shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of the Service.</p>
  <p>CoListable does not guarantee uninterrupted or error-free operation of the Service. We are not liable for any losses resulting from third-party platform outages, API changes, or listing failures.</p>
  <h2>11. Disclaimer of Warranties</h2>
  <p>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
  <h2>12. Indemnification</h2>
  <p>You agree to indemnify, defend, and hold harmless CoListable and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from your use of the Service, your violation of these Terms, or your violation of any rights of a third party.</p>
  <h2>13. Termination</h2>
  <p>We may terminate or suspend your account at any time, with or without cause, upon notice. Upon termination, your right to use the Service ceases immediately. You may export your data prior to account closure. Sections relating to intellectual property, limitation of liability, and indemnification survive termination.</p>
  <h2>14. Modifications to Terms</h2>
  <p>We reserve the right to modify these Terms at any time. Material changes will be communicated via email or a notice within the Service. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
  <h2>15. Governing Law</h2>
  <p>These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles. Any disputes arising from these Terms shall be resolved in the courts of competent jurisdiction.</p>
  <h2>16. Contact Us</h2>
  <p>If you have any questions about these Terms of Service, please contact us at:<br><a href="mailto:info@colistable.com">info@colistable.com</a></p>
</main>
<footer>&copy; 2026 CoListable. All rights reserved.</footer>
</body>
</html>`;

export function staticLegalPages(): Plugin {
  return {
    name: 'static-legal-pages',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'privacy/index.html',
        source: privacyHTML,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'tos/index.html',
        source: tosHTML,
      });
    },
  };
}
