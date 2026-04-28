/**
 * Trellis project configuration
 * Edit this file to customize your project's brand identity.
 * Changes here will be reflected across docs, slides, and landing page.
 */
export default {
  components: {
    docs: true,
    slides: true,
    landing: false,
  },
  infra: {
    docker: false,
    cloudflare: true,
  },
  brand: "Trifork",
  projectName: "mainframe-playbook",
  title: "Mainframe Playbook",
  tagline: "Built with Trellis",
  colors: {
    primary: "#2C3A41",
    accent: "#e87722",
    accentDark: "#cc6415",
    bgStart: "#E5E5E5",
    bgEnd: "#D2E2EA",
    textLight: "#6B7280",
    textMuted: "#9CA3AF",
  },
  font: {
    family: "Poppins",
    weights: [300, 400, 500, 600, 700, 800],
  },
};
