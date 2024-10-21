import { useForm } from 'react-hook-form'
import validator from 'validator';

const GoodForm = () => {
  
  const {register, handleSubmit, formState: {errors}, watch} = useForm()


  const onSubimit = (data) => {
    alert(JSON.stringify(data))
  };

  const watchPassword = watch("password")

  return (
    <div className="app-container">
      <div className="form-group">
        <label>Nome</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome"
          {...register("name", {required: true}) }
        />
        {errors?.name?.type === 'required' && <p className="error-message">Name is required.</p>}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register("email", {required: true, validate: (value) => validator.isEmail(value)})}
        />
        {errors?.email?.type === 'required' && <p className="error-message">Email is required</p>}
        {errors?.email?.type === 'validate' && <p className="error-message">Email is invalid.</p>}
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          {...register("password", {required: true,minLength: 7})}
          
        />
        {errors?.password?.type === 'minLength' && (
          <p className="error-message">Password must have at least 7 charecters.</p>
        )}
        {errors?.password?.type === 'required' && (
          <p className="error-message">Password is required.</p>
        )}
      </div>

      <div className="form-group">
        <label>Confirmação de Senha</label>
        <input
          className={errors?.passwordConfirmation && "input-error"}
          type="password"
          placeholder="Dijite sua senha novamente"
          {...register("passwordConfirmation", {required: true, validate: (value) => value === watchPassword})}
          
        />
        {errors?.passwordConfirmation?.type === 'required' && (
          <p className="error-message">Password Confirmation is required.</p>
        )}
        {errors?.passwordConfirmation?.type === 'validate' && (
          <p className="error-message">Password does not match.</p>
        )}
      </div>

      <div className="form-group">
        <label>Profissão</label>
        <select
          className={errors?.profession && "input-error"}
        {...register("profession", {validate: (value) => {
          return value !== "0"
        }})}
          
        >
          <option value="0">Selecione sua profissão...</option>
          <option value="developer">Desenvolvedor</option>
          <option value="other">Outra</option>
        </select>

        {errors?.profession?.type === 'validate' && (
          <p className="error-message">Verifique se vc selecionou alguma coisa</p>
        )}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="privacy-policy"
            {...register("privacyTerms", {required: true})}
          />
          <label>I agree with the privacy terms.</label>
        </div>

        {errors?.privacyTerms?.type === `required` && (
          <p className="error-message">You must agree with the privacy terms.</p>
        )}
      </div>

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubimit)()}>Criar conta</button>
      </div>
    </div>
  );
};

export default GoodForm;
