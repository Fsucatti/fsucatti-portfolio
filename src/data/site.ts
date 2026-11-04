/** Personal details and navigation. Edit here; every page reads from this file. */
export const site = {
  name: "Francisco Sucatti",
  role: "Full-Stack Developer & Creator",
  description:
    "Francisco Sucatti is a full-stack developer from Buenos Aires building clean, responsive, and interactive web apps.",
  location: "Argentina, Buenos Aires (CABA)",
  email: "fsucatti@gmail.com",
  github: "https://github.com/Fsucatti",
  linkedin: "https://www.linkedin.com/in/fsucatti",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13135.63932453793!2d-58.43708875!3d-34.608418349999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb7f5dcf6f3f%3A0x9a58c7f2f436c2e6!2sBuenos%20Aires%20City%20Autonomous%20Capital%20Federal!5e0!3m2!1sen!2sar!4v1700000000000!5m2!1sen!2sar",
} as const;

export const navigation = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/about", label: "About", icon: "user" },
  { href: "/projects", label: "Projects", icon: "folder" },
  { href: "/contact", label: "Contact", icon: "mail" },
] as const;
