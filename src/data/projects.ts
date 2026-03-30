export interface ProjectTheme {
  primary: string;
  secondary: string;
  light: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  screenshots?: string[];
  technologies: string[];
  theme: ProjectTheme;
}

export const projects: Project[] = [
  {
    id: "simec",
    title: "SIMEC",
    shortDescription: "Sistema Central de Agendamentos",
    fullDescription: "O projeto foi desenvolvido pelo grupo Eficiência e tem como objetivo facilitar o agendamento de consultas e exames para os cidadãos de Juazeiro do Norte. Ele oferece uma interface intuitiva e recursos avançados para agendar e gerenciar os atendimentos.",
    image: "/Logo-Vertical2.svg",
    screenshots: ["/screenshots/paginaSIMEC.png"],
    technologies: ["Gestão", "Organização", "Colaboração"],
    theme: {
      primary: "bg-blue-600",
      secondary: "text-blue-300",
      light: "bg-blue-50"
    }
  },
  {
    id: "simad",
    title: "SIMAD",
    shortDescription: "Sistema Integrado de Administração",
    fullDescription: "Descrição longa do SIMAD",
    image: "/Logo-Horizontal.svg",
    screenshots: [],
    technologies: ["Gestão", "Organização", "Colaboração"],
    theme: {
      primary: "bg-emerald-600",
      secondary: "text-emerald-600",
      light: "bg-emerald-50"
    }
  },
  {
    id: "simed",
    title: "SIMED",
    shortDescription: "Sistema Integrado de Monitoramento",
    fullDescription: "Descrição longa do SIMED",
    image: "/Logo-Horizontal.svg",
    screenshots: [],
    technologies: ["Gestão", "Organização", "Colaboração"],
    theme: {
      primary: "bg-amber-600",
      secondary: "text-amber-600",
      light: "bg-amber-50"
    }
  }
];
