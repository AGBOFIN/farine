<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $ingredients = Ingredient::all();
            // Decode benefits for each ingredient
            $ingredients->transform(function ($ingredient) {
                $ingredient->benefits = json_decode($ingredient->benefits, true);
                return $ingredient;
            });
            return response()->json($ingredients);
        } catch (\Exception $e) {
            // Return empty array if database connection fails or table doesn't exist
            return response()->json([], 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'benefits' => 'required|array',
            'image_url' => 'nullable|string',
        ]);

        $validated['benefits'] = json_encode($validated['benefits']);
        $ingredient = Ingredient::create($validated);
        return response()->json($ingredient, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $ingredient = Ingredient::find($id);
        if (!$ingredient) {
            return response()->json(['message' => 'Ingredient not found'], 404);
        }
        $ingredient->benefits = json_decode($ingredient->benefits, true);
        return response()->json($ingredient);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ingredient = Ingredient::find($id);
        if (!$ingredient) {
            return response()->json(['message' => 'Ingredient not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'benefits' => 'sometimes|array',
            'image_url' => 'nullable|string',
        ]);

        if (isset($validated['benefits'])) {
            $validated['benefits'] = json_encode($validated['benefits']);
        }

        $ingredient->update($validated);
        $ingredient->benefits = json_decode($ingredient->benefits, true);
        return response()->json($ingredient);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ingredient = Ingredient::find($id);
        if (!$ingredient) {
            return response()->json(['message' => 'Ingredient not found'], 404);
        }

        $ingredient->delete();
        return response()->json(['message' => 'Ingredient deleted successfully']);
    }
}
