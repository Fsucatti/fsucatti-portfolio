/** Contact form: validation comes from the HTML attributes, sending goes through EmailJS. */
const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

export function setupContactForm(form: HTMLFormElement): void {
  const status = form.querySelector<HTMLElement>("[data-status]")!;
  const button = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
  const fallbackEmail = form.dataset.email;

  const showStatus = (message: string, ok: boolean) => {
    status.textContent = message;
    status.hidden = false;
    status.className = ok
      ? "rounded-lg border border-green-400/50 bg-green-500/20 p-3 text-center text-sm text-green-200"
      : "rounded-lg border border-red-400/50 bg-red-500/20 p-3 text-center text-sm text-red-200";
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Bots tend to fill the hidden field. Pretend it worked and send nothing.
    if (new FormData(form).get("company")) {
      form.reset();
      showStatus("Message sent. Thanks!", true);
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      showStatus(`The form is unavailable right now. Please email ${fallbackEmail}.`, false);
      return;
    }

    button.disabled = true;
    button.textContent = "Sending...";
    status.hidden = true;

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
      form.reset();
      showStatus("Message sent. Thanks!", true);
    } catch (error) {
      console.error("Contact form failed", error);
      showStatus(`The message could not be sent. Please try again or email ${fallbackEmail}.`, false);
    } finally {
      button.disabled = false;
      button.textContent = "Send Message";
    }
  });
}
