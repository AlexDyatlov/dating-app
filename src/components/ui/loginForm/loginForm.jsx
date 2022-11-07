import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import TextField from '../../common/form/textField/textField';
import CheckBoxField from '../../common/form/checkBoxField/checkBoxField';

import { validator } from '../../../utils/validator';
import { useAuth } from '../../../hooks/useAuth';

const LoginForm = () => {
  const history = useHistory();
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);
  const { logIn } = useAuth();

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
    setEnterError(null);
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
      await logIn(data);
      history.push('/');
    } catch (error) {
      setEnterError(error.message);
    }
  };

  return (
    <form onSubmit={handlerSubmit}>
      <TextField
        label="Электронная почта"
        id="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        id="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField
        value={data.stayOn}
        onChange={handleChange}
        name='stayOn'
      >
        Оставаться в системе
      </CheckBoxField>
      {enterError && <p className="text-danger">{enterError}</p>}
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid || enterError}
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
