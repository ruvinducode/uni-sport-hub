import { useEffect, useMemo, useState } from "react";

/** Digits only, no + — opens chat directly to this number (no contact picker). */
const WHATSAPP_NUMBER = "94722177169";
const WHATSAPP_DISPLAY = "+94 77 217 7169";

const PAYMENT_OPTIONS = ["Bank Transfer", "Cash Deposit"];

function buildWhatsAppMessage({ productName, price, customerName, phone, address, paymentMethod }) {
  return `New Order Request!

--- Order Details ---

Product: ${productName}
Price: Rs. ${price}
Customer: ${customerName}
Phone: ${phone}
Address: ${address}
Payment Method: ${paymentMethod}`;
}

/**
 * Checkout modal: order form → WhatsApp with prefilled order text (no bank slip upload).
 * @param {{ product: object | null, isOpen: boolean, onClose: () => void }} props
 */
function BuyModal({ product, isOpen, onClose }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_OPTIONS[0]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [phase, setPhase] = useState("form");
  const [orderPayload, setOrderPayload] = useState(null);
  const [shareBusy, setShareBusy] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !product) {
      setFullName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setPaymentMethod(PAYMENT_OPTIONS[0]);
      setErrors({});
      setLoading(false);
      setPhase("form");
      setOrderPayload(null);
      setShareBusy(false);
    }
  }, [isOpen, product]);

  const waUrl = useMemo(() => {
    if (!orderPayload?.product) return null;
    const message = buildWhatsAppMessage({
      productName: orderPayload.product.name,
      price: orderPayload.product.price,
      customerName: orderPayload.customerName,
      phone: orderPayload.phone,
      address: orderPayload.address,
      paymentMethod: orderPayload.paymentMethod,
    });
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [orderPayload]);

  const isFormComplete = useMemo(() => {
    return (
      fullName.trim() &&
      phone.trim() &&
      email.trim() &&
      address.trim() &&
      paymentMethod
    );
  }, [fullName, phone, email, address, paymentMethod]);

  const validate = () => {
    const next = {};
    if (!fullName.trim()) next.fullName = "Full name is required.";
    if (!phone.trim()) next.phone = "Phone number is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email.";
    if (!address.trim()) next.address = "Address is required.";
    if (!paymentMethod) next.paymentMethod = "Choose a payment method.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product) return;
    if (!validate()) return;

    const customerName = fullName.trim();
    const phoneVal = phone.trim();
    const addressVal = address.trim();
    const paymentVal = paymentMethod;

    setLoading(true);
    setErrors({});

    window.setTimeout(() => {
      setLoading(false);
      setOrderPayload({
        product,
        customerName,
        phone: phoneVal,
        address: addressVal,
        paymentMethod: paymentVal,
      });
      setPhase("whatsapp");
    }, 700);
  };

  const handleOpenWhatsApp = () => {
    if (!waUrl || !orderPayload) return;

    setShareBusy(true);
    const w = window.open(waUrl, "_blank", "noopener,noreferrer");
    if (!w) {
      window.location.href = waUrl;
    }

    window.alert(
      `WhatsApp opens to ${WHATSAPP_DISPLAY}. Your order details are in the message — tap Send when ready.`
    );

    setShareBusy(false);
  };

  const handleBackToForm = () => {
    setPhase("form");
    setOrderPayload(null);
  };

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="buy-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        aria-label="Close"
        onClick={() => !loading && phase === "form" && onClose()}
      />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:rounded-3xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 id="buy-modal-title" className="text-lg font-extrabold text-slate-900">
              {phase === "whatsapp" ? "Send order via WhatsApp" : "Complete your order"}
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-600 line-clamp-2">{product.name}</p>
            <p className="mt-0.5 text-sm font-extrabold text-emerald-700">
              Rs. {Number(product.price).toLocaleString("en-LK")}
            </p>
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => !loading && onClose()}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"
            aria-label="Close dialog"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4">
          {phase === "whatsapp" && orderPayload ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-sm font-semibold text-emerald-900">
                <p className="font-extrabold">Your order message is ready.</p>
                <p className="mt-2 text-emerald-800">
                  <span className="font-bold">Open WhatsApp</span> opens the chat with{" "}
                  <span className="font-bold">{WHATSAPP_DISPLAY}</span>. Your product and order details are filled in
                  automatically — no bank slip needed.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                <p className="font-bold text-slate-700">Message preview</p>
                <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap font-sans text-[11px] leading-relaxed">
                  {buildWhatsAppMessage({
                    productName: orderPayload.product.name,
                    price: orderPayload.product.price,
                    customerName: orderPayload.customerName,
                    phone: orderPayload.phone,
                    address: orderPayload.address,
                    paymentMethod: orderPayload.paymentMethod,
                  })}
                </pre>
              </div>

              <button
                type="button"
                onClick={handleOpenWhatsApp}
                disabled={shareBusy}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-80"
              >
                {shareBusy ? (
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                )}
                {shareBusy ? "Opening…" : "Open WhatsApp"}
              </button>

              <button
                type="button"
                onClick={handleBackToForm}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                ← Back to edit details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="buy-full-name" className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Full name
                </label>
                <input
                  id="buy-full-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                  autoComplete="name"
                />
                {errors.fullName && <p className="mt-1 text-xs font-semibold text-red-600">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="buy-phone" className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Phone number
                </label>
                <input
                  id="buy-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                  autoComplete="tel"
                />
                {errors.phone && <p className="mt-1 text-xs font-semibold text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="buy-email" className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Email
                </label>
                <input
                  id="buy-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                  autoComplete="email"
                />
                {errors.email && <p className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="buy-address" className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Address
                </label>
                <textarea
                  id="buy-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                  autoComplete="street-address"
                />
                {errors.address && <p className="mt-1 text-xs font-semibold text-red-600">{errors.address}</p>}
              </div>

              <div>
                <label htmlFor="buy-payment" className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                  Payment method
                </label>
                <select
                  id="buy-payment"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                >
                  {PAYMENT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.paymentMethod && (
                  <p className="mt-1 text-xs font-semibold text-red-600">{errors.paymentMethod}</p>
                )}
              </div>

              <p className="text-xs font-medium text-slate-500">
                Next step opens WhatsApp to {WHATSAPP_DISPLAY} with your full order message — no file upload required.
              </p>

              <button
                type="submit"
                disabled={!isFormComplete || loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading && (
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                )}
                {loading ? "Checking…" : "Continue"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuyModal;
