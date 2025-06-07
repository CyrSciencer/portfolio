import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Enter: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, [navigate]);

  return null;
};

export default Enter;
