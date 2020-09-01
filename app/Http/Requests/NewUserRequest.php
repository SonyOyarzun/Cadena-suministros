<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; //en true permite su uso
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        
        return [
            'name'          => 'required|min:1|max:100',
            'email'         => 'required|email',
            'role'          => 'required|min:1|max:1',
            'path'          => 'required|min:1|max:100',
            'publicKey'     => 'required',
            'privateKey'    => 'required',
            'password'      => 'required',
        ];
        
    }

    
    public function messages()
    {
        return [
            'name.required'   => 'El :attribute es obligatorio.',
            'name.min'        => 'El :attribute debe contener mas de una letra.',
            'name.max'        => 'El :attribute debe contener max 30 letras.',

            'email.required'  => 'El :attribute es obligatorio.',
            'email.email'     => 'El :attribute debe ser un correo válido.',

            'role.required'   => 'El :attribute es obligatorio.',
            'role.min'        => 'El :attribute debe contener mas de una letra.',
            'role.max'        => 'El :attribute debe contener max 30 letras.',

            'path.required'   => 'El :attribute es obligatorio.',
            'path.min'        => 'El :attribute debe contener mas de una letra.',
            'path.max'        => 'El :attribute debe contener max 30 letras.',

            'publicKey.required'   => 'El :attribute es obligatorio.',
            'publicKey.min'        => 'El :attribute debe contener mas de una caracter.',
            'publicKey.max'        => 'El :attribute debe contener max 30 letras.',

            'privateKey.required'   => 'El :attribute es obligatorio.',
            'privateKey.min'        => 'El :attribute debe contener mas de una caracter.',
            'privateKey.max'        => 'El :attribute debe contener max 30 letras.',

            'password.required'     => 'El :attribute es obligatorio.',
        ];
    }


    public function attributes()
    {
        return [
            
            'name'           => 'nombre de usuario',
            'email'          => 'correo electronico',
            'role'           => 'rol',
            'path'           => 'ruta de api',
            'publicKey'      => 'llave publica',
            'privateKey'     => 'llave privada',
            'password'       => 'contraseña',
            
        ];
    }

    
}
