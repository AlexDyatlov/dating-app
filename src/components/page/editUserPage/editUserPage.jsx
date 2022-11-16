import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TextField from '../../common/form/textField/textField';
import SelectField from '../../common/form/selectField/selectField';
import RadioField from '../../common/form/radioField/radioField';
import MultiSelectField from '../../common/form/multiSelect/multiSelect';
import BackHistoryButton from '../../common/backButton/backButton';

import { validator } from '../../../utils/validator';
import { useAuth } from '../../../hooks/useAuth';
import { getQualities, getQualitiesLoadingStatus } from '../../../store/qualities';
import { getProfessions, getProfessionsLoadingStatus } from '../../../store/professions';

const EditUserPage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { currentUser, updateUserData } = useAuth();
  const [errors, setErrors] = useState({});

  const professions = useSelector(getProfessions());
  const professionLoading = useSelector(getProfessionsLoadingStatus());
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
  const professionsList = professions.map((p) => ({
    label: p.name,
    value: p._id
  }));
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id
  }));

  function getQualitiesListByIds(qualitiesIds) {
    const qualitiesArray = [];
    for (const qualId of qualitiesIds) {
      for (const quality of qualities) {
        if (quality._id === qualId) {
          qualitiesArray.push(quality);
          break;
        }
      }
    }
    return qualitiesArray;
  }

  const transformData = (data) => {
    const result = getQualitiesListByIds(data).map((qual) => ({
      label: qual.name,
      value: qual._id
    }));
    return result;
  };

  useEffect(() => {
    if (!professionLoading && !qualitiesLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities)
      });
    }
  }, [professionLoading, qualitiesLoading, currentUser, data]);

  useEffect(() => {
    if (data && isLoading) setIsLoading(false);
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

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    await updateUserData({
      ...data,
      qualities: data.qualities.map((q) => q.value)
    });

    history.push(`/users/${currentUser._id}`);
  };

  return (
    <div className='container mt-5'>
      <BackHistoryButton />
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
                options={professionsList}
                value={data.profession}
                onChange={handleChange}
                error={errors.profession}
              />
              <RadioField
                label="Выберите ваш пол"
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
              />
              <MultiSelectField
                label="Выберите ваши качества"
                name="qualities"
                options={qualitiesList}
                onChange={handleChange}
                defaultValue={data.qualities}
              />
              <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
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
