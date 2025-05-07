
import React from "react";

export default function FAQPage() {
  const faqs = [
    {
      question: "What types of T-shirts does Runvay offer?",
      answer:
        "Runvay specializes in premium printed T-shirts &mdash; from minimalist graphics to bold artistic statements, designed for all-day comfort and unique self-expression.",
    },
    {
      question: "What sizes are available?",
      answer:
        "We offer a wide range of unisex sizes from XS to XXL. Please refer to our size guide on each product page to ensure the perfect fit.",
    },
    {
      question: "Do you offer custom prints?",
      answer:
        "Currently, we do not offer custom printing. However, our in-house designs are curated to help you stand out with originality and flair.",
    },
    {
      question: "Are your T-shirts made in India?",
      answer:
        "Yes! All our T-shirts are proudly designed and made in India, supporting local talent and ethical manufacturing practices.",
    },
    {
      question: "How should I care for my printed T-shirt?",
      answer:
        "For best results, wash your T-shirt inside out in cold water, avoid bleach, and tumble dry on low or air dry. This helps maintain the quality of the print and fabric.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we ship only within India. International shipping is coming soon &mdash; stay tuned!",
    },
    {
      question: "Can I return or exchange a product?",
      answer:
        "Yes, we offer easy returns and exchanges within 7 days of delivery, provided the item is unworn, unwashed, and in original packaging.",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-700">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border-l-4 border-blue-600 shadow-md rounded-md p-5"
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-900">
              {faq.question}
            </h2>
            <p
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-gray-500 italic">
        Still have questions?{" "}
        <a
          href="/contact"
          className="text-blue-600 hover:underline font-medium"
        >
          Contact us
        </a>
        .
      </p>
    </main>
  );
}
