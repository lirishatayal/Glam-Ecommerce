import StaticPageLayout from '../../components/common/StaticPageLayout'

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">{title}</h2>
      <div className="text-sm text-gray-600 leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

function Bullet({ children }) {
  return (
    <li className="flex gap-2">
      <span className="text-pink-400 flex-shrink-0 mt-0.5">•</span>
      <span>{children}</span>
    </li>
  )
}

// ─── Privacy Policy ──────────────────────────────────────────────────────────
export function PrivacyPolicyPage() {
  return (
    <StaticPageLayout
      title="Privacy Policy"
      subtitle="Last updated: April 1, 2026"
      breadcrumb={[{ label: 'Privacy Policy' }]}
      heroColor="from-slate-50 to-gray-50"
    >
      <div className="max-w-3xl">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 text-sm text-blue-800">
          <strong>TL;DR:</strong> We collect only what we need to run Glam, never sell your personal data to third parties, and you can request deletion of your data at any time.
        </div>

        <Section title="1. Information We Collect">
          <p>When you use Glam, we may collect the following types of information:</p>
          <ul className="space-y-2 mt-2">
            <Bullet><strong>Account Information:</strong> Name, email address, phone number, and password when you register.</Bullet>
            <Bullet><strong>Purchase Information:</strong> Delivery address, order history, payment method details (processed securely — we never store full card numbers).</Bullet>
            <Bullet><strong>Usage Data:</strong> Pages visited, products viewed, search queries, and click data to improve recommendations.</Bullet>
            <Bullet><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</Bullet>
            <Bullet><strong>Communications:</strong> Messages sent to our support team or reviews posted on the platform.</Bullet>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="space-y-2">
            <Bullet>Process and fulfil your orders and send delivery updates</Bullet>
            <Bullet>Personalise your shopping experience and product recommendations</Bullet>
            <Bullet>Send transactional emails, order confirmations, and shipping notifications</Bullet>
            <Bullet>Send promotional offers and newsletters (only with your consent)</Bullet>
            <Bullet>Detect and prevent fraud, abuse, and security threats</Bullet>
            <Bullet>Comply with legal obligations and resolve disputes</Bullet>
            <Bullet>Improve our website, app, and services through analytics</Bullet>
          </ul>
        </Section>

        <Section title="3. Sharing of Information">
          <p>We do not sell your personal data. We share your information only with:</p>
          <ul className="space-y-2 mt-2">
            <Bullet><strong>Delivery Partners:</strong> Your name, address, and phone number to fulfil your orders.</Bullet>
            <Bullet><strong>Payment Processors:</strong> To securely process transactions (e.g., Razorpay, PayU).</Bullet>
            <Bullet><strong>Analytics Providers:</strong> Aggregated, anonymised data only (e.g., Google Analytics).</Bullet>
            <Bullet><strong>Legal Authorities:</strong> When required by law or court order.</Bullet>
          </ul>
        </Section>

        <Section title="4. Data Security">
          <p>We implement industry-standard security measures to protect your data:</p>
          <ul className="space-y-2 mt-2">
            <Bullet>All data transmitted is encrypted using 256-bit SSL/TLS</Bullet>
            <Bullet>Payment information is handled through PCI-DSS compliant processors</Bullet>
            <Bullet>Passwords are hashed and never stored in plain text</Bullet>
            <Bullet>Regular security audits and penetration testing</Bullet>
          </ul>
        </Section>

        <Section title="5. Cookies">
          <p>We use cookies to remember your preferences, keep you signed in, and analyse site traffic. You can control cookies through your browser settings. For details, see our <a href="/cookies" className="text-pink-500 hover:underline">Cookie Policy</a>.</p>
        </Section>

        <Section title="6. Your Rights">
          <p>You have the following rights regarding your personal data:</p>
          <ul className="space-y-2 mt-2">
            <Bullet><strong>Access:</strong> Request a copy of the data we hold about you</Bullet>
            <Bullet><strong>Correction:</strong> Update inaccurate or incomplete information</Bullet>
            <Bullet><strong>Deletion:</strong> Request deletion of your account and associated data</Bullet>
            <Bullet><strong>Portability:</strong> Export your data in a machine-readable format</Bullet>
            <Bullet><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</Bullet>
          </ul>
          <p className="mt-3">To exercise these rights, email us at <a href="mailto:privacy@glam.in" className="text-pink-500 hover:underline">privacy@glam.in</a>.</p>
        </Section>

        <Section title="7. Data Retention">
          <p>We retain your personal data for as long as your account is active, plus a period required by law (typically 7 years for financial records). You can request earlier deletion by contacting us.</p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>Glam is not directed at children under 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us their data, please contact us immediately.</p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on our website. Continued use of Glam after changes constitutes acceptance of the updated policy.</p>
        </Section>

        <Section title="10. Contact">
          <p>Questions about this Privacy Policy? Reach us at <a href="mailto:privacy@glam.in" className="text-pink-500 hover:underline">privacy@glam.in</a> or write to our Data Protection Officer at our registered office address.</p>
        </Section>
      </div>
    </StaticPageLayout>
  )
}

