import PolicyLayout from "@/components/policy-layout/PolicyLayout";

const ShippingPolicy = () => {
  return (
    <PolicyLayout title="Shipping Policy" lastUpdated="May 1, 2025">
      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
        1. Processing Time
      </h2>
      <p>
        All orders are processed within 1-2 business days. Orders are not
        shipped or delivered on weekends or holidays. If we are experiencing a
        high volume of orders, shipments may be delayed by a few days. Please
        allow additional days in transit for delivery. If there will be a
        significant delay in the shipment of your order, we will contact you via
        email or telephone.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
        2. Shipping Rates & Delivery Times
      </h2>
      <p>
        Shipping charges for your order will be calculated and displayed at
        checkout. Delivery times are estimates and commence from the date of
        shipping, rather than the date of order.
      </p>
      <div className="border border-gray-200 rounded-lg overflow-hidden mt-4 mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Shipping Method</th>
              <th className="px-4 py-2 text-left">Estimated Delivery Time</th>
              <th className="px-4 py-2 text-left">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-4 py-2">Standard Shipping</td>
              <td className="px-4 py-2">3-7 Business Days</td>
              <td className="px-4 py-2">₹99</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-4 py-2">Express Shipping</td>
              <td className="px-4 py-2">1-3 Business Days</td>
              <td className="px-4 py-2">₹199</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-4 py-2">Free Shipping</td>
              <td className="px-4 py-2">5-10 Business Days</td>
              <td className="px-4 py-2">Free (Orders ₹999+)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-600 italic">
        * Delivery times may vary, especially during peak periods or unforeseen
        circumstances.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
        3. Shipment Confirmation & Order Tracking
      </h2>
      <p>
        You will receive a Shipment Confirmation email once your order has
        shipped containing your tracking number(s). The tracking number will be
        active within 24 hours.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
        4. Shipping Restrictions
      </h2>
      <p>
        At this time, we only ship within India. We do not ship to P.O. boxes.
        For certain remote areas, additional shipping charges may apply. We will
        contact you before processing your order if there are any additional
        charges.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
        5. Damaged Items
      </h2>
      <p>
        If your package arrives damaged, please contact us immediately. We will
        work with you to ensure a satisfactory resolution. We may require photos
        or other documentation of the damaged items.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
        6. Missing or Lost Packages
      </h2>
      <p>
        If your package never arrives, please contact us and we will
        investigate. We may file a claim with our shipping carrier and either
        replace your items or provide a refund once the investigation is
        complete.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
        7. International Shipping
      </h2>
      <p>
        We currently do not offer international shipping. We hope to expand our
        shipping services to more countries in the future.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
        8. Contact Us
      </h2>
      <p>
        If you have any questions about our shipping policy, please contact us:
      </p>
      <ul className="list-disc ml-6 mt-2 space-y-1">
        <li>By email: shipping@example.com</li>
        <li>By phone: 123-456-7890</li>
      </ul>
    </PolicyLayout>
  );
};

export default ShippingPolicy;
