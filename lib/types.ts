export type Ingredient = {
	amount: string;  // The quantity of the ingredient
	unit: string;    // The unit of measurement
	item: string;    // The name of the ingredient
	notes?: string;  // Any special notes about the ingredient
  };
  
export type Step = {
	instruction: string;  // The cooking instruction
	duration?: string;    // Time required for this step
	temperature?: string; // Cooking temperature, if applicable
	tips?: string;        // Any tips or warnings for this step
  };
  
export type Recipe = {
	recipe_name: string;               // The name of the recipe
	chef: string;                      // The name of the chef/cook
	description: string;               // A brief description of the dish and its characteristics
	prep_time?: string;                // Total preparation time
	cook_time?: string;                // Total cooking time
	servings?: number;                 // Number of servings
	ingredients: Ingredient[];         // List of ingredients
	steps: Step[];                     // Detailed step-by-step cooking instructions
	equipment: string[];               // List of kitchen equipment and tools needed
	tips: string[];                    // General cooking tips and tricks
	difficulty_level?: string;         // Difficulty level of the recipe (e.g., Easy, Medium, Hard)
	cuisine_type?: string;             // Type of cuisine (e.g., Italian, Mexican, Japanese)
	dietary_info: string[];            // Dietary information (e.g., Vegetarian, Vegan, Gluten-free)
  };
  
// Remove the import statement for 'Date'

export type Data = {
	id: string,
	url: string,
	dateAdded: Date,
	status: "pending" | "completed" | "failed",
	result: Recipe
}