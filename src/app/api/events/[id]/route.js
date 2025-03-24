import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'


export async function PUT(request, { params }) {
  try {
    const data = await request.json()
    const updatedEvent = await prisma.event.update({
      where: { id: Number(params.id) },
      data: {
        title: data.title,
        date: new Date(data.date),
        location: data.location,
        description: data.description,
        imageUrl: data.imageUrl
      }
    })
    return NextResponse.json(updatedEvent)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.event.delete({
      where: { id: Number(params.id) }
    })
    return NextResponse.json(null, { status: 204 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}

import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: Number(params.id) }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Événement non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}