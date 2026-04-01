const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('senha123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'admin@programa.com' },
    update: {},
    create: {
      email: 'admin@programa.com',
      name: 'Administrador',
      password: hashedPassword,
    },
  })
  console.log('User created:', user.email)
}

main().finally(() => prisma.$disconnect())
