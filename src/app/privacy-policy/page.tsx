import PolicyLayout from "@/components/policy-layout/PolicyLayout";
import { SiteBreadcrumb } from "@/components/ui/breadcrumb";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <SiteBreadcrumb />
      </div>
      <PolicyLayout title="Privacy Policy" lastUpdated="May 1, 2025">
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          1. Introduction
        </h2>
        <p>
          Welcome to our Privacy Policy. This document explains how we collect,
          use, and handle your personal information when you visit our website
          and use our services. We respect your privacy and are committed to
          protecting your personal data.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          2. Information We Collect
        </h2>
        <p>
          We may collect several different types of information for various
          purposes to provide and improve our service to you:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            Personal Data: While using our website, we may ask you to provide us
            with certain personally identifiable information that can be used to
            contact or identify you. This may include, but is not limited to:
            <ul className="list-circle ml-6 mt-1">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Address, State, Province, ZIP/Postal code, City</li>
            </ul>
          </li>
          <li>
            Usage Data: We may also collect information on how the website is
            accessed and used. This may include your computer&apos;s Internet
            Protocol address, browser type, browser version, the pages of our
            website that you visit, the time and date of your visit, the time
            spent on those pages, unique device identifiers, and other
            diagnostic data.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          3. How We Use Your Information
        </h2>
        <p>We use the information we collect in various ways, including to:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>
            Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website, and for
            marketing and promotional purposes
          </li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          4. Cookies
        </h2>
        <p>
          We use cookies and similar tracking technologies to track activity on
          our website and store certain information. Cookies are files with a
          small amount of data which may include an anonymous unique identifier.
          You can instruct your browser to refuse all cookies or to indicate
          when a cookie is being sent.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          5. Third-Party Services
        </h2>
        <p>
          We may employ third-party companies and individuals due to the
          following reasons:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>To facilitate our website;</li>
          <li>To provide the website on our behalf;</li>
          <li>To perform website-related services; or</li>
          <li>To assist us in analyzing how our website is used.</li>
        </ul>
        <p className="mt-2">
          We want to inform our website users that these third parties have
          access to your Personal Information. The reason is to perform the
          tasks assigned to them on our behalf. However, they are obligated not
          to disclose or use the information for any other purpose.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
          6. Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>By email: support@example.com</li>
          <li>By phone: 123-456-7890</li>
        </ul>
      </PolicyLayout>
    </>
  );
}
