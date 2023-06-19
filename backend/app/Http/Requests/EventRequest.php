<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'event_name' => ['required', 'max:255'],
            'description' => ['required', 'max:255'],
            'from_date' => ['required'],
            'to_date' => ['required'],
            'from_time' => ['required'],
            'to_time' => ['required'],
            'status' => ['required'],
            'address' => ['required', 'max:255'],
            'approved_by_user_id' => ['required'],
        ];
    }
}
