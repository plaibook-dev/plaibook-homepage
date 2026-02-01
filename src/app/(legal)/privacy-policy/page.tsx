import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Plaibook privacy policy — how we handle your data.",
  alternates: {
    canonical: "https://plaibook.tech/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1>Privacy Policy</h1>
      <p className="text-text-muted">Last updated: January 2026</p>

      <h2>1. Information We Collect</h2>
      <p>
        Plaibook collects information you provide directly, including your name,
        email address, company name, and phone number when you request a demo or
        create an account.
      </p>
      <p>
        We also collect usage data about how you interact with our platform,
        including call analytics data, campaign performance metrics, and feature
        usage patterns.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, maintain, and improve our services</li>
        <li>Process and analyze sales call data for your business</li>
        <li>Send automated SMS campaigns on your behalf</li>
        <li>Communicate with you about your account and our services</li>
        <li>Detect, prevent, and address technical issues</li>
      </ul>

      <h2>3. Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your data,
        including encryption in transit and at rest, access controls, and regular
        security audits.
      </p>

      <h2>4. Data Retention</h2>
      <p>
        We retain your data for as long as your account is active or as needed
        to provide services. You may request deletion of your data at any time
        by contacting us.
      </p>

      <h2>5. Third-Party Services</h2>
      <p>
        We may share data with third-party service providers who assist in
        operating our platform, subject to confidentiality agreements and data
        protection standards.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal data. You
        may also opt out of marketing communications at any time.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        For privacy-related questions, contact us at{" "}
        <a href="mailto:privacy@plaibook.tech">privacy@plaibook.tech</a>.
      </p>
    </article>
  );
}
