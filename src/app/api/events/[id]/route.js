import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import fs from 'fs/promises'
import path from 'path'

// Helper pour les réponses d'erreur
function errorResponse(message, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

// GET - Récupérer un événement spécifique
export async function GET(request, { params }) {
  try {
    if (!params?.id || isNaN(params.id)) {
      return errorResponse('ID invalide', 400)
    }

    const event = await prisma.event.findUnique({
      where: { id: Number(params.id) }
    })

    if (!event) {
      return errorResponse('Événement non trouvé', 404)
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('[GET EVENT ERROR]', error)
    return errorResponse('Erreur serveur', 500)
  }
}

// DELETE - Supprimer un événement
export async function DELETE(request, { params }) {
  try {
    if (!params?.id || isNaN(params.id)) {
      return errorResponse('ID invalide', 400)
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id: Number(params.id) }
    })

    if (!existingEvent) {
      return errorResponse('Événement non trouvé', 404)
    }

    // Supprimer l'image associée si elle existe
    if (existingEvent.imageUrl && !existingEvent.imageUrl.includes('default-event.jpg')) {
      const filePath = path.join(process.cwd(), 'public', existingEvent.imageUrl)
      await fs.unlink(filePath).catch(console.error)
    }

    // Supprimer l'événement de la base de données
    await prisma.event.delete({
      where: { id: Number(params.id) }
    })

    return NextResponse.json(
      { message: 'Événement supprimé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[DELETE EVENT ERROR]', error)
    return errorResponse('Échec de la suppression', 500)
  }
}


// PUT - Modifier un événement
export async function PUT(request, { params }) {
  try {
    // Validation de l'ID
    if (!params?.id || isNaN(params.id)) {
      return NextResponse.json(
        { error: 'ID d\'événement invalide' },
        { status: 400 }
      )
    }

    const formData = await request.formData()
    const existingEvent = await prisma.event.findUnique({
      where: { id: Number(params.id) }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Événement non trouvé' },
        { status: 404 }
      )
    }

    // Gestion de l'image
    let imageUrl = existingEvent.imageUrl
    const imageFile = formData.get('image')

    if (imageFile && imageFile.size > 0) {
      // Supprimer l'ancienne image si elle existe
      if (existingEvent.imageUrl && !existingEvent.imageUrl.includes('default-event.jpg')) {
        const oldFilePath = path.join(process.cwd(), 'public', existingEvent.imageUrl)
        await fs.unlink(oldFilePath).catch(console.error)
      }

      // Enregistrer la nouvelle image
      const uploadDir = path.join(process.cwd(), 'public', 'uploads')
      await fs.mkdir(uploadDir, { recursive: true })
      
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const filename = `event-${uniqueSuffix}-${imageFile.name}`
      const filePath = path.join(uploadDir, filename)
      
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await fs.writeFile(filePath, buffer)
      
      imageUrl = `/uploads/${filename}`
    }

    // Mettre à jour l'événement
    const updatedEvent = await prisma.event.update({
      where: { id: Number(params.id) },
      data: {
        title: formData.get('title'),
        date: new Date(formData.get('date')),
        location: formData.get('location'),
        description: formData.get('description'),
        imageUrl: imageUrl
      }
    })

    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error('[UPDATE EVENT ERROR]', error)
    return NextResponse.json(
      { error: 'Échec de la mise à jour' },
      { status: 500 }
    )
  }
}

// Configuration pour éviter le cache
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'