// ─── Terms of Use ────────────────────────────────────────────────────────────
export function TermsPage() {
  return (
    <StaticPageLayout
      title="Terms of Use"
      subtitle="Last updated: April 1, 2026"
      breadcrumb={[{ label: 'Terms of Use' }]}
      heroColor="from-slate-50 to-gray-50"
    >
      <div className="max-w-3xl">
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-8 text-sm text-amber-800">
          Please read these terms carefully before using Glam. By accessing or using our platform, you agree to be bound by these terms.
        </div>

        <Section title="1. Acceptance of Terms">
          <p>By accessing or using the Glam website, mobile app, or any services provided by Glam Beauty Pvt. Ltd., you agree to these Terms of Use. If you do not agree, please do not use our platform.</p>
        </Section>

        <Section title="2. Eligibility">
          <ul className="space-y-2">
            <Bullet>You must be at least 18 years of age to create an account and make purchases.</Bullet>
            <Bullet>By registering, you represent that all information you provide is accurate and complete.</Bullet>
            <Bullet>You are responsible for maintaining the confidentiality of your account credentials.</Bullet>
          </ul>
        </Section>

        <Section title="3. Products and Pricing">
          <ul className="space-y-2">
            <Bullet>All product descriptions, images, and prices are accurate to the best of our knowledge but may be subject to change without notice.</Bullet>
            <Bullet>We reserve the right to correct pricing errors and cancel orders placed at incorrect prices.</Bullet>
            <Bullet>Promotional prices are subject to availability and may be withdrawn at any time.</Bullet>
            <Bullet>All prices are displayed in Indian Rupees (₹) inclusive of applicable taxes unless stated otherwise.</Bullet>
          </ul>
        </Section>

        <Section title="4. Orders and Payments">
          <ul className="space-y-2">
            <Bullet>An order confirmation email does not constitute acceptance — we reserve the right to cancel any order.</Bullet>
            <Bullet>Payment is due at the time of purchase. We accept UPI, cards, net banking, and cash on delivery for eligible orders.</Bullet>
            <Bullet>We are not liable for failed transactions due to issues with your bank or payment provider.</Bullet>
          </ul>
        </Section>

        <Section title="5. User Conduct">
          <p>You agree not to:</p>
          <ul className="space-y-2 mt-2">
            <Bullet>Use the platform for any unlawful or fraudulent purpose</Bullet>
            <Bullet>Post false, misleading, or defamatory product reviews</Bullet>
            <Bullet>Scrape, copy, or reverse-engineer any part of the platform</Bullet>
            <Bullet>Attempt to gain unauthorised access to any system or data</Bullet>
            <Bullet>Upload malware or any harmful code</Bullet>
          </ul>
        </Section>

        <Section title="6. Intellectual Property">
          <p>All content on Glam — including logos, text, images, product descriptions, and software — is owned by or licensed to Glam Beauty Pvt. Ltd. and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>To the maximum extent permitted by law, Glam shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you paid for the relevant order.</p>
        </Section>

        <Section title="8. Governing Law">
          <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.</p>
        </Section>

        <Section title="9. Contact">
          <p>For questions about these Terms, contact us at <a href="mailto:legal@glam.in" className="text-pink-500 hover:underline">legal@glam.in</a>.</p>
        </Section>
      </div>
    </StaticPageLayout>
  )
}

