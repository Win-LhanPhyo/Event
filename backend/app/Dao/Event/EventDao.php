<?php

namespace App\Dao\Event;

use Illuminate\Support\Facades\DB;
use App\Models\Event;
use App\Contracts\Dao\Event\EventDaoInterface;
use Illuminate\Support\Facades\Log;

/**
 * Data accessing object for event
 */
class EventDao implements EventDaoInterface
{

  /**
   * To get event list.
   * @return array $event list.
   */
  public function getAllEventList()
  {
    return DB::transaction(function () {
      $condition = [];
      if (request()->query('name')) {
        array_push($condition, [
          "events.event_name",
          'LIKE',
          '%' . request()->query('name') . '%']);
      }
      if (request()->query('from_date')) {
        array_push($condition, [
          "events.from_date",
          '=',
          request()->query('from_date')]);
      }
      if (request()->query('to_date')) {
        array_push($condition, [
          "events.to_date",
          '=',
          request()->query('to_date')]);
      }
      return Event::select('events.*', 'users.name as username', 'users.email', 'users.role', 'users.dob', 'users.address as user_address', 'users.phone', 'users.profile')->where($condition)->leftJoin('users', 'users.id', '=', 'events.approved_by_user_id')->paginate(request()->query('limit'));
    });
  }

  /**
   * Get Top Event
   * @return Response
   */
  public function getTopEventList()
  {
    return DB::transaction(function () {
      return Event::join('users', 'users.id', '=', 'events.approved_by_user_id')->select('events.*', 'users.name as username', 'users.email', 'users.role', 'users.dob', 'users.address', 'users.phone', 'users.profile')->where('events.to_date', '>', date('Y-m-d'))->paginate(config('constant.pagination_count'));
    });
  }

  /**
   * Get Previous Event
   * @return Response
   */
  public function getPreviousEventList()
  {
    return DB::transaction(function () {
      return Event::join('users', 'users.id', '=', 'events.approved_by_user_id')->select('events.*', 'users.name as username', 'users.email', 'users.role', 'users.dob', 'users.address as user_address', 'users.phone', 'users.profile')->where('events.to_date', '<', date('Y-m-d'))->paginate(config('constant.pagination_count'));
    });
  }

  /**
   * Get Event By Id
   *
   * @param $id
   * @return void
   */
  public function getEventById($id)
  {
    return Event::join('users', 'users.id', '=', 'events.approved_by_user_id')->select('events.*', 'users.name as username', 'users.email', 'users.role', 'users.dob', 'users.address', 'users.phone', 'users.profile')->where('events.id', $id)->first();
  }

  /**
   * Delete Job
   *
   * @param $id
   * @return Obj
   */
  public function deleteEvent($id)
  {
    return DB::transaction(function () use ($id) {
      $response = ['error' => "Event does not exist."];
      $event = Event::find($id);
      if ($event) {
        $event->delete();
        $response = ['success' => "Event is deleted successfully"];
      }
      return $response;
    });
  }

  /**
   * Create event
   * @param $eventData
   * @return void
   */
  public function createEvent($eventData)
  {
    return Event::create($eventData);
  }

  /**
   * Update Event
   * @param $eventData
   * @param $id
   * @return void
   */
  public function updateEvent($eventData, $id)
  {
    return Event::where('id', $id)->update($eventData);
  }
}
