import React from 'react';
import { SignIn } from '@clerk/clerk-react';

import {useNavigate} from "react-router-dom"

function Login() {
  return (
    <div style={{
      backgroundColor: "#f1f5f9",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <SignIn
        appearance={{
          elements: {
            card: 'shadow-lg bg-white border border-gray-300 rounded-lg p-6',
            formButtonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded',
            headerTitle: 'text-2xl font-bold text-gray-800',
            formFieldInput: 'border border-gray-300 rounded-lg py-2 px-4',
          },
          variables: {
            colorPrimary: '#1D4ED8', // Primary color
            colorBackground: '#F9FAFB', // Background color
            colorText: '#111827', // Text color
            colorInputBackground: '#FFFFFF', // Input background color
            colorInputText: '#1F2937', // Input text color
            colorButtonText: '#FFFFFF', // Button text color
          },
        }}
      />
    </div>
  );
}

export default Login;
