<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
  use SoftDeletes;

  protected $guarded = ['id'];

  public function approved_by()
  {
    return $this->belongsTo(User::class, 'approved_by_user_id');
  }
}
