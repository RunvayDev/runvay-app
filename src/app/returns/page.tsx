
import React from "react";

const ReturnsPolicyPage = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Returns & Refunds Policy</h1>
      <p className="mb-8 text-sm text-gray-500">Effective Date: [Insert Date]</p>

      <section className="space-y-6">
        <p>
          At <strong>Runvay</strong>, we want you to be completely satisfied with your purchase. If
          for any reason you are not satisfied, you may be eligible for a return or refund in
          accordance with the policy outlined below.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">1. Eligibility for Returns</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Items must be returned within 7 days of delivery.</li>
            <li>Items must be unused, unwashed, and in original packaging with tags intact.</li>
            <li>Certain items (e.g., undergarments, cosmetics) may be non-returnable for hygiene reasons.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">2. How to Initiate a Return</h2>
          <p>
            To initiate a return, please email our support team at{" "}
            <a
              href="mailto:support@runvay.co.in"
              className="text-blue-600 underline"
            >
              support@runvay.co.in
            </a>{" "}
            with the following:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Order ID</li>
            <li>Reason for return</li>
            <li>Clear images of the item (if damaged or incorrect)</li>
          </ul>
          <p>We’ll respond with return instructions within 24–48 hours.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">3. Refunds</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Once we receive and inspect your return, we will notify you of the approval or
              rejection of your refund.
            </li>
            <li>Approved refunds will be processed within 5–7 business days.</li>
            <li>Refunds will be issued to the original payment method.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">4. Exchanges</h2>
          <p>
            We only replace items if they are defective, damaged, or incorrectly delivered. For
            exchange requests, email us at{" "}
            <a
              href="mailto:support@runvay.co.in"
              className="text-blue-600 underline"
            >
              support@runvay.co.in
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">5. Non-Returnable Items</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Gift cards</li>
            <li>Items on clearance or marked “Final Sale”</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">6. Shipping Costs</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Shipping charges are non-refundable unless the item is faulty.</li>
            <li>Return shipping is the customer’s responsibility unless the item is incorrect/damaged.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mt-8 mb-2">7. Contact Us</h2>
          <p>
            For any questions related to returns or refunds, please contact us at:
          </p>
          <ul className="list-none pl-0 mt-2">
            <li>
              📧 Email:{" "}
              <a
                href="mailto:support@runvay.co.in"
                className="text-blue-600 underline"
              >
                support@runvay.co.in
              </a>
            </li>
            <li>📬 Address: [Insert your business's official address]</li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default ReturnsPolicyPage;
