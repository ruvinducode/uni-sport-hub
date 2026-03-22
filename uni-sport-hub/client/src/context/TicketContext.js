import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_CART = "ticket_cart";
const STORAGE_USER = "ticket_user";
const STORAGE_BOOKINGS = "ticket_bookings";

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function uid() {
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

const TicketContext = createContext(null);

export function TicketProvider({ children }) {
  const [cart, setCart] = useState(() => loadJson(STORAGE_CART, []));
  const [ticketUser, setTicketUser] = useState(() => loadJson(STORAGE_USER, null));
  const [bookings, setBookings] = useState(() => loadJson(STORAGE_BOOKINGS, []));

  useEffect(() => {
    localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (ticketUser) localStorage.setItem(STORAGE_USER, JSON.stringify(ticketUser));
    else localStorage.removeItem(STORAGE_USER);
  }, [ticketUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  const cartCount = useMemo(
    () => cart.reduce((n, line) => n + (line.seats?.length || 0), 0),
    [cart]
  );

  const addSeatsToCart = useCallback((payload) => {
    const line = {
      id: uid(),
      matchId: payload.matchId,
      matchTitle: payload.matchTitle,
      venue: payload.venue,
      dateISO: payload.dateISO,
      tierId: payload.tierId,
      tierName: payload.tierName,
      seats: payload.seats,
    };
    setCart((prev) => [...prev, line]);
  }, []);

  const removeLine = useCallback((lineId) => {
    setCart((prev) => prev.filter((l) => l.id !== lineId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const loginFan = useCallback((user) => {
    setTicketUser({ email: user.email.trim(), name: user.name?.trim() || user.email.trim() });
  }, []);

  const logoutFan = useCallback(() => {
    setTicketUser(null);
  }, []);

  const computeTotals = useCallback((lines, promoPercentOff = 0) => {
    const subtotal = lines.reduce((sum, line) => {
      const lineSum = (line.seats || []).reduce((s, seat) => s + (seat.price || 0), 0);
      return sum + lineSum;
    }, 0);
    const afterPromo = Math.max(0, subtotal * (1 - promoPercentOff / 100));
    const serviceFee = Math.round(afterPromo * 0.05 * 100) / 100 + 1.5;
    const total = Math.round((afterPromo + serviceFee) * 100) / 100;
    return { subtotal, serviceFee, total, afterPromo };
  }, []);

  const placeOrder = useCallback(
    ({ contactEmail, contactPhone, cardName }) => {
      const { total } = computeTotals(cart, 0);
      const bookingId = `BK-${Date.now().toString(36).toUpperCase()}`;
      const record = {
        id: bookingId,
        createdAt: new Date().toISOString(),
        email: contactEmail,
        phone: contactPhone,
        cardName,
        lines: cart.map((l) => ({ ...l })),
        total,
        status: "confirmed",
      };
      setBookings((prev) => [record, ...prev]);
      setCart([]);
      return bookingId;
    },
    [cart, computeTotals]
  );

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      ticketUser,
      bookings,
      addSeatsToCart,
      removeLine,
      clearCart,
      loginFan,
      logoutFan,
      computeTotals,
      placeOrder,
    }),
    [
      cart,
      cartCount,
      ticketUser,
      bookings,
      addSeatsToCart,
      removeLine,
      clearCart,
      loginFan,
      logoutFan,
      computeTotals,
      placeOrder,
    ]
  );

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
}

export function useTicket() {
  const ctx = useContext(TicketContext);
  if (!ctx) throw new Error("useTicket must be used within TicketProvider");
  return ctx;
}
