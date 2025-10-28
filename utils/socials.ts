import {
  BehanceLogoIcon,
  Browser,
  EnvelopeIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MediumLogoIcon,
} from "@phosphor-icons/react";

const links = {
  website: "http://ultimatemercer.com",
  email: "juliancunha2010@gmail.com",
  github: "https://github.com/UltimateMercer",
  linkedin: "https://www.linkedin.com/in/ultimatemercer/",
  behance: "https://www.behance.net/ultimatemercer",
  medium: "https://medium.com/@ultimatemercer",
  instagram: "",
};

export const socials = [
  // {
  //   name: "Website",
  //   link: links.website,
  //   icon: Browser,
  //   printable: false,
  // },
  {
    name: "Email",
    link: links.email,
    icon: EnvelopeIcon,
    printable: true,
  },
  {
    name: "Github",
    link: links.github,
    icon: GithubLogoIcon,
    printable: true,
  },
  {
    name: "Linkedin",
    link: links.linkedin,
    icon: LinkedinLogoIcon,
    printable: true,
  },
  {
    name: "Behance",
    link: links.behance,
    icon: BehanceLogoIcon,
    printable: false,
  },
  {
    name: "Medium",
    link: links.medium,
    icon: MediumLogoIcon,
    printable: false,
  },
  {
    name: "Instagram",
    link: links.instagram,
    icon: InstagramLogoIcon,
    printable: false,
  },
];
