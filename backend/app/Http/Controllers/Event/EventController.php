<?php

namespace App\Http\Controllers\Event;

use Response;
use Validator;
use App\Models\Event;
use Illuminate\Http\Request;
use App\Http\Requests\EventRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use App\Contracts\Services\Event\EventServiceInterface;

class EventController extends Controller
{
    /**
     * event interface
     */
    private $eventInterface;

    /**
     * Class Constructor
     * @param eventService
     * @return
     */
    public function __construct(EventServiceInterface $eventServiceInterface)
    {
        $this->eventInterface = $eventServiceInterface;
    }

    /**
     * Get All events.
     * @return Response
     */
    public function getAllEventList()
    {
        $event = $this->eventInterface->getAllEventList();
        return response()->json($event, 200);
    }

    /**
     * Get Top Event
     * @return Response
     */
    public function getTopEvent()
    {
        $event = $this->eventInterface->getTopEventList();
        return response()->json($event, 200);
    }

    /**
     * Get Previous Event
     * @return Response
     */
    public function getPreviousEvent()
    {
        $event = $this->eventInterface->getPreviousEventList();
        return response()->json($event, 200);
    }

    /**
     * Get Event By Id
     *
     * @param Integer $id
     * @return Response
     */
    public function getEventById($id)
    {
        $event = $this->eventInterface->getEventById($id);
        return response()->json($event, 200);
    }

    public function deleteEventById($id)
    {
        $event = $this->eventInterface->deleteEvent($id);
        return response()->json(['message' => 'Event is successfully deleted!', 'event' => $event]);
    }

    /**
     * Create Event
     * @param Request $request
     * @return void
     */
    public function createEvent(EventRequest $request)
    {
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->file('image')->extension();
            $request->file('image')->move(storage_path('app/public/events'), $imageName);
        }
        $event = Event::create([
            'event_name' => $request->event_name,
            'description' => $request->description,
            'from_date' => $request->from_date,
            'to_date' => $request->to_date,
            'from_time' => $request->from_time,
            'to_time' => $request->to_time,
            'status' => $request->status,
            'image' => trim('storage/events/'.$imageName),
            'address' => $request->address,
            'approved_by_user_id' => $request->approved_by_user_id ?? 1,
        ]);
        return response()->json(['message' => 'New Event is successfully created!', 'event' => $event]);
    }

    /**
     * Update Event
     *
     * @param Request $request
     * @return Response
     */
    public function updateEvent(EventRequest $request, int $id)
    {
        $param = [
            'event_name' => $request->event_name,
            'description' => $request->description,
            'from_date' => $request->from_date,
            'to_date' => $request->to_date,
            'from_time' => $request->from_time,
            'to_time' => $request->to_time,
            'status' => $request->status,
            'address' => $request->address,
            'approved_by_user_id' => $request->approved_by_user_id ?? 1,
        ];
        if ($request->file('image')) {
          $event = Event::where('id',$id)->first();
          if (File::exists(storage_path('app/public/events/') . $event->image)) {
              File::delete(storage_path('app/public/events/') . $event->image);
          }
          $imageName = time() . '.' . $request->file('image')->extension();
          // Storage Folder
          $request->image->move(storage_path('app/public/events/'), $imageName);

          $param['image'] = trim('storage/events/'.$imageName);
        }
        $event = Event::where('id', $id)->update($param);
        return response()->json(['message' => 'Event is successfully updated!', 'event' => $event]);
    }

    /**
     * Event info
     *
     * @param Request $request
     * @return void
     */
    private function eventInfo($request)
    {
        $eventInfoObj = new \stdClass();
        $eventInfoObj->event_name  = trim($request->event_name);
        $eventInfoObj->description  = trim($request->description);
        $eventInfoObj->from_date = trim($request->from_date);
        $eventInfoObj->to_date = trim($request->from_date);
        $eventInfoObj->from_time = trim($request->from_time);
        $eventInfoObj->to_time = trim($request->to_time);
        $eventInfoObj->status = trim($request->status);
        $eventInfoObj->approved_by_user_id = trim($request->approved_by_user_id);
        $eventInfoObj->address = trim($request->address);
        if ($request->file('image')) {
            $file = $request->file('image');
            $fileName = 'event-' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('public/events', $fileName);
            $eventInfoObj->image = trim($path);
        }
        return $eventInfoObj;
    }

    /**
     * Validate Event
     *
     * @param Request $request
     * @return Obj
     */
    private function validateEvent(Request $request)
    {
        return $validator = Validator::make($request->all(), [
            'event_name' => 'required',
            'from_date' => 'required',
            'to_date' => 'required',
            'from_time' => 'required',
            'to_time' => 'required',
            'status' => 'required',
            'address' => 'required',
            'image' => 'required',
        ]);
    }
}
