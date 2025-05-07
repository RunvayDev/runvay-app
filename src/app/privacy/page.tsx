
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-8 text-sm text-gray-500">Effective Date: May 7, 2025</p>

      <section className="space-y-8">
        <p>
          At <strong>Runvay</strong>, accessible from{" "}
          <a
            href="https://www.runvay.co.in"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.runvay.co.in
          </a>
          , your privacy is of utmost importance to us. This Privacy Policy
          explains the information we collect, how it’s used, and your rights.
        </p>

        <p>
          By accessing or using our website, you agree to the terms in this
          Privacy Policy.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Shipping & Billing Address</li>
            <li>Payment Information (handled via Razorpay)</li>
            <li>IP Address, browser type, device info</li>
            <li>Usage data via cookies and analytics</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">2. How We Collect Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Account registration</li>
            <li>Order placement</li>
            <li>Newsletter or promo signups</li>
            <li>Customer support inquiries</li>
            <li>Automatically via cookies/analytics</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Why We Collect It</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Process orders and delivery</li>
            <li>Prevent fraud and verify identity</li>
            <li>Customer service support</li>
            <li>Marketing (if opted-in)</li>
            <li>Improve website experience</li>
            <li>Comply with legal requirements</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Sharing & Disclosure</h2>
          <p className="mb-2">We do <strong>not</strong> sell or rent your personal data.</p>
          <p>We may share data with:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Payment processors (e.g., Razorpay)</li>
            <li>Shipping and logistics partners</li>
            <li>Analytics and marketing providers</li>
            <li>Authorities when required by law</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">5. Data Storage & Security</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Stored securely on encrypted servers</li>
            <li>Payments handled by secure third parties</li>
            <li>Access limited to authorized personnel</li>
            <li>We notify users in case of data breaches as required by law</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">6. Cookies</h2>
          <p className="mb-2">We use cookies to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Analyze site traffic</li>
            <li>Improve performance</li>
            <li>Personalize user experience</li>
          </ul>
          <p>You can manage cookies via your browser settings.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">7. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access your personal data</li>
            <li>Request corrections or updates</li>
            <li>Withdraw consent from marketing emails</li>
            <li>Request deletion (subject to applicable laws)</li>
          </ul>
          <p>
            To exercise your rights, email us at{" "}
            <a
              href="mailto:privacy@runvay.co.in"
              className="text-blue-600 underline"
            >
              privacy@runvay.co.in
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">8. Data Retention</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Retained as long as needed for services</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes and enforce policies</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party platforms (e.g., Instagram, WhatsApp). We are not responsible for their privacy practices.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">10. Policy Updates</h2>
          <p>
            We may update this Privacy Policy periodically. All updates will be posted on this page with a new effective date.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">11. Contact Us</h2>
          <p>
            📧 Email:{" "}
            <a
              href="mailto:privacy@runvay.co.in"
              className="text-blue-600 underline"
            >
              privacy@runvay.co.in
            </a>
          </p>
          <p>📬 Address: [Insert Official Business Address]</p>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
