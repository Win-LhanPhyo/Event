<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use BotMan\BotMan\BotMan;

class SkypeMessageController extends Controller
{
    // public function message(Request $request)
    // {   
    //     // Compose the message payload
    //     $messagePayload = [
    //         'type' => 'message',
    //         'from' => [
    //             'id' => 'f462d70b-26b8-4641-a21f-e108a0638f02',
    //         ],
    //         'recipient' => [
    //             'id' => 'skype:live:.cid.47b93bdf06673b7b',
    //         ],
    //         'text' => 'Hello, this is an automated message from the bot.',
    //     ];

    //     // Set the request headers
    //     $headers = [
    //         'Content-Type: application/json',
    //         'Authorization: Bearer {2Fe%-bkW}',
    //     ];
        
    //     // Convert the payload to JSON
    //     $jsonPayload = json_encode($messagePayload);
        
    //     $ch = curl_init();
    //     curl_setopt($ch, CURLOPT_URL, 'https://smba.trafficmanager.net/apis/v3/conversations');
    //     curl_setopt($ch, CURLOPT_POST, 1);
    //     curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonPayload);
    //     curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //     $response = curl_exec($ch);
    //     info($response);
    //     curl_close($ch);
        
    //     // if ($response) {
    //     //     $responseData = json_decode($response, true);
        
    //     //     // Use the conversation ID in further interactions with the user
    //     //     echo 'Conversation ID:';
    //     // } else {
    //     //     // Error occurred
    //     //     echo 'Failed to initiate conversation.';
    //     // }
    // }

    public function message(Request $request)
    {
        // Check if the approval condition is met
        if ($request->message) {
            $this->sendMessageToSkype('Your friend has approved.');

            // Add any other logic you need after the approval is sent
        }
    }

    private function sendMessageToSkype($message)
    {
        // Create a new BotMan instance with the Skype driver
        $botman = app('botman');

        // Send the message to your friend's Skype account
        $botman->say($message, 'live:.cid.1ed9002627da4bb3', 'skype');
    }
}
