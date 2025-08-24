import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Input from '../components/Input';
import { Key, Mail, User,Eye, EyeOff, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import RandomPasswordGenerator from '../components/RandomPasswordGenerator';
import { useAuthStore } from '../store/authStore';

const SignUpPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate();

    const { signup, error, isLoading } = useAuthStore();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
			await signup(email, password, name);
			setIsExiting(true);
		} catch (error) {
			console.log(error);
		}
    }

    useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => navigate("/verify-email"), 500); // match motion duration
      return () => clearTimeout(timer);
    }
  }, [isExiting, navigate]);

  return (
    <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 200 }}   
    transition={{ duration: 0.5 }}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden'
     >
        <div className="p-8">
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text'>
                Create an Account
            </h2>


        <form onSubmit={handleSignUp}>
            <Input 
                icon={User}
                type='text'
                placeholder='Full Name'
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <Input 
                icon={Mail}
                type='email'
                placeholder='Email Address'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <div className="relative">
                <Input
                    icon={Key}
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
            </div>

            {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

            {/* Random Password Generator */}
            <RandomPasswordGenerator setPassword={setPassword} />


            {/* password strength meter */}
            <PasswordStrengthMeter password={password} />


            <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white 
                font-bold rounded-lg shadow-lg hover:from-blue-600
                hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                focus:ring-offset-gray-900 transition duration-200'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                disabled={isLoading}>
                
                    {isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Sign Up"}
            
            </motion.button>
        </form>

        {/* For OAuth2 WS02 IS - Signin with 3rd Party IDP */}
        <div>

        </div>

        </div>
        {/* Already have an account? */}
        <div className='px-8 py-4 bg-gray-800 bg-opacity-50 flex justify-center'>
            <p className='text-sm text-gray-400'>
                Already Have an Account?{" "}
                <Link to={"/login"} className='text-cyan-400 hover:underline'>Login</Link>
            </p>



        </div>

     </motion.div>
  )
}

export default SignUpPage
