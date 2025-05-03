import PolicyLayout from "@/components/policy-layout/PolicyLayout";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";

export default function TermsConditions() {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
      <PolicyLayout title="Terms & Conditions" lastUpdated="May 1, 2025">
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          1. Introduction
        </h2>
        <p>
          These Terms and Conditions (&quot;Terms&quot;, &quot;Terms and
          Conditions&quot;) govern your relationship with our website (the
          &quot;Service&quot;) operated by our company (&quot;us&quot;,
          &quot;we&quot;, or &quot;our&quot;). Please read these Terms and
          Conditions carefully before using our website.
        </p>
        <p className="mt-2">
          Your access to and use of the Service is conditioned on your
          acceptance of and compliance with these Terms. These Terms apply to
          all visitors, users, and others who access or use the Service.
        </p>
        <p className="mt-2">
          By accessing or using the Service, you agree to be bound by these
          Terms. If you disagree with any part of the terms, then you may not
          access the Service.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          2. Purchases
        </h2>
        <p>
          If you wish to purchase any product or service made available through
          the Service (&quot;Purchase&quot;), you may be asked to supply certain
          information relevant to your Purchase including, without limitation,
          your credit card number, the expiration date of your credit card, your
          billing address, and your shipping information.
        </p>
        <p className="mt-2">
          You represent and warrant that: (i) you have the legal right to use
          any credit card(s) or other payment method(s) in connection with any
          Purchase; and that (ii) the information you supply to us is true,
          correct, and complete.
        </p>
        <p className="mt-2">
          By submitting such information, you grant us the right to provide the
          information to third parties for purposes of facilitating the
          completion of Purchases.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          3. Content
        </h2>
        <p>
          Our Service allows you to post, link, store, share, and otherwise make
          available certain information, text, graphics, videos, or other
          material (&quot;Content&quot;). You are responsible for the Content
          that you post to the Service, including its legality, reliability, and
          appropriateness.
        </p>
        <p className="mt-2">
          By posting Content to the Service, you grant us the right and license
          to use, modify, perform, display, reproduce, and distribute such
          Content on and through the Service. You retain any and all of your
          rights to any Content you submit, post, or display on or through the
          Service, and you are responsible for protecting those rights.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          4. Accounts
        </h2>
        <p>
          When you create an account with us, you must provide us information
          that is accurate, complete, and current at all times. Failure to do so
          constitutes a breach of the Terms, which may result in immediate
          termination of your account on our Service.
        </p>
        <p className="mt-2">
          You are responsible for safeguarding the password that you use to
          access the Service and for any activities or actions under your
          password, whether your password is with our Service or a third-party
          service.
        </p>
        <p className="mt-2">
          You agree not to disclose your password to any third party. You must
          notify us immediately upon becoming aware of any breach of security or
          unauthorized use of your account.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          5. Links To Other Web Sites
        </h2>
        <p>
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by our company.
        </p>
        <p className="mt-2">
          We have no control over, and assume no responsibility for, the
          content, privacy policies, or practices of any third-party web sites
          or services. You further acknowledge and agree that we shall not be
          responsible or liable, directly or indirectly, for any damage or loss
          caused or alleged to be caused by or in connection with the use of or
          reliance on any such content, goods, or services available on or
          through any such web sites or services.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          6. Termination
        </h2>
        <p>
          We may terminate or suspend your account immediately, without prior
          notice or liability, for any reason whatsoever, including without
          limitation if you breach the Terms.
        </p>
        <p className="mt-2">
          Upon termination, your right to use the Service will immediately
          cease. If you wish to terminate your account, you may simply
          discontinue using the Service.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          7. Contact Us
        </h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>By email: legal@example.com</li>
          <li>By phone: 123-456-7890</li>
        </ul>
      </PolicyLayout>
    </>
  );
}
