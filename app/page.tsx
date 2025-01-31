'use client'

import Image from 'next/image'
import Link from 'next/link'
import ExpandingArrow from '@/components/expanding-arrow'
import Uploader from '@/components/uploader'
import { Toaster } from '@/components/toaster'
import { useEffect, useState } from 'react'
import { Data, Recipe } from '@/lib/types'
import YouTubeVideoId from 'youtube-video-id'
import RecipeCard from '@/components/recipe-card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { Badge } from '@/components/ui/badge'



export default function Home() {
	const [data, setData] = useState<Data[]>([])
	const [videoUrl, setVideoUrl] = useState('');
	const [recipeData, setRecipeData] = useState<Data | null>(null);
	const [loading, setLoading] = useState(false);	
	const [activeTab, setActiveTab] = useState('get-recipe');





	


	const handleSubmit = async (e: React.FormEvent) => {
		var urlRegex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;
	
		setLoading(true);
		e.preventDefault();
		setRecipeData(null);

		if (!videoUrl || !urlRegex.test(videoUrl)) {
			toast.error('Please enter a YouTube video URL')
			setVideoUrl('');
			return;
		}

		const video_id = YouTubeVideoId(videoUrl);

		const recipeExist = data.find((d) => d.id === video_id);
		if (recipeExist) {
			setRecipeData(recipeExist);
			toast.success('Resepi telah ada!');
			setActiveTab(video_id);
			setVideoUrl('');
			return;
		} else {
			toast('Mencari resepi...',{removeDelay: 2000, duration: 15000})
			try {
				const response = await fetch('/api/getRecipe', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ video_url: videoUrl }),
				});
	
				if (!response.ok) {
					toast.error('Resepi tidak dapat dianalisis');
					setVideoUrl('');
					setLoading(false);
				} else {
					const result = await response.json();
					const newRecipe: Recipe = result.agent_response
					console.log(newRecipe)
					const newData: Data = {
						id: video_id,
						url: videoUrl,
						dateAdded: new Date(),
						status: 'completed',
						result: newRecipe,
					};
		
					addData(newData);
					setRecipeData(newData);
	
					toast.success('Resepi dijumpai!');
					setActiveTab(video_id);
					setVideoUrl('');
					setLoading(false);

				}
	
			
	
			} catch (err) {
				toast.error('An error occurred while fetching the recipe');
				setVideoUrl('');
				setLoading(false);
			}
		}
	};



	const addData = (newData: Data) => {
		const existingData = JSON.parse(localStorage.getItem('data') || '[]');
		const updatedData = [...existingData, newData];
		localStorage.setItem('data', JSON.stringify(updatedData));
		setData(updatedData);
	}

	const delData = (data: Data) => {
		const existingData = JSON.parse(localStorage.getItem('data') || '[]');
		const updatedData = existingData.filter((d: Data) => d.id !== data.id);
		localStorage.setItem('data', JSON.stringify(updatedData));
		setData(updatedData);
		setRecipeData(null); // Reset the recipe data state
		toast.success('Recipe deleted successfully')
	}

	useEffect(() => {
		const data = localStorage.getItem('data')
		if (data) {
			const parsedData = JSON.parse(data)
			console.log(parsedData)
			setData(parsedData)
		}
	}, [])

	useEffect(() => {
		if (recipeData) {
			console.log(recipeData)
		}
	}, [recipeData])

	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center">
			<Toaster />
			<Badge className="mt-2">v0.1</Badge>
			
			
			<h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
				YouResepi
			</h1>
			<div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
			<Accordion type="single" collapsible className="w-full" defaultValue='get-recipe' onValueChange={setActiveTab} value={activeTab}>
      <div className="border solid p-2">
        <div className="text-center text-md p-2" >Dapatkan Resepi Dari Video Youtube!</div>
        <div>
					<div className="w-full px-2 flex flex-col justify-center items-center gap-2">
					<Input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required placeholder="Masukkan alamat URL Video Youtube" />
					<Button disabled={loading} variant="outline"onClick={handleSubmit}>Hantar</Button>

					</div>

        </div>
      </div>

	  {data && data.length > 0 && data.map((d) => (
				<AccordionItem key={d.id} value={d.id}>
					<AccordionTrigger className="border solid px-2 mt-2">{d.result.recipe_name} by {d.result.chef}</AccordionTrigger>
					<AccordionContent >
						<div className="w-full flex flex-col my-2 gap-2">
							<div className="w-full flex flex-row justify-center gap-2">
							<Badge>Wasap</Badge>
							<Badge>Cetak</Badge>

							<Badge>Bintang</Badge>
							<Badge onClick={() => delData(d)} variant="destructive">Padam</Badge>

							</div>
						<RecipeCard videoId={d.id} recipe={d.result} />
						</div>

					</AccordionContent>
				</AccordionItem>
			))}
    </Accordion>
	
			</div>
		</main>
	)
}
