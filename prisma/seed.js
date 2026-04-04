const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const collaborators = [
  { name: "João Gabriel", role: "Desenvolvedor", image: "" },
  { name: "Maria Clara", role: "Designer UI/UX", image: "" }
];

const projects = [
  {
    title: "SIMEC",
    shortDescription: "Sistema Central de Agendamentos",
    fullDescription: "O projeto foi desenvolvido pelo grupo Eficiência e tem como objetivo facilitar o agendamento de consultas e exames para os cidadãos de Juazeiro do Norte. Ele oferece uma interface intuitiva e recursos avançados para agendar e gerenciar os atendimentos. O sistema de agendamento de consultas e exames, SIMEC, oferece suporte 9 horas por dia, de segunda-feira a sexta-feira, garantindo que as secretarias de saúde, PSFs, clínicas e laboratórios (que possuem parceria com a prefeitura) tenham o apoio necessário a qualquer momento. Nossa equipe está sempre disponível para auxiliar na gestão do sistema, solucionando dúvidas e garantindo o bom funcionamento das operações.",
    image: "/Logo-Vertical2.svg",
    technologies: JSON.stringify(["Gestão", "Organização", "Colaboração"]),
    themePrimary: "bg-blue-600",
    themeSecondary: "text-blue-300",
    themeLight: "bg-blue-50"
  },
  {
    title: "SIMAD",
    shortDescription: "Sistema Integrado de Administração",
    fullDescription: "Descrição longa do SIMAD",
    image: "/Logo-Horizontal.svg",
    technologies: JSON.stringify(["Gestão", "Organização", "Colaboração"]),
    themePrimary: "bg-emerald-600",
    themeSecondary: "text-emerald-600",
    themeLight: "bg-emerald-50"
  },
  {
    title: "SIMED",
    shortDescription: "Sistema Integrado de Monitoramento",
    fullDescription: "Descrição longa do SIMED",
    image: "/Logo-Horizontal.svg",
    technologies: JSON.stringify(["Gestão", "Organização", "Colaboração"]),
    themePrimary: "bg-amber-600",
    themeSecondary: "text-amber-600",
    themeLight: "bg-amber-50"
  }
];

const partners = [
  { name: "Prefeitura Municipal", image: "" },
  { name: "Secretaria de Saúde", image: "" }
];

async function main() {
  console.log('Deletando dados antigos...');
  await prisma.projectScreenshot.deleteMany();
  await prisma.project.deleteMany();
  await prisma.collaborator.deleteMany();
  await prisma.partner.deleteMany();

  console.log('Semeando Colaboradores...');
  for (const c of collaborators) {
    await prisma.collaborator.create({ data: c });
  }

  console.log('Semeando Parceiros...');
  for (const p of partners) {
    await prisma.partner.create({ data: p });
  }

  console.log('Semeando Projetos...');
  for (const p of projects) {
    await prisma.project.create({ data: p });
  }

  console.log('✅ Banco de dados populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
