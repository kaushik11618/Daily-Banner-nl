import React, {useState} from 'react'
import './Register.css'

const Register = () => {

  const [register, setRegister] = useState({
    first_name: null,
    last_name: null,
    email: null,
    mobile: null,
    password: null,
    c_password: null,
    address: null,
    gender: null,
    c_name: null,
    linkedin: null,
    f_id: null,
    t_id: null,
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setRegister({...register, [name]: value})
    console.log(register)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can perform form validation and submission here
    console.log('Form data submitted:', register);

    try {

    } catch (error){

    }

  };



    return (
        <div className='shadow container '>
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <br/><br/>
              <h1>Register Form</h1><br/>
              <form onSubmit={handleSubmit} >
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>First Name :</label>
                    <input type="text" className="form-control h-50 w-100 " name="first_name" value={register.first_name}
                           onChange={(e) => handleInputChange} required/>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Last Name :</label>
                    <input type="text" className="form-control h-50 w-100" name="last_name" value={register.last_name}
                           onChange={handleInputChange} required/>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Email :</label>
                    <input type="text" className="form-control h-50 w-100" name="email" value={register.email}
                           onChange={handleInputChange} required/>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Mobile :</label>
                    <input type="text" className="form-control h-50 w-100" name="mobile" value={register.mobile}
                           onChange={handleInputChange} required/>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label>Password :</label>
                    <input type="password" className="form-control h-50 w-100" name="password" value={register.password}
                           onChange={handleInputChange} required/>
                  </div>
                  <div className='form-group col-md-6'>
                    <label>Confirm Password :</label>
                    <input type="password" className="form-control h-50 w-100" name="C_password" value={register.c_password}
                           onChange={handleInputChange} required/>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label>Company Name :</label>
                    <input type="text" className="form-control h-50 w-100" name="c_name" value={register.c_name}
                           onChange={handleInputChange} required/>
                  </div>
                  <div className='form-group col-md-6'>
                    <label>LinkedIn Id :</label>
                    <input type="text" className="form-control h-50 w-100" name="linkedin" value={register.linkedin}
                           onChange={handleInputChange} required/>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <label>Facebook Id :</label>
                    <input type="text" className="form-control h-50 w-100" name="f_id" value={register.f_id}
                           onChange={handleInputChange} />
                  </div>
                  <div className='form-group col-md-6'>
                    <label>Twitter Id :</label>
                    <input type="text" className="form-control h-50 w-100" name="t_id" value={register.t_id}
                           onChange={handleInputChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Address :</label>
                    <textarea name="address" className="form-control w-100" value={register.address}
                              onChange={handleInputChange} required/>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-success btn-block shadow border-0 py-2  text-uppercase" style={{position:'relative',bottom:'80px'}}>Register
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
    )
  }

export default Register;
