import { Link } from 'react-router-dom';
import RegisterForm from '../../components/form-elements/RegisterForm';
import translate from './register.json';
import '../../App.css';
import { useLanguageContext } from '../../context/LanguageContext';

function Register() {
  const { language } = useLanguageContext();
  return (
    <div className="page-container login-container">
      <div className="content-wrap">
        <div className="form-align-center">
          <RegisterForm
            name={translate.register[language]}
            footer={
              <span>
                {translate.haveAccount[language]}
                <Link to={`/${language}/login`}>{translate.login[language]}</Link>
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
