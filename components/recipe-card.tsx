import type React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, Users, ChefHat } from "lucide-react"
import { Recipe } from "@/lib/types"


interface RecipeProps {
	videoId: string,
	recipe: Recipe
}

const RecipeCard: React.FC<RecipeProps> = ({ recipe, videoId }) => {

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle className="text-3xl font-bold">{recipe.recipe_name}</CardTitle>
				<CardDescription className="text-lg">
					<span className="flex items-center gap-2">
						<ChefHat className="w-5 h-5" />
						{recipe.chef}
					</span>
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<p className="text-muted-foreground">{recipe.description}</p>

				<div className="flex flex-wrap gap-2">
					<Badge variant="secondary" className="flex items-center gap-2">
						<Clock className="w-4 h-4" />
						Penyediaan: {recipe.prep_time}
					</Badge>
					<Badge variant="secondary" className="flex items-center gap-2">
						<Clock className="w-4 h-4" />
						Ketuk-Ketuk: {recipe.cook_time}
					</Badge>
					<Badge variant="secondary" className="flex items-center gap-2">
						<Users className="w-4 h-4" />
						Berapa Orang Makan: {recipe.servings}
					</Badge>
				</div>

				<Separator />

				<div>
					<h3 className="text-xl font-semibold mb-2">Ingredients</h3>
					<ul className="list-disc list-inside space-y-1">
						{recipe.ingredients.map((ingredient, index) => (
							<li key={index}>
								{ingredient.amount} {ingredient.unit} {ingredient.item}
								{ingredient.notes && <span className="text-muted-foreground"> ({ingredient.notes})</span>}
							</li>
						))}
					</ul>
				</div>

				<Separator />

				<div>
					<h3 className="text-xl font-semibold mb-2">Instructions</h3>
					<ol className="list-decimal list-inside space-y-2">
						{recipe.steps.map((step, index) => (
							<li key={index}>{step.instruction}</li>
						))}
					</ol>
				</div>

				<Separator />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h3 className="text-lg font-semibold mb-2">Equipment</h3>
						<ul className="list-disc list-inside">
							{recipe.equipment.map((item, index) => (
								<li key={index}>{item}</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-2">Tips</h3>
						<ul className="list-disc list-inside">
							{recipe.tips.map((tip, index) => (
								<li key={index}>{tip}</li>
							))}
						</ul>
					</div>
				</div>

				<div className="flex flex-wrap gap-2">
					<Badge>{recipe.difficulty_level}</Badge>
					<Badge>{recipe.cuisine_type}</Badge>
					{recipe.dietary_info.map((info, index) => (
						<Badge key={index} variant="outline">
							{info}
						</Badge>
					))}
				</div>

				<div>
					<h3 className="text-xl font-semibold mb-2">Video Tutorial</h3>
					<div className="aspect-w-16 aspect-h-9">
						<iframe
							src={`https://www.youtube.com/embed/${videoId}`}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="w-full h-full"
						></iframe>
					</div>
					<p className="text-sm text-muted-foreground mt-2">
						Video: {recipe.recipe_name} by {recipe.chef}
					</p>
				</div>
			</CardContent>
			<CardFooter className="text-sm text-muted-foreground">
			</CardFooter>
		</Card>
	)
}

export default RecipeCard

