import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import TextField from '../../common/form/textField/textField';
import SelectField from '../../common/form/selectField/selectField';
import RadioField from '../../common/form/radioField/radioField';
import MultiSelectField from '../../common/form/multiSelect/multiSelect';

import { validator } from '../../../utils/validator';
import api from '../../../api';

const EditUserPage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    name: '',
    profession: '',
    sex: 'male',
    qualities: []
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfession] = useState([]);
  const [qualities, setQualities] = useState([]);

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label };
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  const transformData = data => {
    return data.map(qual => ({
      label: qual.name,
      value: qual._id
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then(({ profession, qualities, ...data }) =>
      setData(prevState => ({
        ...prevState,
        ...data,
        qualities: transformData(qualities),
        profession: profession._id
      }))
    );
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfession(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(qualitiesList);
    });
  }, []);

  useEffect(() => {
    if (data._id) setIsLoading(false);
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен некорректно'
      }
    },
    name: {
      isRequired: {
        message: 'Введите ваше имя'
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

  const handlerSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const { profession, qualities } = data;
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then(data => history.push(`/users/${data._id}`));
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          {!isLoading && Object.keys(professions).length > 0
            ? (<form onSubmit={handlerSubmit}>
              <TextField
                label='Имя'
                id='name'
                name='name'
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label='Электронная почта'
                id='email'
                name='email'
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                label='Выберите свою профессию'
                defaultOption='Choose...'
                name='profession'
                options={professions}
                value={data.profession}
                onChange={handleChange}
                error={errors.profession}
              />
              <RadioField
                label='Выберите ваш пол'
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                value={data.sex}
                name='sex'
                onChange={handleChange}
              />
              <MultiSelectField
                label='Выберите ваши качества'
                name='qualities'
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
              />
              <button
                className='btn btn-primary w-100 mx-auto'
                type='submit'
                disabled={!isValid}
              >
                Обновить
              </button>
            </form>)
            : 'Loading...'
          }
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