// ─── Cookie Policy ───────────────────────────────────────────────────────────
export function CookiePolicyPage() {
  return (
    <StaticPageLayout
      title="Cookie Policy"
      subtitle="Last updated: April 1, 2026"
      breadcrumb={[{ label: 'Cookie Policy' }]}
      heroColor="from-slate-50 to-gray-50"
    >
      <div className="max-w-3xl">
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-8 text-sm text-green-800">
          We use cookies to make Glam work better for you. Here's exactly what we use and why — no jargon, no surprises.
        </div>

        <Section title="What Are Cookies?">
          <p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, keep you signed in, and understand how you use the site.</p>
        </Section>

        <Section title="Types of Cookies We Use">
          <div className="space-y-4 mt-2">
            {[
              { name: '🔒 Essential Cookies', always: true, desc: 'Required for the website to function. These include session cookies that keep you logged in and cart cookies that remember your items. These cannot be disabled.' },
              { name: '📊 Analytics Cookies', always: false, desc: 'Used by Google Analytics to understand how visitors interact with our site — pages visited, time spent, and drop-off points. All data is anonymised.' },
              { name: '🎯 Personalisation Cookies', always: false, desc: 'Help us remember your preferences (like your saved addresses, recently viewed products, and wishlist) to give you a personalised experience.' },
              { name: '📢 Marketing Cookies', always: false, desc: 'Allow us and our advertising partners to show you relevant Glam ads on other websites. You can opt out of these without affecting core functionality.' },
            ].map((c) => (
              <div key={c.name} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{c.name}</h3>
                  {c.always ? (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Always Active</span>
                  ) : (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">Optional</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Third-Party Cookies">
          <p>Some cookies on our site are set by third-party services:</p>
          <ul className="space-y-2 mt-2">
            <Bullet><strong>Google Analytics</strong> — website usage analytics</Bullet>
            <Bullet><strong>Razorpay / PayU</strong> — payment processing (essential)</Bullet>
            <Bullet><strong>Intercom</strong> — live chat functionality</Bullet>
            <Bullet><strong>Meta Pixel</strong> — marketing attribution (optional)</Bullet>
          </ul>
        </Section>

        <Section title="How to Control Cookies">
          <p>You can manage cookies in several ways:</p>
          <ul className="space-y-2 mt-2">
            <Bullet><strong>Cookie Banner:</strong> On your first visit, you can accept or reject optional cookies.</Bullet>
            <Bullet><strong>Browser Settings:</strong> Most browsers let you block or delete cookies. Note that blocking essential cookies may break some site features.</Bullet>
            <Bullet><strong>Opt-Out Tools:</strong> Use <a href="https://optout.aboutads.info" className="text-pink-500 hover:underline" target="_blank" rel="noopener noreferrer">aboutads.info</a> to opt out of interest-based advertising.</Bullet>
          </ul>
        </Section>

        <Section title="Cookie Retention">
          <p>Session cookies are deleted when you close your browser. Persistent cookies have a fixed expiry — typically 30 days to 2 years. You can delete them manually via your browser settings at any time.</p>
        </Section>

        <Section title="Contact">
          <p>Questions? Email us at <a href="mailto:privacy@glam.in" className="text-pink-500 hover:underline">privacy@glam.in</a>.</p>
        </Section>
      </div>
    </StaticPageLayout>
  )
}
