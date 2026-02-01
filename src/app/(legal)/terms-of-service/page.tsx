import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Plaibook terms of service — our agreement with you.",
  alternates: {
    canonical: "https://plaibook.tech/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1>Terms of Service</h1>
      <p className="text-text-muted">Last updated: January 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using Plaibook&apos;s services, you agree to be bound by
        these Terms of Service. If you do not agree, you may not use our
        services.
      </p>

      <h2>2. Description of Services</h2>
      <p>
        Plaibook provides AI-powered sales optimization tools for home service
        businesses, including call analytics, automated SMS campaigns, lead
        follow-up automation, website chat widgets, and sales gamification
        features.
      </p>

      <h2>3. Account Responsibilities</h2>
      <p>
        You are responsible for maintaining the security of your account
        credentials and for all activities that occur under your account. You
        agree to notify us immediately of any unauthorized access.
      </p>

      <h2>4. Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use our services for any unlawful purpose</li>
        <li>Send spam or unsolicited messages through our platform</li>
        <li>Attempt to reverse-engineer our AI systems</li>
        <li>Violate any applicable telecommunications regulations</li>
        <li>Interfere with the operation of our services</li>
      </ul>

      <h2>5. SMS and Communication Compliance</h2>
      <p>
        You are responsible for ensuring that all SMS campaigns sent through
        Plaibook comply with applicable laws, including the Telephone Consumer
        Protection Act (TCPA) and applicable state regulations. You must obtain
        proper consent before sending messages to customers.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All content, features, and functionality of Plaibook are owned by us
        and are protected by copyright, trademark, and other intellectual
        property laws.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        Plaibook shall not be liable for any indirect, incidental, special, or
        consequential damages arising from your use of our services.
      </p>

      <h2>8. Termination</h2>
      <p>
        Either party may terminate this agreement at any time. Upon
        termination, your access to the services will cease and we will handle
        your data in accordance with our Privacy Policy.
      </p>

      <h2>9. Contact</h2>
      <p>
        For questions about these terms, contact us at{" "}
        <a href="mailto:legal@plaibook.tech">legal@plaibook.tech</a>.
      </p>
    </article>
  );
}
