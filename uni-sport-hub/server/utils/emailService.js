const nodemailer = require("nodemailer");
let warnedMissingSmtp = false;

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    if (!warnedMissingSmtp) {
      console.warn(
        "Email notifications disabled: set SMTP_HOST, SMTP_USER, SMTP_PASS (and optional SMTP_FROM) in server/.env"
      );
      warnedMissingSmtp = true;
    }
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
};

const roleTitle = (role) => (role === "coach" ? "Coach" : role === "player" ? "Player" : "User");

const getStage = ({ role, status, selectorApproved, adminApproved }) => {
  if (status === "rejected") return "rejected";
  if (status === "approved") return "fully_approved";

  if (role === "player") return "pending_coach_review";
  if (role === "coach" && selectorApproved && !adminApproved) return "pending_admin_review";
  if (role === "coach" && !selectorApproved) return "pending_selector_review";

  return "pending_review";
};

const getTemplate = ({ name, role, status, selectorApproved, adminApproved }) => {
  const stage = getStage({ role, status, selectorApproved, adminApproved });
  const userName = name || "User";
  const roleName = roleTitle(role);

  const templates = {
    pending_coach_review: {
      title: `${roleName} Registration Submitted`,
      statusLabel: "Pending Coach Review",
      headline: "Registration received",
      body: "Your player registration has been submitted successfully and is waiting for coach review.",
      nextStep: "You will receive another update after the coach approves or rejects your request.",
    },
    pending_selector_review: {
      title: `${roleName} Registration Submitted`,
      statusLabel: "Pending Selector Review",
      headline: "Registration received",
      body: "Your coach registration has been submitted and is currently under selector review.",
      nextStep: "After selector approval, your request will move to admin final review.",
    },
    pending_admin_review: {
      title: `${roleName} Registration Progress Update`,
      statusLabel: "Pending Admin Review",
      headline: "Selector approval completed",
      body: "Good news. Your coach registration has been approved by selector and forwarded to admin.",
      nextStep: "You will be notified when admin gives the final decision.",
    },
    fully_approved: {
      title: `${roleName} Registration Approved`,
      statusLabel: "Approved",
      headline: "Registration approved",
      body: `Your ${role === "coach" ? "coach" : "player"} registration is fully approved.`,
      nextStep: "You can now sign in to Uni Sport Hub.",
    },
    rejected: {
      title: `${roleName} Registration Update`,
      statusLabel: "Rejected",
      headline: "Registration decision",
      body: `Your ${role === "coach" ? "coach" : "player"} registration was not approved at this stage.`,
      nextStep: "If needed, contact the sports office or admin team for guidance.",
    },
    pending_review: {
      title: `${roleName} Registration Update`,
      statusLabel: "Pending",
      headline: "Status update",
      body: "Your registration is currently under review.",
      nextStep: "You will receive another email when the status changes.",
    },
  };

  const selected = templates[stage];
  const subject = `[Uni Sport Hub] ${selected.title}`;
  const headerGradient =
    stage === "rejected"
      ? "linear-gradient(90deg,#dc2626,#ef4444)"
      : "linear-gradient(90deg,#059669,#65a30d)";

  const text = [
    `Hello ${userName},`,
    "",
    `${selected.headline}`,
    selected.body,
    "",
    `Status: ${selected.statusLabel}`,
    `Role: ${roleName}`,
    "",
    `Next step: ${selected.nextStep}`,
    "",
    "Uni Sport Hub",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; background:#f8fafc; margin:0; padding:24px;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden;">
        <div style="background:${headerGradient}; padding:16px 20px; color:#ffffff;">
          <h2 style="margin:0; font-size:18px;">Uni Sport Hub</h2>
          <p style="margin:6px 0 0; font-size:12px; opacity:.95;">Registration Status Notification</p>
        </div>
        <div style="padding:20px;">
          <p style="margin:0 0 12px;">Hello ${userName},</p>
          <h3 style="margin:0 0 10px; font-size:18px; color:#0f172a;">${selected.headline}</h3>
          <p style="margin:0 0 12px; color:#334155;">${selected.body}</p>
          <div style="display:inline-block; border:1px solid #cbd5e1; border-radius:999px; padding:6px 12px; font-size:12px; font-weight:700; color:#0f172a; background:#f8fafc;">
            Status: ${selected.statusLabel}
          </div>
          <p style="margin:14px 0 0; color:#334155;"><strong>Next step:</strong> ${selected.nextStep}</p>
          <p style="margin:18px 0 0; color:#64748b; font-size:12px;">Role: ${roleName}</p>
        </div>
      </div>
    </div>
  `;

  return { subject, text, html };
};

const sendRegistrationStatusEmail = async (user) => {
  try {
    const transporter = getTransporter();
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    if (!transporter || !from || !user?.email) {
      return;
    }

    const template = getTemplate({
      name: user.name,
      role: user.role,
      status: user.status,
      selectorApproved: user.selectorApproved,
      adminApproved: user.adminApproved,
    });

    await transporter.sendMail({
      from,
      to: user.email,
      subject: template.subject,
      text: template.text,
      html: template.html,
    });
  } catch (error) {
    console.error("Email notification failed:", error.message);
  }
};

const sendSelectorRoleEmail = async ({ user, mode }) => {
  try {
    const transporter = getTransporter();
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    if (!transporter || !from || !user?.email) {
      return;
    }

    const isPromoted = mode === "promoted";
    const subject = isPromoted
      ? "[Uni Sport Hub] You Have Been Promoted to Selector"
      : "[Uni Sport Hub] Selector Account Created";
    const headline = isPromoted
      ? "You are now a Selector"
      : "Your Selector account is ready";
    const body = isPromoted
      ? "An administrator has promoted your approved coach account to selector."
      : "An administrator has created your selector account in Uni Sport Hub.";
    const nextStep = "Sign in and access the Selector Dashboard to review coach requests.";

    const text = [
      `Hello ${user.name || "User"},`,
      "",
      headline,
      body,
      "",
      "Role: Selector",
      "",
      `Next step: ${nextStep}`,
      "",
      "Uni Sport Hub",
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; margin:0; padding:24px;">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden;">
          <div style="background:linear-gradient(90deg,#0f766e,#2563eb); padding:16px 20px; color:#ffffff;">
            <h2 style="margin:0; font-size:18px;">Uni Sport Hub</h2>
            <p style="margin:6px 0 0; font-size:12px; opacity:.95;">Role Update Notification</p>
          </div>
          <div style="padding:20px;">
            <p style="margin:0 0 12px;">Hello ${user.name || "User"},</p>
            <h3 style="margin:0 0 10px; font-size:18px; color:#0f172a;">${headline}</h3>
            <p style="margin:0 0 12px; color:#334155;">${body}</p>
            <div style="display:inline-block; border:1px solid #cbd5e1; border-radius:999px; padding:6px 12px; font-size:12px; font-weight:700; color:#0f172a; background:#f8fafc;">
              Role: Selector
            </div>
            <p style="margin:14px 0 0; color:#334155;"><strong>Next step:</strong> ${nextStep}</p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from,
      to: user.email,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("Role update email failed:", error.message);
  }
};

module.exports = { sendRegistrationStatusEmail, sendSelectorRoleEmail };
