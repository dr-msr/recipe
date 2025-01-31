import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import YouTubeVideoId from 'youtube-video-id';

export async function POST(request: Request) {
  const { video_url } = await request.json();

  if (!video_url) {
    return NextResponse.json({ error: 'video_url is required' }, { status: 400 });
  }

  const video_id = YouTubeVideoId(video_url);
  const prisma = new PrismaClient()

  try {
	const existingID = await prisma.listings.findFirst({
		where: {
			video_id: video_id
		}
	})
	if (existingID) {
		await prisma.listings.update({
			where: { id: existingID.id },
			data: {
				views: existingID.views + 1,
			},
		  })
		return NextResponse.json(existingID.data);
  }	else {
	try {
		const response = await fetch('https://api.drmsr.link/extract_recipe', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ video_url }),
		});
	
		if (!response.ok) {
		  throw new Error('Failed to fetch recipe data');
		}
	
		const data = await response.json();

		if (data.agent_response.ingredients.length == 0 || data.agent_response.steps.length == 0) {
			return NextResponse.json({ error: 'No recipe data found' }, { status: 400 });
		} else {
			await prisma.listings.create({
				data: {
				  video_id: video_id,
				  data: data,
				  views: 1
				}
			  })

		}

		return NextResponse.json(data);

		
	  } catch (error) {
		return NextResponse.json({ error: (error as any).message }, { status: 500 });
	  }

 
}
  }
  catch (error) {
	return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }	
}
