export interface ContactData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

export function buildContactEmail(
  data: ContactData,
  subjectPrefix: string,
  submittedAt = new Date(),
): { subject: string; html: string; text: string } {
  const submitted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(submittedAt);
  const subject = `${subjectPrefix} — ${data.name}`;
  const fields = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Message", data.message],
    ["Submitted", submitted],
  ];
  const htmlFields = fields.map(([label, value]) =>
    `<tr><th align="left" valign="top" style="padding:12px 20px 4px;color:#0d3f53;font-size:14px">${label}</th></tr>` +
    `<tr><td style="padding:0 20px 12px;overflow-wrap:anywhere;font-size:16px">${escapeHtml(value).replace(/\r?\n/g, "<br>")}</td></tr>`
  ).join("");

  return {
    subject,
    html: `<!doctype html><html><body style="margin:0;background:#fbf6ee;color:#172129;font-family:Arial,sans-serif;line-height:1.5"><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;margin:24px auto;background:#fff;border:1px solid #d7c6a9"><tr><td style="padding:20px;background:#0d3f53;color:#fff;font-size:20px;font-weight:bold">Website Contact Submission</td></tr><tr><td><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%">${htmlFields}</table></td></tr><tr><td style="padding:16px 20px;border-top:1px solid #d7c6a9;color:#655c53;font-size:13px">Submitted through the website contact form.</td></tr></table></body></html>`,
    text: `Website Contact Submission\n\n${fields.map(([label, value]) => `${label}:\n${value}`).join("\n\n")}\n\n---\nSubmitted through the website contact form.`,
  };
}
