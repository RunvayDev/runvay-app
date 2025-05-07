
import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-8 text-sm text-gray-500">Effective Date: [Insert Date]</p>

      <section className="space-y-6">
        <p>
          At <strong>Runvay</strong>, accessible from{" "}
          <a
            href="https://www.runvay.co.in"
            className="text-blue-600 underline"
            target="_blank"
          >
            https://www.runvay.co.in
          </a>
          , your privacy is of utmost importance to us. This Privacy Policy
          outlines the types of information we collect, how we use and protect
          it, and your rights regarding that information.
        </p>

        <p>
          By accessing or using our website, you agree to the terms outlined in
          this Privacy Policy.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Shipping Address</li>
            <li>Billing Address</li>
            <li>Payment Information (handled via Razorpay)</li>
            <li>IP Address, Browser Type, OS, Device Info</li>
            <li>Usage Data via cookies/analytics</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Collect Your Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>When you create an account</li>
            <li>When you place an order</li>
            <li>Newsletter or promo signup</li>
            <li>Support inquiries</li>
            <li>Automatically via cookies/analytics</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">3. Purpose of Collecting Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Order processing & fulfillment</li>
            <li>Fraud prevention & identity verification</li>
            <li>Customer service communication</li>
            <li>Promotions (if opted-in)</li>
            <li>Site improvement & UX analysis</li>
            <li>Legal compliance</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">4. Sharing and Disclosure</h2>
          <p>We never sell or rent your personal data.</p>
          <p>We may share data with:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Payment processors (e.g., Razorpay)</li>
            <li>Courier/shipping partners</li>
            <li>Analytics & marketing service providers</li>
            <li>Authorities (if legally required)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">5. Data Storage and Security</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Stored on secure encrypted servers</li>
            <li>Payments handled by secure third parties</li>
            <li>Access restricted to authorized personnel</li>
            <li>Data breach notifications as per law</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">6. Cookies</h2>
          <p>
            We use cookies to:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Analyze traffic</li>
            <li>Improve performance</li>
            <li>Personalize content</li>
          </ul>
          <p>You can disable cookies in your browser settings.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">7. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access your data</li>
            <li>Request correction</li>
            <li>Withdraw consent for emails</li>
            <li>Request deletion (subject to law)</li>
          </ul>
          <p>
            Email us at{" "}
            <a
              href="mailto:privacy@runvay.co.in"
              className="text-blue-600 underline"
            >
              privacy@runvay.co.in
            </a>{" "}
            to exercise your rights.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">8. Data Retention</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Retained as long as needed for the stated purposes</li>
            <li>Legal/regulatory requirements</li>
            <li>Recordkeeping & disputes</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">9. Third-Party Links</h2>
          <p>
            Our site may link to external sites like Instagram or WhatsApp. We are not responsible
            for their privacy practices.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">10. Policy Updates</h2>
          <p>
            We may update this policy. Changes will be posted here with a new effective date.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">11. Contact Us</h2>
          <p>
            📧 Email:{" "}
            <a
              href="mailto:privacy@runvay.co.in"
              className="text-blue-600 underline"
            >
              privacy@runvay.co.in
            </a>
          </p>
          <p>📬 Address: [Insert your business's official address]</p>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
