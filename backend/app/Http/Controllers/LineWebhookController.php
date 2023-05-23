<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\LineBotService as LINEBot;
use Illuminate\Http\Request;
use LINE\LINEBot\HTTPClient\CurlHTTPClient;
use LINE\LINEBot\MessageBuilder\TemplateBuilder\ButtonTemplateBuilder;
use LINE\LINEBot\MessageBuilder\TemplateBuilder\ConfirmTemplateBuilder;
use LINE\LINEBot\MessageBuilder\TemplateMessageBuilder;
use LINE\LINEBot\TemplateActionBuilder\MessageTemplateActionBuilder;
use LINE\LINEBot\TemplateActionBuilder\UriTemplateActionBuilder;

class LineWebhookController extends Controller
{

    public function message(Request $request)
    {
        $httpClient = new CurlHTTPClient(config('services.line.message.channel_token'));
        $bot = new LINEBot($httpClient, ['channelSecret' => config('services.line.message.channel_secret')]);
        $data = $request->all();
        if ($data['events'] ?? null) {
            $events = $data['events'];
            foreach ($events as $event) {
                if ($event['message']['text'] == 'I attended') {
                    $bot->replyText($event['replyToken'], 'Thank You I will call back later!');
                } else if ($event['message']['text'] == 'I do not attended') {
                    $bot->replyText($event['replyToken'], 'OK bro next time!');
                } else {
                    $bot->replyText($event['replyToken'], $event['message']['text']);
                }
            }
            return;
        }
        $uriTemplateActionBuilder1 = new UriTemplateActionBuilder(
            $request->event_name . ' url',
            'http://localhost:3000/admin/events'
        );
        $messageTemplateActionBuilder1 = new MessageTemplateActionBuilder(
            'YES',
            'I attended'
        );
        $messageTemplateActionBuilder2 = new MessageTemplateActionBuilder(
            'NO',
            'I do not attended'
        );
        $confirmTemplateBuilder = new ConfirmTemplateBuilder(
            $request->event_name . ' Event Comfirm',
            [
                $messageTemplateActionBuilder1,
                $messageTemplateActionBuilder2,
            ]
        );
        $buttonTemplateBuilder = new ButtonTemplateBuilder(
            $request->event_name,
            $request->description,
            $request->image ? 'https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE=' : 'https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE=',
            [
                $uriTemplateActionBuilder1,
            ]
        );
        $templateMessageBuilder = new TemplateMessageBuilder(
            'Event Notification Alert',
            $buttonTemplateBuilder
        );
        $comfirmMessageBuilder = new TemplateMessageBuilder(
            'Comfirm Event Notification Alert',
            $confirmTemplateBuilder
        );
        $responses = $bot->pushMessage('U79ccb3b5e0658a84f1524fe7aedf1661', $templateMessageBuilder);
        $responses = $bot->pushMessage('U79ccb3b5e0658a84f1524fe7aedf1661', $comfirmMessageBuilder);
        info($responses->getHTTPStatus() . ' ' . $responses->getRawBody());
        return redirect()->back();
    }
}
