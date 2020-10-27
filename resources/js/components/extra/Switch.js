import React from 'react';

const Switch = () => {
  return (
    <>
      <div className='custom-control custom-switch'>
        <input
          type='checkbox'
          className='custom-control-input'
          id='customSwitchesChecked'
          defaultChecked
        />
        <label className='custom-control-label' htmlFor='customSwitchesChecked'>
          Habilitar Registro de Temperaturas
        </label>
      </div>
    </>
  );
};

export default Switch;