import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'


export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }
    })
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}


export async function POST(request) {
  try {
    const formData = await request.formData()
    
    // Gestion du fichier image
    const imageFile = formData.get('image')
    let imageUrl = '/images/default-event.jpg' // Image par défaut
    
    if (imageFile) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }
      
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const filename = `event-${uniqueSuffix}-${imageFile.name}`
      const filePath = path.join(uploadDir, filename)
      
      // Convertir le fichier en buffer et l'écrire
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await fs.promises.writeFile(filePath, buffer)
      
      imageUrl = `/uploads/${filename}`
    }

    // Créer l'événement dans la base de données
    const event = await prisma.event.create({
      data: {
        title: formData.get('title'),
        date: new Date(formData.get('date')),
        location: formData.get('location'),
        description: formData.get('description'),
        imageUrl: imageUrl
      }
    })
    
    return NextResponse.json(event, { status: 201 })
    
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { message: 'Erreur lors de la création' },
      { status: 500 }
    )
  }
}