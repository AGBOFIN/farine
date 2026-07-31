<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(ContactMessage::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'nullable|string|max:255|regex:/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/',
                'message' => 'required|string',
                'is_read' => 'sometimes|boolean',
            ]);

            $contactMessage = ContactMessage::create($validated);
            return response()->json([
                'success' => true,
                'message' => 'Message sent successfully',
                'data' => $contactMessage
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send message: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $contactMessage = ContactMessage::find($id);
        if (!$contactMessage) {
            return response()->json(['message' => 'Contact message not found'], 404);
        }
        return response()->json($contactMessage);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $contactMessage = ContactMessage::find($id);
        if (!$contactMessage) {
            return response()->json(['message' => 'Contact message not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255',
            'phone' => 'nullable|string|max:255|regex:/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/',
            'message' => 'sometimes|string',
            'is_read' => 'sometimes|boolean',
        ]);

        $contactMessage->update($validated);
        return response()->json($contactMessage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $contactMessage = ContactMessage::find($id);
        if (!$contactMessage) {
            return response()->json(['message' => 'Contact message not found'], 404);
        }

        $contactMessage->delete();
        return response()->json(['message' => 'Contact message deleted successfully']);
    }
}
