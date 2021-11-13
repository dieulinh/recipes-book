import { Controller, Get, Post, Body, Param, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDTO } from './dto/create-recipe.dto';
import { GetRecipesFilterDTO } from './dto/get-recipes-filter.dto';

@Controller('recipe')
export class RecipeController {
   constructor(private recipeService: RecipeService) { }

   //  // add a recipe
   // @Post('/create')
   @UsePipes(ValidationPipe)
   // async addRecipe(@Body() createRecipeDTO: CreateRecipeDTO) {
   //      const recipe = await this.recipeService.addRecipe(createRecipeDTO);
   //      return recipe;
   //  }
   // Retrieve recipes list
    @Get('recipes')
    async getRecipes(@Query(ValidationPipe) filterDTO: GetRecipesFilterDTO) {
      if (Object.keys(filterDTO).length) {
        const filteredRecipes = await this.recipeService.getFilteredRecipes(filterDTO);
        return filteredRecipes;
      } else {
        const allRecipes = await this.recipeService.getAllRecipes();
        return allRecipes;
      }

    }
}
