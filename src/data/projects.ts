export interface ProjectTheme {
  primary: string;
  secondary: string;
  light: string;
}

export interface Collaborator {
  name: string;
  role: string;
  image?: string;
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

export const collaborators: Collaborator[] = [
  { name: "João Gabriel", role: "Desenvolvedor", image: "" },
  { name: "Maria Clara", role: "Designer UI/UX", image: "" }
];

export const projects: Project[] = [
  {
    id: "simec",
    title: "SIMEC",
    shortDescription: "Sistema Central de Agendamentos",
    fullDescription: "O projeto foi desenvolvido pelo grupo Eficiência e tem como objetivo facilitar o agendamento de consultas e exames para os cidadãos de Juazeiro do Norte. Ele oferece uma interface intuitiva e recursos avançados para agendar e gerenciar os atendimentos. O sistema de agendamento de consultas e exames, SIMEC, oferece suporte 9 horas por dia, de segunda-feira a sexta-feira, garantindo que as secretarias de saúde, PSFs, clínicas e laboratórios (que possuem parceria com a prefeitura) tenham o apoio necessário a qualquer momento. Nossa equipe está sempre disponível para auxiliar na gestão do sistema, solucionando dúvidas e garantindo o bom funcionamento das operações.",
    image: "/Logo-Vertical2.svg",
    screenshots: ["/screenshots/paginaSIMEC.png", "/screenshots/paginaSIMEC.png", "/screenshots/paginaSIMEC.png"],
    technologies: ["Gestão", "Organização", "Colaboração"],
    theme: {
      primary: "bg-blue-600",
      secondary: "text-blue-300",
      light: "bg-blue-50"
    },
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
