import {
  FaUsers,
  FaMosque,
  FaCrown,
  FaStar,
  FaShieldAlt,
} from "react-icons/fa";

export const SIGNUP_ROLES = [
  {
    id: "community_member",
    title: "Community Member",
    description:
      "Join our Islamic community to access resources, participate in discussions, and connect with fellow Muslims.",
    icon: FaUsers,
    color: "from-green-400 to-green-600",
    permissions: [
      "Access Islamic resources and articles",
      "Join community discussions",
      "Request duas and spiritual support",
      "Attend virtual events",
      "Edit your personal profile",
    ],
  },
  {
    id: "imam",
    title: "Imam",
    description:
      "Lead and guide the community with Islamic knowledge, organize events, and provide spiritual guidance.",
    icon: FaMosque,
    color: "from-teal-400 to-teal-600",
    permissions: [
      "All Community Member privileges",
      "Create and manage community events",
      "Write and publish articles",
      "Moderate community discussions",
      "Remove inappropriate content",
      "Access imam resources and tools",
    ],
  },
  {
    id: "chief_imam",
    title: "Chief Imam",
    description:
      "Provide administrative oversight, manage imam community, and ensure Islamic authenticity across the platform.",
    icon: FaCrown,
    color: "from-yellow-400 to-yellow-600",
    permissions: [
      "All Imam privileges",
      "Manage imam accounts and permissions",
      "Access administrative dashboard",
      "Review and approve imam applications",
      "Moderate platform-wide content",
      "Access detailed community analytics",
    ],
  },
];

export const TRUST_STATS = [
  {
    icon: FaUsers,
    label: "Active Members",
    value: "50,000+",
    color: "text-green-600",
  },
  {
    icon: FaMosque,
    label: "Partner Mosques",
    value: "1,200+",
    color: "text-teal-600",
  },
  {
    icon: FaStar,
    label: "Trust Rating",
    value: "4.9/5",
    color: "text-yellow-500",
  },
  {
    icon: FaShieldAlt,
    label: "Verified Imams",
    value: "500+",
    color: "text-blue-600",
  },
];